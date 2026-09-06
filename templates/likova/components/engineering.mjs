import { glyph, grad, icon, numTag, squareBtn } from "./_shared.mjs";

const schematic = `<svg viewBox="0 0 320 320" class="lk-schematic" aria-hidden="true">
  <g stroke="url(#lk-metal)" stroke-width="1.4" fill="none">
    <rect x="90" y="40" width="140" height="240"/>
    <path d="M90 100h140M90 160h140M90 220h140M160 40v240"/>
    <circle cx="160" cy="130" r="26"/>
    <path d="M160 112v36M146 130h28"/>
    <path d="M60 70h30M60 190h30M230 100h30M230 250h30"/>
    <circle cx="52" cy="70" r="6"/><circle cx="52" cy="190" r="6"/>
    <circle cx="268" cy="100" r="6"/><circle cx="268" cy="250" r="6"/>
  </g>
</svg>`;

export default (config) => {
  const e = config.engineering;
  const first = e.features[0];
  const links = e.features
    .map(
      (f) => `<button class="lk-eng-link" type="button">
          ${squareBtn(icon.plus, "lk-sqbtn--ghost")}
          <span class="text-left text-sm">${f.link}</span>
        </button>`
    )
    .join("\n          ");
  return `<section class="relative" id="${e.anchor}">
  <div class="lk-pin lk-pin--media">
    <div class="absolute inset-0" style="background:${grad(config.placeholders.duskCity, "175deg")}" aria-hidden="true"></div>
  </div>
  <div class="relative bg-lk-navy">
    <div class="px-4 lg:px-8 pt-16 lg:pt-20 pb-12">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-10 lg:col-span-6 flex items-start justify-between">
          <h2 class="lk-h2">${e.heading}</h2>
          ${numTag(e.number)}
        </div>
      </div>
      <p class="text-lk-gray text-sm lg:text-right mt-12 lg:mt-16">${e.kicker}</p>
      <div class="grid grid-cols-12 gap-4 mt-14">
        <p class="col-span-12 lg:col-span-4 lg:col-start-4 lk-lead">${e.intro}</p>
      </div>
    </div>
    <div class="px-4 lg:px-8 pb-16 lg:pb-24">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-8 col-start-3 lg:col-span-4 lg:col-start-5">${schematic}</div>
      </div>
      <div class="grid grid-cols-12 gap-4 mt-10">
        <p class="col-span-12 lg:col-span-4 lg:col-start-7 text-sm text-lk-gray">${e.detail}</p>
      </div>
      <div class="grid grid-cols-12 gap-4 mt-16 lg:mt-24">
        <div class="col-span-12 lg:col-span-6">
          <div class="lk-eng-card">
            <p class="lk-lead">${first.title}</p>
            <div class="mt-auto pt-10">${glyph(first.icon, "lk-glyph lk-glyph--xl")}</div>
          </div>
        </div>
        <div class="hidden lg:grid col-span-6 grid-cols-2 gap-x-4 gap-y-8 content-start">
          ${links}
        </div>
      </div>
    </div>
  </div>
</section>`;
};
