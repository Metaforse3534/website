/**
 * ORBIT DYNAMIC INFORMATION STORE & HYDRATION ENGINE
 * Reads structured data from /information/*.json and hydrates UI components,
 * tables, status badges, specs, capabilities, initiatives, and FAQs dynamically.
 */

class OrbitInformationDataEngine {
  constructor() {
    this.cache = {};
    this.init();
  }

  async fetchJson(filename) {
    if (this.cache[filename]) return this.cache[filename];
    try {
      const res = await fetch(`/information/${filename}`, { credentials: 'same-origin' });
      if (!res.ok) throw new Error(`Failed to fetch /information/${filename}`);
      const data = await res.json();
      this.cache[filename] = data;
      return data;
    } catch (err) {
      console.warn(`[OrbitDataEngine] Failed to load ${filename}:`, err);
      return null;
    }
  }

  async init() {
    // Hydrate all data targets on the current page
    await this.hydrateAll();

    // Listen to custom includes-ready event in case components injected new targets
    document.documentElement.addEventListener('orbit:includes-ready', () => {
      this.hydrateAll();
    });
  }

  async hydrateAll() {
    const [company, products, models, pulsarV1, pulsar, research, faq, security] = await Promise.all([
      this.fetchJson('company.json'),
      this.fetchJson('products.json'),
      this.fetchJson('models.json'),
      this.fetchJson('pulsar-v1.json'),
      this.fetchJson('pulsar.json'),
      this.fetchJson('research.json'),
      this.fetchJson('faq.json'),
      this.fetchJson('security.json')
    ]);

    this.data = { company, products, models, pulsarV1, pulsar, research, faq, security };

    this.hydrateCompanyInfo();
    this.hydrateProducts();
    this.hydrateModels();
    this.hydratePulsar();
    this.hydrateResearch();
    this.hydrateFaq();
    this.hydrateSecurity();
  }

  hydrateCompanyInfo() {
    if (!this.data.company) return;
    const c = this.data.company;

    document.querySelectorAll('[data-info="company-name"]').forEach(el => el.textContent = c.name || 'Orbit AI');
    document.querySelectorAll('[data-info="company-legal"]').forEach(el => el.textContent = c.operatingName || 'Orbit Labs');
    document.querySelectorAll('[data-info="company-tagline"]').forEach(el => el.textContent = c.tagline || '');
    document.querySelectorAll('[data-info="company-desc"]').forEach(el => el.textContent = c.description || '');
    document.querySelectorAll('[data-info="company-jurisdiction"]').forEach(el => el.textContent = c.jurisdiction || 'Netherlands');
    document.querySelectorAll('[data-info="company-updated"]').forEach(el => el.textContent = c.lastUpdated || '');
  }

  hydrateProducts() {
    if (!this.data.products?.products) return;
    const prods = this.data.products.products;
    const orbitAi = prods.find(p => p.id === 'orbit-ai');

    if (orbitAi) {
      document.querySelectorAll('[data-info="orbit-version"]').forEach(el => el.textContent = `v${orbitAi.version}`);
      document.querySelectorAll('[data-info="orbit-desc"]').forEach(el => el.textContent = orbitAi.description);

      // Render capabilities container if present
      const capContainer = document.querySelector('[data-info-list="orbit-capabilities"]');
      if (capContainer && orbitAi.capabilities) {
        capContainer.innerHTML = orbitAi.capabilities.map(cap => `
          <div class="p-4 rounded-xl bg-[#11141A] border border-white/5 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-[#6EA8FF]"></span>
              <span class="text-sm font-medium text-[#F5F7FA]">${this.escapeHtml(cap.name)}</span>
            </div>
            <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">${this.escapeHtml(cap.status)}</span>
          </div>
        `).join('');
      }
    }
  }

  hydrateModels() {
    if (!this.data.models) return;
    const m = this.data.models;

    // Render workspace modes if container exists
    const modesContainer = document.querySelector('[data-info-list="workspace-modes"]');
    if (modesContainer && m.workspaceModes) {
      modesContainer.innerHTML = m.workspaceModes.map(mode => `
        <span class="px-3 py-1 rounded-full text-xs font-mono bg-[#11141A] border border-white/10 text-[#F5F7FA]">${this.escapeHtml(mode)}</span>
      `).join('');
    }

    // Render access packs
    const packsContainer = document.querySelector('[data-info-list="model-packs"]');
    if (packsContainer && m.modelAccessPacksDocumented) {
      packsContainer.innerHTML = m.modelAccessPacksDocumented.map(pack => `
        <div class="p-3 rounded-lg bg-[#0B0D12] border border-white/5 text-xs font-mono text-[#9299A6] flex items-center gap-2">
          <span class="text-[#6EA8FF]">⚡</span> ${this.escapeHtml(pack)}
        </div>
      `).join('');
    }
  }

  hydratePulsar() {
    if (this.data.pulsar) {
      const p = this.data.pulsar;
      const areasContainer = document.querySelector('[data-info-list="pulsar-areas"]');
      if (areasContainer && p.areas) {
        areasContainer.innerHTML = p.areas.map(area => `
          <div class="p-4 rounded-xl bg-[#11141A] border border-white/5 flex items-center justify-between">
            <span class="text-sm font-semibold text-[#F5F7FA]">${this.escapeHtml(area.name)}</span>
            <span class="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded ${area.status === 'Research' ? 'bg-[#6EA8FF]/10 text-[#6EA8FF] border border-[#6EA8FF]/20' : area.status === 'Prototype' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'bg-purple-500/10 text-purple-300 border border-purple-500/20'}">${this.escapeHtml(area.status)}</span>
          </div>
        `).join('');
      }
    }

    if (this.data.pulsarV1) {
      const pv1 = this.data.pulsarV1;
      document.querySelectorAll('[data-info="pulsar-v1-tagline"]').forEach(el => el.textContent = pv1.tagline || '');
      document.querySelectorAll('[data-info="pulsar-v1-status"]').forEach(el => el.textContent = pv1.status || '');
      document.querySelectorAll('[data-info="pulsar-v1-summary"]').forEach(el => el.textContent = pv1.summary || '');
      document.querySelectorAll('[data-info="pulsar-v1-disclaimer"]').forEach(el => el.textContent = pv1.disclaimer || '');

      const specsTable = document.querySelector('[data-info-table="pulsar-v1-specs"]');
      if (specsTable && pv1.designTargets) {
        specsTable.innerHTML = Object.entries(pv1.designTargets).map(([k, v]) => `
          <tr class="border-b border-white/5">
            <td class="py-2.5 text-xs font-mono text-[#9299A6] uppercase">${this.escapeHtml(k.replace(/([A-Z])/g, ' $1'))}</td>
            <td class="py-2.5 text-xs font-semibold text-[#F5F7FA] font-mono text-right">${this.escapeHtml(v)}</td>
          </tr>
        `).join('');
      }
    }
  }

  hydrateResearch() {
    if (!this.data.research?.initiatives) return;
    const r = this.data.research.initiatives;
    const researchContainer = document.querySelector('[data-info-list="research-initiatives"]');
    if (researchContainer) {
      researchContainer.innerHTML = r.map(init => `
        <a href="${this.escapeHtml(init.url)}" class="orbit-card block group hover:border-[#6EA8FF]/40 transition-colors">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono text-[#6EA8FF]">${this.escapeHtml(init.id.toUpperCase())}</span>
            <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-[#9299A6] border border-white/10">${this.escapeHtml(init.status)}</span>
          </div>
          <h3 class="text-base font-semibold text-[#F5F7FA] group-hover:text-[#6EA8FF] transition-colors">${this.escapeHtml(init.name)}</h3>
        </a>
      `).join('');
    }
  }

  hydrateFaq() {
    if (!this.data.faq?.faq) return;
    const faqList = this.data.faq.faq;
    const faqContainer = document.querySelector('[data-info-list="faq-items"]');
    if (faqContainer) {
      faqContainer.innerHTML = faqList.map((item, idx) => `
        <div class="orbit-card p-5">
          <div class="text-xs font-mono text-[#6EA8FF] mb-2">0${idx + 1} — QUESTION</div>
          <h4 class="text-base font-semibold text-[#F5F7FA] mb-2">${this.escapeHtml(item.question)}</h4>
          <p class="text-xs text-[#9299A6] leading-relaxed">${this.escapeHtml(item.answer)}</p>
        </div>
      `).join('');
    }
  }

  hydrateSecurity() {
    if (!this.data.security) return;
    const s = this.data.security;
    document.querySelectorAll('[data-info="security-summary"]').forEach(el => el.textContent = s.summary || '');
  }

  escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

window.OrbitInformationDataEngine = OrbitInformationDataEngine;

// Auto-run if DOM loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.orbitDataEngine = new OrbitInformationDataEngine();
  });
} else {
  window.orbitDataEngine = new OrbitInformationDataEngine();
}
