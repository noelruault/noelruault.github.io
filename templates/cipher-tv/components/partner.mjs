const arrow = `<svg viewBox="0 0 8 8" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M1 7 7 1M2.2 1H7v4.8"/></svg>`;

export default (config) => `<a href="#" class="ct-partner" aria-label="${config.partner.aria}">
  <span class="ct-partner-word">${config.partner.label}</span>
  <span class="ct-partner-arrow" aria-hidden="true"><span class="ct-arrow-rel">${arrow}</span><span class="ct-arrow-abs">${arrow}</span></span>
</a>`;
