export default (config) => `<section class="ct-view ct-view-artists" data-view-panel="artists" hidden>
  <ul class="ct-role-rail" role="list">
    ${config.artists.roles.map((role, i) => `<li><button type="button" class="ct-role${i === 0 ? " is-active" : ""}" data-role="${role}"><span class="ct-role-marker" aria-hidden="true"></span>${role}</button></li>`).join("\n    ")}
  </ul>
  <div class="ct-artist-stage">
    ${config.artists.list.map((a, i) => `<article class="ct-artist${i === 0 ? " is-active" : ""}" data-role="${a.role}">
      <h2 class="ct-artist-name" style="--name-size:min(14.5vw, ${(125 / a.name.length).toFixed(1)}vw)">${a.name}</h2>
      <p class="ct-artist-role">${a.role}</p>
      <div class="ct-artist-portrait" style="--g:${a.gradient}" aria-hidden="true"></div>
    </article>`).join("\n    ")}
  </div>
</section>`;
