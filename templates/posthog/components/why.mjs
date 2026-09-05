const moleBook = `<svg width="150" height="120" viewBox="0 0 150 120" aria-hidden="true">
  <ellipse cx="75" cy="104" rx="52" ry="8" fill="#00000012"/>
  <ellipse cx="70" cy="72" rx="34" ry="28" fill="#6b5138"/>
  <circle cx="84" cy="48" r="17" fill="#7d5f42"/>
  <circle cx="90" cy="44" r="2.4" fill="#1d1408"/>
  <circle cx="79" cy="45" r="2.4" fill="#1d1408"/>
  <circle cx="90" cy="44" r="5.5" fill="none" stroke="#1d1408" stroke-width="1.6"/>
  <circle cx="79" cy="45" r="5.5" fill="none" stroke="#1d1408" stroke-width="1.6"/>
  <path d="M84.5 44.6h.1" stroke="#1d1408" stroke-width="1.6"/>
  <ellipse cx="85" cy="55" rx="3.6" ry="2.4" fill="#e8a0a0"/>
  <path d="M44 84l24-8 24 8-24 6z" fill="#e9e2d4" stroke="#8a6d4f" stroke-width="2"/>
  <path d="M68 76v14" stroke="#8a6d4f" stroke-width="2"/>
</svg>`;

export default (config) => {
  const w = config.why;
  return `<section>
  <div class="flex items-end justify-between gap-4">
    <h2 class="ph-h2">${w.heading}</h2>
    <div class="hidden shrink-0 md:block">${moleBook}</div>
  </div>
  <p class="mt-5 text-[18px] leading-relaxed text-ph-sub">${w.intro}</p>
  <ul class="mt-5 max-w-[40em] list-disc space-y-3 pl-6 text-[18px] leading-relaxed text-ph-sub marker:text-ph-mute">
    ${w.bullets.map((b) => `<li><strong class="text-ph-ink">${b.lead}</strong> ${b.text} ${b.links.map((l) => `<a href="#" class="font-semibold underline underline-offset-2">${l}</a>`).join(" · ")}</li>`).join("\n    ")}
  </ul>
  <a href="#" class="mt-6 inline-block font-bold text-ph-ink underline underline-offset-4">${w.link}</a>
</section>`;
};
