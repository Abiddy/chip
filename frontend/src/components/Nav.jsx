import { useEffect, useState } from "react";
import LensLogo from "./LensLogo";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Product", href: "#product" },
  { label: "Company", href: "#company" },
  { label: "Customers", href: "#customers" },
  { label: "Resources", href: "#resources" },
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
        <a
          href="#"
          data-testid="nav-logo"
          className="flex items-center group"
        >
          <LensLogo className="h-8 transition-opacity duration-300 group-hover:opacity-80" />
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
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#4dd4ff] group-hover:w-full transition-all duration-300" />
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
