import { br, grad, icon, numTag, squareBtn } from "./_shared.mjs";

export default (config) => {
  const a = config.architecture;
  return `<section class="lk-stage lk-stage--tall" id="${a.anchor}">
  <div class="lk-pin">
    <div class="absolute inset-0" style="background:${grad(config.placeholders.facade, "195deg")}" aria-hidden="true"></div>
    <div class="relative pt-24 lg:pt-28 px-4 lg:px-8">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-10 lg:col-span-8 flex items-start justify-between">
          <h2 class="lk-h2">${a.heading}</h2>
          ${numTag(a.number)}
        </div>
      </div>
      <p class="text-lk-gray text-sm lg:text-right mt-12 lg:mt-16">${br(a.kicker)}</p>
      <div class="grid grid-cols-12 gap-4 mt-8">
        <p class="col-span-11 lg:col-span-4 lg:col-start-7 lk-lead">${a.intro}</p>
      </div>
    </div>
    <div class="lk-arch-slider relative mx-4 lg:mx-8 mt-14 max-w-lg">
      <span class="lk-arch-decor" aria-hidden="true"></span>
      <p class="lk-lead min-h-20">${a.slides[0]}</p>
      <div class="mt-8 flex items-end justify-between">
        <p class="flex items-center gap-2 text-xs"><span>1</span><span class="lk-slash" aria-hidden="true"></span><span class="text-lk-gray">${a.slides.length}</span></p>
        <div class="flex gap-2">
          ${squareBtn(icon.arrowLeft)}
          ${squareBtn(icon.arrowRight)}
        </div>
      </div>
    </div>
    <div class="lk-architect">
      <a href="#${a.anchor}" class="lk-architect__card">
        <p class="lk-lead">${a.architect.name}<br class="hidden lg:inline"><span class="text-lk-muted">${a.architect.role}</span></p>
        <div class="lk-architect__photo" style="background:${grad(config.placeholders.teamCard)}" aria-hidden="true"></div>
        <div class="flex items-center gap-3 mt-6">
          <p class="text-xs">${br(a.architect.buttonLabel)}</p>
          ${squareBtn(icon.plus)}
        </div>
      </a>
    </div>
  </div>
</section>`;
};
