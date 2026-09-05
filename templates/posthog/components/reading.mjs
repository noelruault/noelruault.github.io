const moleAsleep = `<svg width="190" height="120" viewBox="0 0 190 120" aria-hidden="true">
  <ellipse cx="95" cy="104" rx="70" ry="9" fill="#00000012"/>
  <path d="M30 96c0-20 18-32 44-32h50c14 0 24 8 24 20v12z" fill="#efe9dc" stroke="#d9d2c2" stroke-width="2"/>
  <ellipse cx="55" cy="70" rx="26" ry="20" fill="#6b5138"/>
  <circle cx="42" cy="58" r="13" fill="#7d5f42"/>
  <path d="M34 57c2-1.6 5-1.6 7 0M44 55c2-1.6 5-1.6 7 0" stroke="#1d1408" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <ellipse cx="36" cy="65" rx="3.2" ry="2.2" fill="#e8a0a0"/>
  <rect x="88" y="70" width="34" height="22" rx="2.5" fill="#cfe3f7" stroke="#8fa8c8" stroke-width="2"/>
  <path d="M84 92h42l4 6H80z" fill="#e3e3de" stroke="#b9b9b2" stroke-width="1.6"/>
  <text x="128" y="42" font-size="17" font-weight="700" fill="#6b5138">z</text>
  <text x="138" y="30" font-size="22" font-weight="700" fill="#6b5138">Z</text>
</svg>`;

export default (config) => {
  const r = config.reading;
  return `<section>
  <div class="flex items-end justify-between gap-4">
    <h2 class="ph-h2">${r.heading}</h2>
    <div class="hidden shrink-0 md:block">${moleAsleep}</div>
  </div>
  <p class="mt-5 text-[18px] leading-relaxed text-ph-sub">${r.intro}</p>
  <ul class="mt-5 list-disc space-y-2.5 pl-6 text-[18px] marker:text-ph-mute">
    ${r.links.map((l) => `<li><a href="#" class="font-semibold underline underline-offset-2">${l}</a></li>`).join("\n    ")}
  </ul>
</section>`;
};
