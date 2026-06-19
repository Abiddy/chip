import { ArrowRight, CheckCircle2, Cog, Upload } from "lucide-react";
import SectionHeader from "./SectionHeader";
import SectionWatermark from "./SectionWatermark";
import { BentoGrid } from "@/components/ui/bento-grid";

const LENS_WATERMARK = `${process.env.PUBLIC_URL}/lens-logo-watermark.png`;

const steps = [
  {
    title: "Drop in your netlist",
    meta: "Phase I",
    description:
      "Bring your existing SPICE or Verilog-A files. ACE plugs into your flow with zero rewrites and respects your toolchain.",
    icon: <Upload className="size-4 text-blue-500" />,
    status: "Compatible",
    tags: ["SPICE", "Netlist"],
  },
  {
    title: "Run with intelligence",
    meta: "Phase II",
    description:
      "ACE simulates with full SPICE accuracy at 150× speed, then routes signal anomalies through an AI debug layer.",
    icon: <Cog className="size-4 text-emerald-500" />,
    status: "+150× Speed",
    tags: ["AI", "Simulation"],
    hasPersistentHover: true,
  },
  {
    title: "Tape out with confidence",
    meta: "Phase III",
    description:
      "Pass-fail verdicts you can trust. Clean coverage reports. Zero false alarms. Get back to designing, not chasing flags.",
    icon: <CheckCircle2 className="size-4 text-purple-500" />,
    status: "0.0% Error",
    tags: ["Sign-off", "Coverage"],
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
      <SectionWatermark
        src={LENS_WATERMARK}
        position="top-left"
        size="sm"
        blend="screen"
        imageClassName="opacity-[0.08] md:opacity-[0.12]"
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

        <BentoGrid
          items={steps}
          className="grid-cols-1 md:grid-cols-3 gap-3"
        />

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
