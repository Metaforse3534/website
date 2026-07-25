/**
 * Orbit AI — hero orbital infrastructure animation
 */
(() => {
  function initHero(canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;

    const nodes = Array.from({ length: 28 }, (_, i) => ({
      a: (i / 28) * Math.PI * 2,
      r: 0.22 + (i % 5) * 0.08,
      s: 0.002 + (i % 7) * 0.00035,
      size: 1.5 + (i % 4) * 0.6,
    }));

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.5;
      const cy = h * 0.5;
      const scale = Math.min(w, h);

      // rings
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, scale * (0.18 + i * 0.09), scale * (0.12 + i * 0.07), Math.PI / 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(154,167,255,${0.08 + i * 0.03})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // core
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 0.12);
      grd.addColorStop(0, "rgba(247,247,251,0.9)");
      grd.addColorStop(0.35, "rgba(154,167,255,0.55)");
      grd.addColorStop(1, "rgba(154,167,255,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, scale * 0.12, 0, Math.PI * 2);
      ctx.fill();

      const points = nodes.map((n) => {
        const angle = n.a + t * n.s * 60;
        const x = cx + Math.cos(angle) * scale * n.r;
        const y = cy + Math.sin(angle) * scale * n.r * 0.72;
        return { x, y, size: n.size };
      });

      // links
      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < scale * 0.22) {
            ctx.strokeStyle = `rgba(154,167,255,${0.18 * (1 - dist / (scale * 0.22))})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(247,247,251,0.85)";
        ctx.fill();
      });

      // signal sweep
      const sweep = (t * 0.4) % (Math.PI * 2);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, scale * 0.42, sweep, sweep + 0.35);
      ctx.closePath();
      ctx.fillStyle = "rgba(125,211,252,0.06)";
      ctx.fill();
    }

    function frame() {
      t += 0.016;
      draw();
      raf = requestAnimationFrame(frame);
    }

    resize();
    draw();
    if (!reduced) raf = requestAnimationFrame(frame);

    window.addEventListener("resize", () => {
      resize();
      draw();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        raf = requestAnimationFrame(frame);
      }
    });
  }

  function boot() {
    const canvas = document.querySelector("[data-hero-canvas]");
    if (canvas) initHero(canvas);
  }

  document.documentElement.addEventListener("orbit:includes-ready", boot);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.querySelector("[data-hero-canvas]")) boot();
    });
  } else {
    boot();
  }
})();
