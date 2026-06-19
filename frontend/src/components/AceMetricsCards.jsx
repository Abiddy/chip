import { CheckCircle2, Gauge, Network, Zap } from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";

const METRICS = [
  {
    title: "Performance Scale",
    meta: "300GB+",
    description: "DSPF file capacity — stable load at production scale.",
    icon: <Gauge className="size-4 text-blue-500" />,
    status: "Stable Load",
    tags: ["Capacity", "DSPF"],
  },
  {
    title: "Engine Throughput",
    meta: "1GB / 10s",
    description: "Parser velocity at peak speed on large netlists.",
    icon: <Zap className="size-4 text-emerald-500" />,
    status: "Peak Speed",
    tags: ["Parser", "Throughput"],
  },
  {
    title: "Parasitic Processing",
    meta: "2 Million",
    description: "Parasitics processed per second across concurrent nodes.",
    icon: <Network className="size-4 text-purple-500" />,
    status: "Concurrent",
    tags: ["Parasitics", "Scale"],
  },
  {
    title: "Process Agnostic",
    meta: "180nm — 5nm",
    description: "Nodes supported and validated across process generations.",
    icon: <CheckCircle2 className="size-4 text-sky-500" />,
    status: "Validated",
    tags: ["Nodes", "Process"],
  },
];

export default function AceMetricsCards() {
  return (
    <BentoGrid
      items={METRICS}
      className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
    />
  );
}
