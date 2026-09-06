import { br, grad, bittenBtn } from "./_shared.mjs";

export default (config) => {
  const g = config.generalPlan;
  return `<section class="lk-stage lk-light-alt" id="${g.anchor}">
  <div class="lk-pin">
    <div class="absolute inset-0" style="background:${grad(config.placeholders.plan, "135deg")}" aria-hidden="true"></div>
    <div class="relative px-4 lg:px-8 py-16 lg:py-20">
      <h2 class="lk-h2 text-lk-ink">${g.heading}</h2>
      <p class="text-lk-muted mt-4">${br(g.kicker)}</p>
    </div>
    <div class="lk-plan-open">
      <svg viewBox="0 0 48 48" class="lk-plan-icon" aria-hidden="true"><path d="M24 6l16 9v18l-16 9-16-9V15z M24 6v18m0 0l16-9M24 24L8 15" stroke="url(#lk-metal)" stroke-width="1.6" fill="none"/></svg>
      ${bittenBtn(g.ctaText, "lt", "#" + g.anchor, "lk-bitten--full")}
    </div>
  </div>
</section>`;
};
