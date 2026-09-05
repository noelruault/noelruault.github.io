const MOTIFS = {
  wave: `<svg viewBox="0 0 100 40" preserveAspectRatio="none" class="absolute inset-x-[12%] bottom-[18%] h-[22%] w-[76%] opacity-40"><polyline points="0,20 10,12 20,26 30,8 40,30 50,14 60,24 70,10 80,28 90,16 100,20" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.2" vector-effect="non-scaling-stroke"/></svg>`,
  ring: `<svg viewBox="0 0 100 100" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[46%] aspect-square opacity-35"><circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/><circle cx="50" cy="50" r="24" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="1"/></svg>`,
  ridge: `<svg viewBox="0 0 100 40" preserveAspectRatio="none" class="absolute inset-x-0 bottom-0 h-[45%] w-full opacity-30"><path d="M0,40 L18,16 L34,32 L52,8 L70,28 L86,14 L100,40 Z" fill="rgba(255,255,255,.16)"/></svg>`,
  none: "",
};

const tile = (t, i, projects) => {
  const proj = projects[t.p];
  const [c1, c2, angle] = t.g;
  return `<div class="mg-reveal mg-slot" style="--i:${Math.min(i, 5)};--tx:${t.x};--ty:${t.y};--tz:${t.z};--tw:${t.w};--ar:${t.ar};--dim:${t.dim};" data-mg-tile data-title="${proj.t}" data-kind="${proj.k}">
      <div class="mg-tile${t.desk ? " mg-tile--desk" : ""}" style="background:linear-gradient(${angle},${c1},${c2});">
        <span class="mg-tile-sheen" aria-hidden="true"></span>
        ${MOTIFS[t.m] || ""}
      </div>
    </div>`;
};

const welcomeWord = (w) =>
  `${w.break ? '<span class="mg-br" aria-hidden="true"></span>' : ""}<span class="${w.s === "lg" ? "mg-w-lg" : "mg-w-sm"}">${w.t}</span>`;

export default (config) => `
<main class="mg-stage fixed inset-0 z-10 bg-black overflow-hidden touch-none" data-mg-stage data-max-travel="${config.stage.maxTravel}">
  <div class="mg-field absolute inset-0" data-mg-field>
    ${config.tiles.map((t, i) => tile(t, i, config.projects)).join("\n    ")}
  </div>

  <div class="mg-welcome absolute inset-0 flex items-center justify-center pointer-events-none z-20" data-mg-welcome>
    <h1 class="mg-reveal mg-welcome-line uppercase text-center max-w-[80vw]" style="--i:2">
      ${config.welcome.map(welcomeWord).join("\n      ")}
    </h1>
  </div>

  <button class="mg-chrome mg-listtoggle absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 uppercase text-mg-off" data-mg-open="index">
    <span class="mg-plus relative block w-4 h-4" aria-hidden="true"><span></span><span></span></span>
    <span class="text-[10px] sm:text-[13px] tracking-[.3em] whitespace-nowrap">${config.stage.listToggle}</span>
  </button>

  <div class="mg-cursor fixed z-50 pointer-events-none uppercase text-mg-off text-[9px] sm:text-[13px] tracking-[.1em]" data-mg-cursor aria-hidden="true">
    ${[...config.stage.cursorLabel].map((c, i) => `<span class="inline-block" style="--ci:${i}">${c === " " ? "&nbsp;" : c}</span>`).join("")}
  </div>

  <button class="mg-sound fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[80] p-3 text-mg-mist" data-mg-sound aria-label="Toggle sound" aria-pressed="false">
    <svg viewBox="0 0 24 16" class="w-5 h-4" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M2,6 L6,6 L11,2 L11,14 L6,10 L2,10 Z" fill="currentColor" stroke="none"/><path class="mg-sound-on" d="M15,4 C17,6 17,10 15,12"/><path class="mg-sound-off" d="M15,5 L21,11 M21,5 L15,11"/></svg>
  </button>
</main>`;
