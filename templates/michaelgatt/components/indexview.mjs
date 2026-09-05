export default (config) => `
<section class="mg-panel mg-index fixed inset-0 z-40 bg-black" data-mg-panel="index" aria-label="Project list">
  <button class="mg-idx-back absolute left-5 top-6 lg:left-10 lg:top-10 z-10 text-left uppercase text-mg-mist" data-mg-close>
    <span class="block text-[11px] tracking-[.2em]">&larr; ${config.indexview.back.split(" ")[0]}</span>
    <span class="block text-[8px] tracking-[.3em] mt-1 text-mg-mist/70">${config.indexview.back.split(" ").slice(1).join(" ")}</span>
  </button>
  <div class="mg-panel-scroll h-full overflow-y-auto">
    <ol class="min-h-full flex flex-col items-center justify-center gap-3 sm:gap-4 py-28 px-5">
      ${config.projects
        .map(
          (p) => `<li class="flex items-baseline gap-4 sm:gap-6">
        <span class="text-[9px] sm:text-[12px] tracking-[.3em] text-mg-smoke">${p.num}</span>
        <button class="mg-idx-title mg-link uppercase text-white/50 hover:text-white transition-colors duration-500 tracking-[.22em] text-[16px] sm:text-[26px] lg:text-[30px] text-left" data-kind="${p.k}">${p.t}</button>
      </li>`
        )
        .join("\n      ")}
    </ol>
  </div>
</section>`;
