import { CheckCircle2, Gauge, Network, Zap } from "lucide-react";
import {
  CursorCard,
  CursorCardsContainer,
} from "@/components/ui/cursor-cards";

const METRICS = [
  {
    label: "Performance Scale",
    value: "300GB+",
    spec: "DSPF File Capacity",
    icon: Gauge,
    tag: "Stable Load",
  },
  {
    label: "Engine Throughput",
    value: "1GB / 10s",
    spec: "Parser Velocity",
    icon: Zap,
    tag: "Peak Speed",
  },
  {
    label: "Parasitic Processing",
    value: "2 Million",
    spec: "Parasitics / Second",
    icon: Network,
    tag: "Concurrent Nodes",
  },
  {
    label: "Process Agnostic",
    value: "180nm — 5nm",
    spec: "Nodes Supported",
    icon: CheckCircle2,
    tag: "Validated",
  },
];

const CARD_BORDER = "#e5e5e5";
const TEAL_PRIMARY = "#5EEAD4";
const TEAL_SECONDARY = "#0D9488";

export default function AceMetricsCards() {
  return (
    <CursorCardsContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {METRICS.map((m) => {
        const Icon = m.icon;
        return (
          <CursorCard
            key={m.label}
            borderColor={CARD_BORDER}
            primaryHue={TEAL_PRIMARY}
            secondaryHue={TEAL_SECONDARY}
            className="h-full min-h-[220px] rounded-xl shadow-md"
          >
            <div className="flex h-full flex-col justify-between p-6 md:p-8">
              <span className="mono text-[10px] text-muted-foreground">
                {m.label}
              </span>
              <div className="my-6">
                <p className="serif text-2xl md:text-3xl mb-2">{m.value}</p>
                <p className="mono text-[11px] text-muted-foreground normal-case tracking-normal">
                  {m.spec}
                </p>
              </div>
              <div className="border-t border-border pt-4 flex items-center gap-2">
                <Icon size={16} className="text-teal-600" />
                <span className="mono text-[10px] text-teal-600">{m.tag}</span>
              </div>
            </div>
          </CursorCard>
        );
      })}
    </CursorCardsContainer>
  );
}
