import { br, glyph, grad, numTag } from "./_shared.mjs";

export default (config) => {
  const inf = config.infrastructure;
  const cards = inf.cards
    .map(
      (c, i) => `<div class="grid grid-cols-12 gap-4 mt-4">
        <div class="col-span-8 lg:col-span-4 ${i % 2 ? "col-start-5 lg:col-start-9" : ""}">
          <div class="lk-amenity-card">
            <p class="${i % 2 ? "text-right ml-auto" : ""}">${br(c.label)}</p>
            <div class="mt-auto pt-8">${glyph(c.icon, "lk-glyph lk-glyph--lg")}</div>
          </div>
        </div>
      </div>`
    )
    .join("\n      ");
  const gallery = Array.from({ length: inf.gallery }, (_, i) =>
    `<li class="lk-gallery-item" style="background:${grad(config.placeholders.court, `${150 + i * 30}deg`)}"></li>`
  ).join("\n        ");
  return `<section class="relative" id="${inf.anchor}">
  <div class="lk-pin lk-pin--media">
    <div class="absolute inset-0" style="background:${grad(config.placeholders.court, "185deg")}" aria-hidden="true"></div>
  </div>
  <div class="relative bg-lk-navy">
    <div class="lk-light px-4 lg:px-8 pt-16 lg:pt-20 pb-12">
      <div class="flex items-start justify-between max-w-2xl">
        <h2 class="lk-h2 text-lk-ink">${inf.heading}</h2>
        ${numTag(inf.number)}
      </div>
      <p class="text-lk-muted text-sm lg:text-right mt-12">${br(inf.kicker)}</p>
      <div class="grid grid-cols-12 gap-4 mt-8">
        <p class="col-span-12 lg:col-span-4 lg:col-start-7 lk-lead text-lk-ink">${inf.intro}</p>
      </div>
    </div>
    <div class="px-4 lg:px-8 py-14">
      ${cards}
    </div>
    <div class="px-4 lg:px-8 pb-16 lg:pb-24">
      <div class="grid grid-cols-12 gap-4">
        <p class="col-span-12 lg:col-span-3 lg:col-start-9 lk-lead">${inf.note}</p>
      </div>
      <div class="grid grid-cols-12 gap-4 mt-12">
        <p class="col-span-12 lg:col-span-4 text-sm text-lk-gray">${inf.courtText}</p>
      </div>
      <ul class="lk-gallery mt-10">
        ${gallery}
      </ul>
    </div>
  </div>
</section>`;
};
