const moleWheel = `<svg width="150" height="110" viewBox="0 0 150 110" aria-hidden="true">
  <circle cx="100" cy="62" r="34" fill="none" stroke="#8a6d4f" stroke-width="5"/>
  <circle cx="100" cy="62" r="10" fill="#8a6d4f"/>
  <g stroke="#8a6d4f" stroke-width="4" stroke-linecap="round">
    <path d="M100 24v18M100 82v18M62 62h18M120 62h18M74 36l12 12M114 76l12 12M126 36l-12 12M86 76L74 88"/>
  </g>
  <ellipse cx="46" cy="78" rx="24" ry="20" fill="#6b5138"/>
  <circle cx="56" cy="62" r="12" fill="#7d5f42"/>
  <circle cx="60" cy="59" r="2" fill="#1d1408"/>
  <path d="M66 64c4 1 7 3 8 6" stroke="#1d1408" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="70" cy="66" rx="3.4" ry="2.2" fill="#e8a0a0"/>
</svg>`;

export default (config) => {
  const d = config.data;
  return `<section>
  <h2 class="ph-h2">${d.heading} <mark class="ph-mark-blue">${d.headingHighlight}</mark></h2>
  <div class="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
    <div class="min-w-0 text-[18px] leading-relaxed text-ph-sub">
      <p>${d.p1Lead} <em>${d.p1Italic}</em> ${d.p1Tail}</p>
      <p class="mt-5">${d.p2}</p>
      <ul class="mt-5 list-disc space-y-2 pl-6 marker:text-ph-mute">
        ${d.bullets.map((b) => `<li>${b}</li>`).join("\n        ")}
      </ul>
      <p class="mt-5">${d.p3}</p>
      <a href="#" class="mt-6 inline-block font-bold text-ph-ink underline underline-offset-4">${d.link}</a>
    </div>
    <aside class="ph-panel-card h-max rounded-md p-5">
      <p class="text-[15px] font-bold">${d.cardTitleLead} <mark class="ph-mark-blue">${d.cardTitleMark}</mark> ${d.cardTitleTail}</p>
      <ul class="mt-3 list-disc space-y-2 pl-5 text-[14.5px] text-ph-sub marker:text-ph-mute">
        ${d.cardItems.map((it) => `<li>${it}</li>`).join("\n        ")}
      </ul>
      <div class="mt-3 flex justify-end">${moleWheel}</div>
    </aside>
  </div>
</section>`;
};
