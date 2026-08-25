import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";
import { WIDTHS, serveDir } from "./check.mjs";

const [slug, liveUrl] = process.argv.slice(2);
if (!slug || !liveUrl) {
  console.error("usage: bun scripts/compare.mjs <slug> <live-url>");
  process.exit(1);
}
if (!existsSync(`${slug}/index.html`)) {
  console.error(`compare: ${slug}/index.html does not exist, build the template before comparing`);
  process.exit(1);
}

const outDir = `../.backups/webtemplates-verify/${slug}`;
mkdirSync(outDir, { recursive: true });

const server = serveDir(slug);
const localBase = `http://localhost:${server.port}/`;
const browser = await chromium.launch();

for (const width of WIDTHS) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();

  await page.goto(localBase, { waitUntil: "networkidle" });
  const localBuf = await page.screenshot({ fullPage: true });

  let liveBuf = null;
  try {
    await page.goto(liveUrl, { waitUntil: "networkidle", timeout: 15000 });
    liveBuf = await page.screenshot({ fullPage: true });
  } catch (e) {
    console.error(`live fetch failed at ${width}px: ${e.message}`);
  }
  await context.close();

  const compositeContext = await browser.newContext({ viewport: { width: width * 2 + 20, height: 900 } });
  const compositePage = await compositeContext.newPage();
  const localSrc = `data:image/png;base64,${localBuf.toString("base64")}`;
  const liveSrc = liveBuf ? `data:image/png;base64,${liveBuf.toString("base64")}` : null;
  await compositePage.setContent(`
    <html><body style="margin:0;display:flex;background:#222">
      <img src="${localSrc}" style="width:${width}px;display:block" />
      <div style="width:20px;flex:none"></div>
      ${liveSrc ? `<img src="${liveSrc}" style="width:${width}px;display:block" />` : `<div style="width:${width}px;color:#fff;font:14px sans-serif;padding:8px">live fetch failed, see log</div>`}
    </body></html>
  `);
  await compositePage.waitForTimeout(100);
  await compositePage.screenshot({ path: `${outDir}/${slug}-${width}.png`, fullPage: true });
  await compositeContext.close();

  console.log(`wrote ${outDir}/${slug}-${width}.png`);
}

await browser.close();
server.stop();
