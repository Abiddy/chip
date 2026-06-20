import { CheckCircle2, Cog, Upload } from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    title: "Simple Integration",
    description:
      "Bring your existing SPICE or Verilog-A netlists. ACE plugs into your flow with zero rewrites.",
  },
  {
    icon: Cog,
    title: "Powerful Analysis",
    description:
      "Simulate with full SPICE accuracy at 150× speed, with AI-driven root-cause debugging.",
  },
  {
    icon: CheckCircle2,
    title: "Tape-out Ready",
    description:
      "Pass-fail verdicts you can trust. Clean coverage reports and zero false alarms.",
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
            From netlist to <span className="text-teal-600">tape-out</span>
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-neutral-500 md:text-lg">
            Three steps. No detours. Designed by engineers who&apos;ve lived the
            verification bottleneck.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-neutral-200 bg-neutral-50 p-8"
            >
              <Icon size={20} className="mb-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
