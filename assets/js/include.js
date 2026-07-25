/**
 * Orbit AI — HTML partial includes
 * Usage: <div data-include="/components/navbar.html"></div>
 */
(() => {
  const ROOT = document.documentElement;

  function resolvePath(path) {
    if (/^https?:\/\//i.test(path) || path.startsWith("/")) return path;
    return `/${path.replace(/^\.\//, "")}`;
  }

  async function inject(el) {
    const src = el.getAttribute("data-include");
    if (!src) return;
    try {
      const res = await fetch(resolvePath(src), { credentials: "same-origin" });
      if (!res.ok) throw new Error(`Failed to load ${src}`);
      const html = await res.text();
      const wrap = document.createElement("div");
      wrap.innerHTML = html.trim();
      const nodes = [...wrap.childNodes];
      el.replaceWith(...nodes);
      nodes.forEach((node) => {
        if (node.nodeType === 1) {
          node.querySelectorAll("[data-include]").forEach(inject);
        }
      });
    } catch (err) {
      console.warn("[orbit-include]", err);
      el.innerHTML = "";
    }
  }

  async function run() {
    const targets = [...document.querySelectorAll("[data-include]")];
    await Promise.all(targets.map(inject));
    ROOT.dispatchEvent(new CustomEvent("orbit:includes-ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
