export default (config) => `<a href="#projects" class="ct-logo" data-view-link="projects" aria-label="${config.nav.homeAria}">${config.brandDisplay}</a>
<nav class="ct-nav" aria-label="Main">
  <span></span>
  <span class="text-center"><a href="#projects" data-view-link="projects" class="ct-nav-link">${config.nav.homeLabel}</a></span>
  <span class="ct-nav-right">
    ${config.nav.right.map((item) =>
      item.view === "contact"
        ? `<button type="button" class="ct-nav-link ct-contact-toggle">${item.label}</button>`
        : `<a href="#${item.view}" data-view-link="${item.view}" class="ct-nav-link">${item.label}</a>`
    ).join("\n    ")}
  </span>
</nav>`;
