import { icon } from "./_shared.mjs";

export default (config) => {
  const h = config.header;
  return `<header class="lk-header" id="top">
  <div class="lk-header__inner grid grid-cols-12 items-center gap-4 px-4 lg:px-8">
    <a href="#menu" class="col-span-2 lg:col-span-1 flex items-center gap-2 lk-link" aria-label="${h.menuLabel}">
      <span class="lk-burger" aria-hidden="true"></span>
    </a>
    <a href="#top" class="col-span-6 lg:col-span-7 lk-logo" aria-label="${config.brand}">
      <svg viewBox="0 0 220 24" class="lk-logo__mark" aria-hidden="true">
        <path d="M4 20V4l6 9 6-9v16" stroke="currentColor" stroke-width="2.4" fill="none"/>
        <text x="26" y="19" class="lk-logo__text">${config.brand.toUpperCase()}</text>
      </svg>
    </a>
    <a href="#offices" class="hidden lg:block lg:col-span-2 lk-link text-xs uppercase tracking-widest">${h.selectorText}</a>
    <a href="#top" class="hidden lg:flex lg:col-span-1 items-center gap-1.5 lk-link text-xs">${icon.heart}<span>${h.favouritesCount}</span></a>
    <a href="#contact" class="col-span-4 lg:col-span-1 text-right lk-link text-xs uppercase tracking-widest">${h.contactText}</a>
  </div>
</header>`;
};
