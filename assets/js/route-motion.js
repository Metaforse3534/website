(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer;

  const show = (element) => {
    element.classList.add('active', 'rm-visible');
    element.style.willChange = 'auto';
    observer?.unobserve(element);
  };

  const revealEverything = () => {
    document.querySelectorAll('.reveal, .rm-reveal').forEach(show);
  };

  const revealNearViewport = () => {
    document.querySelectorAll('.reveal:not(.rm-visible), .rm-reveal:not(.rm-visible)').forEach((element) => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 1.2 && bounds.bottom > -120) show(element);
    });
  };

  const initialize = () => {
    root.classList.add('rm-motion-ready');
    const candidates = [
      ...document.querySelectorAll('.reveal'),
      ...document.querySelectorAll('main > section, main > .section, .section-wrap > section, .orbit-card, .glass-card, .panel, .pricing-card, .support-card'),
    ];
    const uniqueCandidates = [...new Set(candidates)];
    uniqueCandidates.forEach((element, index) => {
      element.classList.add('rm-reveal');
      element.style.setProperty('--rm-delay', `${Math.min(index % 4, 3) * 55}ms`);
    });

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      revealEverything();
    } else {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) show(entry.target);
        });
      }, { rootMargin: '80px 0px -5% 0px', threshold: 0.015 });
      uniqueCandidates.forEach((element) => observer.observe(element));
    }

    requestAnimationFrame(() => root.classList.add('rm-loaded'));
    window.setTimeout(revealNearViewport, 1200);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) revealEverything();
  });
  let scrollFrame = 0;
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      revealNearViewport();
      scrollFrame = 0;
    });
  }, { passive: true });
  reducedMotion.addEventListener?.('change', (event) => {
    if (event.matches) revealEverything();
  });
})();
