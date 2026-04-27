import {
  Cpu,
  HardDrive,
  ShieldCheck,
  Layers,
  Gauge,
  Sparkles,
  LineChart,
  Plug,
} from "lucide-react";

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
    desc: "150× faster simulation cycles. Sweep more corners, run more scenarios, ship in fewer revisions.",
  },
  {
    icon: Sparkles,
    name: "AI-driven debugging",
    desc: "Trace failures back to their root cause automatically. From red flag to fix without manual hunting.",
  },
  {
    icon: LineChart,
    name: "Insightful simulation",
    desc: "Deep visibility into every node, every transition. See what your circuit is actually doing.",
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
      className="relative py-32 md:py-40 border-t border-[#ffffff0d]"
    >
      <div className="absolute inset-0 circuit-bg opacity-30" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="mono text-[10px] uppercase tracking-[0.25em] text-[#ff8a3d] mb-4 block">
            02 — Capabilities
          </span>
          <h2 className="serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
            Why ACE
            <br />
            <span className="accent">stands out.</span>
          </h2>
          <p className="text-[#b9b3a7] text-base md:text-lg max-w-xl mt-6 leading-relaxed">
            Eight capabilities, one verified outcome — silicon that ships
            faster and works the first time.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#ffffff0d] border border-[#ffffff0d]">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.name}
                data-testid={`feature-card-${i}`}
                className="feature-card bg-[#050505] hover:bg-[#0a0a0b]"
              >
                <Icon
                  size={26}
                  strokeWidth={1.4}
                  className="feature-icon text-[#ff8a3d] mb-7"
                />
                <h3 className="serif text-xl mb-3 text-[#f5f3ee]">{f.name}</h3>
                <p className="text-sm text-[#b9b3a7] leading-relaxed">
                  {f.desc}
                </p>
                <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#6b6660] absolute top-5 right-5">
                  / {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
