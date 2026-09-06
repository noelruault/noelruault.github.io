import { br, glyph, grad, numTag, pinGlyphs, barGroup, counter } from "./_shared.mjs";

const slideIcons = { plane: pinGlyphs.plane, car: "M5 13l1.5-5h11L19 13M4 13h16v5h-2.5M4 18h2.5M8 18h8M7 16h.01M17 16h.01", building: "M6 20V6h8v14M14 10h4v10M9 9h2M9 12h2M9 15h2" };

export default (config) => {
  const loc = config.location;
  const s = loc.slides[0];
  return `<section class="lk-stage lk-stage--tall" id="${loc.anchor}">
  <div class="lk-pin">
    <div class="absolute inset-0" style="background:${grad(config.placeholders.aerial, "200deg")}" aria-hidden="true"></div>
    <div class="relative pt-24 lg:pt-28 px-4 lg:px-8">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-11 lg:col-span-8 col-start-2 lg:col-start-5 flex items-start justify-between">
          ${numTag(loc.number)}
          <h2 class="lk-h2">${loc.heading}</h2>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-4 mt-14 lg:mt-20">
        <p class="col-span-12 lg:col-span-2 text-lk-gray text-sm">${br(loc.kicker)}</p>
      </div>
      <div class="grid grid-cols-12 gap-4 mt-8">
        <p class="col-span-12 lg:col-span-6 lk-lead">${loc.intro}</p>
      </div>
    </div>
    <div class="lk-loc-panel relative mx-4 lg:mx-8 mt-14 lg:mt-16 max-w-md">
      <p class="lk-lead">${br(s.title)}</p>
      <div class="my-6">${glyph(slideIcons[s.icon], "lk-glyph lk-glyph--lg")}</div>
      <p class="text-sm text-lk-gray">${s.text}</p>
      <div class="mt-8">${barGroup(loc.slides.length)}</div>
      ${counter(loc.slides.length)}
    </div>
  </div>
</section>`;
};
