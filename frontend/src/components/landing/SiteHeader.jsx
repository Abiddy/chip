import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const LOGO_SRC = `${process.env.PUBLIC_URL}/lens-logo.png`;

const NAV = [
  { label: "ACE", href: "#product" },
  { label: "Capabilities", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Performance", href: "#performance" },
  { label: "ROI", href: "#savings" },
];

export default function SiteHeader() {
  return (
    <header
      data-testid="site-nav"
      className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 lg:px-10 lg:py-4">
        <Link to="/" aria-label="Home" className="inline-flex shrink-0 items-center">
          <img
            src={LOGO_SRC}
            alt="Lens"
            className="h-9 w-auto object-contain select-none"
            draggable={false}
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              data-testid={`nav-link-${label.toLowerCase()}`}
              className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#cta"
            data-testid="nav-book-demo"
            className={cn(
              "rounded-full border border-neutral-900 px-4 py-2 text-sm font-medium text-neutral-900",
              "transition-colors hover:bg-neutral-50"
            )}
          >
            Book a demo
          </a>
          <a
            href="#savings"
            data-testid="nav-calculate-savings"
            className={cn(
              "rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white",
              "transition-colors hover:bg-neutral-800"
            )}
          >
            Calculate Your Savings
          </a>
        </div>
      </div>
    </header>
  );
}
