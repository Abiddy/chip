import { useEffect, useRef } from "react";

/**
 * Pen-stroke cursor trail.
 * - Smoothly draws a thin tapered line following the pointer.
 * - Stroke fades from tip (newest) to tail and disappears when idle.
 * - Auto-disabled on touch / reduced-motion.
 * - pointer-events: none so it never blocks UI.
 */
export default function CursorGlow() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const points = []; // {x, y, t}
    const MAX_AGE = 700; // ms — total lifetime of a point
    let raf = 0;

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
      const t = performance.now();
      const last = points[points.length - 1];
      // light dedupe so we don't pile up identical points
      if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) < 1.2)
        return;
      points.push({ x: e.clientX, y: e.clientY, t });
      if (points.length > 160) points.splice(0, points.length - 160);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      const now = performance.now();
      // expire old points
      while (points.length && now - points[0].t > MAX_AGE) points.shift();

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      if (points.length >= 2) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // draw segment by segment so each can have its own width + alpha
        for (let i = 1; i < points.length; i++) {
          const p0 = points[i - 1];
          const p1 = points[i];
          // age = how old the *newer* of the pair is (0 = fresh, 1 = expiring)
          const age = (now - p1.t) / MAX_AGE;
          if (age >= 1) continue;
          const ease = 1 - age; // linear fade-out
          const alpha = 0.85 * ease * ease; // gentle quadratic falloff
          const width = 1.6 * (0.35 + ease * 0.65); // tapers from ~1.6 down to ~0.6

          // soft outer glow pass
          ctx.strokeStyle = `rgba(110, 231, 183, ${alpha * 0.18})`;
          ctx.lineWidth = width * 4.5;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();

          // crisp inner stroke
          ctx.strokeStyle = `rgba(167, 243, 208, ${alpha})`;
          ctx.lineWidth = width;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="cursor-stroke-canvas"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[60]"
    />
  );
}
