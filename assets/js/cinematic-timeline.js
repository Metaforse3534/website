/**
 * ORBIT — CINEMATIC CONTINUOUS SCENE TIMELINE
 * Lenis smooth scrolling + GSAP ScrollTrigger orchestrated timeline.
 */

class OrbitKineticTimeline {
  constructor() {
    this.lenis = null;
    this.webglEngine = null;
    this.init();
  }

  init() {
    this.initLenis();
    this.initNavScroll();
    this.initGSAPAnimations();
  }

  initLenis() {
    if (typeof Lenis !== 'undefined') {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        infinite: false,
      });

      const raf = (time) => {
        this.lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      if (typeof ScrollTrigger !== 'undefined') {
        this.lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          this.lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }
    }
  }

  initNavScroll() {
    const nav = document.querySelector('.orbit-nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not found');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero Entry Animation
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });
    
    heroTl
      .from('.hero-orbital-mark', { opacity: 0, scale: 0.5, duration: 1.4, ease: 'back.out(1.7)' })
      .from('.hero-badge', { opacity: 0, y: 15, duration: 0.8 }, '-=0.8')
      .from('.hero-headline', { opacity: 0, y: 35, duration: 1.1 }, '-=0.6')
      .from('.hero-lead', { opacity: 0, y: 20, duration: 0.9 }, '-=0.7')
      .from('.hero-cta-group', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
      .from('.orbital-hero-stats', { opacity: 0, y: 25, duration: 0.9 }, '-=0.5');

    // Section 01: Intelligence Network Assembly
    gsap.from('.intel-node', {
      scrollTrigger: {
        trigger: '#intelligence-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      scale: 0.85,
      y: 30,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out'
    });

    // Section 02: Reason Task Pipeline
    gsap.from('.reason-step', {
      scrollTrigger: {
        trigger: '#reason-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: -30,
      stagger: 0.18,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Section 03: Product Workspace Reveal
    gsap.from('.cockpit-frame', {
      scrollTrigger: {
        trigger: '#product-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      scale: 0.96,
      duration: 1.2,
      ease: 'power3.out'
    });

    // Section 04: Agents Swarm Activation
    gsap.from('.agent-node', {
      scrollTrigger: {
        trigger: '#agents-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 40,
      stagger: 0.12,
      duration: 0.8,
      ease: 'back.out(1.4)'
    });

    // Section 06: Speed Transition Trigger
    ScrollTrigger.create({
      trigger: '#speed-section',
      start: 'top 65%',
      end: 'bottom 35%',
      onEnter: () => {
        if (window.orbitKineticEngine) {
          window.orbitKineticEngine.setSpeedBoost(true);
        }
      },
      onLeave: () => {
        if (window.orbitKineticEngine) {
          window.orbitKineticEngine.setSpeedBoost(false);
        }
      },
      onEnterBack: () => {
        if (window.orbitKineticEngine) {
          window.orbitKineticEngine.setSpeedBoost(true);
        }
      },
      onLeaveBack: () => {
        if (window.orbitKineticEngine) {
          window.orbitKineticEngine.setSpeedBoost(false);
        }
      }
    });

    // Section 07: Orbit OS Architectural Expansion
    gsap.from('.os-module', {
      scrollTrigger: {
        trigger: '#os-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      scale: 0.9,
      y: 35,
      stagger: 0.1,
      duration: 0.9,
      ease: 'power3.out'
    });

    // Section 09: Why Orbit Big Typography statements
    gsap.utils.toArray('.why-orbit-item').forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        duration: 1.0,
        ease: 'power3.out'
      });
    });

    // Section 10: Pricing Cards
    gsap.from('.pricing-card', {
      scrollTrigger: {
        trigger: '#pricing-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 45,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power2.out'
    });

    // Section 11: Final CTA
    gsap.from('.final-cta-content', {
      scrollTrigger: {
        trigger: '#cta-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      scale: 0.92,
      duration: 1.3,
      ease: 'power3.out'
    });
  }
}

window.OrbitKineticTimeline = OrbitKineticTimeline;
