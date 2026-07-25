/**
 * Orbit AI blog listing — search + category filter
 */
(() => {
  const CATEGORIES = [
    "All",
    "AI Research",
    "Engineering",
    "Pulsar",
    "Robotics",
    "Orbit AI",
    "Company",
    "Security",
    "Announcements",
  ];

  async function load() {
    const grid = document.getElementById("blog-grid");
    const search = document.getElementById("blog-search");
    const select = document.getElementById("blog-category");
    if (!grid) return;

    if (select) {
      select.innerHTML = CATEGORIES.map((c) => `<option value="${c}">${c}</option>`).join("");
    }

    let posts = [];
    try {
      const res = await fetch("/public/blog/posts.json", { credentials: "same-origin" });
      if (res.ok) posts = (await res.json()).posts || [];
    } catch (_) {
      posts = [];
    }

    function render() {
      const q = (search?.value || "").trim().toLowerCase();
      const cat = select?.value || "All";
      let filtered = posts.slice();
      if (cat !== "All") filtered = filtered.filter((p) => p.category === cat);
      if (q) {
        filtered = filtered.filter(
          (p) =>
            (p.title || "").toLowerCase().includes(q) ||
            (p.description || "").toLowerCase().includes(q) ||
            (p.category || "").toLowerCase().includes(q)
        );
      }

      if (!filtered.length) {
        grid.innerHTML = `<div class="panel review-empty"><p>No articles match your filters.</p></div>`;
        return;
      }

      grid.innerHTML = filtered
        .map((p, i) => {
          const featured = p.featured ? " featured" : "";
          return `<article class="panel panel-hover blog-card${featured}">
            <div class="meta">
              <span class="badge">${escapeHtml(p.category || "")}</span>
              <time datetime="${escapeHtml(p.date || "")}">${escapeHtml(formatDate(p.date))}</time>
              <span>${escapeHtml(String(p.readingTime || "5"))} min read</span>
            </div>
            <h3>${escapeHtml(p.title || "")}</h3>
            <p>${escapeHtml(p.description || "")}</p>
            <a class="card-link" href="${escapeHtml(p.url || "#")}">Read article →</a>
          </article>`;
        })
        .join("");
    }

    search?.addEventListener("input", render);
    select?.addEventListener("change", render);
    render();
  }

  function formatDate(iso) {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    } catch (_) {
      return iso;
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  document.documentElement.addEventListener("orbit:includes-ready", load);
  if (document.readyState !== "loading") setTimeout(load, 0);
})();
