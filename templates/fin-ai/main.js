(() => {
  const doc = document;
  const header = doc.querySelector(".fa-header");

  const setHeaderHeight = () => {
    doc.documentElement.style.setProperty("--fa-head-h", header.offsetHeight + "px");
  };
  setHeaderHeight();
  addEventListener("resize", setHeaderHeight);

  const announce = doc.querySelector(".fa-announce");
  doc.querySelector(".fa-announce-close").addEventListener("click", () => {
    announce.remove();
    setHeaderHeight();
  });

  const burger = doc.querySelector(".fa-burger");
  burger.addEventListener("click", () => {
    const open = header.classList.toggle("fa-nav-open");
    burger.setAttribute("aria-expanded", String(open));
    setHeaderHeight();
  });

  const targets = doc.querySelectorAll(".fa-reveal");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px 25% 0px" }
  );
  targets.forEach((t) => io.observe(t));
})();
