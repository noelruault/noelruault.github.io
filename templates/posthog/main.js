(() => {
  const doc = document;

  const tabs = Array.from(doc.querySelectorAll(".ph-tab"));
  const panels = Array.from(doc.querySelectorAll(".ph-tab-panel"));
  let current = 0;
  const show = (i) => {
    current = i;
    tabs.forEach((t, j) => {
      t.classList.toggle("ph-tab-active", j === i);
      t.setAttribute("aria-selected", String(j === i));
    });
    panels.forEach((p, j) => p.classList.toggle("hidden", j !== i));
  };
  let auto = setInterval(() => show((current + 1) % tabs.length), 6000);
  tabs.forEach((t, i) =>
    t.addEventListener("click", () => {
      clearInterval(auto);
      auto = null;
      show(i);
    })
  );
  if (matchMedia("(prefers-reduced-motion: reduce)").matches && auto) clearInterval(auto);

  doc.querySelectorAll(".ph-copy-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      if (navigator.clipboard) navigator.clipboard.writeText(btn.dataset.command).catch(() => {});
    })
  );

  const closeBtn = doc.querySelector(".ph-win-close");
  if (closeBtn) closeBtn.addEventListener("click", () => doc.body.classList.add("ph-window-closed"));
  const maxBtn = doc.querySelector(".ph-win-max");
  if (maxBtn) maxBtn.addEventListener("click", () => doc.body.classList.toggle("ph-window-max"));
  doc.querySelectorAll('.ph-desk-icon[data-icon="home"]').forEach((icon) =>
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      doc.body.classList.remove("ph-window-closed");
    })
  );

  const swap = doc.querySelector(".ph-logo-swap");
  if (swap) swap.addEventListener("click", () => doc.querySelector(".ph-logo-panes").classList.toggle("ph-logos-swapped"));

  doc.querySelectorAll(".ph-toast-close").forEach((btn) =>
    btn.addEventListener("click", () => btn.closest(".ph-toast").remove())
  );

  const menuBtn = doc.querySelector(".ph-mobile-menu-btn");
  const menu = doc.querySelector(".ph-mobile-menu");
  if (menuBtn && menu)
    menuBtn.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
})();
