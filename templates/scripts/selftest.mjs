import assert from "node:assert/strict";
import { chromium } from "playwright";
import { checkOverflow, checkTextOverflow, checkRevealVisible, checkForbiddenIdentity, checkConsole, FORBIDDEN_IDENTITY } from "./check.mjs";

const FIXTURES = {
  good: `<!doctype html><html><head><title>Stub</title></head><body>
    <div class="reveal" style="opacity:1">ok</div>
  </body></html>`,
  overflow: `<!doctype html><html><head><title>Stub</title></head><body>
    <div style="width:3000px">wide</div>
    <div class="reveal" style="opacity:1">ok</div>
  </body></html>`,
  textOverflow: `<!doctype html><html><head><title>Stub</title><style>body{margin:0;overflow-x:hidden}</style></head><body>
    <p style="width:3000px;white-space:nowrap">this line is pushed far past the viewport and clipped by body</p>
    <div class="reveal" style="opacity:1">ok</div>
  </body></html>`,
  clippedMarquee: `<!doctype html><html><head><title>Stub</title><style>body{margin:0}</style></head><body>
    <div style="overflow:hidden;width:100%"><p style="width:3000px;white-space:nowrap">marquee text inside its own clipping wrapper is fine</p></div>
    <div class="reveal" style="opacity:1">ok</div>
  </body></html>`,
  hiddenReveal: `<!doctype html><html><head><title>Stub</title></head><body>
    <div class="reveal" style="opacity:0">hidden</div>
  </body></html>`,
  forbidden: `<!doctype html><html><head><title>PostHog</title></head><body>
    <div class="reveal" style="opacity:1">posthog is great</div>
  </body></html>`,
  consoleError: `<!doctype html><html><head><title>Stub</title></head><body>
    <div class="reveal" style="opacity:1">ok</div>
    <script>console.error("boom")</script>
  </body></html>`,
};

const server = Bun.serve({
  port: 0,
  fetch(req) {
    const kase = new URL(req.url).searchParams.get("case") || "good";
    return new Response(FIXTURES[kase], { headers: { "content-type": "text/html" } });
  },
});
const base = `http://localhost:${server.port}/`;
const browser = await chromium.launch();

async function load(kase, { collectConsole } = {}) {
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  if (collectConsole) {
    page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
    page.on("pageerror", (err) => pageErrors.push(String(err)));
  }
  await page.goto(`${base}?case=${kase}`, { waitUntil: "networkidle" });
  return { context, page, consoleErrors, pageErrors };
}

const good = await load("good");
assert.deepEqual(await checkOverflow(good.page), [], "good fixture: overflow check must pass");
assert.deepEqual(await checkTextOverflow(good.page), [], "good fixture: text-overflow check must pass");
assert.deepEqual(await checkRevealVisible(good.page), [], "good fixture: reveal check must pass");
assert.deepEqual(await checkForbiddenIdentity(good.page, FORBIDDEN_IDENTITY), [], "good fixture: identity check must pass");
await good.context.close();

const overflow = await load("overflow");
assert.notEqual((await checkOverflow(overflow.page)).length, 0, "overflow mutation must be caught");
await overflow.context.close();

const textOverflow = await load("textOverflow");
assert.deepEqual(await checkOverflow(textOverflow.page), [], "body overflow-x:hidden hides the defect from scrollWidth, which is why checkTextOverflow exists");
assert.notEqual((await checkTextOverflow(textOverflow.page)).length, 0, "text pushed past the viewport under body overflow-x:hidden must be caught");
await textOverflow.context.close();

const clippedMarquee = await load("clippedMarquee");
assert.deepEqual(await checkTextOverflow(clippedMarquee.page), [], "text inside its own overflow-hidden wrapper is a legitimate clip, not a defect");
await clippedMarquee.context.close();

const hiddenReveal = await load("hiddenReveal");
assert.notEqual((await checkRevealVisible(hiddenReveal.page)).length, 0, "hidden-reveal mutation must be caught");
await hiddenReveal.context.close();

const forbidden = await load("forbidden");
assert.notEqual((await checkForbiddenIdentity(forbidden.page, FORBIDDEN_IDENTITY)).length, 0, "forbidden-identity mutation must be caught");
await forbidden.context.close();

const consoleError = await load("consoleError", { collectConsole: true });
await consoleError.page.waitForTimeout(100);
assert.notEqual(checkConsole(consoleError.consoleErrors, []).length, 0, "console-error mutation must be caught");
await consoleError.context.close();

await browser.close();
server.stop();
console.log("selftest: every checker mutation was caught, checker logic is sound");
