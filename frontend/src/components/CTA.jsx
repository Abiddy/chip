import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section
      id="cta"
      data-testid="cta-section"
      className="relative py-32 md:py-44 border-t border-border overflow-hidden"
    >
      {/* subtle amber glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 bottom-0 w-[1200px] h-[600px] -translate-x-1/2 translate-y-1/3"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(52,211,153,0.35) 0%, rgba(52,211,153,0.1) 30%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>
      <div className="circuit-bg opacity-25" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <span className="mono text-[10px] text-teal-600 mb-6 block">
          Ready when you are
        </span>
        <h2 className="serif text-5xl md:text-7xl leading-[0.98] tracking-tight mb-8">
          Stop waiting on
          <br />
          <span className="accent">verification.</span>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Join the analog teams shipping faster, cleaner silicon with ACE.
          Book a 30-minute demo and see your own design simulated in real
          time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://calendly.com/lenseda"
            target="_blank"
            rel="noreferrer"
            data-testid="cta-book-demo"
            className="btn-primary"
          >
            Book a demo
            <ArrowUpRight size={16} />
          </a>
          <a
            href="https://lenseda.com/ace-roi.html"
            target="_blank"
            rel="noreferrer"
            data-testid="cta-roi-link"
            className="btn-ghost"
          >
            Calculate your savings
          </a>
        </div>

        <p className="mono text-[10px] text-muted-foreground mt-12">
          No commitments · 30-minute walkthrough · Bring your own netlist
        </p>
      </div>
    </section>
  );
}
