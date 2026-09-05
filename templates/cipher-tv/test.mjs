import assert from "node:assert";
import { ditherRects, BLOB } from "./components/contact.mjs";
import { tileVars } from "./components/works.mjs";
import { readFileSync } from "node:fs";

// The blob must be deterministic per seed: the gate re-renders index.html and diffs it against the committed file, so any nondeterminism here is a render-drift failure.
const a = ditherRects(7);
const b = ditherRects(7);
assert.deepStrictEqual(a, b, "ditherRects must be deterministic for a given seed");
assert.notDeepStrictEqual(ditherRects(8), a, "different seeds must dither differently");
assert.ok(a.length > 200 && a.length < 3000, `blob cell count sane, got ${a.length}`);
for (const r of a) {
  assert.ok(r.x >= 0 && r.x + r.s <= BLOB.width && r.y >= 0 && r.y + r.s <= BLOB.height, "blob cells stay inside the viewBox");
}

const config = JSON.parse(readFileSync(new URL("./config.json", import.meta.url), "utf8"));
const indexes = new Set(config.works.map((w) => w.index));
assert.strictEqual(indexes.size, config.works.length, "work indexes must be unique");
for (const w of config.works) {
  const vars = tileVars(w);
  assert.ok(vars.includes(`--a:${w.angle}deg`) && vars.includes(`--g:${w.gradient}`), `tileVars carries angle and gradient for ${w.index}`);
  assert.ok(w.fx > 0.5 && w.fx < 1.5 && w.fy > 0.5 && w.fy < 1.5, `radius factors keep ${w.index} on screen`);
}

console.log("cipher-tv test.mjs: all assertions passed");
