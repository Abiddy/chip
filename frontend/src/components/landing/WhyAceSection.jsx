import {
  Cpu,
  Gauge,
  HardDrive,
  Layers,
  LineChart,
  Plug,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const FEATURES = [
  {
    icon: Cpu,
    title: "Built for AMS",
    description:
      "Engineered ground-up for analog and mixed-signal design — not retrofitted from digital legacy tools.",
  },
  {
    icon: HardDrive,
    title: "Low memory footprint",
    description:
      "Run massive nets on a single workstation without heavyweight server clusters.",
  },
  {
    icon: ShieldCheck,
    title: "Minimal false alarms",
    description:
      "Signal-aware analysis catches real bugs and ignores noise — stop chasing ghosts.",
  },
  {
    icon: Layers,
    title: "Multi-node operation",
    description:
      "From 28 nm down to 3 nm. ACE adapts to your process and design complexity.",
  },
  {
    icon: Gauge,
    title: "Lightning-fast runs",
    description:
      "Sweep more corners and ship in fewer revisions with optimized engine cycles.",
  },
  {
    icon: Sparkles,
    title: "AI-driven debugging",
    description:
      "Trace failures to root cause automatically — from red flag to fix without manual hunting.",
  },
  {
    icon: LineChart,
    title: "Insightful simulation",
    description:
      "Deep visibility into every node and transition in real time.",
  },
  {
    icon: Plug,
    title: "Easy integration",
    description:
      "Drop-in compatibility with Cadence, Synopsys, and Siemens flows.",
  },
];

export default function WhyAceSection() {
  return (
    <section id="features" className="bg-neutral-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
            Why ACE <span className="text-teal-600">stands out</span>
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-neutral-500 md:text-lg">
            Eight capabilities, one verified outcome — silicon that ships faster
            and works the first time.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-sm"
            >
              <Icon size={18} className="mb-4 text-teal-600" />
              <h3 className="font-semibold text-neutral-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
