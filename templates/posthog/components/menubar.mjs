const logoMark = `<svg width="26" height="22" viewBox="0 0 26 22" aria-hidden="true"><path d="M2 20 L12 4 L16 11 L19 6 L24 20 Z" fill="currentColor"/><circle cx="12" cy="4" r="2.4" fill="#f54e00"/></svg>`;

const icon = {
  search: `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="7" cy="7" r="5"/><path d="M11 11l4.2 4.2"/></svg>`,
  help: `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="1" y="1" width="15" height="15" rx="3"/><path d="M6.4 6.2a2.1 2.1 0 1 1 2.7 2c-.6.2-.9.6-.9 1.2v.4"/><circle cx="8.3" cy="12" r=".9" fill="currentColor" stroke="none"/></svg>`,
  account: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="9" cy="9" r="7.5"/><circle cx="9" cy="7" r="2.6"/><path d="M3.8 14.6c1-2.2 2.9-3.3 5.2-3.3s4.2 1.1 5.2 3.3"/></svg>`,
  caret: `<svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg>`,
};

export default (config) => {
  const m = config.menubar;
  return `<header class="ph-menubar fixed inset-x-2 top-2 z-40 flex h-10 items-center gap-1 rounded-md px-2">
  <a href="#" class="flex items-center gap-1 px-2 text-ph-ink" aria-label="${config.brand} home">${logoMark}</a>
  <nav class="hidden items-center md:flex" aria-label="Main">
    ${m.menus.map((label) => `<button type="button" class="ph-menu-item rounded px-2.5 py-1 text-[14px]">${label}</button>`).join("\n    ")}
  </nav>
  <button type="button" class="ph-mobile-menu-btn flex items-center gap-1 rounded px-1.5 py-1 md:hidden" aria-label="${m.mobileMenuLabel}" aria-expanded="false">${icon.caret}</button>
  <div class="ph-mobile-menu absolute left-2 top-11 z-50 hidden w-48 rounded-md p-1 md:hidden">
    ${m.menus.map((label) => `<a href="#" class="block rounded px-3 py-1.5 text-[14px]">${label}</a>`).join("\n    ")}
  </div>
  <div class="ml-auto flex items-center gap-2">
    <a href="#" class="ph-btn-amber rounded-md px-3 py-1 text-[14px] font-bold">${m.cta}</a>
    <button type="button" class="p-1.5" aria-label="${m.searchLabel}">${icon.search}</button>
    <button type="button" class="hidden p-1.5 sm:block" aria-label="${m.helpLabel}">${icon.help}</button>
    <button type="button" class="p-1.5" aria-label="${m.accountLabel}">${icon.account}</button>
  </div>
</header>`;
};
