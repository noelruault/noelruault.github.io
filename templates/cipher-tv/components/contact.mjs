export const BLOB = { width: 640, height: 460, cell: 10, rx: 250, ry: 155, tilt: -28 };

// ditherRects rasterizes a tilted ellipse onto a coarse cell grid with a noisy edge band.
// It must be DETERMINISTIC for a given seed: build re-renders index.html at gate time and any nondeterminism here would trip the render-drift check.
export function ditherRects(seed) {
  let state = seed >>> 0;
  const rand = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
  const { width, height, cell, rx, ry, tilt } = BLOB;
  const cx = width / 2;
  const cy = height / 2;
  const rad = (tilt * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const rects = [];
  for (let y = 0; y < height; y += cell) {
    for (let x = 0; x < width; x += cell) {
      const dx = x + cell / 2 - cx;
      const dy = y + cell / 2 - cy;
      const u = (dx * cos + dy * sin) / rx;
      const v = (-dx * sin + dy * cos) / ry;
      const d = Math.sqrt(u * u + v * v);
      if (d < 0.8 || (d < 1.22 && rand() > (d - 0.8) / 0.42)) {
        rects.push({ x, y, s: cell });
      }
    }
  }
  return rects;
}

export default (config) => {
  const rects = ditherRects(config.contact.blobSeed);
  return `<div class="ct-contact" hidden>
  <button type="button" class="ct-contact-close"><span class="ct-role-marker" aria-hidden="true"></span>${config.contact.closeLabel}</button>
  <svg class="ct-contact-blob" viewBox="0 0 ${BLOB.width} ${BLOB.height}" aria-hidden="true">
    ${rects.map((r) => `<rect x="${r.x}" y="${r.y}" width="${r.s}" height="${r.s}"/>`).join("")}
  </svg>
  <div class="ct-contact-row">
    ${config.contact.columns.map((col) => `<div class="ct-contact-col">${col.lines.map((l) => `<p>${l}</p>`).join("")}</div>`).join("\n    ")}
  </div>
</div>`;
};
