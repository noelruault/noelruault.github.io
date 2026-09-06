import { br, grad } from "./_shared.mjs";

const building = `<svg viewBox="0 0 1440 560" preserveAspectRatio="xMidYMax slice" class="lk-building" aria-hidden="true">
  <defs>
    <pattern id="lk-fins" width="14" height="560" patternUnits="userSpaceOnUse">
      <rect width="14" height="560" fill="#6e5c3b"/><rect x="10" width="4" height="560" fill="#c9ab72"/>
    </pattern>
  </defs>
  <rect x="180" y="220" width="300" height="340" fill="url(#lk-fins)"/>
  <rect x="480" y="120" width="360" height="440" fill="#3a3527"/>
  <rect x="500" y="140" width="320" height="420" fill="url(#lk-fins)"/>
  <rect x="840" y="180" width="280" height="380" fill="url(#lk-fins)"/>
  <rect x="1120" y="300" width="180" height="260" fill="#3a3527"/>
  <rect x="0" y="520" width="1440" height="40" fill="#1c1a12"/>
</svg>`;

const wordmark = (brand) => `<svg viewBox="0 0 340 34" class="lk-wordmark" aria-hidden="true">
  <text x="0" y="27" class="lk-wordmark__text">${brand.toUpperCase()}</text>
</svg>`;

export default (config) => {
  const i = config.intro;
  return `<section class="lk-stage lk-stage--tall lk-stage--intro">
  <div class="lk-pin">
    <div class="absolute inset-0" style="background:${grad(config.placeholders.sky)}" aria-hidden="true"></div>
    ${building}
    <h1 class="sr-only">${i.srTitle}</h1>
    <div class="lk-intro-head relative px-4 lg:px-8">
      <p class="lk-tagline pt-24 lg:hidden">${br(i.tagline)}</p>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-11 lg:col-span-6 relative">
          <div class="lk-bookmark--intro">
            ${wordmark(config.brand)}
            <a href="${i.scrollHref}" class="lk-roundbtn" aria-label="Scroll down">
              <svg viewBox="0 0 16 16" class="lk-icon" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
            </a>
          </div>
          <span class="lk-ghost-a" aria-hidden="true">${i.classValue}</span>
        </div>
      </div>
      <div class="hidden lg:grid grid-cols-12 gap-4 mt-16">
        <p class="lk-tagline col-span-3 col-start-9">${br(i.tagline)}</p>
      </div>
    </div>
    <div class="lk-intro-foot relative px-4 lg:px-8">
      <p class="max-w-md text-sm lg:text-base">${i.lede}</p>
      <p class="mt-8 text-xs uppercase tracking-widest">${i.classLabel}<span class="sr-only"> ${i.classValue}</span></p>
    </div>
  </div>
</section>`;
};
