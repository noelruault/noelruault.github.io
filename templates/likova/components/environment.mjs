import { br, grad, barGroup, counter } from "./_shared.mjs";

export default (config) => {
  const e = config.environment;
  return `<section class="lk-stage">
  <div class="lk-pin lg:px-8">
    <div class="absolute inset-0" style="background:${grad(config.placeholders.parks, "170deg")}" aria-hidden="true"></div>
    <div class="relative grid grid-cols-12 gap-4 items-center h-full px-4 lg:px-0">
      <div class="col-span-12 lg:col-span-6">
        <div class="lk-env-panel">
          <h2 class="text-sm text-lk-gray">${br(e.heading)}</h2>
          <div class="mt-auto pt-10">${barGroup(e.slides.length)}</div>
          ${counter(e.slides.length)}
        </div>
      </div>
      <div class="col-span-12 lg:col-span-4 lg:col-start-9">
        <p class="lk-lead">${e.slides[0]}</p>
      </div>
    </div>
  </div>
</section>`;
};
