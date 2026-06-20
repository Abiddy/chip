import { ArrowRight, Bug, Gauge, Plug } from "lucide-react";

const CARDS = [
  {
    icon: Gauge,
    title: "Extraction",
    description:
      "Bridge parasitic extraction output to simulation-ready netlists without re-running your full flow.",
  },
  {
    icon: Bug,
    title: "Simulation",
    description:
      "Run SPICE-grade verification at production scale with intelligent acceleration built in.",
  },
  {
    icon: Plug,
    title: "Integration",
    description:
      "Drop into Cadence, Synopsys, and Siemens environments with zero workflow disruption.",
  },
];

export default function MeetAceSection() {
  return (
    <section id="product" className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="max-w-xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-600">
            What is ACE?
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
            Meet ACE.{" "}
            <span className="text-teal-600">
              The Bridge Between Extraction and Simulation.
            </span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-neutral-500 md:text-lg">
            ACE bridges the gap between extraction and simulation to enable
            high-fidelity verification with significantly faster turnaround
            times — purpose-built for the deep-node era.
          </p>
          <a
            href="#ace-modes"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
          >
            Learn more about ACE
            <ArrowRight size={14} />
          </a>
        </div>

        <div className="space-y-4">
          {CARDS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 transition-shadow hover:shadow-sm"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-white shadow-sm">
                <Icon size={18} className="text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
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
