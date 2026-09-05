const orbitMark = `<svg class="ct-mark-orbit" width="46" height="26" viewBox="0 0 46 26" fill="none" stroke="currentColor" aria-hidden="true">
  <ellipse cx="23" cy="13" rx="21" ry="9" stroke-width="1.4"/>
  <ellipse cx="25" cy="13" rx="14" ry="8" stroke-width="1.2"/>
  <ellipse cx="27" cy="13" rx="8" ry="7" stroke-width="1"/>
  <circle cx="30" cy="13" r="3.4" fill="currentColor" stroke="none"/>
</svg>`;

const ringMark = `<svg class="ct-mark-ring" width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" aria-hidden="true">
  <circle cx="13" cy="13" r="11.5" stroke-width="1.4"/>
  <path d="M17.5 9.5a6 6 0 1 0 0 7" stroke-width="1.6"/>
</svg>`;

export default () => `<div class="ct-emblem" aria-hidden="true">
  ${orbitMark}
  ${ringMark}
</div>`;
