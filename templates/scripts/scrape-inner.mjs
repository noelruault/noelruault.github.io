// Usage: bun scripts/scrape-inner.mjs <url> <outdir> [width] — scratch evidence only, never gated.
// Finds the tallest inner scroll pane, inventories it, and screenshots it at fixed scroll offsets.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const [url, outdir, widthArg] = process.argv.slice(2);
const width = Number(widthArg || 1440);
mkdirSync(outdir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);

const info = await page.evaluate(() => {
  let best = null;
  for (const el of document.querySelectorAll("*")) {
    if (el.scrollHeight > el.clientHeight + 200 && el.clientHeight > 300) {
      if (!best || el.scrollHeight > best.scrollHeight) best = el;
    }
  }
  if (!best) return null;
  best.setAttribute("data-scrape-target", "1");
  const cs = getComputedStyle(best);
  return {
    scrollHeight: best.scrollHeight, clientHeight: best.clientHeight,
    cls: String(best.className).slice(0, 200), tag: best.tagName, overflow: cs.overflowY,
  };
});
console.log(JSON.stringify(info));
if (!info) { await browser.close(); process.exit(1); }

const inventory = await page.evaluate(() => {
  const root = document.querySelector('[data-scrape-target="1"]');
  const out = [];
  const walk = (el, depth) => {
    for (const child of el.children) {
      const tag = child.tagName.toLowerCase();
      if (["script", "style", "link", "noscript", "svg"].includes(tag)) continue;
      if (child.offsetHeight < 40) continue;
      out.push({
        depth, tag, y: Math.round(child.offsetTop), h: Math.round(child.offsetHeight), w: Math.round(child.offsetWidth),
        cls: String(child.className && child.className.baseVal !== undefined ? child.className.baseVal : child.className).slice(0, 200),
        text: (child.innerText || "").replace(/\s+/g, " ").slice(0, 140),
      });
      if (depth < 4) walk(child, depth + 1);
    }
  };
  walk(root, 0);
  return out;
});
writeFileSync(`${outdir}/inner-sections-${width}.json`, JSON.stringify(inventory, null, 1));

const innerHtml = await page.evaluate(() => document.querySelector('[data-scrape-target="1"]').innerHTML);
writeFileSync(`${outdir}/inner-${width}.html`, innerHtml);

const step = 800;
for (let y = 0, i = 0; y < info.scrollHeight && i < 45; y += step, i++) {
  await page.evaluate((yy) => { document.querySelector('[data-scrape-target="1"]').scrollTop = yy; }, y);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${outdir}/inner-${width}-${String(y).padStart(6, "0")}.png` });
}
await browser.close();
console.log(`inner scrape done: scrollHeight=${info.scrollHeight}`);
