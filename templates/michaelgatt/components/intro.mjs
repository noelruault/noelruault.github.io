const word = (w) => {
  const inner = w.echo
    ? `<span class="inline-block relative"><span class="opacity-20">${w.t}</span><span class="mg-echo absolute top-0 left-0 flex" aria-hidden="true">${[...w.t].map((c, i) => `<span class="inline-block" style="--ei:${i}">${c}</span>`).join("")}</span></span>`
    : `<span class="inline-block">${w.t}</span>`;
  return `<span class="mg-intro-word relative z-20" style="margin-left:${w.x};margin-top:${w.y};">${inner}</span>`;
};

export default (config) => `
<div class="mg-intro fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center overflow-hidden cursor-pointer" data-mg-intro>
  <p class="mg-intro-words uppercase text-mg-mist/80 tracking-[.15em] text-[11px] sm:text-[15px] flex flex-col items-center pointer-events-none">
    ${config.intro.words.map(word).join("\n    ")}
  </p>
  <button class="mg-enter-quiet absolute bottom-8 text-mg-mist text-[10px] sm:text-[12px] uppercase tracking-[.35em] whitespace-nowrap" data-mg-enter-quiet>${config.intro.enterQuiet}</button>
</div>`;
