import DisplayCards from "@/components/ui/display-cards";
import { Bug, Gauge, Plug } from "lucide-react";

const ACE_FEATURE_CARDS = [
  {
    icon: <Gauge className="size-4 text-teal-200" />,
    title: "Simulation",
    description:
      "Faster runs without simplification — full SPICE-grade fidelity, accelerated.",
    titleClassName: "text-teal-600",
  },
  {
    icon: <Bug className="size-4 text-teal-200" />,
    title: "Debugging",
    description:
      "AI-driven root-cause traces. Skip the false alarms, find the real bug.",
    titleClassName: "text-teal-600",
  },
  {
    icon: <Plug className="size-4 text-teal-200" />,
    title: "Integration",
    description:
      "Drops into your existing tape-out flow. No rewrite. No friction.",
    titleClassName: "text-teal-600",
  },
];

export default function AceFeatureCards() {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-visible">
      <DisplayCards cards={ACE_FEATURE_CARDS} />
    </div>
  );
}
