(() => {
  const body = document.body;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // reveal: IO with immediate fallback; targets are all in the fixed stage, so IO fires on load
  const targets = document.querySelectorAll(".mg-reveal");
  if ("IntersectionObserver" in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries)
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
    });
    targets.forEach((t) => io.observe(t));
  } else {
    targets.forEach((t) => t.classList.add("visible"));
  }
  // belt and braces: any target the observer misses still fades in before the gate looks
  setTimeout(() => targets.forEach((t) => t.classList.add("visible")), 900);

  // ---- audio: own two-oscillator drone, created only on a user gesture ----
  let audio = null;
  function makeDrone() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 0.006;
    lfo.connect(lfoGain).connect(gain.gain);
    for (const f of [55, 55.7, 110.3]) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      o.connect(gain);
      o.start();
    }
    lfo.start();
    gain.connect(ctx.destination);
    return { ctx, gain };
  }
  function setSound(on) {
    if (on && !audio) audio = makeDrone();
    if (audio) audio.gain.gain.linearRampToValueAtTime(on ? 0.015 : 0, audio.ctx.currentTime + 0.8);
    body.dataset.mgSound = on ? "on" : "off";
    soundBtn.setAttribute("aria-pressed", String(on));
  }
  const soundBtn = document.querySelector("[data-mg-sound]");
  soundBtn.addEventListener("click", () => setSound(body.dataset.mgSound !== "on"));

  // ---- intro ----
  const intro = document.querySelector("[data-mg-intro]");
  function enter(withSound) {
    if (body.dataset.mgEntered) return;
    body.dataset.mgEntered = "1";
    if (withSound) setSound(true);
  }
  intro.addEventListener("click", () => enter(true));
  document.querySelector("[data-mg-enter-quiet]").addEventListener("click", (e) => {
    e.stopPropagation();
    enter(false);
  });

  // ---- z-travel through the field ----
  const stage = document.querySelector("[data-mg-stage]");
  const field = document.querySelector("[data-mg-field]");
  const slots = Array.from(field.querySelectorAll(".mg-slot"));
  const tiles = slots.map((s) => ({
    slot: s,
    tile: s.querySelector(".mg-tile"),
    z: parseFloat(getComputedStyle(s).getPropertyValue("--tz")),
    dim: parseFloat(getComputedStyle(s).getPropertyValue("--dim")) || 0.6,
  }));
  const MAX = parseFloat(stage.dataset.maxTravel) || 2600;
  let travel = 0;
  let travelTarget = 0;
  let rx = 0, ry = 0, rxT = 0, ryT = 0;

  function onDelta(dy) {
    if (reduced || !body.dataset.mgEntered) return;
    travelTarget = Math.min(MAX, Math.max(0, travelTarget + dy * 0.9));
  }
  stage.addEventListener("wheel", (e) => onDelta(e.deltaY), { passive: true });
  let touchY = null;
  stage.addEventListener("touchstart", (e) => (touchY = e.touches[0].clientY), { passive: true });
  stage.addEventListener(
    "touchmove",
    (e) => {
      if (touchY !== null) onDelta((touchY - e.touches[0].clientY) * 2.5);
      touchY = e.touches[0].clientY;
    },
    { passive: true }
  );

  stage.addEventListener("pointermove", (e) => {
    ryT = (e.clientX / innerWidth - 0.5) * 4;
    rxT = -(e.clientY / innerHeight - 0.5) * 3;
    cursorX = e.clientX + 18;
    cursorY = e.clientY + 22;
  });

  // ---- trailing cursor label over tiles ----
  const cursor = document.querySelector("[data-mg-cursor]");
  const letters = Array.from(cursor.children).map(() => ({ x: -100, y: -100 }));
  let cursorX = -100, cursorY = -100;
  stage.addEventListener("pointerover", (e) => {
    if (!reduced && e.target.closest("[data-mg-tile]")) cursor.classList.add("mg-cursor--on");
  });
  stage.addEventListener("pointerout", (e) => {
    if (e.target.closest("[data-mg-tile]") && !e.relatedTarget?.closest("[data-mg-tile]"))
      cursor.classList.remove("mg-cursor--on");
  });

  function applyDepth() {
    for (const t of tiles) {
      const zEff = t.z + travel;
      let o = t.dim;
      if (zEff > 60) o = 0;
      else if (zEff > -350) o = t.dim * ((60 - zEff) / 410);
      t.tile.style.opacity = o.toFixed(3);
    }
  }

  function frame() {
    if (Math.abs(travelTarget - travel) > 0.5 || Math.abs(ryT - ry) > 0.005 || Math.abs(rxT - rx) > 0.005) {
      travel += (travelTarget - travel) * 0.06;
      rx += (rxT - rx) * 0.05;
      ry += (ryT - ry) * 0.05;
      field.style.setProperty("--travel", travel.toFixed(1) + "px");
      field.style.setProperty("--rx", rx.toFixed(3) + "deg");
      field.style.setProperty("--ry", ry.toFixed(3) + "deg");
      applyDepth();
      if (travel > 350 && !body.dataset.mgDeep) body.dataset.mgDeep = "1";
      else if (travel < 120 && body.dataset.mgDeep) delete body.dataset.mgDeep;
    }
    letters.forEach((l, i) => {
      const k = 0.35 - i * 0.022;
      l.x += (cursorX - l.x) * k;
      l.y += (cursorY - l.y) * k;
      cursor.children[i].style.transform = `translate(${l.x.toFixed(1)}px, ${l.y.toFixed(1)}px)`;
    });
    requestAnimationFrame(frame);
  }
  if (!reduced) requestAnimationFrame(frame);

  // ---- view router ----
  document.addEventListener("click", (e) => {
    const noop = e.target.closest("[data-mg-noop]");
    if (noop) e.preventDefault();
    const open = e.target.closest("[data-mg-open]");
    if (open) {
      body.dataset.mgView = open.dataset.mgOpen;
      return;
    }
    if (e.target.closest("[data-mg-close]")) {
      delete body.dataset.mgView;
      return;
    }
    // a tile is a doorway, not a decoration: the reference navigates to the project
    if (body.dataset.mgEntered && e.target.closest("[data-mg-tile]")) body.dataset.mgView = "index";
  });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") delete body.dataset.mgView;
  });

  // ---- about: scroll-spy rail + clip wipe ----
  const aboutPane = document.querySelector("[data-mg-about-scroll]");
  const railItems = Array.from(document.querySelectorAll(".mg-rail-item"));
  const railCursor = document.querySelector(".mg-rail-cursor");
  const aboutSecs = Array.from(aboutPane.querySelectorAll(".mg-about-sec"));
  const wipe = document.querySelector("[data-mg-wipe]");
  function spyAbout() {
    const idx = Math.min(aboutSecs.length - 1, Math.round(aboutPane.scrollTop / aboutPane.clientHeight));
    railItems.forEach((it, i) => it.classList.toggle("active", i === idx));
    railCursor.style.transform = `translateY(${idx * (railItems[0]?.offsetHeight || 56)}px)`;
    if (idx === aboutSecs.length - 1) wipe.classList.add("on");
  }
  aboutPane.addEventListener("scroll", spyAbout, { passive: true });
  spyAbout();
  if (reduced) wipe.classList.add("on");
})();
