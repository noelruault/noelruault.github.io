import { br, glyph, grad, numTag, pinGlyphs, barGroup, counter } from "./_shared.mjs";

const pinSpots = [
  [46, 58], [82, 55], [58, 70], [30, 78], [70, 86], [88, 72],
];

export default (config) => {
  const a = config.accessibility;
  const s = a.stats[0];
  const pins = a.pins
    .map((name, i) => {
      const [x, y] = pinSpots[i % pinSpots.length];
      return `<span class="lk-pin-btn" style="left:${x}%;top:${y}%">${glyph(pinGlyphs[name], "lk-glyph")}</span>`;
    })
    .join("\n      ");
  return `<section class="lk-stage lk-stage--tall lk-light">
  <div class="lk-pin">
    <div class="absolute inset-0" style="background:${grad(config.placeholders.map, "150deg")}" aria-hidden="true">
      ${pins}
    </div>
    <div class="relative px-4 lg:px-8 pt-24 lg:pt-28">
      <div class="flex items-start justify-between max-w-3xl">
        <h2 class="text-sm text-lk-muted">${br(a.kicker)}</h2>
        ${numTag(a.number)}
      </div>
      <p class="lk-statement max-w-4xl mt-8"><span class="lk-indent hidden lg:inline-block" aria-hidden="true"></span>${a.statement}</p>
    </div>
    <div class="lk-map-panel relative mx-4 lg:mx-8 mt-14 max-w-sm">
      <div class="flex items-end justify-between">
        <p class="lk-display">${s.value}</p>
        <p class="text-right text-xs">${s.unit}<br><span class="text-lk-muted">${s.mode}</span></p>
      </div>
      <p class="lk-lead mt-4">${s.label}</p>
      <div class="mt-8">${barGroup(a.stats.length)}</div>
      ${counter(a.stats.length)}
    </div>
  </div>
</section>`;
};
