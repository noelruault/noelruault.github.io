import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { renderSlug } from "./render.mjs";

const dir = mkdtempSync(join(tmpdir(), "wt-rendertest-"));
mkdirSync(join(dir, "components"));

writeFileSync(join(dir, "config.json"), JSON.stringify({ sections: ["hero"], title: "Stub", heading: "Hello" }));
writeFileSync(
  join(dir, "shell.mjs"),
  `export default (config, body) => \`<!doctype html><html><head><title>\${config.title}</title></head><body>\${body}</body></html>\`;\n`
);
writeFileSync(join(dir, "components", "hero.mjs"), `export default (config) => \`<h1>\${config.heading}</h1>\`;\n`);

const rendered = await renderSlug(`${dir}/`);
assert.match(rendered, /<title>Stub<\/title>/, "shell must read title from config");
assert.match(rendered, /<h1>Hello<\/h1>/, "component must read heading from config, no hardcoded copy");

// A clean commit: the file on disk already matches a fresh render, so before === after.
writeFileSync(join(dir, "index.html"), rendered);
const before = readFileSync(join(dir, "index.html"), "utf8");
const after = await renderSlug(`${dir}/`);
assert.equal(before, after, "unchanged config must re-render byte-identical (no drift on a clean commit)");

// A hand-edit: the committed file diverges from what config + components would render.
writeFileSync(join(dir, "index.html"), `${rendered}<!-- hand-edited -->`);
const handEdited = readFileSync(join(dir, "index.html"), "utf8");
const freshRender = await renderSlug(`${dir}/`);
assert.notEqual(handEdited, freshRender, "hand-edit without a config change must be caught as drift");

rmSync(dir, { recursive: true, force: true });
console.log("rendertest: config+components render pure, drift detection catches a hand-edit");
