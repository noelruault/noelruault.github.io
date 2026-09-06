import { br, grad, icon, numTag, squareBtn } from "./_shared.mjs";

export default (config) => {
  const l = config.lobby;
  const decor = Array.from({ length: l.decorTiles }, (_, i) =>
    `<div class="lk-decor-tile" style="background:${grad(config.placeholders.lobbyWarm, `${140 + i * 10}deg`)}" aria-hidden="true"></div>`
  ).join("\n            ");
  const cards = l.cards
    .map(
      (c) => `<div class="lk-stat-card">
          <p>${br(c.label)}</p>
          <p class="lk-display text-right text-lk-ink">${c.value}</p>
        </div>`
    )
    .join("\n        ");
  const gallery = Array.from({ length: l.gallery }, (_, i) =>
    `<li class="lk-gallery-item" style="background:${grad(config.placeholders.lobbyWarm, `${160 + i * 25}deg`)}">
          ${squareBtn(icon.plus, "lk-sqbtn--overlay hidden lg:inline-flex")}
        </li>`
  ).join("\n        ");
  return `<section class="lk-stage lk-stage--lobby" id="lobby">
  <div class="lk-pin lk-pin--media">
    <div class="absolute inset-0" style="background:${grad(config.placeholders.lobbyWarm, "185deg")}" aria-hidden="true"></div>
  </div>
  <div class="lk-light relative">
    <div class="px-4 lg:px-8 pt-16 lg:pt-20 pb-6">
      <div class="grid grid-cols-12 gap-4 mb-16 lg:mb-24">
        <div class="col-span-9 lg:col-span-6 lg:col-start-7 flex items-start justify-end gap-6">
          <h2 class="lk-h2 text-right text-lk-ink">${l.heading}</h2>
          ${numTag(l.number)}
        </div>
      </div>
      <p class="text-lk-muted">${br(l.kicker)}</p>
      <div class="grid grid-cols-12 gap-4 mt-14">
        <p class="col-span-12 lg:col-span-4 lg:col-start-7 lk-lead">${l.intro}</p>
      </div>
    </div>
    <div class="px-4 lg:px-8 py-12 lg:pb-20">
      <div class="grid grid-cols-12 gap-4 mb-12">
        <div class="col-span-12 lg:col-span-8 lg:col-start-3">
          <div class="lk-decor-strip">
            ${decor}
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-4">
        <p class="col-span-9 col-start-4 lg:col-span-12 lg:col-start-1 lk-statement text-lk-ink"><span class="lk-indent hidden lg:inline-block" aria-hidden="true"></span>${l.statement}</p>
      </div>
      <div class="grid grid-cols-12 gap-4 mt-12 lg:mt-16 items-end">
        <div class="col-span-12 lg:col-span-4 lg:col-start-3 lk-lobby-image" style="background:${grad(config.placeholders.lobbyWarm, "205deg")}" aria-hidden="true"></div>
        <p class="col-span-12 lg:col-span-3 lg:col-start-9 mt-6 lg:mt-0 text-lk-muted text-sm">${l.detail}</p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-12 lg:mt-24">
        ${cards}
      </div>
      <ul class="lk-gallery mt-16 lg:mt-20">
        ${gallery}
      </ul>
    </div>
  </div>
</section>`;
};
