import { Check } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";

const ABS_IMG = `${process.env.PUBLIC_URL}/ace-abs-symbol.png`;

const FEATURES = [
  "Generates reduced-complexity sub-circuits for SPICE or GLS",
  "Preserves critical accuracy and analog loading",
];

export default function AbsModeSection() {
  return (
    <section className="overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="order-2 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] lg:order-1">
          <img
            src={ABS_IMG}
            alt="ABS Mode dashboard"
            width={1024}
            height={531}
            draggable={false}
            className="w-full bg-white object-contain object-left-top"
          />
        </div>

        <div className="order-1 lg:order-2">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-600">
            Analog Simulation
          </p>
          <h2 className="serif text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
            <GradientText theme="abs" className="bg-white">
              ABS Mode
            </GradientText>
          </h2>
          <p className="mt-3 text-xl font-medium text-neutral-800">
            Accelerated Behavioral Simulation
          </p>
          <p className="mt-6 text-base leading-relaxed text-neutral-500 md:text-lg">
            Engineered for large-scale digital and transceiver blocks. Generates
            high-fidelity, reduced-complexity sub-circuits for SPICE or GLS while
            eliminating the overhead of non-essential parasitics.
          </p>
          <ul className="mt-8 space-y-4">
            {FEATURES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-teal-600" strokeWidth={2.5} />
                <span className="text-sm text-neutral-700 md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
