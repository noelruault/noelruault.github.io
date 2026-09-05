const item = (w) =>
  w.open
    ? `<button class="mg-link mg-menu-word uppercase text-[17px] sm:text-[19px] text-white/60 hover:text-white/90 transition-colors duration-500 tracking-[.3em]" data-mg-open="${w.open}">${w.t}</button>`
    : `<span class="mg-menu-word uppercase text-[10px] sm:text-[11px] text-white/60 tracking-[.35em]">${w.t}</span>`;

export default (config) => `
<nav class="mg-chrome mg-menu fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden sm:flex flex-col items-center gap-2 text-center whitespace-nowrap" aria-label="Sections">
  <div class="flex items-baseline gap-3">${config.menu.line1.map(item).join("")}</div>
  <div class="flex items-baseline gap-3">${config.menu.line2.map(item).join("")}</div>
</nav>`;
