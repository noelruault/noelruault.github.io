const glyphs = {
  home: `<path d="M6 20 L20 8 L34 20 M10 17v14h20V17" fill="none"/>`,
  rocket: `<path d="M20 6c5 3 7 9 7 14l4 6-6-1c-1.5 2-3.5 3-5 3s-3.5-1-5-3l-6 1 4-6c0-5 2-11 7-14z" fill="none"/><circle cx="20" cy="16" r="3" fill="none"/>`,
  vault: `<ellipse cx="20" cy="10" rx="12" ry="4.5" fill="none"/><path d="M8 10v18c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5V10" fill="none"/><path d="M8 19c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5" fill="none"/>`,
  tag: `<path d="M6 18 L18 6h10v10L16 28z" fill="none"/><circle cx="23" cy="11" r="2.2" fill="none"/>`,
  book: `<path d="M8 8h10a4 4 0 0 1 4 4v18a4 4 0 0 0-4-4H8zM32 8H22a2 2 0 0 0-2 2" fill="none"/><path d="M32 8v18h-9" fill="none"/>`,
  screen: `<rect x="6" y="8" width="28" height="18" rx="2" fill="none"/><path d="M16 32h8M20 26v6M16 13l6 4.5-6 4.5z" fill="none"/>`,
  person: `<circle cx="20" cy="12" r="5" fill="none"/><path d="M9 32c1.6-6 5.8-9 11-9s9.4 3 11 9" fill="none"/>`,
  flag: `<path d="M10 6v28M10 8h18l-4 5 4 5H10" fill="none"/>`,
  scroll: `<path d="M12 6h16a3 3 0 0 1 3 3v2h-6M12 6a3 3 0 0 0-3 3v22a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V11M14 15h10M14 20h10M14 25h7" fill="none"/>`,
  folder: `<path d="M6 12a3 3 0 0 1 3-3h8l3 4h11a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z" fill="none"/>`,
  cart: `<path d="M6 8h4l4 16h14l4-12H12" fill="none"/><circle cx="16" cy="30" r="2.5" fill="none"/><circle cx="28" cy="30" r="2.5" fill="none"/>`,
  trash: `<path d="M10 12h20l-2 20a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2zM8 12h24M16 12V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3M16 17v12M20 17v12M24 17v12" fill="none"/>`,
};

const iconTile = (item) => `<a href="#" class="ph-desk-icon flex w-[76px] flex-col items-center gap-1.5" data-icon="${item.icon}">
  <span class="ph-desk-glyph flex h-11 w-11 items-center justify-center rounded-md">
    <svg width="40" height="40" viewBox="0 0 40 40" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${glyphs[item.icon]}</svg>
  </span>
  <span class="ph-desk-label text-center text-[12.5px] leading-tight">${item.label}</span>
</a>`;

export default (config) => {
  const d = config.desktopIcons;
  return `<div class="pointer-events-none fixed inset-y-14 inset-x-2 z-10 hidden justify-between md:flex" aria-hidden="false">
  <div class="pointer-events-auto flex flex-col items-center gap-5 pl-4 pt-3">
    ${d.left.map(iconTile).join("\n    ")}
  </div>
  <div class="pointer-events-auto flex flex-col items-center gap-5 pr-4 pt-3">
    ${d.right.map(iconTile).join("\n    ")}
  </div>
</div>`;
};
