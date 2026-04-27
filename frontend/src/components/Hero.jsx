import { ArrowUpRight, Activity } from "lucide-react";

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative min-h-[100vh] pt-24 pb-20 flex items-center"
    >
      {/* layered backgrounds */}
      <div className="hero-glow" aria-hidden="true" />
      <div className="circuit-bg" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {/* corner frame box (Ankar style) */}
      <div className="frame-box hidden md:block" aria-hidden="true">
        <div
          className="frame-line"
          style={{ left: "6%", right: "6%", top: "30%", height: "1px" }}
        />
        <div
          className="frame-line"
          style={{ left: "6%", right: "6%", bottom: "12%", height: "1px" }}
        />
        <div className="frame-corner" style={{ left: "6%", top: "30%", transform: "translate(-50%,-50%)" }} />
        <div className="frame-corner" style={{ right: "6%", top: "30%", transform: "translate(50%,-50%)" }} />
        <div className="frame-corner" style={{ left: "6%", bottom: "12%", transform: "translate(-50%,50%)" }} />
        <div className="frame-corner" style={{ right: "6%", bottom: "12%", transform: "translate(50%,50%)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 w-full text-center">
        <div className="reveal-fade flex justify-center mb-8" style={{ animationDelay: "0.1s" }}>
          <span className="tag-pill" data-testid="hero-tag">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8a3d] pulse-dot" />
            <span className="mono">ACE — Analog Verification Engine</span>
          </span>
        </div>

        <h1
          data-testid="hero-headline"
          className="serif reveal-up text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-tight mb-6"
          style={{ animationDelay: "0.2s" }}
        >
          Verification, at
          <br />
          <span className="italic text-[#ffb070]">silicon speed.</span>
        </h1>

        <p
          data-testid="hero-subline"
          className="reveal-up max-w-2xl mx-auto text-base md:text-lg text-[#b9b3a7] leading-relaxed mb-10"
          style={{ animationDelay: "0.4s" }}
        >
          Lens eliminates analog verification bottlenecks at 12&nbsp;nm and
          beyond. 100% accurate. 150&times; faster. Built from the silicon up
          for the way modern teams tape out.
        </p>

        <div
          className="reveal-up flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="#cta"
            data-testid="hero-book-demo"
            className="btn-primary"
          >
            Book a demo
            <ArrowUpRight size={16} />
          </a>
          <a href="#product" data-testid="hero-secondary-cta" className="btn-ghost">
            <Activity size={14} />
            See ACE in action
          </a>
        </div>

        {/* live ticker — small chip-style stat strip */}
        <div
          className="reveal-fade max-w-3xl mx-auto"
          style={{ animationDelay: "0.9s" }}
        >
          <div className="grid grid-cols-3 gap-px bg-[#ffffff10] border border-[#ffffff10] backdrop-blur-md">
            {[
              { k: "Speed", v: "150×" },
              { k: "Accuracy", v: "100%" },
              { k: "Process", v: "≤12nm" },
            ].map((s) => (
              <div
                key={s.k}
                data-testid={`hero-ticker-${s.k.toLowerCase()}`}
                className="bg-[#050505]/90 px-6 py-5 flex flex-col items-center"
              >
                <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#6b6660] mb-1">
                  {s.k}
                </span>
                <span className="serif text-2xl md:text-3xl text-[#f5f3ee]">
                  {s.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
