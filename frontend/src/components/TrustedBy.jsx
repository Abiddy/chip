const partners = [
  "TENSILE",
  "AXIOM-SI",
  "NORTHFIELD",
  "QUANTA LABS",
  "VERTEX MICRO",
  "CASCADE EDA",
  "ION FOUNDRY",
  "HELIX SEMI",
];

export default function TrustedBy() {
  return (
    <section
      data-testid="trusted-by"
      className="relative border-y border-border py-12 overflow-hidden bg-muted/40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="mono text-[10px] text-muted-foreground text-center mb-8">
          Trusted by silicon teams shipping at advanced nodes
        </p>
        <div className="relative overflow-hidden mask-fade">
          <div
            className="marquee-track flex items-center gap-16 whitespace-nowrap"
            style={{ width: "200%" }}
          >
            {[...partners, ...partners].map((p, i) => (
              <span
                key={i}
                className="text-2xl md:text-3xl tracking-wide text-muted-foreground/70 hover:text-muted-foreground transition-colors duration-500"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-muted/40 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-muted/40 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
