export default (config) => `
<header class="fixed left-0 top-0 z-[60] w-full pt-5 lg:pt-10 flex items-start justify-center px-5 lg:px-10 pointer-events-none">
  <div class="mg-chrome flex flex-col items-center">
    <p class="mg-brand uppercase text-white tracking-[.25em] text-[15px] lg:text-[17px] whitespace-nowrap">${config.brand.name}</p>
    <p class="mg-brand-sub uppercase text-mg-mist/70 tracking-[.45em] text-[8px] lg:text-[9px] mt-1">${config.brand.sub}</p>
  </div>
  <button class="mg-burger pointer-events-auto absolute right-5 top-6 flex sm:hidden flex-col gap-[5px] p-2" data-mg-open="mobilenav" aria-label="Open menu">
    <span class="block w-6 h-px bg-mg-mist"></span>
    <span class="block w-6 h-px bg-mg-mist"></span>
  </button>
</header>
<nav class="mg-panel mg-mobilenav fixed inset-0 z-[70] bg-black/95 flex-col items-center justify-center gap-8 uppercase" data-mg-panel="mobilenav">
  <button class="absolute top-6 right-6 text-mg-mist text-[11px] tracking-[.3em] uppercase p-2" data-mg-close aria-label="Close menu">Close</button>
  <button class="mg-link text-[19px] tracking-[.3em] text-white/70" data-mg-open="index">Scores</button>
  <button class="mg-link text-[19px] tracking-[.3em] text-white/70" data-mg-open="about">Story</button>
  <button class="mg-link text-[19px] tracking-[.3em] text-white/70" data-mg-open="contact">Hello</button>
</nav>`;
