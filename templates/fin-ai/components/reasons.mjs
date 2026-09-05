const play = `<span class="fa-btn fa-btn-dark pointer-events-none gap-2 !h-9 !px-4 text-[13px]">&#9654; Play</span>`;

const videoAside = (a) => `<aside class="col-span-12 mt-8 lg:col-span-3 lg:col-start-10 lg:mt-0">
        <div class="fa-reveal border-t border-fa-line pt-3">
          <p class="fa-label text-fa-mute">${a.label}</p>
          <p class="mt-2 text-[15px] text-fa-mute">${a.caption}</p>
          ${a.gradient ? `<div class="relative mt-4 flex aspect-video items-center justify-center rounded-md bg-gradient-to-br from-[${a.gradient[0]}] to-[${a.gradient[1]}]">
            ${play}
          </div>` : ""}
        </div>
      </aside>`;

const peachAside = (a) => `<aside class="col-span-12 mt-8 lg:col-span-3 lg:col-start-10 lg:mt-0">
        <div class="fa-reveal border-t border-[${a.borderColor}] pt-3">
          <p class="fa-label text-[${a.labelColor}]">${a.label}</p>
          <p class="mt-2 text-[15px] text-[${a.captionColor}]">${a.caption}</p>
        </div>
      </aside>`;

const body = (paras) => paras.map((p, i) => `<p class="fa-body fa-reveal mt-${i === 0 ? 6 : 4}">${p}</p>`).join("\n        ");

const headingCol = (item) => `<div class="col-span-12 mt-2 lg:col-span-6 lg:col-start-2 lg:mt-0">
        <h2 class="fa-h2 fa-reveal">${item.heading}</h2>
        ${body(item.body)}
      </div>`;

const article = (item, inner) => `<article id="${item.id}" class="mx-auto grid max-w-[1408px] grid-cols-12 gap-x-4 px-4 py-10 lg:py-16">
      <div class="fa-num col-span-12 lg:col-span-1 lg:text-right lg:pr-4">${item.num}</div>
      ${headingCol(item)}
      ${inner}
    </article>`;

const bgArticle = (item, inner) => `<article id="${item.id}" class="${item.bgGradient
  ? `bg-gradient-to-br from-[${item.bgGradient[0]}] via-[${item.bgGradient[1]}] to-[${item.bgGradient[2]}]`
  : item.bgClass}">
      <div class="mx-auto grid max-w-[1408px] grid-cols-12 gap-x-4 px-4 py-10 lg:py-16">
        <div class="fa-num col-span-12 lg:col-span-1 lg:text-right lg:pr-4">${item.num}</div>
        ${headingCol(item)}
        ${inner}
      </div>
    </article>`;

const layouts = {
  "chart-area": (item) => article(item, `${videoAside(item.aside)}
      <figure class="fa-notch relative col-span-12 mt-10 bg-fa-panel p-6 lg:col-span-8 lg:col-start-2">
        <svg viewBox="0 0 820 340" class="h-auto w-full" role="img" aria-label="${item.chart.ariaLabel}">
          <defs>
            <linearGradient id="fa-area-g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#fe6e00"/>
              <stop offset="1" stop-color="#fe6e00" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <g stroke="#cfccc2" stroke-dasharray="3 6">
            <path d="M56 40H780"/><path d="M56 75H780"/><path d="M56 110H780"/><path d="M56 145H780"/>
            <path d="M56 180H780"/><path d="M56 215H780"/><path d="M56 250H780"/><path d="M56 285H780"/>
          </g>
          <g fill="#6b6b64" font-family="ui-monospace,monospace" font-size="11" text-anchor="end">
            <text x="48" y="44">80%</text><text x="48" y="79">70%</text><text x="48" y="114">60%</text><text x="48" y="149">50%</text>
            <text x="48" y="184">40%</text><text x="48" y="219">30%</text><text x="48" y="254">20%</text><text x="48" y="289">10%</text>
          </g>
          <path d="M56 200 L120 178 L184 168 L248 152 L312 156 L376 130 L440 122 L504 112 L568 96 L632 78 L696 56 L744 48 L744 320 L56 320 Z" fill="url(#fa-area-g)"/>
          <path d="M56 200 L120 178 L184 168 L248 152 L312 156 L376 130 L440 122 L504 112 L568 96 L632 78 L696 56 L744 48" fill="none" stroke="#e04d00" stroke-width="2"/>
          <g fill="#6b6b64" font-family="ui-monospace,monospace" font-size="10">
            <text transform="rotate(-90 66 332)" x="66" y="332">MAY 23</text>
            <text transform="rotate(-90 152 332)" x="152" y="332">NOV 23</text>
            <text transform="rotate(-90 238 332)" x="238" y="332">MAY 24</text>
            <text transform="rotate(-90 324 332)" x="324" y="332">NOV 24</text>
            <text transform="rotate(-90 410 332)" x="410" y="332">MAY 25</text>
            <text transform="rotate(-90 496 332)" x="496" y="332">NOV 25</text>
            <text transform="rotate(-90 582 332)" x="582" y="332">MAY 26</text>
            <text transform="rotate(-90 668 332)" x="668" y="332">NOV 26</text>
          </g>
        </svg>
      </figure>`),

  "logo-words": (item) => article(item, `<div class="col-span-12 mt-10 lg:col-span-8 lg:col-start-2">
        <ul class="grid grid-cols-2 gap-x-6 gap-y-8 text-[22px] text-[#8a8a82] sm:grid-cols-4">
          ${item.items.map((l, i) => `<li class="fa-reveal ${l.class}" style="--i:${i}">${l.text}</li>`).join("\n          ")}
        </ul>
      </div>`),

  "stat-bars": (item) => bgArticle(item, `<div class="col-span-12 mt-10 grid gap-4 md:grid-cols-3 lg:col-span-10 lg:col-start-2">
          ${item.cards.map((c, i) => `<div class="fa-reveal bg-[#fffdf6]/80 p-5" style="--i:${i}">
            <p class="text-[19px] leading-snug"><span class="text-fa-ember">${c.statValue}</span> ${c.statLabel}</p>
            <div class="mt-6 flex h-36 items-end gap-3">
              ${c.bars.map((h, bi) => `<div class="fa-bar${bi === 0 ? " fa-bar-hot" : ""}" style="height:${h}%"></div>`).join("")}
            </div>
            <div class="fa-label mt-3 flex gap-3 text-[10px] text-fa-mute">${item.barLabels.map((l) => `<span>${l}</span>`).join("")}</div>
          </div>`).join("\n          ")}
        </div>`),

  "role-cards": (item) => article(item, `${videoAside(item.aside)}
      <div class="col-span-12 mt-10 grid gap-4 md:grid-cols-3 lg:col-span-8 lg:col-start-2">
        ${item.cards.map((c, i) => `<div class="fa-reveal fa-notch relative bg-fa-panel p-6" style="--i:${i}">
          <h3 class="fa-h3">${c.title}</h3>
          <p class="fa-body mt-3 text-[15px]">${c.body}</p>
        </div>`).join("\n        ")}
      </div>`),

  "counters": (item) => article(item, `<div class="col-span-12 mt-10 grid grid-cols-3 gap-4 lg:col-span-8 lg:col-start-2">
        ${item.counters.map((c, i) => `<div class="fa-reveal border-t border-fa-line pt-4" style="--i:${i}"><p class="fa-display !text-[clamp(2rem,4vw,3.6rem)]">${c.value}</p><p class="fa-label mt-2 text-fa-mute">${c.label}</p></div>`).join("\n        ")}
      </div>`),

  "dark-video": (item) => article(item, `${videoAside(item.aside)}
      <figure class="fa-reveal fa-notch relative col-span-12 mt-10 flex aspect-[16/7] items-center justify-center bg-gradient-to-br from-[${item.gradient[0]}] via-[${item.gradient[1]}] to-[${item.gradient[2]}] lg:col-span-8 lg:col-start-2">
        <span class="fa-btn fa-btn-dark pointer-events-none gap-2 border border-white/20">&#9654; Play</span>
      </figure>`),

  "icon-grid": (item) => article(item, `<div class="col-span-12 mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:col-span-8 lg:col-start-2">
        ${item.items.map((l, i) => `<div class="fa-reveal fa-label flex aspect-square items-center justify-center bg-fa-panel text-fa-mute" style="--i:${i}">${l.text}</div>`).join("\n        ")}
      </div>`),

  "chip-list": (item) => bgArticle(item, `${peachAside(item.aside)}
        <div class="col-span-12 mt-10 flex flex-wrap gap-3 lg:col-span-8 lg:col-start-2">
          ${item.items.map((l, i) => `<span class="fa-reveal fa-label rounded-full border border-[${item.aside.borderColor}] px-4 py-2 text-[${item.aside.captionColor}]" style="--i:${i}">${l.text}</span>`).join("\n          ")}
        </div>`),

  "logo-grid": (item) => article(item, `<div class="col-span-12 mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-8 lg:col-start-2">
        ${item.items.map((l, i) => `<div class="fa-reveal flex h-24 items-center justify-center bg-fa-panel text-[#75756d] ${l.class}" style="--i:${i}">${l.text}</div>`).join("\n        ")}
      </div>`),

  "kv-panel": (item) => article(item, `<div class="fa-reveal fa-notch relative col-span-12 mt-10 bg-fa-panel p-6 lg:col-span-8 lg:col-start-2">
        <div class="space-y-3">
          ${item.rows.map((r, i) => `<div class="flex items-center justify-between${i < item.rows.length - 1 ? " border-b border-fa-line pb-3" : ""}"><span class="text-[15px]">${r.label}</span><span class="fa-label text-fa-mute">${r.value}</span></div>`).join("\n          ")}
        </div>
      </div>`),

  "badge-grid": (item) => article(item, `<div class="col-span-12 mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-8 lg:col-start-2">
        ${item.items.map((l, i) => `<div class="fa-reveal fa-label flex h-20 items-center justify-center border border-fa-line text-fa-mute" style="--i:${i}">${l.text}</div>`).join("\n        ")}
      </div>`),

  "flywheel": (item) => article(item, `<figure class="fa-reveal fa-notch relative col-span-12 mt-10 flex justify-center bg-fa-panel p-8 lg:col-span-8 lg:col-start-2">
        <svg viewBox="0 0 360 300" class="h-auto w-full max-w-[420px]" role="img" aria-label="${item.chart.ariaLabel}">
          <circle cx="180" cy="150" r="95" fill="none" stroke="#c9c7bf" stroke-dasharray="4 7"/>
          <path d="M180 55 A95 95 0 0 1 262 197" fill="none" stroke="#fe6e00" stroke-width="3"/>
          <path d="M262 197 l14 -6 M262 197 l0 -16" stroke="#fe6e00" stroke-width="3" fill="none"/>
          <text x="180" y="30" text-anchor="middle" font-family="ui-monospace,monospace" font-size="12" fill="#5f5f5a">${item.chart.resolveLabel}</text>
          <text x="320" y="220" text-anchor="middle" font-family="ui-monospace,monospace" font-size="12" fill="#5f5f5a">${item.chart.learnLabel}</text>
          <text x="48" y="220" text-anchor="middle" font-family="ui-monospace,monospace" font-size="12" fill="#5f5f5a">${item.chart.improveLabel}</text>
          <circle cx="180" cy="150" r="34" fill="#fe6e00"/>
        </svg>
      </figure>`),

  "doc-panel": (item) => article(item, `${videoAside(item.aside)}
      <div class="fa-reveal fa-notch relative col-span-12 mt-10 bg-fa-panel p-6 lg:col-span-8 lg:col-start-2">
        <div class="space-y-3">
          ${item.rows.map((r, i) => `<div class="flex items-center gap-3${i < item.rows.length - 1 ? " border-b border-fa-line pb-3" : ""}"><span class="fa-label text-fa-mute">${r.tag}</span><span class="text-[15px]">${r.text}</span><span class="fa-label ml-auto ${r.status === "In review" ? "text-fa-ember" : "text-fa-mute"}">${r.status}</span></div>`).join("\n          ")}
        </div>
      </div>`),

  "sim-panel": (item) => article(item, `<div class="fa-reveal fa-notch relative col-span-12 mt-10 bg-fa-panel p-6 lg:col-span-8 lg:col-start-2">
        <div class="fa-label mb-4 text-fa-mute">${item.label}</div>
        <div class="flex flex-wrap gap-2">
          ${item.chips.map((c) => `<span class="fa-label rounded-sm px-3 py-2" style="background:${c.bg};color:${c.color}">${c.text}</span>`).join("\n          ")}
        </div>
      </div>`),

  "chart-line": (item) => article(item, `<figure class="fa-reveal fa-notch relative col-span-12 mt-10 bg-fa-panel p-6 lg:col-span-8 lg:col-start-2">
        <svg viewBox="0 0 820 240" class="h-auto w-full" role="img" aria-label="${item.chart.ariaLabel}">
          <g stroke="#cfccc2" stroke-dasharray="3 6"><path d="M40 40H780"/><path d="M40 100H780"/><path d="M40 160H780"/></g>
          <path d="M40 190 C180 170 280 150 380 120 S620 80 780 52" fill="none" stroke="#e04d00" stroke-width="2.5"/>
          <path d="M40 205 C200 200 320 185 460 168 S660 140 780 128" fill="none" stroke="#9b968a" stroke-width="2" stroke-dasharray="6 5"/>
          <text x="40" y="228" font-family="ui-monospace,monospace" font-size="11" fill="${item.chart.legend1Color}">${item.chart.legend1}</text>
          <text x="120" y="228" font-family="ui-monospace,monospace" font-size="11" fill="${item.chart.legend2Color}">${item.chart.legend2}</text>
        </svg>
      </figure>`),

  "note-cards": (item) => article(item, `${videoAside(item.aside)}
      <div class="col-span-12 mt-10 grid gap-4 md:grid-cols-2 lg:col-span-8 lg:col-start-2">
        ${item.cards.map((c, i) => `<div class="fa-reveal fa-notch relative bg-fa-panel p-6" style="--i:${i}">
          <p class="fa-label text-fa-mute">${c.label}</p>
          <p class="fa-body mt-3">${c.body}</p>
        </div>`).join("\n        ")}
      </div>`),

  "steps": (item) => {
    const inner = `<div class="col-span-12 mt-10 ${item.gridClass} lg:col-span-8 lg:col-start-2">
          ${item.steps.map((s, i) => `<div class="fa-reveal ${item.stepBorderClass} pt-3" style="--i:${i}"><p class="fa-label ${item.stepLabelClass}">${s.label}</p><p class="mt-2 text-[15px]">${s.text}</p></div>`).join("\n          ")}
        </div>`;
    return item.bgClass ? bgArticle(item, inner) : article(item, inner);
  },

  "link-cards": (item) => article(item, `<div class="col-span-12 mt-10 grid gap-4 md:grid-cols-2 lg:col-span-8 lg:col-start-2">
        ${item.cards.map((c, i) => `<a href="#" class="fa-reveal fa-notch relative block bg-fa-panel p-6" style="--i:${i}">
          <p class="fa-label text-fa-mute">${c.tag}</p>
          <p class="fa-h3 mt-3">${c.title}</p>
          <p class="fa-label mt-4 text-fa-mute">${item.readMoreLabel}</p>
        </a>`).join("\n        ")}
      </div>`),

  "event-thumbs": (item) => article(item, `${videoAside(item.aside)}
      <div class="col-span-12 mt-10 grid gap-4 sm:grid-cols-3 lg:col-span-8 lg:col-start-2">
        ${item.thumbs.map((t, i) => `<div class="fa-reveal" style="--i:${i}"><div class="aspect-[16/10] rounded-sm bg-gradient-to-br from-[${t.gradient[0]}] to-[${t.gradient[1]}]"></div><p class="fa-label mt-3 text-fa-mute">${t.label}</p></div>`).join("\n        ")}
      </div>`),

  "pricing": (item) => article(item, `<div class="col-span-12 mt-10 grid gap-3 sm:grid-cols-2 lg:col-span-8 lg:col-start-2">
        <div class="fa-reveal fa-notch relative bg-fa-panel p-6" style="--i:0">
          <p class="fa-label text-fa-mute">${item.highlighted.label}</p>
          <p class="fa-display mt-3 !text-[2.6rem]">${item.highlighted.price}</p>
          <p class="fa-body mt-1 text-[15px]">${item.highlighted.note}</p>
        </div>
        <div class="fa-reveal border border-fa-line p-6" style="--i:1">
          <p class="fa-label text-fa-mute">${item.baseline.label}</p>
          <p class="fa-display mt-3 !text-[2.6rem] text-fa-mute">${item.baseline.price}</p>
          <p class="fa-body mt-1 text-[15px] text-fa-mute">${item.baseline.note}</p>
        </div>
      </div>`),

  "finale": (item) => article(item, `<figure class="fa-reveal fa-notch relative col-span-12 mt-10 flex aspect-[16/7] items-end bg-gradient-to-br from-[${item.gradient[0]}] via-[${item.gradient[1]}] to-[${item.gradient[2]}] p-8 lg:col-span-8 lg:col-start-2">
        <p class="fa-display max-w-[16ch] !text-[clamp(1.8rem,3.4vw,3rem)] text-white">${item.figureText}</p>
      </figure>`),
};

const testimonial = (t) => `<figure class="fa-notch relative mx-auto grid max-w-[1408px] grid-cols-1 gap-6 bg-gradient-to-br from-white to-fa-cream p-8 md:min-h-[320px] md:grid-cols-[1fr_220px] md:p-10">
      <blockquote class="fa-reveal self-center text-[20px] leading-snug md:text-[24px]">
        <p>${t.pre}<mark class="bg-fa-orange px-1 text-fa-ink">${t.marked}</mark>${t.post}</p>
      </blockquote>
      <figcaption class="fa-reveal order-last self-end text-[14px] md:order-none md:self-end">
        <div class="mb-4 h-40 w-full rounded-sm bg-gradient-to-br from-[${t.gradient[0]}] to-[${t.gradient[1]}]" aria-hidden="true"></div>
        <p>${t.name}</p>
        <p class="text-fa-mute">${t.role}</p>
      </figcaption>
    </figure>`;

const marqueeThumb = (t) => `<div class="w-64 shrink-0"><div class="aspect-[16/10] rounded-sm bg-gradient-to-br from-[${t.gradient[0]}] to-[${t.gradient[1]}]"></div><p class="fa-label mt-2 text-fa-mute">${t.label}</p></div>`;

const marquee = (m) => `<section class="overflow-hidden py-8" aria-label="Event photo carousel">
      <div class="fa-marquee-track flex w-max gap-4">
        <div class="flex gap-4">
          ${m.thumbs.map(marqueeThumb).join("\n          ")}
        </div>
        <div class="flex gap-4" aria-hidden="true">
          ${m.thumbs.map(marqueeThumb).join("\n          ")}
        </div>
      </div>
    </section>`;

export default (config) => {
  const r = config.reasons;
  const rendered = r.items.map((item) => {
    if (item.kind === "testimonial") return testimonial(item);
    if (item.kind === "marquee") return marquee(item);
    return layouts[item.layout](item);
  }).join("\n\n    ");

  return `<main class="relative z-10">

  <!-- intro to the numbered list -->
  <section class="bg-fa-paper px-4">
    <div class="mx-auto max-w-[1440px] px-4 pb-14 pt-24 lg:px-[8.333%]">
      <h2 class="fa-display fa-reveal max-w-[10ch] !text-[clamp(2.6rem,5vw,4.5rem)]">${r.introHeading}</h2>
    </div>
  </section>

  <!-- the white card that carries the reasons -->
  <div class="fa-notch relative mx-4 bg-white">

    ${rendered}

  </div>`;
};
