/**
 * Orbit AI — shared UI behavior
 */
(() => {
  const APP = "https://app.orbitdev.org";

  function qs(sel, root = document) {
    return root.querySelector(sel);
  }

  function qsa(sel, root = document) {
    return [...root.querySelectorAll(sel)];
  }

  function markCurrentNav() {
    const path = location.pathname.replace(/\/$/, "") || "/";
    qsa(".nav-links a, .mobile-nav a, .footer-col a").forEach((a) => {
      try {
        const href = new URL(a.getAttribute("href") || "", location.origin).pathname.replace(/\/$/, "") || "/";
        if (href === path || (path.startsWith(href) && href !== "/")) {
          a.setAttribute("aria-current", "page");
        }
      } catch (_) {
        /* ignore */
      }
    });
  }

  function initMobileNav() {
    const toggle = qs("[data-nav-toggle]");
    const panel = qs("[data-mobile-nav]");
    if (!toggle || !panel) return;

    const close = () => {
      toggle.setAttribute("aria-expanded", "false");
      panel.classList.remove("is-open");
      document.body.style.overflow = "";
    };

    const open = () => {
      toggle.setAttribute("aria-expanded", "true");
      panel.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) close();
      else open();
    });

    panel.addEventListener("click", (e) => {
      if (e.target.closest("a")) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  function initReveals() {
    const items = qsa(".reveal");
    if (!items.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => io.observe(el));
  }

  function initCookieBanner() {
    const banner = qs("[data-cookie-banner]");
    if (!banner) return;
    const key = "orbit_cookie_ack_v1";
    if (localStorage.getItem(key)) {
      banner.hidden = true;
      return;
    }
    banner.hidden = false;
    qsa("[data-cookie-accept]", banner).forEach((btn) => {
      btn.addEventListener("click", () => {
        localStorage.setItem(key, "1");
        banner.hidden = true;
      });
    });
  }

  function initNewsletter() {
    qsa("[data-newsletter-form]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const note = form.querySelector("[data-newsletter-note]");
        if (note) {
          note.textContent = "Newsletter signup is coming soon. Thanks for your interest.";
        }
      });
    });
  }

  function initAppLinks() {
    qsa("[data-app-path]").forEach((a) => {
      const path = a.getAttribute("data-app-path") || "/";
      a.setAttribute("href", `${APP}${path.startsWith("/") ? path : `/${path}`}`);
    });
  }

  function initNavDetails() {
    const drops = qsa(".nav-drop");
    drops.forEach((d) => {
      d.addEventListener("toggle", () => {
        if (d.open) {
          drops.forEach((other) => {
            if (other !== d) other.open = false;
          });
        }
      });
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-drop")) {
        drops.forEach((d) => {
          d.open = false;
        });
      }
    });
  }

  function boot() {
    markCurrentNav();
    initMobileNav();
    initNavDetails();
    initReveals();
    initCookieBanner();
    initNewsletter();
    initAppLinks();
  }

  document.documentElement.addEventListener("orbit:includes-ready", boot);
  if (document.readyState !== "loading") {
    // Fallback if no includes on page
    setTimeout(() => {
      if (!qs("[data-include]")) boot();
    }, 0);
  }
})();
