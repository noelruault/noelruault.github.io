const caret = `<svg width="9" height="6" viewBox="0 0 9 6" fill="none" stroke="currentColor" aria-hidden="true"><path d="M1 1l3.5 3.5L8 1"/></svg>`;

const navGroup = (group) => `<li class="fa-menu"><button type="button" class="flex items-center gap-1 py-2">${group.label} ${caret}</button>
          <div>${group.links.map((l) => `<a href="${l.href}">${l.text}</a>`).join("")}</div>
        </li>`;

export default (config) => {
  const h = config.header;
  return `<!-- fixed announcement + nav -->
<header class="fa-header fixed inset-x-0 top-0 z-50">
  <div class="fa-announce bg-fa-cream text-[13px]">
    <div class="relative mx-auto flex max-w-[1440px] items-center justify-center gap-2 px-10 py-2">
      <span class="hidden sm:inline">${h.announceDesktop}</span>
      <span class="sm:hidden">${h.announceMobile}</span>
      <a href="#" class="underline underline-offset-2">${h.announceCta}</a>
      <button type="button" class="fa-announce-close absolute right-3 top-1/2 -translate-y-1/2 p-1" aria-label="Dismiss announcement">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1l10 10M11 1L1 11"/></svg>
      </button>
    </div>
  </div>
  <div class="bg-fa-paper">
    <nav class="mx-auto flex h-[60px] max-w-[1440px] items-center gap-6 px-4" aria-label="Main">
      <a href="#" class="flex items-center gap-2" aria-label="${config.brand} home">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true">
          <circle cx="4" cy="4" r="2.6"/><circle cx="13" cy="4" r="2.6"/><circle cx="22" cy="4" r="2.6"/>
          <circle cx="4" cy="13" r="2.6"/><circle cx="13" cy="13" r="2.6"/><circle cx="22" cy="13" r="2.6"/>
          <circle cx="4" cy="22" r="2.6"/><circle cx="13" cy="22" r="2.6"/>
        </svg>
        <span class="font-fa-serif text-[22px] tracking-tight">${config.brand}</span>
      </a>
      <ul class="hidden items-center gap-5 text-[14px] lg:flex">
        ${h.navGroups.map(navGroup).join("\n        ")}
        <li><a href="${h.pricingLink.href}" class="py-2">${h.pricingLink.text}</a></li>
      </ul>
      <div class="ml-auto flex items-center gap-4 text-[14px]">
        <a href="#" class="hidden lg:inline">${h.loginText}</a>
        <a href="#" class="hidden lg:inline">${h.salesText}</a>
        <a href="#" class="hidden lg:inline">${h.tryText}</a>
        <a href="#" class="fa-btn fa-btn-dark">${h.demoText}</a>
        <span class="hidden h-6 w-px bg-fa-line lg:inline-block" aria-hidden="true"></span>
        <a href="#" class="fa-btn fa-btn-line hidden sm:inline-flex">${h.harborText}</a>
        <button type="button" class="fa-burger p-2 lg:hidden" aria-label="Open menu" aria-expanded="false">
          <svg width="20" height="14" viewBox="0 0 20 14" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M0 1h20M0 7h20M0 13h20"/></svg>
        </button>
      </div>
    </nav>
    <div class="fa-mobile-panel border-t border-fa-line bg-fa-paper px-6 pb-6 pt-2 lg:hidden">
      <ul class="space-y-3 text-[15px]">
        ${h.mobileNav.map((l) => `<li><a href="${l.href}">${l.text}</a></li>`).join("\n        ")}
        <li class="pt-2"><a href="#" class="underline underline-offset-2">${h.loginText}</a></li>
      </ul>
    </div>
  </div>
</header>`;
};
