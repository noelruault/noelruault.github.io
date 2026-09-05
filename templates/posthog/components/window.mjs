import hero from "./hero.mjs";
import tabs from "./tabs.mjs";
import tools from "./tools.mjs";
import logos from "./logos.mjs";
import data from "./data.mjs";
import pricing from "./pricing.mjs";
import why from "./why.mjs";
import reading from "./reading.mjs";
import cta from "./cta.mjs";

const inner = { hero, tabs, tools, logos, data, pricing, why, reading, cta };

export default (config) => {
  const w = config.window;
  const body = config.windowSections.map((name) => inner[name](config)).join("\n");
  return `<main class="ph-window absolute inset-x-2 bottom-0 top-[70px] z-20 mx-auto max-w-[1140px] overflow-hidden rounded-t-lg md:inset-x-[100px] lg:inset-x-[150px]">
  <div class="absolute right-3 top-3 z-30 flex items-center gap-2.5 text-ph-sub">
    <button type="button" class="ph-win-max hidden md:block" aria-label="${w.maximizeLabel}"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="1" y="1" width="11" height="11" rx="1.5"/></svg></button>
    <button type="button" class="ph-win-close" aria-label="${w.closeLabel}"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M1.5 1.5l10 10M11.5 1.5l-10 10"/></svg></button>
  </div>
  <div class="ph-window-scroll h-full overflow-y-auto overflow-x-hidden overscroll-contain">
    <div class="mx-auto max-w-[980px] space-y-12 px-5 pb-16 pt-12 sm:px-10 lg:px-12">
${body}
    </div>
  </div>
</main>
<div class="ph-desk-hint pointer-events-none fixed inset-0 z-0 hidden items-center justify-center text-[15px] text-white/80">${w.restoreHint}</div>`;
};
