const logoMark = `<svg width="34" height="28" viewBox="0 0 26 22" aria-hidden="true"><path d="M2 20 L12 4 L16 11 L19 6 L24 20 Z" fill="currentColor"/><circle cx="12" cy="4" r="2.4" fill="#f54e00"/></svg>`;

const copyIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="4" y="4" width="9" height="9" rx="1.5"/><path d="M10 4V2.5A1.5 1.5 0 0 0 8.5 1h-6A1.5 1.5 0 0 0 1 2.5v6A1.5 1.5 0 0 0 2.5 10H4"/></svg>`;

export default (config) => {
  const h = config.hero;
  const marks = h.p2Marks.map((m) => `<mark class="ph-mark">${m}</mark>`);
  return `<section class="text-center xl:text-left">
  <div class="mb-8 flex items-center justify-center gap-2 xl:justify-start">
    ${logoMark}
    <span class="text-[26px] font-extrabold tracking-tight">${config.brand}</span>
  </div>
  <div class="grid items-start gap-8 xl:grid-cols-[1fr_360px]">
    <div class="min-w-0">
      <h1 class="ph-h1 mx-auto max-w-[16em] xl:mx-0">${h.heading} <mark class="ph-mark-blue">${h.headingHighlight}</mark></h1>
      <p class="mx-auto mt-6 max-w-[34em] text-[18px] leading-relaxed text-ph-sub xl:mx-0">${h.p1}</p>
      <p class="mx-auto mt-5 max-w-[34em] text-[18px] leading-relaxed text-ph-sub xl:mx-0">${h.p2Lead} ${marks[0]}, ${marks[1]}, and ${marks[2]} ${h.p2Tail} <span class="ph-squiggle">${h.p2Squiggle}</span></p>
      <p class="mx-auto mt-5 max-w-[34em] text-[18px] leading-relaxed text-ph-sub xl:mx-0">${h.p3}</p>
    </div>
    <div class="ph-card mx-auto w-full max-w-[380px] rounded-md text-left">
      <div class="flex items-center justify-between border-b border-ph-line px-4 py-2.5">
        <span class="text-[15px] font-bold">${h.cardTitle}</span>
        <a href="#" class="text-[13px] font-semibold underline underline-offset-2">${h.cardWeb} ↗</a>
      </div>
      <div class="px-4 py-3">
        <div class="flex items-center justify-between gap-2 rounded border border-ph-line bg-ph-panel px-3 py-2 font-ph-mono text-[13px]">
          <span><span class="text-ph-blue">npx</span> <span class="text-ph-red">${h.command.replace(/^npx /, "")}</span></span>
          <button type="button" class="ph-copy-btn shrink-0 text-ph-sub" aria-label="${h.copyLabel}" data-command="${h.command}">${copyIcon}</button>
        </div>
        <p class="mt-2.5 text-[13px] text-ph-sub">${h.supports} <a href="#" class="font-semibold underline underline-offset-2">${h.supportsMore}</a></p>
      </div>
    </div>
  </div>
</section>`;
};
