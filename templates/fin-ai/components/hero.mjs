export default (config) => {
  const hero = config.hero;
  const [g0, g1, g2] = config.theme.knotGradient;
  return `<!-- pinned hero; the page scrolls over it -->
<section class="fa-hero z-0 bg-fa-paper" aria-label="Hero">
  <div class="mx-auto grid h-full max-w-[1440px] grid-cols-12 gap-y-6 px-4 pt-10 lg:pt-12">
    <div class="col-span-12 lg:col-span-8 lg:col-start-2">
      <h1 class="fa-display max-w-[13ch]">${hero.heading}</h1>
      <div class="mt-8 flex gap-3">
        <a href="#" class="fa-btn fa-btn-dark">${hero.ctaDemo}</a>
        <a href="#" class="fa-btn fa-btn-line">${hero.ctaTry}</a>
      </div>
    </div>
    <div class="pointer-events-none absolute bottom-[-14%] right-[-14%] w-[88vw] max-w-[760px] lg:bottom-[-30%] lg:right-[-4%] lg:w-[46vw]" aria-hidden="true">
      <svg viewBox="0 0 600 600" class="h-auto w-full">
        <defs>
          <radialGradient id="fa-knot-g" gradientUnits="userSpaceOnUse" cx="210" cy="180" r="460">
            <stop offset="0" stop-color="${g0}"/>
            <stop offset="0.45" stop-color="${g1}"/>
            <stop offset="1" stop-color="${g2}"/>
          </radialGradient>
        </defs>
        <path d="M330 300 L392 52" fill="none" stroke="url(#fa-knot-g)" stroke-width="56" stroke-linecap="round"/>
        <g fill="none" stroke="url(#fa-knot-g)" stroke-width="58" stroke-linecap="round">
          <ellipse cx="300" cy="300" rx="205" ry="76"/>
          <ellipse cx="300" cy="300" rx="205" ry="76" transform="rotate(60 300 300)"/>
          <ellipse cx="300" cy="300" rx="205" ry="76" transform="rotate(120 300 300)"/>
        </g>
        <circle cx="300" cy="300" r="74" fill="url(#fa-knot-g)"/>
      </svg>
    </div>
  </div>
</section>
<div class="fa-hero-spacer mt-[var(--fa-head-h)]" aria-hidden="true"></div>`;
};
