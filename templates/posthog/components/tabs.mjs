const logoMark = `<svg width="28" height="23" viewBox="0 0 26 22" aria-hidden="true"><path d="M2 20 L12 4 L16 11 L19 6 L24 20 Z" fill="currentColor"/><circle cx="12" cy="4" r="2.4" fill="#f54e00"/></svg>`;

const arrowBtn = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4"/></svg>`;

const mockAsk = (m) => `<div class="ph-mock rounded-md p-4 sm:p-6">
  <div class="mx-auto max-w-[430px] rounded-md border border-ph-line bg-ph-paper p-5 text-center shadow-sm">
    <div class="flex justify-center">${logoMark}</div>
    <p class="mt-3 text-[17px] font-bold">${m.title}</p>
    <p class="mt-1 text-[13px] italic text-ph-sub">${m.tagline}</p>
    <div class="mt-4 rounded border border-ph-line bg-white px-3 py-2 text-left text-[13px] text-ph-mute">${m.placeholder}</div>
    <div class="mt-2 flex items-center justify-between">
      <div class="flex gap-1.5">
        <span class="ph-pill">${m.pillAuto} ▾</span>
        <span class="ph-pill">@ ${m.pillContext} ▾</span>
      </div>
      <span class="ph-btn-amber inline-flex h-7 w-9 items-center justify-center rounded" aria-hidden="true">${arrowBtn}</span>
    </div>
  </div>
  <div class="mt-4 flex flex-wrap justify-center gap-1.5">
    ${m.chips.map((c) => `<span class="ph-chip">${c}</span>`).join("\n    ")}
  </div>
</div>`;

const mockChat = (msgs, appTag) => `<div class="ph-mock rounded-md p-4 sm:p-6">
  <div class="mx-auto max-w-[430px] space-y-3 rounded-md border border-ph-line bg-white p-4 text-left shadow-sm">
    ${msgs.map((msg) => `<div class="flex gap-2.5">
      <span class="mt-0.5 h-7 w-7 shrink-0 rounded ${msg.bot ? "bg-ph-red" : "bg-ph-line"}"></span>
      <p class="text-[13.5px] leading-snug"><strong>${msg.author}</strong>${msg.bot ? ` <span class="ph-pill-app">${appTag}</span>` : ""}<br>${msg.text}</p>
    </div>`).join("\n    ")}
  </div>
</div>`;

const mockInbox = (items) => `<div class="ph-mock rounded-md p-4 sm:p-6">
  <div class="mx-auto max-w-[430px] divide-y divide-ph-line rounded-md border border-ph-line bg-white text-left shadow-sm">
    ${items.map((it) => `<div class="flex items-center justify-between gap-3 px-4 py-3">
      <p class="text-[13.5px] font-semibold leading-snug">${it.title}</p>
      <span class="ph-inbox-pill ph-inbox-${it.tone}">${it.pill}</span>
    </div>`).join("\n    ")}
  </div>
</div>`;

const mockFor = (item, appTag) => {
  if (item.mock === "ask") return mockAsk(item.mockAsk);
  if (item.mock === "chat") return mockChat(item.mockChat, appTag);
  return mockInbox(item.mockInbox);
};

export default (config) => {
  const items = config.tabs.items;
  return `<section class="ph-tabs">
  <div class="flex overflow-x-auto" role="tablist">
    ${items.map((it, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-tab="${i}" class="ph-tab${i === 0 ? " ph-tab-active" : ""} shrink-0 grow rounded-t-md px-4 py-3 text-[14.5px] font-semibold">${it.tab}</button>`).join("\n    ")}
  </div>
  ${items.map((it, i) => `<div class="ph-tab-panel${i === 0 ? "" : " hidden"} rounded-b-md p-4 sm:p-6" data-panel="${i}">
    <div class="mb-4 flex justify-center gap-1">
      ${it.toggles.map((t, j) => `<span class="ph-toggle${j === 0 ? " ph-toggle-active" : ""}">${t}</span>`).join("\n      ")}
    </div>
    <div class="grid items-center gap-6 lg:grid-cols-[1.2fr_1fr]">
      ${mockFor(it, config.tabs.appTag)}
      <div class="text-center lg:text-left">
        <p class="text-[13px] font-semibold uppercase tracking-wide text-ph-sub">✦ ${it.eyebrow}</p>
        <h3 class="mt-1 text-[26px] font-extrabold tracking-tight">${it.heading}</h3>
        ${it.paragraphs.map((p) => `<p class="mt-3 text-[15.5px] leading-relaxed text-ph-sub">${p}</p>`).join("\n        ")}
        ${it.cta.startsWith("Explore") ? `<a href="#" class="mt-4 inline-block font-semibold underline underline-offset-2">${it.cta}</a>` : `<a href="#" class="ph-btn-amber mt-4 inline-block rounded-md px-4 py-2 text-[15px] font-bold">${it.cta}</a>`}
      </div>
    </div>
  </div>`).join("\n  ")}
</section>`;
};
