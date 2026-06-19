import {
  ArrowRight,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import AceFeatureCards from "./AceFeatureCards";
import AceMetricsCards from "./AceMetricsCards";
import SectionHeader, { SpecBadge } from "./SectionHeader";
import SectionWatermark from "./SectionWatermark";

const ACE_WATERMARK = `${process.env.PUBLIC_URL}/ace-logo-watermark.png`;

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
    <div id="product" data-testid="product-intro" className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center py-24 md:py-32 lg:min-h-0 lg:py-40">
        <SectionWatermark
          src={ACE_WATERMARK}
          position="top-left"
          size="sm"
          imageClassName="opacity-[0.035] md:opacity-[0.05]"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
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

          <div className="lg:col-span-7 flex h-full min-h-[360px] items-center justify-center self-center">
            <AceFeatureCards />
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
      <section id="ace-modes" className="relative pb-24 md:pb-32 bg-slate-50/50 border-y border-border overflow-hidden">
        <SectionWatermark
          src={ACE_WATERMARK}
          position="bottom-left"
          size="sm"
          imageClassName="opacity-[0.035] md:opacity-[0.055]"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <SectionHeader
            label="02 — Operational Modes"
            title={
              <h3 className="serif text-3xl md:text-4xl leading-tight">
                Two modes. One verification engine.
              </h3>
            }
            description="Process-agnostic technology tested from 180nm to 5nm — operate in ACE mode for analog STA or ABS mode for transceiver and digital GLS."
            className="mb-12"
          />
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ACE Mode */}
            <div className="flex-1 p-8 md:p-10 border border-border rounded-xl bg-white relative overflow-hidden hover:border-teal-500/40 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all">
              <div className="absolute top-4 right-4">
                <SpecBadge className="rounded-full px-3 py-1">
                  +200× Faster
                </SpecBadge>
              </div>
              <span className="mono text-[10px] text-teal-600 block mb-4">
                Mode: ACE · Analog STA
              </span>
              <h3 className="serif text-2xl md:text-3xl mb-4">
                ACE Mode (Analog STA)
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Enables &ldquo;what-if&rdquo; analysis by allowing designers to
                selectively scale, trim, or filter parasitics and coupling
                capacitances directly from the schematic —{" "}
                <strong className="text-foreground font-medium">
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

            {/* ABS Mode */}
            <div className="flex-1 p-8 md:p-10 border border-border rounded-xl bg-white hover:border-teal-500/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all">
              <span className="mono text-[10px] text-muted-foreground block mb-4">
                Mode: ABS · Reduced Model
              </span>
              <h3 className="serif text-2xl md:text-3xl mb-4">
                ABS Mode (Reduced Model)
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Engineered for large-scale digital and transceiver blocks.
                Generates high-fidelity, reduced-complexity sub-circuits for
                SPICE or GLS while eliminating the overhead of non-essential
                parasitics.
              </p>
              <ul className="space-y-4">
                {ABS_MODE_FEATURES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 size-1.5 rounded-full bg-muted-foreground shrink-0" />
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
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
