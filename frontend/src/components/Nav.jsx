import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LOGO_SRC = `${process.env.PUBLIC_URL}/lens-logo.svg`;

const navItems = [
  { label: "ACE", href: "#product" },
  { label: "Capabilities", href: "#features" },
  { label: "Workflow", href: "#how" },
  { label: "Performance", href: "#performance" },
  { label: "ROI", href: "#savings" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-[#ffffff10]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
        <a href="#" aria-label="Lens" data-testid="nav-logo" className="inline-flex items-center gap-2.5 group">
          <img
            src={LOGO_SRC}
            alt=""
            aria-hidden="true"
            className="h-8 w-auto select-none transition-opacity duration-300 group-hover:opacity-80"
            draggable="false"
          />
          <span className="serif text-lg font-semibold tracking-tight text-foreground">
            LENS
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-testid={`nav-link-${item.label.toLowerCase()}`}
              className="text-sm text-[#b9b3a7] hover:text-[#f5f3ee] transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#34d399] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#cta"
            data-testid="nav-book-demo"
            className="hidden md:inline-flex btn-primary text-sm"
          >
            Book a demo
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="nav-mobile-toggle"
            className="md:hidden text-[#f5f3ee] p-2"
            aria-label="menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          data-testid="nav-mobile-menu"
          className="md:hidden bg-[#050505]/95 backdrop-blur-xl border-t border-[#ffffff10]"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-base text-[#b9b3a7] hover:text-[#f5f3ee]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setMobileOpen(false)}
              className="btn-primary self-start mt-2"
            >
              Book a demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
