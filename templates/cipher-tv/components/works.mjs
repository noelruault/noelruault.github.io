// tileVars turns one work entry into the inline CSS custom properties that place its tile on the elliptical ring.
// The ring math itself lives in components.css (cos/sin of --a plus the shared --rot), so runtime rotation never duplicates it.
export function tileVars(work) {
  return `--a:${work.angle}deg;--fx:${work.fx};--fy:${work.fy};--w:${work.w};--ar:${work.ar};--g:${work.gradient}`;
}

export default (config) => `<section class="ct-view ct-view-projects" data-view-panel="projects">
  <div class="ct-cloud">
    ${config.works.map((w) => `<button type="button" class="ct-tile" style="${tileVars(w)}" data-index="${w.index}" data-title="${w.title}" data-duration="${w.duration}" data-gradient="${w.gradient}">
      <span class="sr-only">${w.title}, ${w.duration}</span>
    </button>`).join("\n    ")}
  </div>
  <footer class="ct-workbar" aria-hidden="true">
    <span class="ct-workbar-index"></span>
    <span class="ct-workbar-title"></span>
  </footer>
</section>`;
