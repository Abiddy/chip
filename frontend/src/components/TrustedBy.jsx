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
      className="relative border-y border-[#ffffff0d] py-12 overflow-hidden bg-[#070708]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="mono text-[10px] uppercase tracking-[0.25em] text-[#6b6660] text-center mb-8">
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
                className="serif text-2xl md:text-3xl tracking-wide text-[#6b6660] hover:text-[#b9b3a7] transition-colors duration-500"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#070708] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#070708] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
