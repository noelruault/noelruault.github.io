import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { renderSlug } from "./render.mjs";

const manifest = JSON.parse(readFileSync(new URL("../manifest.json", import.meta.url), "utf8"));

for (const slug of manifest) {
  if (existsSync(`${slug}/config.json`)) {
    const html = await renderSlug(`${slug}/`);
    writeFileSync(`${slug}/index.html`, html);
    console.log(`rendered ${slug}/index.html`);
  }

  const input = `${slug}/src/main.css`;
  const output = `${slug}/style.css`;
  const proc = Bun.spawn(
    ["./node_modules/.bin/tailwindcss", "-i", input, "-o", output, "--minify"],
    { stdout: "inherit", stderr: "inherit" }
  );
  const code = await proc.exited;
  if (code !== 0) {
    console.error(`build failed for ${slug}`);
    process.exit(code);
  }
  console.log(`built ${output}`);
}
