const linkList = (links) => links.map((l) => `<li><a href="${l.href}">${l.text}</a></li>`).join("\n          ");

const column = (col) => {
  if (col.extra) {
    return `<div>
        <p class="fa-label text-fa-mute">${col.title}</p>
        <ul class="mt-4 space-y-2.5 text-[15px]">
          ${linkList(col.links)}
        </ul>
        <p class="fa-label mt-8 text-fa-mute">${col.extra.title}</p>
        <ul class="mt-4 space-y-2.5 text-[15px]">
          ${linkList(col.extra.links)}
        </ul>
      </div>`;
  }
  return `<div>
        <p class="fa-label text-fa-mute">${col.title}</p>
        <ul class="mt-4 space-y-2.5 text-[15px]">
          ${linkList(col.links)}
        </ul>
      </div>`;
};

export default (config) => {
  const f = config.footer;
  return `<!-- footer -->
  <footer class="bg-fa-paper px-4 pb-28 pt-12 lg:pb-9 md:pt-16">
    <div class="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-6 gap-y-10 px-2 md:grid-cols-5">
      ${f.columns.map(column).join("\n      ")}
    </div>
    <div class="mx-auto mt-14 flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-3 border-t border-fa-line px-2 pt-6 text-[13px] text-fa-mute">
      <p>${f.copyright}</p>
      ${f.legalLinks.map((l) => `<a href="${l.href}">${l.text}</a>`).join("\n      ")}
    </div>
  </footer>

</main>`;
};
