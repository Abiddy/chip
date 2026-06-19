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
import SectionHeader from "./SectionHeader";
import SectionWatermark from "./SectionWatermark";
import { BentoGrid } from "@/components/ui/bento-grid";

const LENS_WATERMARK = `${process.env.PUBLIC_URL}/lens-logo.png`;

const features = [
  {
    title: "Built for AMS",
    description:
      "Engineered ground-up for analog and mixed-signal design — not retrofitted from digital legacy tools.",
    icon: <Cpu className="size-4 text-blue-500" />,
    status: "01",
    tags: ["AMS", "Analog"],
  },
  {
    title: "Low memory footprint",
    description:
      "Run massive nets on a single workstation. Forget heavyweight server clusters for routine verification.",
    icon: <HardDrive className="size-4 text-emerald-500" />,
    status: "02",
    tags: ["Memory", "Workstation"],
  },
  {
    title: "Minimal false alarms",
    description:
      "Signal-aware analysis catches the real bugs and ignores the noise — so engineers stop chasing ghosts.",
    icon: <ShieldCheck className="size-4 text-purple-500" />,
    status: "03",
    tags: ["Signal-Aware", "Accuracy"],
  },
  {
    title: "Multi-node operation",
    description:
      "From 28 nm down to 3 nm. ACE adapts to your process and scales with your design complexity.",
    icon: <Layers className="size-4 text-sky-500" />,
    status: "04",
    tags: ["28nm", "3nm"],
  },
  {
    title: "Lightning-fast runs",
    meta: "+150× Faster",
    description:
      "Sweep more corners, run more scenarios, and ship in fewer revisions with optimized engine cycles.",
    icon: <Gauge className="size-4 text-blue-500" />,
    status: "05",
    tags: ["Speed", "Corners"],
    hasPersistentHover: true,
  },
  {
    title: "AI-driven debugging",
    description:
      "Trace failures back to their root cause automatically. From red flag to fix without manual hunting.",
    icon: <Sparkles className="size-4 text-emerald-500" />,
    status: "06",
    tags: ["AI", "Debug"],
  },
  {
    title: "Insightful simulation",
    description:
      "Deep visibility into every node, every transition. See what your circuit is actually doing in real-time.",
    icon: <LineChart className="size-4 text-purple-500" />,
    status: "07",
    tags: ["Visibility", "Real-time"],
  },
  {
    title: "Easy integration",
    description:
      "Drop-in compatibility with Cadence, Synopsys, and Siemens flows. No rewrite. No retraining.",
    icon: <Plug className="size-4 text-sky-500" />,
    status: "08",
    tags: ["Cadence", "Synopsys"],
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
      <SectionWatermark
        src={LENS_WATERMARK}
        position="bottom-right"
        size="default"
        blend="screen"
        imageClassName="opacity-[0.08] md:opacity-[0.12]"
      />

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

        <BentoGrid
          items={features}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
        />

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
