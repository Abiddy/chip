import { ArrowRight, CheckCircle2, Cog, Upload } from "lucide-react";
import SectionHeader, { SpecBadge } from "./SectionHeader";

const steps = [
  {
    n: "01",
    phase: "Phase I",
    icon: Upload,
    title: "Drop in your netlist",
    desc: "Bring your existing SPICE or Verilog-A files. ACE plugs into your flow with zero rewrites and respects your toolchain.",
    badge: "Compatible",
    bg: "bg-slate-50",
  },
  {
    n: "02",
    phase: "Phase II",
    icon: Cog,
    title: "Run with intelligence",
    desc: "ACE simulates with full SPICE accuracy at 150× speed, then routes signal anomalies through an AI debug layer.",
    badge: "+150× Speed",
    bg: "bg-white",
  },
  {
    n: "03",
    phase: "Phase III",
    icon: CheckCircle2,
    title: "Tape out with confidence",
    desc: "Pass-fail verdicts you can trust. Clean coverage reports. Zero false alarms. Get back to designing, not chasing flags.",
    badge: "0.0% Error",
    bg: "bg-slate-50",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      data-testid="how-it-works"
      className="relative py-32 md:py-40 border-t border-border overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(226,232,240,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(226,232,240,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <SectionHeader
              label="03 — Workflow"
              title={
                <h2 className="serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                  From netlist to{" "}
                  <span className="accent">tape-out.</span>
                </h2>
              }
              className="mb-0"
            />
          </div>
          <p className="text-muted-foreground text-base md:text-lg max-w-sm leading-relaxed">
            Three steps. No detours. No false alarms. Designed by engineers
            who&apos;ve lived the bottleneck.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          <div className="hidden md:block absolute top-[40%] left-0 w-full h-px bg-border/60 -z-10" />

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                data-testid={`workflow-step-${i}`}
                className={`relative ${s.bg} border border-border p-8 md:p-10 transition-all duration-500 hover:z-10 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:-translate-y-1`}
              >
                <div className="absolute top-8 right-8 text-teal-600">
                  <Icon size={32} strokeWidth={1.4} />
                </div>
                <span
                  className="serif text-[120px] absolute -bottom-4 -right-2 leading-none opacity-[0.07] text-teal-800 pointer-events-none select-none"
                  aria-hidden="true"
                >
                  {s.n}
                </span>
                <div className="relative z-10">
                  <span className="mono text-[10px] text-teal-600 mb-12 block">
                    {s.phase}
                  </span>
                  <h3 className="serif text-2xl md:text-3xl mb-4">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
                    {s.desc}
                  </p>
                  <div className="mt-12">
                    <SpecBadge>{s.badge}</SpecBadge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-24 bg-slate-900 rounded-lg p-10 md:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <h3 className="serif text-2xl md:text-3xl text-white mb-4">
              Ready to accelerate your next node?
            </h3>
            <p className="text-slate-400 mb-10 leading-relaxed">
              Join the semiconductor leaders already leveraging ACE simulation
              for deep-submicron verification.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#cta"
                className="inline-flex items-center gap-2 bg-teal-500 text-slate-900 px-8 py-4 rounded-lg mono text-[11px] font-semibold hover:bg-teal-400 transition-colors"
              >
                Request Demo
              </a>
              <a
                href="#performance"
                className="inline-flex items-center gap-2 border border-slate-600 text-slate-300 px-8 py-4 rounded-lg mono text-[11px] hover:bg-slate-800 transition-colors"
              >
                View Benchmarks
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
