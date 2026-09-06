export const br = (v) => (Array.isArray(v) ? v.join("<br>") : v);

export const grad = (stops, angle = "180deg") => `linear-gradient(${angle}, ${stops[0]}, ${stops[1]})`;

export const ph = (config, name, cls = "", angle = "180deg") =>
  `<div class="${cls}" style="background:${grad(config.placeholders[name], angle)}" aria-hidden="true"></div>`;

export const icon = {
  plus: `<svg class="lk-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v12M2 8h12" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
  minus: `<svg class="lk-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h12" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
  arrowDown: `<svg class="lk-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v11M3 9l5 5 5-5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
  arrowLeft: `<svg class="lk-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M14 8H3M7 3L2 8l5 5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
  arrowRight: `<svg class="lk-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
  heart: `<svg class="lk-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13.5C4.5 11 2 8.8 2 6.2 2 4.4 3.4 3 5.1 3 6.3 3 7.4 3.7 8 4.7 8.6 3.7 9.7 3 10.9 3 12.6 3 14 4.4 14 6.2c0 2.6-2.5 4.8-6 7.3z" stroke="currentColor" stroke-width="1.3" fill="none"/></svg>`,
};

export const glyph = (d, cls = "lk-glyph") =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}" stroke="url(#lk-metal)" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export const pinGlyphs = {
  park: "M12 4l5 8h-3l3 6H7l3-6H7z",
  sport: "M12 12m-7 0a7 7 0 1 0 14 0a7 7 0 1 0-14 0M12 5v14M5 12h14",
  food: "M7 4v7M5 4v4a2 2 0 0 0 4 0V4M16 4c-2 0-3 2-3 4h3v12",
  plane: "M3 13l18-8-6 9 6 2-4 4-3-5-6 4z",
  med: "M12 6v12M6 12h12",
  hotel: "M4 20h16M6 20V8h12v12M9 11h2M13 11h2M9 15h2M13 15h2",
};

export const numTag = (n) => `<span class="lk-numtag" aria-hidden="true">${n}</span>`;

export const bittenBtn = (text, corner = "rb", href = "#", extra = "") =>
  `<a href="${href}" class="lk-bitten lk-bitten--${corner} ${extra}"><span>${text}</span></a>`;

export const squareBtn = (inner, extra = "") =>
  `<span class="lk-sqbtn ${extra}">${inner}</span>`;

export const barGroup = (n, prefix = "lk") =>
  `<div class="flex gap-2">${Array.from({ length: n }, (_, i) =>
    `<span class="lk-bar"><span class="lk-bar__fill" style="width:${i === 0 ? "100%" : "0"}"></span></span>`
  ).join("")}</div>`;

export const counter = (total) =>
  `<div class="mt-4 flex items-center justify-between text-xs">
    <span>1</span>
    <span class="flex items-center gap-2 text-lk-gray"><span class="lk-slash" aria-hidden="true"></span><span>${total}</span></span>
  </div>`;
