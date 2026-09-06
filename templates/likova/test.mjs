import assert from "node:assert";
import { renderSlug } from "../scripts/render.mjs";

const html = await renderSlug(new URL(".", import.meta.url).pathname);

const expected = ["header", "intro", "idea", "information", "location", "accessibility", "environment", "generalPlan", "architecture", "lobby", "offices", "comfort", "engineering", "infrastructure", "team", "footer"];
const config = JSON.parse(await Bun.file(new URL("config.json", import.meta.url)).text());
assert.deepStrictEqual(config.sections, expected, "section order drifted from the reference inventory");

// numbered chapter tags 1..9 must all render, in ascending document order
const nums = [...html.matchAll(/class="lk-numtag"[^>]*>(\d)</g)].map((m) => m[1]);
assert.deepStrictEqual([...new Set(nums)], ["1", "2", "3", "4", "5", "6", "7", "8", "9"], "chapter numbers missing or out of order");

assert.strictEqual((html.match(/<h1[\s>]/g) || []).length, 1, "exactly one h1");
assert.ok(!html.includes("undefined"), "a config lookup leaked 'undefined' into the render");
assert.ok(!/likova/i.test(html.replace(/lk-/g, "")), "source identity leaked into the render");

console.log("likova test.mjs: all asserts passed");
