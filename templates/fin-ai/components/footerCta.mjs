export default (config) => {
  const cta = config.footerCta;
  const [g0, g1, g2] = config.theme.knotGradient;
  return `<!-- footer CTA: centered reprise of the hero -->
  <section class="relative overflow-hidden bg-fa-paper px-4 py-24 text-center">
    <div class="pointer-events-none absolute left-1/2 top-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 opacity-90 sm:w-[380px]" aria-hidden="true">
      <svg viewBox="0 0 600 600" class="h-auto w-full">
        <g fill="none" stroke="url(#fa-knot-g2)" stroke-width="58" stroke-linecap="round">
          <defs>
            <radialGradient id="fa-knot-g2" gradientUnits="userSpaceOnUse" cx="210" cy="180" r="460">
              <stop offset="0" stop-color="${g0}"/>
              <stop offset="0.45" stop-color="${g1}"/>
              <stop offset="1" stop-color="${g2}"/>
            </radialGradient>
          </defs>
          <ellipse cx="300" cy="300" rx="205" ry="76"/>
          <ellipse cx="300" cy="300" rx="205" ry="76" transform="rotate(60 300 300)"/>
          <ellipse cx="300" cy="300" rx="205" ry="76" transform="rotate(120 300 300)"/>
        </g>
        <circle cx="300" cy="300" r="74" fill="url(#fa-knot-g2)"/>
      </svg>
    </div>
    <h2 class="fa-display fa-reveal relative mx-auto max-w-[14ch]">${cta.heading}</h2>
    <div class="fa-reveal relative mt-10 flex justify-center gap-3">
      <a href="#" class="fa-btn fa-btn-dark">${cta.ctaDemo}</a>
      <a href="#" class="fa-btn fa-btn-line">${cta.ctaTry}</a>
    </div>
  </section>`;
};
