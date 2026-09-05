const glyph = {
  bars: `<path d="M2 12V7M6 12V3M10 12V9"/>`,
  play: `<circle cx="7" cy="7" r="5.5"/><path d="M5.7 4.8l3.4 2.2-3.4 2.2z"/>`,
  toggle: `<rect x="1" y="4" width="12" height="6" rx="3"/><circle cx="10" cy="7" r="2"/>`,
  cylinder: `<ellipse cx="7" cy="3" rx="5" ry="2"/><path d="M2 3v8c0 1.1 2.2 2 5 2s5-.9 5-2V3"/>`,
};

const van = `<svg width="130" height="80" viewBox="0 0 130 80" aria-hidden="true">
  <rect x="14" y="26" width="86" height="30" rx="8" fill="#79a25c"/>
  <path d="M100 34h14l8 12v10h-22z" fill="#6a9350"/>
  <rect x="104" y="37" width="10" height="8" rx="2" fill="#cfe3f7"/>
  <rect x="22" y="32" width="14" height="9" rx="2" fill="#cfe3f7"/>
  <rect x="42" y="32" width="14" height="9" rx="2" fill="#cfe3f7"/>
  <circle cx="36" cy="60" r="9" fill="#2b2b26"/><circle cx="36" cy="60" r="4" fill="#8d8d8d"/>
  <circle cx="102" cy="60" r="9" fill="#2b2b26"/><circle cx="102" cy="60" r="4" fill="#8d8d8d"/>
</svg>`;

export default (config) => {
  const p = config.pricing;
  return `<section>
  <div class="flex items-end justify-between gap-4">
    <h2 class="ph-h2">${p.heading}</h2>
    <div class="hidden shrink-0 md:block">${van}</div>
  </div>
  <div class="mt-5 max-w-[38em] space-y-5 text-[18px] leading-relaxed text-ph-sub">
    <p>${p.p1}</p>
    <p>${p.p2}</p>
    <p>${p.p3}</p>
    <p>${p.p4}</p>
  </div>
  <div class="mt-6 overflow-x-auto">
    <table class="ph-table w-full min-w-[560px] text-left text-[15px]">
      <thead>
        <tr>
          <th class="w-10"></th>
          <th>${p.colProduct}</th>
          <th>${p.colFree}</th>
          <th>${p.colPrice}</th>
        </tr>
      </thead>
      <tbody>
        ${p.rows.map((r, i) => `<tr>
          <td class="text-ph-mute">${i + 1}</td>
          <td><a href="#" class="inline-flex items-center gap-1.5 font-semibold underline underline-offset-2"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="${r.color}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${glyph[r.icon]}</svg>${r.product}</a></td>
          <td>${r.free}</td>
          <td>${r.price}</td>
        </tr>`).join("\n        ")}
      </tbody>
    </table>
  </div>
  <a href="#" class="mt-6 inline-block font-bold text-ph-ink underline underline-offset-4">${p.link}</a>
</section>`;
};
