const glyph = {
  bars: `<path d="M2 12V7M6 12V3M10 12V9"/>`,
  globe: `<circle cx="7" cy="7" r="5.5"/><path d="M1.5 7h11M7 1.5c-3.5 3-3.5 8 0 11 3.5-3 3.5-8 0-11z"/>`,
  play: `<circle cx="7" cy="7" r="5.5"/><path d="M5.7 4.8l3.4 2.2-3.4 2.2z"/>`,
  toggle: `<rect x="1" y="4" width="12" height="6" rx="3"/><circle cx="10" cy="7" r="2"/>`,
  flask: `<path d="M5 1.5h4M6 1.5v4L2.5 11a1.5 1.5 0 0 0 1.3 2.2h6.4a1.5 1.5 0 0 0 1.3-2.2L8 5.5v-4"/>`,
  bubble: `<path d="M2 2.5h10v7H7l-3 2.5V9.5H2z"/>`,
  warn: `<path d="M7 1.5L13 12H1zM7 5.5V9M7 10.5v.5"/>`,
  cylinder: `<ellipse cx="7" cy="3" rx="5" ry="2"/><path d="M2 3v8c0 1.1 2.2 2 5 2s5-.9 5-2V3"/>`,
  pipe: `<path d="M1 4h5l2 6h5M1 10h4M9 4h4"/>`,
  branch: `<circle cx="3" cy="3" r="1.8"/><circle cx="3" cy="11" r="1.8"/><circle cx="11" cy="7" r="1.8"/><path d="M3 5v4M4.8 3.6 9.3 6M4.8 10.4 9.3 8"/>`,
  lines: `<path d="M2 3h10M2 7h10M2 11h6"/>`,
  spark: `<path d="M7 1l1.4 4.1L13 6.5l-4.1 1.4L7 12l-1.4-4.1L1 6.5l4.6-1.4z"/>`,
  plug: `<path d="M4 1v4M10 1v4M2.5 5h9v2.5a4.5 4.5 0 0 1-9 0zM7 12v1.5"/>`,
  tray: `<path d="M1.5 8l2-5.5h7l2 5.5v3.5h-11zM1.5 8h3l1 1.8h3L9.5 8h3"/>`,
  route: `<circle cx="3" cy="11" r="1.8"/><circle cx="11" cy="3" r="1.8"/><path d="M4.5 10C8 9 6 5 9.5 4"/>`,
  grid: `<rect x="1.5" y="1.5" width="4.5" height="4.5"/><rect x="8" y="1.5" width="4.5" height="4.5"/><rect x="1.5" y="8" width="4.5" height="4.5"/><rect x="8" y="8" width="4.5" height="4.5"/>`,
  eye: `<path d="M1 7c2-3.5 4-5 6-5s4 1.5 6 5c-2 3.5-4 5-6 5s-4-1.5-6-5z"/><circle cx="7" cy="7" r="2"/>`,
  split: `<path d="M7 1v12M2 4h3M2 8h3M9 6h3M9 10h3"/>`,
};

const chip = (t) => `<span class="ph-tool-chip"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="${t.color}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${glyph[t.icon]}</svg>${t.name}</span>`;

export default (config) => {
  const t = config.tools;
  const run = t.items.map(chip).join("\n      ");
  return `<section class="flex items-center gap-4 overflow-hidden">
  <p class="shrink-0 text-[14px] font-semibold text-ph-sub">${t.label}</p>
  <div class="ph-marquee-clip relative min-w-0 flex-1 overflow-hidden" aria-label="${t.label}">
    <div class="ph-marquee flex w-max items-center gap-2">
      ${run}
      ${run}
    </div>
  </div>
</section>`;
};
