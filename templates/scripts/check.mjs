export const WIDTHS = [390, 768, 1440];

export const FORBIDDEN_IDENTITY = ["fin.ai", "intercom", "posthog", "cipher.tv", "michaelgatt", "likova", "otsuka", "pi.dev", "charm.land"];

export function serveDir(dir) {
  return Bun.serve({
    port: 0,
    async fetch(req) {
      const url = new URL(req.url);
      const path = url.pathname === "/" ? "/index.html" : url.pathname;
      const file = Bun.file(`${dir}${path}`);
      return (await file.exists()) ? new Response(file) : new Response("not found", { status: 404 });
    },
  });
}

export async function scrollFullPage(page) {
  await page.evaluate(async () => {
    let last = -1;
    while (document.scrollingElement.scrollTop !== last) {
      last = document.scrollingElement.scrollTop;
      window.scrollBy(0, 400);
      await new Promise((r) => setTimeout(r, 50));
    }
  });
  await page.waitForTimeout(300);
}

export async function checkOverflow(page) {
  const overflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth + 1);
  return overflow ? ["horizontal overflow: body.scrollWidth exceeds viewport width"] : [];
}

// body.scrollWidth misses the common mobile defect: `overflow-x: hidden` on html/body clips pushed-out text instead of scrolling it.
// Only html/body are treated as non-clipping; a wrapper with its own overflow-x (marquee, carousel, scroll pane) legitimately clips.
export async function checkTextOverflow(page) {
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const clippedByWrapper = (el) => {
      for (let p = el.parentElement; p && p !== document.body && p !== document.documentElement; p = p.parentElement) {
        if (getComputedStyle(p).overflowX !== "visible") return true;
      }
      return false;
    };
    const hasOwnText = (el) => Array.from(el.childNodes).some((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
    const out = [];
    for (const el of document.body.querySelectorAll("*")) {
      if (!hasOwnText(el) || clippedByWrapper(el)) continue;
      const s = getComputedStyle(el);
      if (s.display === "none" || s.visibility === "hidden" || parseFloat(s.opacity) === 0) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > vw + 1 || r.left < -1) {
        const cls = (el.getAttribute("class") || "").split(/\s+/)[0];
        out.push(`${el.tagName.toLowerCase()}${cls ? "." + cls : ""} left=${Math.round(r.left)} right=${Math.round(r.right)}`);
      }
    }
    return out.length ? [`${out.length} text element(s) extend past the ${vw}px viewport: ${out.slice(0, 3).join("; ")}`] : [];
  });
}

export async function checkRevealVisible(page) {
  return page.evaluate(() => {
    const targets = Array.from(document.querySelectorAll('[class*="reveal" i]'));
    const hidden = targets.filter((el) => {
      const style = getComputedStyle(el);
      return parseFloat(style.opacity) < 0.9 || style.visibility === "hidden" || style.display === "none";
    });
    return hidden.length ? [`${hidden.length} reveal target(s) not visible`] : [];
  });
}

export async function checkForbiddenIdentity(page, forbidden) {
  return page.evaluate((forbidden) => {
    const haystack = (document.title + " " + document.body.innerText).toLowerCase();
    const hits = forbidden.filter((name) => haystack.includes(name.toLowerCase()));
    return hits.length ? [`forbidden identity string(s) found: ${hits.join(", ")}`] : [];
  }, forbidden);
}

export function checkConsole(consoleErrors, pageErrors) {
  const msgs = [];
  if (consoleErrors.length) msgs.push(`${consoleErrors.length} console error(s): ${consoleErrors[0]}`);
  if (pageErrors.length) msgs.push(`${pageErrors.length} page error(s): ${pageErrors[0]}`);
  return msgs;
}

export async function checkSlugAtWidth(browser, baseUrl, width) {
  const failures = [];

  {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
    page.on("pageerror", (err) => pageErrors.push(String(err)));
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await scrollFullPage(page);
    for (const m of checkConsole(consoleErrors, pageErrors)) failures.push(`[${width}px normal] ${m}`);
    for (const m of await checkOverflow(page)) failures.push(`[${width}px normal] ${m}`);
    for (const m of await checkTextOverflow(page)) failures.push(`[${width}px normal] ${m}`);
    for (const m of await checkRevealVisible(page)) failures.push(`[${width}px normal] ${m}`);
    for (const m of await checkForbiddenIdentity(page, FORBIDDEN_IDENTITY)) failures.push(`[${width}px normal] ${m}`);
    await context.close();
  }

  {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    for (const m of await checkRevealVisible(page)) failures.push(`[${width}px reduced-motion] ${m}`);
    await context.close();
  }

  {
    const context = await browser.newContext({ viewport: { width, height: 900 }, javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    for (const m of await checkRevealVisible(page)) failures.push(`[${width}px no-js] ${m}`);
    await context.close();
  }

  return failures;
}
