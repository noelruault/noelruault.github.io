const closeIcon = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M1.5 1.5l10 10M11.5 1.5l-10 10"/></svg>`;

const moleThumbs = `<svg width="72" height="78" viewBox="0 0 72 78" aria-hidden="true">
  <ellipse cx="36" cy="52" rx="24" ry="22" fill="#6b5138"/>
  <circle cx="36" cy="30" r="15" fill="#7d5f42"/>
  <circle cx="31" cy="28" r="2.2" fill="#1d1408"/>
  <circle cx="41" cy="28" r="2.2" fill="#1d1408"/>
  <path d="M30 36c3.5 3 8.5 3 12 0" stroke="#1d1408" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <ellipse cx="36" cy="33" rx="3.4" ry="2.2" fill="#e8a0a0"/>
  <path d="M12 46l-6-10M60 46l6-10" stroke="#6b5138" stroke-width="7" stroke-linecap="round"/>
  <circle cx="5" cy="33" r="4.5" fill="#7d5f42"/>
  <circle cx="67" cy="33" r="4.5" fill="#7d5f42"/>
</svg>`;

const cookie = (t) => `<aside class="ph-toast fixed bottom-4 right-4 z-50 w-[min(380px,calc(100vw-2rem))] rounded-md p-4 pr-10" data-toast="cookie">
  <button type="button" class="ph-toast-close absolute right-3 top-3 text-ph-sub" aria-label="${t.closeLabel}">${closeIcon}</button>
  <div class="flex items-end gap-3">
    <div class="min-w-0">
      <p class="text-[15px] font-bold">${t.title}</p>
      <p class="mt-1.5 text-[13px] leading-snug text-ph-sub">${t.p1}</p>
      <p class="mt-1.5 text-[13px] leading-snug text-ph-sub">${t.p2}</p>
    </div>
    <div class="hidden shrink-0 sm:block">${moleThumbs}</div>
  </div>
</aside>`;

const poster = (t) => `<aside class="ph-toast fixed bottom-4 left-4 z-50 hidden w-[240px] rounded-md p-3 lg:block" data-toast="poster">
  <button type="button" class="ph-toast-close absolute right-2.5 top-2.5 text-ph-sub" aria-label="${t.closeLabel}">${closeIcon}</button>
  <div class="ph-poster rounded p-4 text-center">
    <p class="text-[9px] font-bold tracking-[0.25em] text-white/70">${t.posterEyebrow}</p>
    <p class="mt-3 text-[22px] font-extrabold leading-none tracking-tight text-white">${t.posterTitle}</p>
    <p class="mt-3 text-[8px] leading-relaxed tracking-wide text-white/60">${t.posterCredits}</p>
    <button type="button" class="ph-btn-amber mt-3 rounded px-3 py-1 text-[12px] font-bold">▶ ${t.playLabel}</button>
  </div>
  <p class="mt-2 text-[13px] font-bold">${t.title}</p>
  <p class="text-[12px] text-ph-sub">${t.sub}</p>
</aside>`;

export default (config) =>
  config.toasts.map((t) => (t.kind === "cookie" ? cookie(t) : poster(t))).join("\n");
