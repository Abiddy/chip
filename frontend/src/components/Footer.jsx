const LOGO_SRC = `${process.env.PUBLIC_URL}/lens-logo.svg`;

const cols = [
  {
    title: "Product",
    links: ["ACE Engine", "Capabilities", "Workflow", "ROI Calculator"],
  },
  {
    title: "Company",
    links: ["About", "Why we started", "Customers", "Careers"],
  },
  {
    title: "Resources",
    links: ["Documentation", "White papers", "Blog", "Changelog"],
  },
];

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative pt-20 pb-10 border-t border-border bg-background"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <a href="#" className="mb-4 inline-flex items-center">
              <img
                src={LOGO_SRC}
                alt="Lens"
                className="h-10 w-auto select-none"
                draggable="false"
              />
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Analog verification, at silicon speed. Built for teams shipping
              at 12 nm and below.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="mono text-[10px] text-muted-foreground">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 pulse-dot mr-2 align-middle" />
                Status — All systems operational
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="mono text-[10px] text-muted-foreground mb-4">
                  {c.title}
                </div>
                <ul className="space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="divider-line mb-6" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Lens EDA — All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Security
            </a>
            <span className="mono">v1.0 · sig: ace-12nm</span>
          </div>
        </div>
      </div>

      <div className="mt-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="select-none text-center leading-none whitespace-nowrap font-semibold tracking-tight"
          style={{
            fontSize: "clamp(8rem, 22vw, 22rem)",
            background:
              "linear-gradient(180deg, #e2e8f0 0%, #ffffff 80%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "-0.04em",
          }}
        >
          LENS
        </div>
      </div>
    </footer>
  );
}
