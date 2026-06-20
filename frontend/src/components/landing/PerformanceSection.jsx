import { Database, Gauge, Layers, ShieldCheck } from "lucide-react";
import { DashedFeatureGrid } from "@/components/ui/dashed-feature-grid";

const METRICS = [
  {
    label: "Performance",
    value: "150×",
    description: "Faster than legacy SPICE flows on identical netlists.",
    icon: Gauge,
  },
  {
    label: "Test Coverage",
    value: "100%",
    description: "Zero compromise on signal fidelity at 12 nm and below.",
    icon: ShieldCheck,
  },
  {
    label: "Throughput",
    value: "5nm",
    description: "Process-agnostic — validated from 180 nm through 5 nm.",
    icon: Layers,
  },
  {
    label: "Data Processed",
    value: "100GB+",
    description: "Stable load at production-scale parasitic datasets.",
    icon: Database,
  },
];

export default function PerformanceSection() {
  return (
    <section id="performance" className="bg-neutral-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-4xl">
            Precision-Engineered Simulation Performance
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-neutral-500">
            Experience the next generation of analog and mixed-signal verification
            with massive parallelization and SPICE-level accuracy.
          </p>
        </div>

        <DashedFeatureGrid
          items={METRICS.map(({ label, value, description, icon }) => ({
            label,
            title: value,
            description,
            icon,
          }))}
        />
      </div>
    </section>
  );
}
