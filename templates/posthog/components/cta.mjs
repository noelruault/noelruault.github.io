const retroBox = (c) => `<svg width="270" height="250" viewBox="0 0 270 250" aria-hidden="true" class="mx-auto">
  <g transform="rotate(-4 120 120)">
    <path d="M40 40 L170 24 L196 52 L196 196 L66 212 L40 184 Z" fill="#e8e6df" stroke="#b9b6ab" stroke-width="2"/>
    <path d="M40 40 L170 24 L196 52 L66 68 Z" fill="#f4f3ee" stroke="#b9b6ab" stroke-width="2"/>
    <path d="M66 68 L196 52 L196 196 L66 212 Z" fill="#dddace" stroke="#b9b6ab" stroke-width="2"/>
    <rect x="80" y="86" width="100" height="100" transform="rotate(-7 130 136)" fill="#2b2b26"/>
    <rect x="90" y="96" width="80" height="60" transform="rotate(-7 130 126)" fill="#8fb06d"/>
    <text x="84" y="182" transform="rotate(-7 130 176)" font-size="20" font-weight="800" fill="#f4f3ee">${c.boxTitle}</text>
    <text x="84" y="198" transform="rotate(-7 130 190)" font-size="7.5" fill="#cfccc0">${c.boxTag}</text>
  </g>
  <circle cx="212" cy="176" r="52" fill="#efeee9" stroke="#b9b6ab" stroke-width="2"/>
  <circle cx="212" cy="176" r="44" fill="#dcdad0"/>
  <circle cx="212" cy="176" r="13" fill="#f6f5f1" stroke="#b9b6ab" stroke-width="2"/>
  <text x="184" y="146" font-size="10" font-weight="700" fill="#55534b">${c.boxBrand}</text>
</svg>`;

const burst = (c) => `<div class="ph-burst" aria-hidden="true"><span>${c.burst.join("<br>")}</span></div>`;

const ribbon = (c) => `<div class="ph-ribbon" aria-hidden="true">
  <p class="text-[15px] font-extrabold leading-none">${c.ribbon}</p>
  <p class="mt-1 text-[8.5px] leading-tight">${c.ribbonSub}</p>
</div>`;

export default (config) => {
  const c = config.cta;
  return `<section>
  <h2 class="ph-h2">${c.heading}</h2>
  <p class="mt-4 text-[18px] leading-relaxed text-ph-sub">${c.sub}</p>
  <div class="ph-card mt-6 rounded-md p-5 sm:p-8">
    <div class="grid items-start gap-8 md:grid-cols-[1fr_1.1fr]">
      <div class="relative">
        ${retroBox(c)}
        ${burst(c)}
        ${ribbon(c)}
      </div>
      <div>
        <span class="ph-eco-pill">✿ ${c.ecoPill}</span>
        <h3 class="mt-3 text-[34px] font-extrabold leading-tight tracking-tight">${c.product}</h3>
        <p class="text-[14px] text-ph-sub">${c.productSub}</p>
        <p class="mt-5 text-[16px] font-bold">${c.cloudLabel}</p>
        <div class="mt-2 flex gap-2" role="group" aria-label="${c.cloudLabel}">
          ${c.clouds.map((cl, i) => `<button type="button" class="ph-cloud-btn${i === 0 ? " ph-cloud-active" : ""} rounded border px-4 py-2 text-[15px] font-semibold">${cl}</button>`).join("\n          ")}
        </div>
        <p class="mt-5 text-[16px] font-bold">${c.startsAt}</p>
        <p class="mt-1 text-[24px] font-extrabold"><s class="text-ph-sub">${c.strike}</s> <span class="text-ph-red uppercase">${c.free}</span> <span class="ml-1 align-middle text-[13px] font-semibold text-ph-sub">${c.scarcity}</span></p>
        <a href="#" class="ph-btn-amber ph-btn-big mt-5 inline-block rounded-lg px-10 py-3 text-center text-[19px] font-bold">${c.button}</a>
        <p class="mt-5 flex items-start gap-2 text-[14.5px] leading-snug text-ph-sub"><svg class="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M1 11l4.5-4.5 3 3L14 4M14 4h-4M14 4v4"/></svg><span><strong class="text-ph-ink">${c.hurryLead}</strong> ${c.hurryCount} ${c.hurryMid} <span class="text-ph-red font-semibold">${c.hurryToday}</span>. ${c.hurryTail}</span></p>
      </div>
    </div>
    <p class="mt-6 text-center text-[12.5px] italic text-ph-mute">${c.footnote}</p>
  </div>
  <p class="ph-counter mt-10 font-ph-mono" aria-label="Visitor counter">${c.counter}</p>
</section>`;
};
