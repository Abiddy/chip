import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Gauge,
  Shield,
  Zap,
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import SectionWatermark from "./SectionWatermark";
import SectionWithMockup from "@/components/ui/section-with-mockup";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const LENS_WATERMARK = `${process.env.PUBLIC_URL}/lens-logo.png`;
const WORKSPACE_UI = `${process.env.PUBLIC_URL}/ace-workspace-ui.png`;

const kpis = [
  {
    title: "Faster simulation",
    meta: "150×",
    description: "VS. LEGACY SPICE FLOWS ON IDENTICAL NETLISTS",
    icon: <Zap className="size-4 text-blue-500" />,
    status: "+200% Efficiency",
    tags: ["Speed", "SPICE"],
    hasPersistentHover: true,
  },
  {
    title: "Verification accuracy",
    meta: "100%",
    description: "ZERO COMPROMISE ON SIGNAL FIDELITY AT 12 NM",
    icon: <CheckCircle2 className="size-4 text-emerald-500" />,
    status: "Full Coverage",
    tags: ["Accuracy", "12nm"],
  },
  {
    title: "Through 5nm",
    meta: "180nm",
    description: "PROCESS-AGNOSTIC — VALIDATED 180 NM TO 5 NM",
    icon: <Activity className="size-4 text-purple-500" />,
    status: "Node Readiness",
    tags: ["Nodes", "Process"],
  },
  {
    title: "False alarms",
    meta: "0",
    description: "SIGNAL-AWARE ENGINE IGNORES NOISE, FINDS BUGS",
    icon: <Shield className="size-4 text-sky-500" />,
    status: "Noise Rejection",
    tags: ["Signal-Aware", "Debug"],
  },
];

const interfaceFeatures = [
  {
    icon: <Gauge className="size-4 text-blue-500" />,
    title: "Hierarchical Waveform Viewer",
    description:
      "Instantly navigate complex SoC signals with hardware-accelerated rendering.",
    status: "Live",
    tags: ["Waveforms", "SoC"],
  },
  {
    icon: <Activity className="size-4 text-emerald-500" />,
    title: "Node Correlation Heatmaps",
    description:
      "Identify high-power and high-leakage nodes directly on the floorplan.",
    status: "Active",
    tags: ["Heatmaps", "Floorplan"],
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

        <BentoGrid
          items={kpis}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-24"
        />

        <BentoGrid className="grid-cols-1 lg:grid-cols-2 gap-3 mb-24">
          <BentoCard
            title="Dynamic Scaling Engine"
            meta="Mode: ACE Fast-Silicon"
            description="Proprietary acceleration for critical path analysis. Enables what-if analysis by scaling, trimming, and filtering parasitics directly from the schematic — +200× faster than re-extraction."
            icon={<Zap className="size-4 text-blue-500" />}
            status="Live"
            tags={["Parallel", "Scaling"]}
            hasPersistentHover
          >
            <div className="space-y-2 pt-1">
              {[
                ["Parallel Threads", "Up to 256×"],
                ["Re-extraction Bypass", "+200× vs legacy"],
              ].map(([label, val]) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-xs text-gray-500">{label}</span>
                  <span className="text-xs font-semibold text-gray-900">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard
            title="Absolute Precision"
            meta="Mode: ABS Deep-Node"
            description="Optimized for transceiver and digital GLS blocks. Generates high-fidelity reduced sub-circuits for SPICE while preserving critical electrical accuracy and analog loading."
            icon={<Activity className="size-4 text-teal-500" />}
            status="Beta"
            tags={["GLS", "Sub-circuit"]}
            cta="Request License →"
          >
            <div className="space-y-2 pt-1">
              {[
                ["Sub-circuit Generation", "Automated .SUBCKT"],
                ["Layout Overhead", "Eliminated"],
              ].map(([label, val]) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-xs text-gray-500">{label}</span>
                  <span className="text-xs font-semibold text-teal-600">
                    {val}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="#cta"
              className="mt-4 inline-flex items-center gap-2 text-xs text-teal-600 hover:text-teal-700 transition-colors"
            >
              Request Evaluation License
              <ArrowRight size={12} />
            </a>
          </BentoCard>
        </BentoGrid>

        <SectionWithMockup
          label="05 — The Interface"
          title="Designed for Technical Clarity"
          description="Stop digging through log files. Interactive visualization provides real-time insights into netlist topology and simulation bottlenecks."
          primaryImageSrc={WORKSPACE_UI}
          secondaryImageSrc={WORKSPACE_UI}
        >
          <BentoGrid
            items={interfaceFeatures}
            className="grid-cols-1 gap-3 w-full"
          />
        </SectionWithMockup>
      </div>
    </section>
  );
}
