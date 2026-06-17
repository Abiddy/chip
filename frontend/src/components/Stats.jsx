const stats = [
  {
    n: "150×",
    label: "Faster simulation",
    sub: "vs. legacy SPICE flows on identical netlists",
  },
  {
    n: "100%",
    label: "Verification accuracy",
    sub: "Zero compromise on signal fidelity at 12 nm",
  },
  {
    n: "12nm",
    label: "And below",
    sub: "Built for the deep-node era — scales to 3 nm",
  },
  {
    n: "0",
    label: "False alarms",
    sub: "Signal-aware engine ignores noise, finds bugs",
  },
];

export default function Stats() {
  return (
    <section
      data-testid="stats-section"
      className="relative py-28 md:py-36 border-t border-border"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 w-[900px] h-[500px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(52,211,153,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
          {stats.map((s, i) => (
            <div
              key={i}
              data-testid={`stat-${i}`}
              className="bg-background p-8 md:p-10 flex flex-col justify-between min-h-[200px] hover:bg-muted/50 transition-colors duration-500"
            >
              <div className="stat-num text-5xl md:text-6xl lg:text-7xl mb-6">
                {s.n}
              </div>
              <div>
                <div className="text-foreground text-sm font-medium mb-1">
                  {s.label}
                </div>
                <div className="mono text-[10px] text-muted-foreground">
                  {s.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
