import { Check } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";

const WORKSPACE = `${process.env.PUBLIC_URL}/ace-workspace-ui.png`;

const FEATURES = [
  "Selective scaling & dynamic trimming from schematic",
  "What-if analysis on parasitics and coupling capacitances",
  "Zero-loss parasitic filtering without re-extraction",
];

export default function AceModeSection() {
  return (
    <section id="ace-modes" className="overflow-hidden bg-neutral-50 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-600">
            Analog RTL
          </p>
          <h2 className="serif text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
            <GradientText theme="ace" className="bg-neutral-50">
              ACE Mode
            </GradientText>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-neutral-500 md:text-lg">
            Enables &ldquo;what-if&rdquo; analysis by allowing designers to
            selectively scale, trim, or filter parasitics and coupling
            capacitances directly from the schematic —{" "}
            <strong className="font-medium text-neutral-900">+200× faster</strong>{" "}
            than traditional re-extraction.
          </p>
          <ul className="mt-8 space-y-4">
            {FEATURES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-teal-600" strokeWidth={2.5} />
                <span className="text-sm text-neutral-700 md:text-base">{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="#cta"
            className="mt-10 inline-flex rounded-lg bg-teal-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-700"
          >
            Learn More
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]">
          <img
            src={WORKSPACE}
            alt="ACE Mode workspace"
            width={1024}
            height={576}
            draggable={false}
            className="w-full object-cover object-left-top"
          />
        </div>
      </div>
    </section>
  );
}
