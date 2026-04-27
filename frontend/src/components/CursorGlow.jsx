import { useEffect, useRef } from "react";

/**
 * Professional cursor glow trail.
 * - Canvas-based for 60fps performance.
 * - Amber particles emitted on movement, decay over ~900ms.
 * - Auto-disabled on touch / reduced-motion.
 * - pointer-events: none so it never blocks UI.
 */
export default function CursorGlow() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    mouse: { x: -9999, y: -9999, prevX: -9999, prevY: -9999 },
    halo: { x: -9999, y: -9999, tx: -9999, ty: -9999, alpha: 0 },
    raf: 0,
    lastEmit: 0,
  });

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isTouch || reduced) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const state = stateRef.current;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const m = state.mouse;
      m.prevX = m.x === -9999 ? e.clientX : m.x;
      m.prevY = m.y === -9999 ? e.clientY : m.y;
      m.x = e.clientX;
      m.y = e.clientY;

      // halo target follows the cursor
      state.halo.tx = e.clientX;
      state.halo.ty = e.clientY;
      if (state.halo.x === -9999) {
        state.halo.x = e.clientX;
        state.halo.y = e.clientY;
      }

      // throttle particle emission
      const now = performance.now();
      if (now - state.lastEmit < 16) return;
      state.lastEmit = now;

      const dx = m.x - m.prevX;
      const dy = m.y - m.prevY;
      const speed = Math.min(Math.hypot(dx, dy), 80);

      // emit 1-3 particles depending on speed
      const count = 1 + Math.floor(speed / 24);
      for (let i = 0; i < count; i++) {
        const t = i / count;
        state.particles.push({
          x: m.prevX + dx * t + (Math.random() - 0.5) * 6,
          y: m.prevY + dy * t + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4 - 0.05,
          life: 0,
          maxLife: 700 + Math.random() * 350,
          size: 14 + Math.random() * 18 + speed * 0.18,
          hueShift: Math.random() * 0.15,
        });
      }
      // cap to avoid runaway lists
      if (state.particles.length > 220) {
        state.particles.splice(0, state.particles.length - 220);
      }
    };

    const onLeave = () => {
      state.halo.alpha = 0;
      state.halo.x = -9999;
      state.halo.y = -9999;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    let last = performance.now();
    const tick = (now) => {
      const dt = now - last;
      last = now;

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // soft halo following cursor (lerp)
      const h = state.halo;
      if (h.tx !== -9999) {
        h.x += (h.tx - h.x) * Math.min(0.18, dt / 80);
        h.y += (h.ty - h.y) * Math.min(0.18, dt / 80);
        h.alpha += (1 - h.alpha) * 0.05;

        const haloSize = 140;
        const grad = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, haloSize);
        grad.addColorStop(0, `rgba(255, 176, 112, ${0.18 * h.alpha})`);
        grad.addColorStop(0.4, `rgba(255, 138, 61, ${0.07 * h.alpha})`);
        grad.addColorStop(1, "rgba(255, 138, 61, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(h.x, h.y, haloSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // particles
      ctx.globalCompositeOperation = "lighter";
      const next = [];
      for (let i = 0; i < state.particles.length; i++) {
        const p = state.particles[i];
        p.life += dt;
        if (p.life >= p.maxLife) continue;
        const t = p.life / p.maxLife;
        const ease = 1 - t * t * t; // cubic ease-out
        const alpha = ease * 0.55;

        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.005; // slight upward drift

        const size = p.size * (1 - t * 0.55);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
        grad.addColorStop(0, `rgba(255, 200, 140, ${alpha})`);
        grad.addColorStop(
          0.35,
          `rgba(255, 138, 61, ${alpha * 0.55})`
        );
        grad.addColorStop(1, "rgba(255, 138, 61, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        next.push(p);
      }
      state.particles = next;
      ctx.globalCompositeOperation = "source-over";

      state.raf = requestAnimationFrame(tick);
    };
    state.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(state.raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="cursor-glow-canvas"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[60] mix-blend-screen"
    />
  );
}
