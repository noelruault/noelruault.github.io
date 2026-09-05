// Usage: bun scripts/scrape-live.mjs <url> <outdir> [width] — scratch evidence only, never gated.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const [url, outdir, widthArg] = process.argv.slice(2);
const width = Number(widthArg || 1440);
mkdirSync(outdir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);

const html = await page.content();
writeFileSync(`${outdir}/rendered-${width}.html`, html);

const sections = await page.evaluate(() => {
  const out = [];
  const walk = (el, depth) => {
    for (const child of el.children) {
      const tag = child.tagName.toLowerCase();
      if (["script", "style", "link", "noscript"].includes(tag)) continue;
      const r = child.getBoundingClientRect();
      const y = r.top + window.scrollY;
      if (r.height < 40) continue;
      out.push({
        depth, tag, y: Math.round(y), h: Math.round(r.height), w: Math.round(r.width),
        cls: (child.className && child.className.baseVal !== undefined ? child.className.baseVal : child.className || "").slice(0, 160),
        id: child.id || "",
        text: (child.innerText || "").replace(/\s+/g, " ").slice(0, 120),
      });
      if (depth < 3) walk(child, depth + 1);
    }
  };
  walk(document.body, 0);
  return { scrollHeight: document.body.scrollHeight, sections: out };
});
writeFileSync(`${outdir}/sections-${width}.json`, JSON.stringify(sections, null, 1));

const total = sections.scrollHeight;
const step = 850;
for (let y = 0, i = 0; y < total && i < 40; y += step, i++) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(450);
  await page.screenshot({ path: `${outdir}/shot-${width}-${String(y).padStart(6, "0")}.png` });
}
await browser.close();
console.log(`scraped ${url} at ${width}: scrollHeight=${total}`);
