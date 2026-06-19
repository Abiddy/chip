import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Gauge,
  HardDrive,
  Layers,
  LineChart,
  Plug,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SectionHeader, { SpecBadge } from "./SectionHeader";

const features = [
  {
    icon: Cpu,
    name: "Built for AMS",
    desc: "Engineered ground-up for analog and mixed-signal design — not retrofitted from digital legacy tools.",
  },
  {
    icon: HardDrive,
    name: "Low memory footprint",
    desc: "Run massive nets on a single workstation. Forget heavyweight server clusters for routine verification.",
  },
  {
    icon: ShieldCheck,
    name: "Minimal false alarms",
    desc: "Signal-aware analysis catches the real bugs and ignores the noise — so engineers stop chasing ghosts.",
  },
  {
    icon: Layers,
    name: "Multi-node operation",
    desc: "From 28 nm down to 3 nm. ACE adapts to your process and scales with your design complexity.",
  },
  {
    icon: Gauge,
    name: "Lightning-fast runs",
    desc: "Sweep more corners, run more scenarios, and ship in fewer revisions with optimized engine cycles.",
    badge: "+150× Faster",
  },
  {
    icon: Sparkles,
    name: "AI-driven debugging",
    desc: "Trace failures back to their root cause automatically. From red flag to fix without manual hunting.",
  },
  {
    icon: LineChart,
    name: "Insightful simulation",
    desc: "Deep visibility into every node, every transition. See what your circuit is actually doing in real-time.",
  },
  {
    icon: Plug,
    name: "Easy integration",
    desc: "Drop-in compatibility with Cadence, Synopsys, and Siemens flows. No rewrite. No retraining.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      data-testid="features-section"
      className="relative py-32 md:py-40 border-t border-border overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(108,122,117,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(108,122,117,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          label="02 — Capabilities"
          title={
            <h2 className="serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Why ACE <span className="accent">stands out.</span>
            </h2>
          }
          description="Eight capabilities, one verified outcome — silicon that ships faster and works the first time. Engineered for the next generation of analog complexity."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-border">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.name}
                data-testid={`feature-card-${i}`}
                className="group relative bg-white p-8 border-r border-b border-border transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:-translate-y-0.5"
              >
                <div className="flex justify-between items-start mb-12">
                  <Icon
                    size={32}
                    strokeWidth={1.4}
                    className="text-teal-600"
                  />
                  <span className="mono text-[10px] text-muted-foreground">
                    / {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="serif text-xl md:text-2xl mb-4">{f.name}</h3>
                {f.badge && (
                  <SpecBadge className="mb-4">{f.badge}</SpecBadge>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 p-10 bg-slate-900 rounded-xl text-white">
          <div>
            <h4 className="serif text-xl md:text-2xl mb-2">Ready to benchmark?</h4>
            <p className="text-slate-400 text-sm md:text-base">
              Compare ACE against your legacy engine in a production-scale
              simulation.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 bg-teal-500 text-white px-8 py-3 rounded-lg mono text-[11px] hover:bg-teal-600 transition-colors"
            >
              Request Benchmark
              <ArrowRight size={14} />
            </a>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-3 rounded-lg mono text-[11px] hover:bg-white/10 transition-colors"
            >
              Watch Demo
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
