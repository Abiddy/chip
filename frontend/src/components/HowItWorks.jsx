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
      className="relative py-32 md:py-40 border-t border-border bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div className="max-w-2xl">
            <span className="mono text-[10px] text-teal-600 mb-4 block">
              03 — Workflow
            </span>
            <h2 className="serif text-5xl md:text-6xl leading-[1.02] tracking-tight">
              From netlist to{" "}
              <span className="accent">tape-out.</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed">
            Three steps. No detours. No false alarms. Designed by engineers
            who&apos;ve lived the bottleneck.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                data-testid={`workflow-step-${i}`}
                className="relative bg-background p-8 md:p-10 group hover:bg-muted/50 transition-colors duration-500"
              >
                <div className="flex items-center justify-between mb-12">
                  <span className="serif text-5xl text-slate-200 group-hover:text-teal-600 transition-colors duration-500">
                    {s.n}
                  </span>
                  <Icon
                    size={22}
                    strokeWidth={1.4}
                    className="text-muted-foreground group-hover:text-teal-600 transition-colors duration-500"
                  />
                </div>
                <h3 className="serif text-2xl md:text-3xl mb-4 text-foreground">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>

                {i < steps.length - 1 && (
                  <span className="hidden md:block absolute top-1/2 -right-3 w-5 h-px bg-teal-600/40" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
