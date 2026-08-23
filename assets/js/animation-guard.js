(function () {
  'use strict';

  const root = document.documentElement;

  function enableFallback(reason) {
    root.classList.add('orbit-animation-fallback');
    if (reason) {
      console.warn('Orbit animation fallback enabled:', reason);
    }
  }

  function createSafely(name, Constructor) {
    if (typeof Constructor !== 'function') {
      enableFallback(name + ' is unavailable');
      return null;
    }

    try {
      return new Constructor();
    } catch (error) {
      enableFallback(name + ' could not start');
      console.warn(error);
      return null;
    }
  }

  function clearStrandedAnimation(element) {
    const styles = window.getComputedStyle(element);
    if (styles.visibility !== 'hidden' && Number.parseFloat(styles.opacity) > 0.04) return;

    if (window.gsap?.set) {
      window.gsap.set(element, { clearProps: 'opacity,visibility,transform' });
    } else {
      element.style.removeProperty('opacity');
      element.style.removeProperty('visibility');
      element.style.removeProperty('transform');
    }
    element.classList.add('orbit-animation-recovered');
  }

  function watchAnimatedContent() {
    const selector = [
      '.hero-orbital-mark',
      '.hero-badge',
      '.hero-headline',
      '.hero-lead',
      '.hero-cta-group',
      '.orbital-hero-stats',
      '.model-provider',
      '.intel-node',
      '.reason-step',
      '.product-app',
      '.agent-node',
      '.os-module',
      '.why-orbit-item',
      '.pricing-card',
      '.final-cta-content'
    ].join(',');
    const elements = Array.from(document.querySelectorAll(selector));

    if (!('IntersectionObserver' in window)) {
      elements.forEach(clearStrandedAnimation);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        window.setTimeout(() => clearStrandedAnimation(entry.target), 900);
      });
    }, { rootMargin: '80px 0px', threshold: 0.02 });

    elements.forEach((element) => observer.observe(element));
  }

  function initialize() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      root.classList.add('orbit-reduced-motion');
    }

    window.orbitKineticEngine = createSafely('3D engine', window.OrbitKineticEngine);
    window.orbitKineticTimeline = createSafely('motion timeline', window.OrbitKineticTimeline);
    window.orbitKineticUI = createSafely('interface motion', window.OrbitKineticUI);

    if (typeof window.gsap !== 'object' && typeof window.gsap !== 'function') {
      enableFallback('GSAP did not load');
    }

    root.classList.add('orbit-animation-ready');
    watchAnimatedContent();
  }

  window.orbitAnimationDependencyFailed = function (name) {
    enableFallback(name + ' failed to load');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }

  window.addEventListener('pageshow', function (event) {
    if (event.persisted) root.classList.add('orbit-animation-ready');
  });
})();
