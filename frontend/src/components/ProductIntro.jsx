import {
  ArrowRight,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import AceProductShowcase from "./AceProductShowcase";
import AceMetricsCards from "./AceMetricsCards";
import SectionHeader, { SpecBadge } from "./SectionHeader";
import SectionWatermark from "./SectionWatermark";
import { GradientText } from "@/components/ui/gradient-text";

const ACE_WATERMARK = `${process.env.PUBLIC_URL}/ace-logo-watermark.png`;
const ABS_SYMBOL_SRC = `${process.env.PUBLIC_URL}/ace-abs-symbol.png`;

const ACE_MODE_FEATURES = [
  "Selective scaling & dynamic trimming from schematic",
  "What-if analysis on parasitics and coupling capacitances",
  "Zero-loss parasitic filtering without re-extraction",
];

const ABS_MODE_FEATURES = [
  "Generates reduced-complexity sub-circuits for SPICE or GLS",
  "Preserves critical accuracy and analog loading",
  "Automated test bench generation — no custom layouts",
];

export default function ProductIntro() {
  return (
    <div id="product" data-testid="product-intro" className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
        <SectionWatermark
          src={ACE_WATERMARK}
          position="top-left"
          size="sm"
          imageClassName="opacity-[0.035] md:opacity-[0.05]"
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-8 lg:col-span-5 lg:sticky lg:top-32">
              <SectionHeader
                label="01 — Our Flagship Product"
                title={
                  <h2 className="serif text-4xl md:text-5xl leading-[1.08]">
                    Meet ACE.{" "}
                    <span className="accent block md:inline mt-1 md:mt-0">
                      The Bridge Between Extraction and Simulation.
                    </span>
                  </h2>
                }
                description="ACE bridges the gap between extraction and simulation to enable high-fidelity verification with significantly faster turnaround times. A clean-sheet engine, purpose-built for the deep-node era — where every nanosecond and every nanometer counts."
                className="mb-0"
              />
              <a
                href="#ace-metrics"
                data-testid="product-link"
                className="inline-flex items-center gap-2 text-foreground border-b border-teal-600 pb-1 hover:text-teal-700 transition-colors mono text-[11px]"
              >
                Explore the platform
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="lg:col-span-7">
              <AceProductShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section id="ace-metrics" className="relative pb-24 md:pb-32">
        <SectionWatermark
          src={ACE_WATERMARK}
          position="top-right"
          size="sm"
          imageClassName="opacity-[0.03] md:opacity-[0.05]"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            label="01A — Engine Throughput"
            title={
              <h3 className="serif text-3xl md:text-4xl leading-tight">
                Built for production-scale parasitic datasets.
              </h3>
            }
            className="mb-12"
          />
          <AceMetricsCards />
        </div>
      </section>

      {/* Operational Modes */}
      <section id="ace-modes" className="relative border-y border-border overflow-hidden">
        <SectionWatermark
          src={ACE_WATERMARK}
          position="bottom-left"
          size="sm"
          imageClassName="opacity-[0.035] md:opacity-[0.055]"
        />

        {/* ACE Mode — title left, description right */}
        <div className="relative border-b border-border bg-background py-24 md:py-32 lg:py-40">
          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="space-y-6">
                <span className="mono block text-[10px] text-teal-600 tracking-[0.2em]">
                  Mode 01 — ACE
                </span>
                <h2 className="serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                  <GradientText theme="ace" className="bg-background">
                    ACE Mode
                  </GradientText>
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                  Analog STA
                </p>
                <SpecBadge className="rounded-full px-4 py-1.5 text-xs">
                  +200× Faster
                </SpecBadge>
              </div>

              <div className="space-y-8">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Enables &ldquo;what-if&rdquo; analysis by allowing designers to
                  selectively scale, trim, or filter parasitics and coupling
                  capacitances directly from the schematic —{" "}
                  <strong className="font-medium text-foreground">
                    +200× faster
                  </strong>{" "}
                  than traditional re-extraction.
                </p>
                <ul className="space-y-4">
                  {ACE_MODE_FEATURES.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check
                        size={18}
                        className="text-teal-600 mt-0.5 shrink-0"
                        strokeWidth={2.5}
                      />
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ABS Mode — description left, title right */}
        <div className="relative bg-slate-50/50 py-24 md:py-32 lg:py-40">
          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="space-y-8 lg:order-1">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Engineered for large-scale digital and transceiver blocks.
                  Generates high-fidelity, reduced-complexity sub-circuits for
                  SPICE or GLS while eliminating the overhead of non-essential
                  parasitics.
                </p>
                <ul className="space-y-4">
                  {ABS_MODE_FEATURES.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 size-1.5 rounded-full bg-teal-600 shrink-0" />
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-xl">
                  <img
                    src={ABS_SYMBOL_SRC}
                    alt="ABS abstraction symbol generated in ACE"
                    className="w-full object-cover object-top"
                    draggable={false}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-6 lg:order-2 lg:items-end lg:text-right">
                <span className="mono block text-[10px] text-teal-600 tracking-[0.2em]">
                  Mode 02 — ABS
                </span>
                <h2 className="serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                  <GradientText theme="abs" className="bg-slate-50/50">
                    ABS Mode
                  </GradientText>
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                  Reduced Model
                </p>
                <div className="lg:flex lg:justify-end">
                  <SpecBadge className="rounded-full px-4 py-1.5 text-xs">
                    Active
                  </SpecBadge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="ace-impact" className="relative pb-32 md:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-slate-900 text-white rounded-2xl p-10 md:p-16 relative overflow-hidden">
            <SectionWatermark
              src={ACE_WATERMARK}
              position="top-left"
              size="sm"
              imageClassName="opacity-[0.08] md:opacity-[0.12]"
            />
            <div className="relative z-10 max-w-3xl">
              <span className="mono text-[10px] text-teal-400 mb-6 block tracking-[0.2em]">
                Efficiency & Automation
              </span>
              <h2 className="serif text-3xl md:text-5xl leading-[1.1] mb-8">
                Reduce your verification cycle from weeks to hours.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-0.5 bg-teal-400" />
                    <h4 className="serif text-xl">Time Savings</h4>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Primary impact on simulation and extraction time — with
                    negligible accuracy sacrificed. Parallelized processing
                    eliminates bottlenecks so teams focus on design, not waiting
                    for netlists.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-0.5 bg-teal-400" />
                    <h4 className="serif text-xl">Full Automation</h4>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Full automation of layout activities assists designers
                    during verification — removing manual hand-offs and reducing
                    error potential in deep-node sign-off.
                  </p>
                </div>
              </div>
              <div className="mt-12 flex flex-wrap gap-4">
                <a
                  href="#cta"
                  className="inline-flex items-center gap-2 bg-teal-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-sm hover:bg-teal-300 transition-colors"
                >
                  Schedule Demo
                  <ArrowUpRight size={16} />
                </a>
                <Link
                  to="/reviews"
                  className="inline-flex items-center gap-2 border border-slate-600 text-slate-300 px-8 py-4 rounded-lg font-semibold text-sm hover:bg-slate-800 transition-colors"
                >
                  Share Demo Feedback
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
