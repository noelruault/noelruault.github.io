import { br, grad, icon } from "./_shared.mjs";

const building = `<svg viewBox="0 0 1440 560" preserveAspectRatio="xMidYMax slice" class="lk-building" aria-hidden="true">
  <defs>
    <pattern id="lk-fins" width="14" height="560" patternUnits="userSpaceOnUse">
      <rect width="14" height="560" fill="#141a33"/><rect x="10" width="4" height="560" fill="#2c3352"/>
    </pattern>
  </defs>
  <rect x="180" y="220" width="300" height="340" fill="url(#lk-fins)"/>
  <rect x="480" y="120" width="360" height="440" fill="#10152c"/>
  <rect x="500" y="140" width="320" height="420" fill="url(#lk-fins)"/>
  <rect x="840" y="180" width="280" height="380" fill="url(#lk-fins)"/>
  <rect x="1120" y="300" width="180" height="260" fill="#141a33"/>
  <rect x="0" y="520" width="1440" height="40" fill="#0b1026"/>
</svg>`;

export default (config) => {
  const i = config.intro;
  return `<section class="lk-stage lk-stage--intro">
  <div class="lk-pin">
    <div class="absolute inset-0" style="background:${grad(config.placeholders.sky)}" aria-hidden="true"></div>
    ${building}
    <h1 class="sr-only">${i.srTitle}</h1>
    <div class="lk-intro-head relative px-4 lg:px-8">
      <p class="lk-lead pt-24 lg:hidden">${br(i.tagline)}</p>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-10 lg:col-span-6">
          <div class="lk-bookmark lk-bookmark--intro">
            <a href="${i.scrollHref}" class="lk-sqbtn" aria-label="Scroll down">${icon.arrowDown}</a>
          </div>
        </div>
      </div>
      <div class="hidden lg:grid grid-cols-12 gap-4 mt-10">
        <p class="lk-lead col-span-3 col-start-9">${br(i.tagline)}</p>
      </div>
    </div>
    <div class="lk-intro-foot relative px-4 lg:px-8">
      <p class="max-w-md text-sm lg:text-base text-lk-gray">${i.lede}</p>
      <div class="mt-8 lg:mt-10">
        <p class="text-xs uppercase tracking-widest mb-4">${i.classLabel}<span class="sr-only"> ${i.classValue}</span></p>
        <svg viewBox="0 0 60 64" class="lk-class-icon" aria-hidden="true"><path d="M30 4L56 60H44L30 28 16 60H4z" fill="url(#lk-metal)"/></svg>
      </div>
    </div>
  </div>
</section>`;
};
