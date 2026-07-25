/**
 * Mark active policy nav item after includes load
 */
(() => {
  function mark() {
    const id = document.body.getAttribute("data-policy-page");
    if (!id) return;
    document.querySelectorAll("[data-policy]").forEach((a) => {
      if (a.getAttribute("data-policy") === id) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      } else {
        a.classList.remove("active");
        a.removeAttribute("aria-current");
      }
    });
  }

  document.documentElement.addEventListener("orbit:includes-ready", mark);
  if (document.readyState !== "loading") setTimeout(mark, 0);
})();
