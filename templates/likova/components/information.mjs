import { barGroup } from "./_shared.mjs";

export default (config) => {
  const info = config.information;
  const first = info.stats[0];
  const rows = info.stats
    .map(
      (s, i) => `<div class="${i === 0 ? "" : "hidden"}">
          <p class="lk-lead text-lk-gray">${s.key}</p>
        </div>`
    )
    .join("\n        ");
  const values = info.stats
    .map(
      (s, i) => `<div class="${i === 0 ? "" : "hidden"} text-right">
          ${s.prefix ? `<p class="lk-lead text-lk-gray mb-4">${s.prefix}</p>` : ""}
          <p class="lk-display">${s.value}</p>
        </div>`
    )
    .join("\n        ");
  return `<section class="relative bg-lk-navy">
  <h2 class="sr-only">${info.srTitle}</h2>
  <div class="lk-pin lk-pin--info px-4 lg:px-8 py-16 lg:py-0 lg:flex lg:flex-col lg:justify-center">
    <div class="lg:hidden">
      <p class="lk-lead text-lk-gray">${first.key}</p>
      <p class="lk-display text-right mt-10">${first.value}</p>
      <div class="mt-10">${barGroup(info.stats.length)}</div>
    </div>
    <div class="hidden lg:block">
      <div class="mb-6 max-w-xs">${barGroup(info.stats.length)}</div>
      <div class="grid grid-cols-2 gap-4 items-end">
        <div>
        ${rows}
        </div>
        <div>
        ${values}
        </div>
      </div>
    </div>
  </div>
</section>`;
};
