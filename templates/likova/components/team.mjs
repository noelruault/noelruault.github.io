import { grad, icon, numTag, squareBtn } from "./_shared.mjs";

export default (config) => {
  const t = config.team;
  const cards = t.cards
    .map(
      (c, i) => `<div class="lk-team-card">
        <p class="lk-lead">${c.title}</p>
        <div class="lk-team-card__image" style="background:${grad(config.placeholders.teamCard, `${170 + i * 20}deg`)}" aria-hidden="true"></div>
        <div class="lk-team-card__text">
          <hr class="lk-hr mb-6">
          <p class="text-sm text-lk-gray">${c.text}</p>
        </div>
        ${squareBtn(icon.plus, "lk-sqbtn--ghost lk-team-card__plus")}
      </div>`
    )
    .join("\n      ");
  return `<section class="lk-light relative" id="${t.anchor}">
  <div class="px-4 lg:px-8">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-11 lg:col-span-6">
        <div class="lk-bookmark lk-bookmark--team flex items-start justify-between">
          <h2 class="lk-h2 text-lk-ink">${t.heading}</h2>
          ${numTag(t.number)}
        </div>
      </div>
    </div>
  </div>
  <div class="px-4 lg:px-8 pt-12 lg:pt-16 pb-24">
    <p class="text-lk-muted lg:text-right">${t.kicker}</p>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 lg:mt-12">
      ${cards}
    </div>
  </div>
</section>`;
};
