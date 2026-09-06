import { br, grad, icon, numTag, squareBtn, bittenBtn } from "./_shared.mjs";

export default (config) => {
  const o = config.offices;
  return `<section class="lk-stage lk-stage--tall" id="offices">
  <div class="lk-pin">
    <div class="absolute inset-0" style="background:${grad(config.placeholders.officeCool, "190deg")}" aria-hidden="true"></div>
    <div class="relative pt-24 lg:pt-28 px-4 lg:px-8">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-10 lg:col-span-6 flex items-start justify-between">
          <h2 class="lk-h2">${o.heading}</h2>
          ${numTag(o.number)}
        </div>
      </div>
      <p class="text-lk-gray text-sm lg:text-right mt-12 lg:mt-16">${br(o.kicker)}</p>
      <div class="grid grid-cols-12 gap-4 mt-8">
        <p class="col-span-12 lg:col-span-4 lg:col-start-7 lk-lead">${o.intro}</p>
      </div>
    </div>
    <div class="lk-arch-slider relative mx-4 lg:mx-8 mt-14 max-w-lg">
      <span class="lk-arch-decor" aria-hidden="true"></span>
      <p class="lk-lead min-h-20">${o.slides[0]}</p>
      <div class="mt-8 flex items-end justify-between">
        <p class="flex items-center gap-2 text-xs"><span>1</span><span class="lk-slash" aria-hidden="true"></span><span class="text-lk-gray">${o.slides.length}</span></p>
        <div class="flex gap-2">
          ${squareBtn(icon.arrowLeft)}
          ${squareBtn(icon.arrowRight)}
        </div>
      </div>
    </div>
    <div class="lk-offices-cta">
      ${bittenBtn(o.ctaText, "lb", "#offices")}
    </div>
  </div>
</section>`;
};
