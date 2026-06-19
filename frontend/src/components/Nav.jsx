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
