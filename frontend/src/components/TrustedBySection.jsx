import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const PARTNERS = [
  {
    id: "avicena",
    Logo: () => (
      <Wordmark primary="Avicena" secondary="Tech" accent="text-teal-700" />
    ),
  },
  {
    id: "mixel",
    Logo: () => <Wordmark primary="Mixel" accent="text-slate-800" />,
  },
  {
    id: "silicon-vision",
    Logo: () => (
      <Wordmark primary="Silicon" secondary="Vision" accent="text-indigo-700" />
    ),
  },
  {
    id: "globalfoundries",
    Logo: () => (
      <Wordmark
        primary="GlobalFoundries"
        accent="text-orange-600"
        compact
      />
    ),
  },
  {
    id: "cadence",
    Logo: () => <Wordmark primary="Cadence" accent="text-red-700" />,
  },
  {
    id: "altera",
    Logo: () => <Wordmark primary="Altera" accent="text-blue-700" />,
  },
  {
    id: "lattice",
    Logo: () => (
      <Wordmark primary="Lattice" secondary="Semi" accent="text-emerald-700" />
    ),
  },
];

function Wordmark({ primary, secondary, accent, compact = false }) {
  return (
    <div
      className={cn(
        "flex select-none flex-col items-start leading-none",
        compact ? "gap-0" : "gap-1"
      )}
    >
      <span
        className={cn(
          "font-semibold tracking-tight text-foreground/85",
          compact ? "text-lg md:text-xl" : "text-xl md:text-2xl",
          accent
        )}
      >
        {primary}
      </span>
      {secondary ? (
        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground md:text-xs">
          {secondary}
        </span>
      ) : null}
    </div>
  );
}

export default function TrustedBySection() {
  return (
    <section
      id="customers"
      data-testid="trusted-by"
      className="relative overflow-hidden bg-background pb-16 pt-12 md:pb-24 md:pt-16"
    >
      <div className="relative mx-auto w-full max-w-5xl px-6">
        <div className="text-center text-2xl md:text-3xl">
          <span className="text-teal-700">
            Demonstrated with industry-leading teams.
          </span>
          <br />
          <span className="font-semibold text-foreground">
            Across analog, foundry, and EDA.
          </span>
        </div>
      </div>

      <Marquee pauseOnHover speed={35} className="mx-auto mt-6 max-w-6xl sm:mt-10">
        {PARTNERS.map(({ id, Logo }) => (
          <div
            key={id}
            className="relative mx-16 flex h-full w-fit items-center justify-start"
          >
            <Logo />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
