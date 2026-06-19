import { Bug, Gauge, Plug } from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";

const ACE_FEATURE_ITEMS = [
  {
    title: "Simulation",
    description:
      "Faster runs without simplification — full SPICE-grade fidelity, accelerated.",
    icon: <Gauge className="size-4 text-blue-500" />,
    status: "Live",
    tags: ["SPICE", "Fidelity"],
    hasPersistentHover: true,
  },
  {
    title: "Debugging",
    description:
      "AI-driven root-cause traces. Skip the false alarms, find the real bug.",
    icon: <Bug className="size-4 text-emerald-500" />,
    status: "Active",
    tags: ["AI", "Root Cause"],
  },
  {
    title: "Integration",
    description:
      "Drops into your existing tape-out flow. No rewrite. No friction.",
    icon: <Plug className="size-4 text-purple-500" />,
    status: "Ready",
    tags: ["Cadence", "Synopsys"],
  },
];

export default function AceFeatureCards() {
  return (
    <BentoGrid
      items={ACE_FEATURE_ITEMS}
      className="grid-cols-1 gap-3 w-full max-w-md mx-auto"
    />
  );
}
