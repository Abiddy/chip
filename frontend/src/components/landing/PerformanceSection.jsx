const METRICS = [
  {
    label: "Performance",
    value: "150×",
    description: "Faster than legacy SPICE flows on identical netlists.",
  },
  {
    label: "Test Coverage",
    value: "100%",
    description: "Zero compromise on signal fidelity at 12 nm and below.",
  },
  {
    label: "Throughput",
    value: "5nm",
    description: "Process-agnostic — validated from 180 nm through 5 nm.",
  },
  {
    label: "Data Processed",
    value: "100GB+",
    description: "Stable load at production-scale parasitic datasets.",
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map(({ label, value, description }) => (
            <div
              key={label}
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
            >
              <div className="h-1 bg-teal-600" />
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                  {label}
                </p>
                <p className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900">
                  {value}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
