import { br, bittenBtn } from "./_shared.mjs";

export default (config) => {
  const f = config.footer;
  return `<footer class="bg-lk-navy relative" id="contact">
  <div class="px-4 lg:px-8">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-9">
        <div class="lk-bookmark lk-bookmark--footer">
          <div class="hidden lg:block">${bittenBtn(f.ctaText, "rb")}</div>
          <p class="lk-h2">${config.brand}</p>
        </div>
      </div>
    </div>
    <div class="py-8 lg:pt-16 lg:pb-4">
      <div class="grid grid-cols-12 gap-4">
        <p class="col-span-12 lg:col-span-3 lg:col-start-7 text-xs text-lk-gray">${br(f.hours)}</p>
      </div>
      <div class="mt-10 lg:hidden">${bittenBtn(f.ctaText, "rb")}</div>
      <div class="grid grid-cols-12 gap-4 items-end mt-10 lg:mt-8">
        <p class="hidden lg:block col-span-3 text-xs text-lk-gray">${f.copyright}</p>
        <a href="#top" class="col-span-4 lg:col-span-2 lg:col-start-7 lk-link text-xs">${f.privacyText}</a>
        <p class="col-span-8 lg:col-span-2 lg:col-start-11 text-xs text-lk-gray">${f.creditText}</p>
      </div>
      <hr class="lk-hr mt-10">
      <p class="text-xs text-lk-gray mt-6 lg:hidden">${f.copyright}</p>
      <p class="lk-footnote text-xs mt-6 pb-8">${f.footnote}</p>
    </div>
  </div>
</footer>`;
};
