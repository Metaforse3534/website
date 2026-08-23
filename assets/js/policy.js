/** Shared legal-page navigation, contents, and unresolved-field treatment. */
(() => {
  "use strict";

  function markActivePolicy() {
    const id = document.body.getAttribute("data-policy-page");
    if (!id) return;
    document.querySelectorAll("[data-policy]").forEach((link) => {
      const active = link.getAttribute("data-policy") === id;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function slugify(value, index) {
    const slug = value
      .toLowerCase()
      .replace(/^\s*\d+\s*\/\s*/, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return slug || `policy-section-${index + 1}`;
  }

  function buildTableOfContents(article) {
    if (article.querySelector(".policy-toc")) return;
    const headings = [...article.querySelectorAll(".policy-section > h2")];
    if (headings.length < 3) return;

    const used = new Set();
    headings.forEach((heading, index) => {
      const section = heading.closest(".policy-section");
      const title = heading.textContent.replace(/^\s*\d+\s*\/\s*/, "").trim();
      let id = section.id || slugify(title, index);
      let suffix = 2;
      while (used.has(id) || (document.getElementById(id) && document.getElementById(id) !== section)) {
        id = `${slugify(title, index)}-${suffix++}`;
      }
      used.add(id);
      section.id = id;
      heading.dataset.policyTitle = title;
    });

    const nav = document.createElement("nav");
    nav.className = "policy-toc";
    nav.setAttribute("aria-label", "On this page");
    nav.innerHTML = '<p class="policy-toc-title">On this page</p><ol></ol>';
    const list = nav.querySelector("ol");
    headings.forEach((heading) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${heading.closest(".policy-section").id}`;
      link.textContent = heading.dataset.policyTitle;
      item.appendChild(link);
      list.appendChild(item);
    });

    const notice = article.querySelector(".policy-notice");
    const content = article.querySelector(".policy-content");
    if (notice) notice.after(nav);
    else content?.before(nav);
  }

  function highlightRequiredFields(article) {
    if (article.dataset.requiredFieldsReady === "true") return;
    const pattern = /\[[A-Z][A-Z0-9 /&.,'()-]* REQUIRED\]/g;
    const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        pattern.lastIndex = 0;
        if (!pattern.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        if (node.parentElement?.closest("mark, script, style, code, pre")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const fragment = document.createDocumentFragment();
      let cursor = 0;
      pattern.lastIndex = 0;
      for (const match of node.nodeValue.matchAll(pattern)) {
        fragment.append(node.nodeValue.slice(cursor, match.index));
        const mark = document.createElement("mark");
        mark.className = "legal-required";
        mark.textContent = match[0];
        mark.title = "Business or legal information still required";
        fragment.append(mark);
        cursor = match.index + match[0].length;
      }
      fragment.append(node.nodeValue.slice(cursor));
      node.replaceWith(fragment);
    });
    article.dataset.requiredFieldsReady = "true";
  }

  function enhancePolicy() {
    const article = document.querySelector(".policy-main");
    if (!article) return;
    buildTableOfContents(article);
    highlightRequiredFields(article);
    markActivePolicy();
  }

  document.documentElement.addEventListener("orbit:includes-ready", markActivePolicy);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhancePolicy, { once: true });
  } else {
    enhancePolicy();
  }
})();
