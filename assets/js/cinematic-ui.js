/**
 * ORBIT — INTERACTIVE UI CONTROLLERS
 * Product simulation, agent inspector, interactive terminal, pricing switcher, and mobile nav.
 */

class OrbitKineticUI {
  constructor() {
    this.initCursor();
    this.initCockpitTabs();
    this.initPromptSimulation();
    this.initPricingToggle();
    this.initAgentInspector();
    this.initMobileNav();
  }

  initCursor() {
    if (window.innerWidth < 768 || window.matchMedia('(hover: none)').matches) return;

    let dot = document.querySelector('.orbit-cursor-dot');
    let ring = document.querySelector('.orbit-cursor-ring');

    if (!dot) {
      dot = document.createElement('div');
      dot.className = 'orbit-cursor-dot';
      document.body.appendChild(dot);
    }

    if (!ring) {
      ring = document.createElement('div');
      ring.className = 'orbit-cursor-ring';
      document.body.appendChild(ring);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }, { passive: true });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    };
    requestAnimationFrame(animateRing);

    // Hover state on links and buttons
    const interactables = document.querySelectorAll('a, button, [role="button"], input, .orbit-card, .agent-node, .workflow-stage-node');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
  }

  initCockpitTabs() {
    const tabs = document.querySelectorAll('[data-cockpit-tab]');
    const views = document.querySelectorAll('[data-cockpit-view]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetView = tab.getAttribute('data-cockpit-tab');

        tabs.forEach(t => t.classList.remove('active'));
        views.forEach(v => {
          v.style.display = 'none';
          v.classList.remove('active');
        });

        tab.classList.add('active');
        const activeView = document.querySelector(`[data-cockpit-view="${targetView}"]`);
        if (activeView) {
          activeView.style.display = 'block';
          activeView.classList.add('active');
        }
      });
    });
  }

  initPromptSimulation() {
    const promptButtons = document.querySelectorAll('[data-sample-prompt]');
    const terminalOutput = document.getElementById('cockpit-stream-output');
    const promptInput = document.getElementById('cockpit-prompt-input');
    const runButton = document.getElementById('cockpit-run-btn');

    const promptScenarios = {
      'launch': {
        prompt: 'Research the best market entry strategy for autonomous AI developer tooling in EU & US.',
        steps: [
          '● [0.08s] Initializing Orbit Reasoning Core with context graph...',
          '● [0.24s] Spawning Research Agent: Querying regulatory frameworks (EU AI Act & US FTC)...',
          '● [0.52s] Spawning Browser Agent: Extracting competitive pricing tables from 14 platforms...',
          '● [0.89s] Spawning Analysis Agent: Calculating gross margin elasticity and compute economics...',
          '✔ [1.42s] Synthesis complete. Generated 12-page executable GTM roadmap with financial projections.'
        ]
      },
      'refactor': {
        prompt: 'Analyze distributed microservice bottlenecks and generate zero-alloc Rust telemetry pipeline.',
        steps: [
          '● [0.05s] Parsing TypeScript AST & tracing memory profiling logs...',
          '● [0.21s] Detected 43ms GC pauses in JSON serialization pipeline.',
          '● [0.47s] Generating zero-copy SIMD-accelerated serde handler in Rust...',
          '● [0.78s] Compiling unit tests with cargo test --release: 48 tests passed (0 failures).',
          '✔ [1.15s] Refactor ready. P99 latency reduced from 84ms to 1.8ms.'
        ]
      },
      'automation': {
        prompt: 'Run weekly multi-source data sync, verify schema integrity, and push summary to stakeholders.',
        steps: [
          '● [0.07s] Connecting to Postgres, Snowflake, and Stripe webhooks...',
          '● [0.33s] Ingested 142,800 records across 18 partition shards.',
          '● [0.65s] Running anomaly detection model: 0 corrupted rows found.',
          '● [0.92s] Dispatching automated verification reports via encrypted webhooks...',
          '✔ [1.28s] Automated sync completed with 100% cryptographic ledger consistency.'
        ]
      }
    };

    const runSimulation = (scenarioKey) => {
      const data = promptScenarios[scenarioKey] || promptScenarios['launch'];
      if (promptInput) promptInput.value = data.prompt;
      if (!terminalOutput) return;

      terminalOutput.innerHTML = '';
      let stepIndex = 0;

      const streamStep = () => {
        if (stepIndex < data.steps.length) {
          const line = document.createElement('div');
          line.className = 'stream-line py-1 text-xs font-mono ' + (stepIndex === data.steps.length - 1 ? 'text-emerald-400 font-semibold' : 'text-[#9299A6]');
          line.textContent = data.steps[stepIndex];
          terminalOutput.appendChild(line);
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
          stepIndex++;
          setTimeout(streamStep, 320);
        }
      };

      streamStep();
    };

    promptButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-sample-prompt');
        runSimulation(key);
      });
    });

    if (runButton && promptInput) {
      runButton.addEventListener('click', () => {
        runSimulation('launch');
      });
    }
  }

  initAgentInspector() {
    const agentNodes = document.querySelectorAll('.agent-node');
    agentNodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        agentNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
      });
    });
  }

  initPricingToggle() {
    const toggle = document.getElementById('billing-toggle');
    const proPrice = document.getElementById('price-pro-val');
    const proPeriod = document.getElementById('price-pro-period');

    if (toggle && proPrice) {
      toggle.addEventListener('change', () => {
        if (toggle.checked) {
          proPrice.textContent = '€8';
          if (proPeriod) proPeriod.textContent = '/ month (billed annually)';
        } else {
          proPrice.textContent = '€10';
          if (proPeriod) proPeriod.textContent = '/ month (billed monthly)';
        }
      });
    }
  }

  initMobileNav() {
    const toggleBtn = document.querySelector('[data-mobile-nav-toggle]');
    const mobileMenu = document.querySelector('.mobile-nav-menu');

    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
      });

      // Close on link click
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
        });
      });
    }
  }
}

window.OrbitKineticUI = OrbitKineticUI;
