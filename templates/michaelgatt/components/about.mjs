const mixed = (words) =>
  words
    .map(
      (w) =>
        `${w.break ? '<span class="mg-br" aria-hidden="true"></span>' : ""}<span class="${w.s === "lg" ? "mg-w-lg text-white" : "mg-w-sm text-mg-off"} mx-1 sm:mx-2">${w.t}</span>`
    )
    .join("");

const magicWord = (w, i) => {
  const inner = w.hollow
    ? `<span class="mg-hollow relative inline-block"><span class="opacity-25">${w.t}</span><span class="absolute top-0 left-0 flex text-white" aria-hidden="true">${[...w.t].map((c) => `<span class="inline-block">${c === " " ? "&nbsp;" : c}</span>`).join("")}</span></span>`
    : w.t;
  return `<span class="inline-block relative whitespace-nowrap" style="margin-top:${i}em;margin-left:${w.x};">${inner}</span>`;
};

export default (config) => `
<section class="mg-panel mg-about fixed inset-0 z-40 bg-black" data-mg-panel="about" aria-label="About">
  <button class="mg-idx-back absolute left-5 top-6 lg:left-10 lg:top-10 z-20 text-left uppercase text-mg-mist" data-mg-close>
    <span class="block text-[11px] tracking-[.2em]">&larr; ${config.about.back.split(" ")[0]}</span>
    <span class="block text-[8px] tracking-[.3em] mt-1 text-mg-mist/70">${config.about.back.split(" ").slice(1).join(" ")}</span>
  </button>

  <div class="mg-rail absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 z-20 hidden md:block" data-mg-rail>
    ${config.about.rail
      .map(
        (t) => `<div class="mg-rail-item relative h-14">
      <span class="absolute right-0 top-1/2 block w-2 h-px bg-white"></span>
      <span class="mg-rail-title absolute right-6 top-1/2 -translate-y-1/2 text-white/60 uppercase text-[10px] tracking-[.2em] whitespace-nowrap transition duration-500 opacity-0 translate-x-2">${t}</span>
    </div>`
      )
      .join("\n    ")}
    <div class="mg-rail-cursor absolute h-14 w-5 -right-[6px] top-0 border border-white/60 transition-transform duration-500 ease-in-out"></div>
  </div>

  <div class="mg-panel-scroll h-full overflow-y-auto" data-mg-about-scroll>
    <section class="mg-about-sec min-h-full flex items-center justify-center px-6">
      <h2 class="uppercase text-center tracking-[.12em]">${mixed(config.about.text1)}</h2>
    </section>
    <section class="mg-about-sec min-h-full flex items-center justify-center px-6">
      <h2 class="uppercase text-center tracking-[.12em]">${mixed(config.about.text2)}</h2>
    </section>
    <section class="mg-about-sec min-h-full flex items-center justify-center px-6">
      <p class="mg-magic flex uppercase text-white text-[13px] sm:text-[17px] tracking-[.1em]">
        ${config.about.magic.map(magicWord).join("\n        ")}
      </p>
    </section>
    <section class="mg-about-sec min-h-full flex flex-col items-center justify-center gap-10 px-6">
      <div class="mg-wipe w-[72vw] sm:w-[46vw] aspect-video" data-mg-wipe>
        <div class="w-full h-full" style="background:linear-gradient(150deg,#101c30,#2a1440 55%,#040710);"></div>
      </div>
      <p class="text-mg-off/80 text-center uppercase text-[10px] sm:text-[12px] tracking-[.3em] max-w-[34em] leading-relaxed">${config.about.closing}</p>
    </section>
  </div>
</section>`;
