(() => {
  const APP_ORIGIN = "https://www.orbitdev.org";
  const routeMap = new Map([
    ["terms", "/Routes/terms.html"],
    ["terms of service", "/Routes/terms.html"],
    ["privacy", "/Routes/privacy.html"],
    ["privacy policy", "/Routes/privacy.html"],
    ["privacy regulation", "/Routes/privacy.html"],
    ["cookies", "/Routes/cookies.html"],
    ["cookie policy", "/Routes/cookies.html"],
    ["cookie directives", "/Routes/cookies.html"],
    ["acceptable use", "/Routes/acceptabe.html"],
    ["orbit rules", "/Routes/rules.html"],
    ["rules", "/Routes/rules.html"],
    ["support", "/Routes/support.html"],
    ["support center", "/Routes/support.html"],
    ["support cluster", "/Routes/support.html"],
    ["documentation", "/Routes/doc.html"],
    ["docs", "/Routes/doc.html"],
    ["read docs", "/Routes/doc.html"],
    ["capabilities", "/#capabilities"],
    ["ai models", "/#models"],
    ["open positions", "/Routes/Career.html#positions"],
    ["careers", "/Routes/Career.html"],
    ["architects", "/Routes/architects.html"],
    ["network", "/Routes/network.html"],
    ["network topology", "/Routes/network.html"],
    ["partnership map", "/Routes/prathership.html"],
    ["security framework", "/Routes/acceptabe.html"],
    ["view telemetry", "/Routes/network.html"],
    ["join forum", "https://discord.gg/8VcqeZK2"],
    ["orbit academy", "/Routes/stage.html"],
    ["core map", "/Routes/core.html"],
    ["index", "/"],
    ["home", "/"],
    ["terminal platform", `${APP_ORIGIN}/`],
    ["login", `${APP_ORIGIN}/auth`],
    ["join orbit", `${APP_ORIGIN}/auth`],
    ["open orbit", `${APP_ORIGIN}/auth`],
    ["initialize access", `${APP_ORIGIN}/auth`],
    ["initialize", `${APP_ORIGIN}/auth`],
  ]);

  function normalizedText(element) {
    return element.textContent.replace(/[&rarr;&rarr;&larr;/]/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function repairLinks() {
    document.querySelectorAll("a").forEach((link) => {
      const label = normalizedText(link);
      const rawHref = link.getAttribute("href") || "";
      const mapped = routeMap.get(label);

      if ((rawHref === "#" || rawHref === "") && mapped) link.setAttribute("href", mapped);
      if (/acceptable-use\.html$/i.test(rawHref)) link.setAttribute("href", "/Routes/acceptabe.html");
      if (/\/Privacy\.html$/i.test(rawHref)) link.setAttribute("href", "/Routes/privacy.html");
      if (/\/Routes\/partnership\.html$/i.test(rawHref)) link.setAttribute("href", "/Routes/prathership.html");
      if (/^\/(core|architects|network)\.html$/i.test(rawHref)) link.setAttribute("href", `/Routes${rawHref}`);
      if (/^Index\.html$/i.test(rawHref)) link.setAttribute("href", "/");
      if (/^index\.html$/i.test(rawHref) && location.pathname.toLowerCase().includes("/routes/")) link.setAttribute("href", "/");
      if (/^Public\//i.test(rawHref) && location.pathname.toLowerCase().includes("/routes/")) link.setAttribute("href", `../${rawHref}`);
      if (rawHref === "https://start.orbitdev.org/") link.setAttribute("href", "/");
      if (rawHref.startsWith("https://start.orbitdev.org/Routes/")) link.setAttribute("href", rawHref.replace("https://start.orbitdev.org", ""));
      if (rawHref === "https://www.orbitdev.org/" && /login|join orbit|open orbit|initialize/.test(label)) link.setAttribute("href", `${APP_ORIGIN}/auth`);
      if (rawHref === "#" && !mapped) {
        link.classList.add("orbit-broken-link");
        link.addEventListener("click", (event) => {
          event.preventDefault();
          showToast("This section is being prepared. Use Support if you need help now.");
        });
      }
    });
  }

  function showToast(message) {
    let toast = document.querySelector(".orbit-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "orbit-toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
  }

  function addDock() {
    if (document.querySelector(".orbit-dock")) return;
    const path = location.pathname.toLowerCase();
    const links = [
      ["Home", "/"],
      ["Docs", "/Routes/doc.html"],
      ["Support", "/Routes/support.html"],
    ];
    const dock = document.createElement("nav");
    dock.className = "orbit-dock";
    dock.setAttribute("aria-label", "Orbit site navigation");
    dock.innerHTML = `
      <a class="orbit-dock__brand" href="/">ORBIT</a>
      ${links.map(([label, href]) => `<a class="orbit-dock__link" href="${href}" ${path === href.toLowerCase() ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
      <button class="orbit-dock__link orbit-theme-toggle" type="button" aria-label="Toggle light mode">Theme</button>
      <a class="orbit-dock__link orbit-dock__link--primary" href="${APP_ORIGIN}/auth">Open App</a>
    `;
    document.body.appendChild(dock);
    dock.querySelector(".orbit-theme-toggle").addEventListener("click", () => {
      const enabled = document.body.classList.toggle("light-mode");
      localStorage.setItem("orbit-site-theme", enabled ? "light" : "dark");
    });
  }

  function addProgress() {
    const bar = document.createElement("div");
    bar.className = "orbit-progress";
    document.body.appendChild(bar);
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = `${max > 0 ? Math.min(100, (scrollY / max) * 100) : 100}%`;
    };
    addEventListener("scroll", update, { passive: true });
    update();
  }

  function fixFormsAndActions() {
    if (/\/shop2?\.html$/i.test(location.pathname)) {
      document.querySelectorAll("form").forEach((form) => {
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          location.href = `${APP_ORIGIN}/billing`;
        });
      });
      document.querySelectorAll('button[type="submit"], #submit').forEach((button) => {
        button.textContent = "Continue in Orbit Billing";
      });
    }

    document.querySelectorAll("button").forEach((button) => {
      const label = normalizedText(button);
      if ((label === "initialize" || label === "open billing") && !button.closest("form")) {
        button.addEventListener("click", () => {
          location.href = label === "open billing" ? `${APP_ORIGIN}/billing` : `${APP_ORIGIN}/auth`;
        });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("orbit-site-theme") === "light") document.body.classList.add("light-mode");
    repairLinks();
    addDock();
    addProgress();
    fixFormsAndActions();
  });
})();
