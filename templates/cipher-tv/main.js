(() => {
  const doc = document;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- view router (projects / artists / studio) ---
  const panels = Array.from(doc.querySelectorAll("[data-view-panel]"));
  const links = Array.from(doc.querySelectorAll("[data-view-link]"));
  const workView = doc.querySelector(".ct-work-view");
  const contact = doc.querySelector(".ct-contact");

  const show = (view) => {
    if (!panels.some((p) => p.dataset.viewPanel === view)) view = "projects";
    panels.forEach((p) => (p.hidden = p.dataset.viewPanel !== view));
    links.forEach((l) => l.classList.toggle("is-active", l.dataset.viewLink === view && l.classList.contains("ct-nav-link")));
    doc.body.dataset.view = view;
    workView.hidden = true;
  };

  links.forEach((l) =>
    l.addEventListener("click", (e) => {
      e.preventDefault();
      history.replaceState(null, "", `#${l.dataset.viewLink}`);
      show(l.dataset.viewLink);
      setContact(false);
    })
  );
  addEventListener("hashchange", () => show(location.hash.slice(1)));
  if (location.hash) show(location.hash.slice(1));

  // --- contact overlay ---
  const setContact = (open) => {
    contact.hidden = !open;
    doc.body.classList.toggle("ct-contact-open", open);
  };
  doc.querySelector(".ct-contact-toggle").addEventListener("click", () => setContact(true));
  doc.querySelector(".ct-contact-close").addEventListener("click", () => setContact(false));

  // --- projects cloud: wheel rotation + mouse parallax, one lerp loop ---
  const cloud = doc.querySelector(".ct-cloud");
  let rotTarget = 0, rot = 0, parXT = 0, parYT = 0, parX = 0, parY = 0, rafId = 0;

  const settle = () =>
    Math.abs(rotTarget - rot) < 0.05 && Math.abs(parXT - parX) < 0.1 && Math.abs(parYT - parY) < 0.1;

  const apply = () => {
    cloud.style.setProperty("--rot", `${rot.toFixed(2)}deg`);
    cloud.style.setProperty("--par-x", `${parX.toFixed(1)}px`);
    cloud.style.setProperty("--par-y", `${parY.toFixed(1)}px`);
  };

  const tick = () => {
    rot += (rotTarget - rot) * 0.08;
    parX += (parXT - parX) * 0.06;
    parY += (parYT - parY) * 0.06;
    apply();
    rafId = settle() ? 0 : requestAnimationFrame(tick);
  };

  const kick = () => {
    if (reduced) {
      rot = rotTarget; parX = parXT; parY = parYT;
      apply();
    } else if (!rafId) rafId = requestAnimationFrame(tick);
  };

  addEventListener("wheel", (e) => {
    if (doc.body.dataset.view !== "projects" || !workView.hidden || !contact.hidden) return;
    rotTarget += e.deltaY * 0.05;
    doc.body.classList.remove("ct-tilehover");
    cube.classList.remove("is-visible");
    label.classList.remove("is-visible");
    kick();
  }, { passive: true });

  addEventListener("mousemove", (e) => {
    if (doc.body.dataset.view !== "projects") return;
    parXT = (0.5 - e.clientX / innerWidth) * 60;
    parYT = (0.5 - e.clientY / innerHeight) * 40;
    kick();
  });

  // --- tile hover: workbar + cursor label/cube ---
  const workbar = { index: doc.querySelector(".ct-workbar-index"), title: doc.querySelector(".ct-workbar-title") };
  const cube = doc.querySelector(".ct-cursor-cube");
  const label = doc.querySelector(".ct-cursor-label");
  const labelTitle = doc.querySelector(".ct-cursor-title");
  const labelTimer = doc.querySelector(".ct-cursor-timer");

  addEventListener("mousemove", (e) => {
    const t = `translate(${e.clientX}px, ${e.clientY}px)`;
    cube.style.transform = t;
    label.style.transform = t;
  });

  doc.querySelectorAll(".ct-tile").forEach((tile) => {
    tile.addEventListener("pointerenter", () => {
      workbar.index.textContent = tile.dataset.index;
      workbar.title.textContent = tile.dataset.title;
      labelTitle.textContent = tile.dataset.title;
      labelTimer.textContent = tile.dataset.duration;
      doc.body.classList.add("ct-tilehover");
      cube.classList.add("is-visible");
      label.classList.add("is-visible");
    });
    tile.addEventListener("pointerleave", () => {
      doc.body.classList.remove("ct-tilehover");
      cube.classList.remove("is-visible");
      label.classList.remove("is-visible");
    });
    tile.addEventListener("click", () => {
      workView.querySelector(".ct-work-media").style.setProperty("--g", tile.dataset.gradient);
      workView.querySelector(".ct-work-index").textContent = tile.dataset.index;
      workView.querySelector(".ct-work-title").textContent = tile.dataset.title;
      workView.hidden = false;
    });
  });
  workView.addEventListener("click", () => (workView.hidden = true));

  addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    workView.hidden = true;
    setContact(false);
  });

  // --- artists: wheel cycles, rail filters ---
  const artists = Array.from(doc.querySelectorAll(".ct-artist"));
  const roles = Array.from(doc.querySelectorAll(".ct-role"));
  let current = 0, lastCycle = 0;

  const showArtist = (i) => {
    current = (i + artists.length) % artists.length;
    artists.forEach((a, j) => a.classList.toggle("is-active", j === current));
    roles.forEach((r) => r.classList.toggle("is-active", r.dataset.role === artists[current].dataset.role));
  };

  addEventListener("wheel", (e) => {
    if (doc.body.dataset.view !== "artists" || !contact.hidden) return;
    const now = Date.now();
    if (now - lastCycle < 650 || Math.abs(e.deltaY) < 8) return;
    lastCycle = now;
    showArtist(current + (e.deltaY > 0 ? 1 : -1));
  }, { passive: true });

  roles.forEach((r) =>
    r.addEventListener("click", () => {
      const i = artists.findIndex((a) => a.dataset.role === r.dataset.role);
      if (i >= 0) showArtist(i);
    })
  );
})();
