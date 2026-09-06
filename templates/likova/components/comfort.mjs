import { glyph } from "./_shared.mjs";

const icons = {
  service: "M6 12a6 6 0 0 1 12 0v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM9 12v-2a3 3 0 0 1 6 0v2",
  help: "M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M12 16h.01M10 9.5a2 2 0 1 1 3 1.7c-.8.5-1 1-1 1.8",
};

export default (config) => {
  const c = config.comfort;
  const cards = c.cards
    .map(
      (card, i) => `<div class="lk-comfort-card lk-comfort-card--${i + 1}">
        <p class="lk-lead ${i === 1 ? "text-right ml-auto" : ""}">${card.title}</p>
        <div class="my-auto py-8">${glyph(icons[card.icon], "lk-glyph lk-glyph--xl")}</div>
        <p class="text-sm text-lk-gray max-w-md">${card.text}</p>
      </div>`
    )
    .join("\n      ");
  return `<section class="lk-light-alt relative">
  <div class="px-4 lg:px-8 pt-20 lg:pt-16 pb-16 lg:pb-24">
    <h2 class="sr-only">${c.srTitle}</h2>
    <p class="lk-statement text-lk-ink max-w-5xl">${c.statement}</p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-16 lg:mt-24">
      ${cards}
    </div>
  </div>
</section>`;
};
