import { readFileSync, existsSync } from "node:fs";
import { chromium } from "playwright";
import { checkSlugAtWidth, WIDTHS, serveDir } from "./check.mjs";

const selftest = Bun.spawnSync(["bun", "scripts/selftest.mjs"], { stdout: "inherit", stderr: "inherit" });
if (selftest.exitCode !== 0) {
  console.error("gate: selftest failed, checker logic is unsound, aborting before touching templates");
  process.exit(selftest.exitCode);
}

const rendertest = Bun.spawnSync(["bun", "scripts/rendertest.mjs"], { stdout: "inherit", stderr: "inherit" });
if (rendertest.exitCode !== 0) {
  console.error("gate: rendertest failed, render/drift logic is unsound, aborting before touching templates");
  process.exit(rendertest.exitCode);
}

const manifest = JSON.parse(readFileSync(new URL("../manifest.json", import.meta.url), "utf8"));

// Per-template unit tests: a slug may ship an assert-based <slug>/test.mjs for its own pure logic.
for (const slug of manifest) {
  if (!existsSync(`${slug}/test.mjs`)) continue;
  const t = Bun.spawnSync(["bun", `${slug}/test.mjs`], { stdout: "inherit", stderr: "inherit" });
  if (t.exitCode !== 0) {
    console.error(`gate: ${slug}/test.mjs failed`);
    process.exit(t.exitCode);
  }
}

// Snapshot each modular slug's committed index.html before build re-renders it from config + components.
// A hand-edit that build's render would otherwise silently clobber shows up as a gate failure instead.
const preBuildSnapshots = new Map();
for (const slug of manifest) {
  if (existsSync(`${slug}/config.json`) && existsSync(`${slug}/index.html`)) {
    preBuildSnapshots.set(slug, readFileSync(`${slug}/index.html`, "utf8"));
  }
}

const build = Bun.spawnSync(["bun", "scripts/build.mjs"], { stdout: "inherit", stderr: "inherit" });
if (build.exitCode !== 0) process.exit(build.exitCode);

let driftFailed = false;
for (const [slug, before] of preBuildSnapshots) {
  const after = readFileSync(`${slug}/index.html`, "utf8");
  if (before !== after) {
    driftFailed = true;
    console.error(`FAIL ${slug}: render-drift — committed index.html doesn't match config + components. Run 'bun run build' and commit the result.`);
  }
}
if (driftFailed) process.exit(1);
if (manifest.length === 0) {
  console.log("gate: manifest empty, nothing to check");
  process.exit(0);
}

const browser = await chromium.launch();
let failed = false;
for (const slug of manifest) {
  const server = serveDir(slug);
  const baseUrl = `http://localhost:${server.port}/`;
  for (const width of WIDTHS) {
    const failures = await checkSlugAtWidth(browser, baseUrl, width);
    if (failures.length) {
      failed = true;
      console.error(`FAIL ${slug} @ ${width}px:`);
      for (const f of failures) console.error(`  ${f}`);
    } else {
      console.log(`ok ${slug} @ ${width}px`);
    }
  }
  server.stop();
}
await browser.close();
process.exit(failed ? 1 : 0);
