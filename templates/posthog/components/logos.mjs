const marks = {
  dot: (c) => `<circle cx="9" cy="9" r="7" fill="${c}"/><circle cx="9" cy="9" r="2.6" fill="#fff"/>`,
  square: (c) => `<rect x="2" y="2" width="14" height="14" rx="3" fill="${c}"/><rect x="6.5" y="6.5" width="5" height="5" rx="1" fill="#fff"/>`,
  spark: (c) => `<path d="M9 1l2 5.5L16.5 9l-5.5 2L9 16.5 7 11 1.5 9 7 6.5z" fill="${c}"/>`,
  leaf: (c) => `<path d="M3 15C3 7 8 3 15 3c0 8-4 12-12 12z" fill="${c}"/><path d="M4.5 13.5C7 10 10 7.5 13 5.5" stroke="#fff" stroke-width="1.2" fill="none"/>`,
  chevrons: (c) => `<path d="M2 4l5 5-5 5M9 4l5 5-5 5" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
};

const logo = (l, sleek) => `<span class="flex items-center justify-center gap-1.5 py-2.5 ${sleek ? "text-ph-ink" : ""}" ${sleek ? "" : `style="color:${l.color}"`}>
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">${marks[l.mark](sleek ? "#111" : l.color)}</svg>
  <span class="text-[16px] font-bold tracking-tight">${l.name}</span>
</span>`;

export default (config) => {
  const s = config.logos;
  return `<section>
  <h2 class="ph-h2">${s.heading}</h2>
  <p class="mt-4 text-[18px] leading-relaxed text-ph-sub">${s.sub}</p>
  <div class="ph-card relative mt-6 rounded-md">
    <button type="button" class="ph-logo-swap absolute left-1/2 top-2.5 z-10 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full sm:flex" aria-label="${s.swapLabel}">
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M13.5 6.5a6 6 0 0 0-11-1M3.5 10.5a6 6 0 0 0 11 1"/><path d="M2.5 2v3.5H6M14.5 15v-3.5H11"/></svg>
    </button>
    <div class="ph-logo-panes grid sm:grid-cols-2 sm:divide-x sm:divide-ph-line">
      <div class="ph-logo-pane">
        <p class="ph-logo-pane-head">${s.leftLabel}</p>
        <div class="grid grid-cols-2 gap-x-2 px-4 py-5">
          ${s.colorful.map((l) => logo(l, false)).join("\n          ")}
        </div>
      </div>
      <div class="ph-logo-pane border-t border-ph-line sm:border-t-0">
        <p class="ph-logo-pane-head">${s.rightLabel}</p>
        <div class="grid grid-cols-2 gap-x-2 px-4 py-5">
          ${s.sleek.map((l) => logo(l, true)).join("\n          ")}
        </div>
      </div>
    </div>
  </div>
  <a href="#" class="ph-btn-outline mt-5 inline-block rounded-md px-4 py-2 text-[15px] font-bold">${s.openCta}</a>
</section>`;
};
