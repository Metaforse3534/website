(() => {
  "use strict";

  if (window.OrbitCookieConsent) return;

  const STORAGE_KEY = "orbit_cookie_consent_v2";
  const MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
  const categories = ["preferences", "analytics", "marketing"];

  const safeStorage = {
    get() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const value = JSON.parse(raw);
        if (!value?.expiresAt || Date.now() > value.expiresAt) {
          localStorage.removeItem(STORAGE_KEY);
          return null;
        }
        return value;
      } catch (_) {
        return null;
      }
    },
    set(value) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      } catch (_) {
        /* Consent still applies for the current page when storage is unavailable. */
      }
    }
  };

  let consent = safeStorage.get();
  let panel;
  let dialog;
  let lastTrigger;

  function ensureStyles() {
    if (document.querySelector('link[data-orbit-cookie-styles]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/cookie-consent.css";
    link.dataset.orbitCookieStyles = "";
    document.head.appendChild(link);
  }

  function markup() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <section class="orbit-cookie-panel" data-orbit-cookie-panel hidden role="region" aria-labelledby="orbit-cookie-title">
        <p class="orbit-cookie-label">Privacy controls</p>
        <h2 id="orbit-cookie-title">Choose what Orbit may store</h2>
        <p>Necessary storage keeps preferences and this choice. This website currently has no analytics or advertising trackers. You can change your choice at any time in the footer. <a href="/Routes/cookies.html">Cookie Policy</a></p>
        <div class="orbit-cookie-actions">
          <button class="orbit-cookie-button orbit-cookie-button--primary" type="button" data-cookie-accept-all>Accept all</button>
          <button class="orbit-cookie-button" type="button" data-cookie-reject>Reject optional</button>
          <button class="orbit-cookie-button" type="button" data-cookie-settings>Settings</button>
        </div>
      </section>
      <dialog class="orbit-cookie-dialog" data-orbit-cookie-dialog aria-labelledby="orbit-cookie-settings-title">
        <div class="orbit-cookie-dialog-inner">
          <div class="orbit-cookie-dialog-head">
            <div>
              <p class="orbit-cookie-label">Cookie settings</p>
              <h2 id="orbit-cookie-settings-title">Control optional storage</h2>
              <p>Optional categories remain disabled unless you choose them. No analytics or marketing tools are currently installed on this website.</p>
            </div>
            <button class="orbit-cookie-close" type="button" data-cookie-close aria-label="Close cookie settings">×</button>
          </div>
          <div class="orbit-cookie-categories">
            <div class="orbit-cookie-category">
              <div class="orbit-cookie-category-head"><strong>Strictly necessary</strong><label class="orbit-cookie-switch"><input type="checkbox" checked disabled aria-label="Strictly necessary storage is always active"><span></span></label></div>
              <p>Stores your consent choice and essential security or session state. Always active.</p>
            </div>
            <div class="orbit-cookie-category">
              <div class="orbit-cookie-category-head"><strong>Preferences</strong><label class="orbit-cookie-switch"><input type="checkbox" data-cookie-category="preferences" aria-label="Allow preference storage"><span></span></label></div>
              <p>Remembers choices such as theme or dismissed notices on this device.</p>
            </div>
            <div class="orbit-cookie-category">
              <div class="orbit-cookie-category-head"><strong>Analytics</strong><label class="orbit-cookie-switch"><input type="checkbox" data-cookie-category="analytics" aria-label="Allow analytics storage"><span></span></label></div>
              <p>Reserved for privacy-respecting measurement if Orbit adds it later. No analytics scripts are currently present.</p>
            </div>
            <div class="orbit-cookie-category">
              <div class="orbit-cookie-category-head"><strong>Marketing</strong><label class="orbit-cookie-switch"><input type="checkbox" data-cookie-category="marketing" aria-label="Allow marketing storage"><span></span></label></div>
              <p>Reserved for advertising technology if Orbit adds it later. No marketing scripts are currently present.</p>
            </div>
          </div>
          <div class="orbit-cookie-dialog-actions">
            <button class="orbit-cookie-button" type="button" data-cookie-dialog-reject>Reject optional</button>
            <button class="orbit-cookie-button orbit-cookie-button--primary" type="button" data-cookie-save>Save choices</button>
          </div>
        </div>
      </dialog>`;
    return [...wrapper.children];
  }

  function enableScripts() {
    categories.forEach((category) => {
      if (!consent?.[category]) return;
      document.querySelectorAll(`script[type="text/plain"][data-consent-category="${category}"]`).forEach((blocked) => {
        if (blocked.dataset.consentLoaded === "true") return;
        const script = document.createElement("script");
        [...blocked.attributes].forEach((attribute) => {
          if (!["type", "data-consent-category", "data-consent-loaded"].includes(attribute.name)) {
            script.setAttribute(attribute.name, attribute.value);
          }
        });
        script.textContent = blocked.textContent;
        blocked.dataset.consentLoaded = "true";
        blocked.after(script);
      });
    });
  }

  function save(values) {
    consent = {
      version: 2,
      necessary: true,
      preferences: Boolean(values.preferences),
      analytics: Boolean(values.analytics),
      marketing: Boolean(values.marketing),
      decidedAt: new Date().toISOString(),
      expiresAt: Date.now() + MAX_AGE_MS
    };
    safeStorage.set(consent);
    if (!consent.preferences) {
      try {
        ["theme", "orbit-site-theme", "orbit_announcement_v0.0.1"].forEach((key) => localStorage.removeItem(key));
      } catch (_) {
        /* Browser storage may be unavailable. */
      }
    }
    panel.hidden = true;
    closeSettings();
    enableScripts();
    document.dispatchEvent(new CustomEvent("orbit:consent-change", { detail: { ...consent } }));
  }

  function closeSettings({ restoreFocus = true } = {}) {
    if (!dialog?.hasAttribute("open")) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    if (restoreFocus && lastTrigger?.isConnected) lastTrigger.focus();
  }

  function setDialogValues() {
    categories.forEach((category) => {
      const input = dialog.querySelector(`[data-cookie-category="${category}"]`);
      if (input) input.checked = Boolean(consent?.[category]);
    });
  }

  function openSettings(event) {
    if (!dialog) initialize();
    if (!dialog) return;
    lastTrigger = event?.currentTarget || event?.target?.closest?.("[data-cookie-manage], [data-cookie-settings]") || document.activeElement;
    setDialogValues();
    if (dialog.hasAttribute("open")) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function bind() {
    panel.querySelector("[data-cookie-accept-all]").addEventListener("click", () => save({ preferences: true, analytics: true, marketing: true }));
    panel.querySelector("[data-cookie-reject]").addEventListener("click", () => save({ preferences: false, analytics: false, marketing: false }));
    panel.querySelector("[data-cookie-settings]").addEventListener("click", openSettings);
    dialog.querySelector("[data-cookie-close]").addEventListener("click", () => closeSettings());
    dialog.querySelector("[data-cookie-dialog-reject]").addEventListener("click", () => save({ preferences: false, analytics: false, marketing: false }));
    dialog.querySelector("[data-cookie-save]").addEventListener("click", () => {
      const values = {};
      categories.forEach((category) => {
        values[category] = dialog.querySelector(`[data-cookie-category="${category}"]`)?.checked;
      });
      save(values);
    });
    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-cookie-manage]")) {
        event.preventDefault();
        openSettings(event);
      }
    });
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeSettings();
    });
  }

  function initialize() {
    ensureStyles();
    document.querySelectorAll("#cookie-banner, [data-cookie-banner], [data-cookie-consent-mount]").forEach((legacy) => legacy.remove());
    if (document.querySelector("[data-orbit-cookie-panel]")) return;
    const nodes = markup();
    document.body.append(...nodes);
    panel = document.querySelector("[data-orbit-cookie-panel]");
    dialog = document.querySelector("[data-orbit-cookie-dialog]");
    bind();
    panel.hidden = Boolean(consent);
    enableScripts();
  }

  window.OrbitCookieConsent = {
    open: openSettings,
    getConsent: () => consent ? { ...consent } : null,
    allows: (category) => category === "necessary" || Boolean(consent?.[category])
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
