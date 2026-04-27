import LensLogo from "./LensLogo";

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
      className="relative pt-20 pb-10 border-t border-[#ffffff14] bg-[#050505]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <a href="#" className="flex items-center mb-4">
              <LensLogo className="h-9" />
            </a>
            <p className="text-[#b9b3a7] text-sm leading-relaxed max-w-sm">
              Analog verification, at silicon speed. Built for teams shipping
              at 12 nm and below.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="mono text-[10px] uppercase tracking-[0.22em] text-[#6b6660]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#34d399] pulse-dot mr-2 align-middle" />
                Status — All systems operational
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="mono text-[10px] uppercase tracking-[0.22em] text-[#6b6660] mb-4">
                  {c.title}
                </div>
                <ul className="space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-[#b9b3a7] hover:text-[#f5f3ee] transition-colors"
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#6b6660]">
          <span>© {new Date().getFullYear()} Lens EDA — All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#f5f3ee] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#f5f3ee] transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-[#f5f3ee] transition-colors">
              Security
            </a>
            <span className="mono">v1.0 · sig: ace-12nm</span>
          </div>
        </div>
      </div>

      {/* Big LENS letterform anchor */}
      <div className="mt-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="serif select-none text-center leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(8rem, 22vw, 22rem)",
            background:
              "linear-gradient(180deg, #1a1715 0%, #050505 80%)",
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
