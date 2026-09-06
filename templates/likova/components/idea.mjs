import { br, grad, numTag } from "./_shared.mjs";

export default (config) => {
  const d = config.idea;
  return `<section class="relative bg-lk-navy" id="${d.anchor}">
  <div class="px-4 lg:px-8">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-9 lg:col-span-6">
        <div class="lk-bookmark lk-bookmark--idea flex items-end justify-between">
          <h2 class="lk-kicker">${br(d.heading)}</h2>
          ${numTag(d.number)}
        </div>
      </div>
    </div>
  </div>
  <div class="px-4 lg:px-8 pt-16 lg:pt-24 pb-20 lg:pb-28 bg-lk-navy relative">
    <p class="lk-statement max-w-5xl"><span class="lk-indent hidden lg:inline-block" aria-hidden="true"></span>${d.statement}</p>
    <div class="grid grid-cols-12 gap-4 mt-16 lg:mt-24">
      <div class="col-span-12 lg:col-span-6 lg:col-start-4">
        <div class="lk-cube" style="background:${grad(config.placeholders.cube, "160deg")}" aria-hidden="true"></div>
      </div>
    </div>
  </div>
</section>`;
};
