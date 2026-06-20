import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const LOGO_SRC = `${process.env.PUBLIC_URL}/lens-logo.png`;

const NAV = [
  { label: "Product", href: "#product" },
  { label: "Solutions", href: "#features" },
  { label: "Resources", href: "#workflow" },
  { label: "Pricing", href: "#savings" },
];

export default function SiteHeader() {
  return (
    <header
      data-testid="site-nav"
      className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link to="/" aria-label="Home" className="inline-flex shrink-0 items-center">
          <img
            src={LOGO_SRC}
            alt="Lens ACE"
            className="h-8 w-auto object-contain select-none"
            draggable={false}
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/answers"
            className="hidden text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 sm:inline"
          >
            Log In
          </Link>
          <a
            href="#cta"
            className={cn(
              "rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white",
              "transition-colors hover:bg-neutral-800"
            )}
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
