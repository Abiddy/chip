import { Upload, Cog, CheckCircle2 } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Upload,
    title: "Drop in your netlist",
    desc: "Bring your existing SPICE or Verilog-A files. ACE plugs into your flow with zero rewrites and respects your toolchain.",
  },
  {
    n: "02",
    icon: Cog,
    title: "Run with intelligence",
    desc: "ACE simulates with full SPICE accuracy at 150× speed, then routes signal anomalies through an AI debug layer that surfaces root causes — not symptoms.",
  },
  {
    n: "03",
    icon: CheckCircle2,
    title: "Tape out with confidence",
    desc: "Pass-fail verdicts you can trust. Clean coverage reports. Zero false alarms. Get back to designing, not chasing flags.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      data-testid="how-it-works"
      className="relative py-32 md:py-40 border-t border-[#ffffff0d] bg-[#070708]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div className="max-w-2xl">
            <span className="mono text-[10px] uppercase tracking-[0.25em] text-[#4dd4ff] mb-4 block">
              03 — Workflow
            </span>
            <h2 className="serif text-5xl md:text-6xl leading-[1.02] tracking-tight">
              From netlist to{" "}
              <span className="accent">tape-out.</span>
            </h2>
          </div>
          <p className="text-[#b9b3a7] text-base md:text-lg max-w-md leading-relaxed">
            Three steps. No detours. No false alarms. Designed by engineers
            who&apos;ve lived the bottleneck.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[#ffffff0d]">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                data-testid={`workflow-step-${i}`}
                className="relative bg-[#050505] p-8 md:p-10 group hover:bg-[#0a0a0b] transition-colors duration-500"
              >
                <div className="flex items-center justify-between mb-12">
                  <span className="serif text-5xl text-[#1a1715] group-hover:text-[#4dd4ff] transition-colors duration-500">
                    {s.n}
                  </span>
                  <Icon
                    size={22}
                    strokeWidth={1.4}
                    className="text-[#6b6660] group-hover:text-[#93e8ff] transition-colors duration-500"
                  />
                </div>
                <h3 className="serif text-2xl md:text-3xl mb-4 text-[#f5f3ee]">
                  {s.title}
                </h3>
                <p className="text-sm text-[#b9b3a7] leading-relaxed">
                  {s.desc}
                </p>

                {i < steps.length - 1 && (
                  <span className="hidden md:block absolute top-1/2 -right-3 w-5 h-px bg-[#4dd4ff]/40" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
