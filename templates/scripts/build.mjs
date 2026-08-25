import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync(new URL("../manifest.json", import.meta.url), "utf8"));

for (const slug of manifest) {
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
