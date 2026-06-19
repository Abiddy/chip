import { Bug, Gauge, Plug } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-grid";

const WORKSPACE_SRC = `${process.env.PUBLIC_URL}/ace-workspace-ui.png`;

const FEATURE_CARDS = {
  simulation: {
    title: "Simulation",
    description:
      "Faster runs without simplification — full SPICE-grade fidelity, accelerated.",
    icon: <Gauge className="size-4 text-blue-500" />,
    status: "Live",
    tags: ["SPICE", "Fidelity"],
    hasPersistentHover: true,
  },
  debugging: {
    title: "Debugging",
    description:
      "AI-driven root-cause traces. Skip the false alarms, find the real bug.",
    icon: <Bug className="size-4 text-emerald-500" />,
    status: "Active",
    tags: ["AI", "Root Cause"],
  },
  integration: {
    title: "Integration",
    description:
      "Drops into your existing tape-out flow. No rewrite. No friction.",
    icon: <Plug className="size-4 text-purple-500" />,
    status: "Ready",
    tags: ["Cadence", "Synopsys"],
  },
};

function PointerLines() {
  const lines = [
    { x1: 72, y1: 12, x2: 58, y2: 30 },
    { x1: 8, y1: 46, x2: 52, y2: 46 },
    { x1: 42, y1: 92, x2: 60, y2: 72 },
  ];

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {lines.map(({ x1, y1, x2, y2 }, i) => (
        <g key={i}>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#0d9488"
            strokeWidth="0.35"
            strokeDasharray="1.2 0.8"
            opacity="0.55"
          />
          <circle cx={x2} cy={y2} r="0.9" fill="#0d9488" opacity="0.7" />
          <circle cx={x1} cy={y1} r="0.6" fill="#0d9488" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

const CARD_PROPS = { variant: "dark" };

export default function AceProductShowcase() {
  return (
    <div className="relative w-full min-h-[780px] lg:min-h-[700px]">
      <PointerLines />

      {/* Top right — Simulation */}
      <div className="relative z-20 mb-4 w-full max-w-[220px] lg:absolute lg:top-0 lg:right-4 lg:mb-0 xl:right-8">
        <BentoCard {...FEATURE_CARDS.simulation} {...CARD_PROPS} />
      </div>

      {/* Left — Debugging */}
      <div className="relative z-20 mb-4 w-full max-w-[220px] lg:absolute lg:-left-6 lg:top-[44%] lg:-translate-y-1/2 lg:mb-0 xl:-left-10">
        <BentoCard {...FEATURE_CARDS.debugging} {...CARD_PROPS} />
      </div>

      {/* Bottom center — Integration */}
      <div className="relative z-20 mb-8 w-full max-w-[220px] lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:mb-0">
        <BentoCard {...FEATURE_CARDS.integration} {...CARD_PROPS} />
      </div>

      {/* Workspace image — bleeds right */}
      <div className="ace-workspace-bleed">
        <img
          src={WORKSPACE_SRC}
          alt="ACE Design Workspace"
          className="h-[280px] w-full object-cover object-left-top sm:h-[360px] lg:h-full lg:min-h-[480px]"
          draggable={false}
        />
      </div>
    </div>
  );
}
