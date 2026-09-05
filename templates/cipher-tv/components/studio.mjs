export default (config) => {
  const lines = config.studio.lines;
  const column = Array.from({ length: config.studio.columnCount }, () => config.studio.columnWord);
  return `<section class="ct-view ct-view-studio" data-view-panel="studio" hidden>
  <div class="ct-studio-block">
    <div class="ct-studio-lines">
      ${lines.map((l) => `<p>${l}</p>`).join("\n      ")}
    </div>
    <div class="ct-studio-column">
      ${column.map((w) => `<p>${w}</p>`).join("\n      ")}
    </div>
    <div class="ct-studio-lines">
      ${[...lines].reverse().map((l) => `<p>${l}</p>`).join("\n      ")}
    </div>
  </div>
  <span class="ct-studio-mark" aria-hidden="true">
    <svg width="22" height="22" viewBox="0 0 26 26" fill="none" stroke="currentColor"><circle cx="13" cy="13" r="11.5" stroke-width="1.4"/><path d="M17.5 9.5a6 6 0 1 0 0 7" stroke-width="1.6"/></svg>
  </span>
</section>`;
};
