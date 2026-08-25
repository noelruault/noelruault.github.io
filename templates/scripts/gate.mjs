import { readFileSync } from "node:fs";
import { chromium } from "playwright";
import { checkSlugAtWidth, WIDTHS, serveDir } from "./check.mjs";

const selftest = Bun.spawnSync(["bun", "scripts/selftest.mjs"], { stdout: "inherit", stderr: "inherit" });
if (selftest.exitCode !== 0) {
  console.error("gate: selftest failed, checker logic is unsound, aborting before touching templates");
  process.exit(selftest.exitCode);
}

const build = Bun.spawnSync(["bun", "scripts/build.mjs"], { stdout: "inherit", stderr: "inherit" });
if (build.exitCode !== 0) process.exit(build.exitCode);

const manifest = JSON.parse(readFileSync(new URL("../manifest.json", import.meta.url), "utf8"));
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
