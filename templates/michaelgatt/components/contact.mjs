export default (config) => {
  const c = config.contact;
  return `
<section class="mg-panel mg-contact fixed inset-0 z-40 bg-black" data-mg-panel="contact" aria-label="Contact">
  <button class="mg-idx-back absolute left-5 top-6 lg:left-10 lg:top-10 z-10 text-left uppercase text-mg-mist" data-mg-close>
    <span class="block text-[11px] tracking-[.2em]">&larr; ${c.back.split(" ")[0]}</span>
    <span class="block text-[8px] tracking-[.3em] mt-1 text-mg-mist/70">${c.back.split(" ").slice(1).join(" ")}</span>
  </button>
  <div class="mg-panel-scroll h-full overflow-y-auto">
    <div class="min-h-full flex flex-col items-center justify-center text-center uppercase tracking-[.25em] lg:tracking-[.35em] py-24 px-5">
      <h2 class="text-mg-off text-[10px] sm:text-[14px] opacity-80 tracking-[.35em] mb-6 leading-relaxed">${c.heading.replace("\n", "<br>")}</h2>
      <p class="text-[12px] sm:text-[22px] text-white opacity-90">${c.agentName}</p>
      <p class="text-mg-off text-[10px] sm:text-[13px] tracking-[.1em] mt-2 mb-6">${c.agency}</p>
      <p class="mb-3"><a href="tel:${c.phone.replace(/[^+\d]/g, "")}" class="mg-link text-[16px] sm:text-[36px] text-white tracking-[.05em]">${c.phone}</a></p>
      <p class="mb-14"><a href="mailto:${c.email}" class="mg-link text-[12px] sm:text-[22px] text-white/80 tracking-[.05em] normal-case">${c.email}</a></p>
      <p class="text-mg-off/70 text-[10px] sm:text-[13px] tracking-[.35em] mb-2 leading-snug">${c.bioLabel.replace("\n", "<br>")}</p>
      <a href="#" class="mg-link mg-link-rev text-mg-off text-[12px] sm:text-[18px] tracking-[.05em]" data-mg-noop>${c.bioLink}</a>
      <p class="mt-16 flex items-baseline gap-[.4em] text-mg-off tracking-[.3em]">
        ${c.credit.words.map((w) => `<span class="text-[7px] sm:text-[8px]">${w}</span>`).join("\n        ")}
        <a href="#" class="mg-link mg-link-rev text-[10px] sm:text-[12px]" data-mg-noop>${c.credit.name}</a>
      </p>
    </div>
  </div>
</section>`;
};
