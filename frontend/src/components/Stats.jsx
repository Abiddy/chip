import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Gauge,
  Shield,
  Zap,
} from "lucide-react";
import SectionHeader, { SpecBadge } from "./SectionHeader";
import SectionWatermark from "./SectionWatermark";

const LENS_WATERMARK = `${process.env.PUBLIC_URL}/lens-logo-watermark.png`;

const kpis = [
  {
    value: "150×",
    badge: "+200% Efficiency",
    title: "Faster simulation",
    spec: "VS. LEGACY SPICE FLOWS ON IDENTICAL NETLISTS",
    icon: Zap,
  },
  {
    value: "100%",
    badge: "Full Coverage",
    title: "Verification accuracy",
    spec: "ZERO COMPROMISE ON SIGNAL FIDELITY AT 12 NM",
    icon: CheckCircle2,
    filled: true,
  },
  {
    value: "180nm",
    badge: "Node Readiness",
    title: "Through 5nm",
    spec: "PROCESS-AGNOSTIC — VALIDATED 180 NM TO 5 NM",
    icon: Activity,
    pulse: true,
  },
  {
    value: "0",
    badge: "Noise Rejection",
    title: "False alarms",
    spec: "SIGNAL-AWARE ENGINE IGNORES NOISE, FINDS BUGS",
    icon: Shield,
  },
];

const interfaceFeatures = [
  {
    icon: Gauge,
    title: "Hierarchical Waveform Viewer",
    desc: "Instantly navigate complex SoC signals with hardware-accelerated rendering.",
  },
  {
    icon: Activity,
    title: "Node Correlation Heatmaps",
    desc: "Identify high-power and high-leakage nodes directly on the floorplan.",
  },
];

export default function Stats() {
  return (
    <section
      id="performance"
      data-testid="stats-section"
      className="relative py-32 md:py-40 border-t border-border overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(203,213,225,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(203,213,225,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      <SectionWatermark
        src={LENS_WATERMARK}
        position="bottom-left"
        size="default"
        blend="screen"
        imageClassName="opacity-[0.07] md:opacity-[0.11]"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          label="04 — Performance"
          title={
            <h2 className="serif text-4xl md:text-5xl leading-[1.08] tracking-tight">
              Precision-Engineered Simulation Performance
            </h2>
          }
          description="Experience the next generation of analog and mixed-signal verification. ACE leverages massive parallelization to deliver SPICE-level accuracy at extreme speeds."
        />

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 border border-border bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm mb-24">
          {kpis.map((k, i) => {
            const Icon = k.icon;
            return (
              <div
                key={i}
                data-testid={`stat-${i}`}
                className="group p-8 border-b md:border-b-0 md:border-r border-border last:border-r-0 hover:bg-slate-50 transition-colors"
              >
                <div className="mb-8">
                  <span className="serif text-4xl md:text-5xl block mb-2 leading-none group-hover:text-teal-600 transition-colors">
                    {k.value}
                  </span>
                  <div className="flex items-center gap-2">
                    {k.pulse && (
                      <span className="size-2 rounded-full bg-teal-500 animate-pulse" />
                    )}
                    {k.filled && (
                      <Icon size={14} className="text-teal-600 fill-teal-600" />
                    )}
                    <SpecBadge>{k.badge}</SpecBadge>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">{k.title}</h3>
                  <p className="mono text-[10px] text-muted-foreground leading-relaxed">
                    {k.spec}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mode Comparison */}
        <div className="flex flex-col lg:flex-row gap-6 mb-24">
          <div className="flex-1 bg-white border border-border rounded-lg p-8 md:p-10 shadow-sm hover:border-teal-500/40 transition-colors">
            <header className="flex justify-between items-start mb-8">
              <div>
                <span className="mono text-[10px] text-teal-600 block mb-2 tracking-[0.2em]">
                  Mode: ACE Fast-Silicon
                </span>
                <h3 className="serif text-2xl md:text-3xl">
                  Dynamic Scaling Engine
                </h3>
              </div>
              <Zap size={36} strokeWidth={1.2} className="text-teal-600" />
            </header>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Proprietary acceleration for critical path analysis. Enables
              what-if analysis by scaling, trimming, and filtering parasitics
              directly from the schematic — +200× faster than re-extraction.
            </p>
            <div className="space-y-3">
              {[
                ["Parallel Threads", "Up to 256×"],
                ["Re-extraction Bypass", "+200× vs legacy"],
              ].map(([label, val]) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-3 border-b border-border/60"
                >
                  <span className="mono text-[10px] text-muted-foreground">
                    {label}
                  </span>
                  <span className="mono text-[11px] font-semibold">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-slate-900 text-white border border-transparent rounded-lg p-8 md:p-10 shadow-xl">
            <header className="flex justify-between items-start mb-8">
              <div>
                <span className="mono text-[10px] text-teal-400 block mb-2 tracking-[0.2em]">
                  Mode: ABS Deep-Node
                </span>
                <h3 className="serif text-2xl md:text-3xl">Absolute Precision</h3>
              </div>
              <Activity size={36} strokeWidth={1.2} className="text-teal-400" />
            </header>
            <p className="text-slate-400 mb-10 leading-relaxed">
              Optimized for transceiver and digital GLS blocks. Generates
              high-fidelity reduced sub-circuits for SPICE while preserving
              critical electrical accuracy and analog loading.
            </p>
            <div className="space-y-3">
              {[
                ["Sub-circuit Generation", "Automated .SUBCKT"],
                ["Layout Overhead", "Eliminated"],
              ].map(([label, val]) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-3 border-b border-slate-700"
                >
                  <span className="mono text-[10px] text-slate-500">{label}</span>
                  <span className="mono text-[11px] font-semibold text-teal-400">
                    {val}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="#cta"
              className="mt-10 inline-flex items-center gap-2 border border-slate-600 px-6 py-3 rounded-lg mono text-[11px] hover:bg-slate-800 transition-colors"
            >
              Request Evaluation License
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <SectionHeader
              label="05 — The Interface"
              title={
                <h3 className="serif text-3xl md:text-4xl leading-tight">
                  Designed for Technical Clarity
                </h3>
              }
              description="Stop digging through log files. Interactive visualization provides real-time insights into netlist topology and simulation bottlenecks."
              className="mb-8"
            />
            <ul className="space-y-6">
              {interfaceFeatures.map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.title} className="flex items-start gap-4">
                    <Icon size={20} className="text-teal-600 mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">{f.title}</h4>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="lg:col-span-7 relative group">
            <div className="absolute inset-0 bg-teal-500/10 rounded-xl -rotate-2 scale-[1.02] group-hover:rotate-0 transition-transform duration-700" />
            <img
              src="/ace-workspace-mock.png"
              alt="ACE verification workspace showing nodal diagram and waveform analysis"
              className="relative z-10 rounded-xl shadow-2xl border border-border w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
