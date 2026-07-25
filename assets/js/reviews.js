/**
 * Orbit AI reviews renderer — only shows reviews from JSON; Verified badge only if verified === true
 */
(() => {
  async function load() {
    const list = document.getElementById("reviews-list");
    const empty = document.getElementById("reviews-empty");
    if (!list) return;

    let reviews = [];
    try {
      const res = await fetch("/information/reviews.json", { credentials: "same-origin" });
      if (res.ok) {
        const data = await res.json();
        reviews = Array.isArray(data.reviews) ? data.reviews : [];
      }
    } catch (_) {
      reviews = [];
    }

    const published = reviews.filter((r) => r && r.published === true);
    if (!published.length) {
      list.innerHTML = "";
      if (empty) empty.hidden = false;
    } else {
      if (empty) empty.hidden = true;
      list.innerHTML = published
        .map((r) => {
          const stars = "★".repeat(Math.max(1, Math.min(5, Number(r.rating) || 5))) + "☆".repeat(5 - Math.max(1, Math.min(5, Number(r.rating) || 5)));
          const verified = r.verified === true ? `<span class="badge badge-verified">Verified</span>` : "";
          const role = [r.role, r.company].filter(Boolean).join(" · ");
          return `<article class="panel review-card">
            <div style="display:flex;justify-content:space-between;gap:0.75rem;align-items:flex-start;flex-wrap:wrap">
              <div>
                <strong style="color:var(--text)">${escapeHtml(r.name || "Anonymous")}</strong>
                <p style="font-size:0.8rem;margin-top:0.2rem">${escapeHtml(role)}</p>
              </div>
              ${verified}
            </div>
            <div class="stars" aria-label="Rating ${r.rating} of 5">${stars}</div>
            <p>${escapeHtml(r.body || "")}</p>
          </article>`;
        })
        .join("");
    }

    const form = document.getElementById("review-form");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = document.getElementById("review-note");
      if (note) {
        note.textContent = "Thank you. Review moderation and verification are coming soon. Your submission was not published automatically.";
      }
      form.reset();
      const status = document.getElementById("r-status");
      if (status) status.value = "Unverified — pending review";
    });
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
