import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";

const LOGO_SRC = `${process.env.PUBLIC_URL}/lens-logo.png`;

const COLS = [
  {
    title: "Product",
    links: [
      { label: "ACE Engine", href: "#product" },
      { label: "Capabilities", href: "#features" },
      { label: "Workflow", href: "#workflow" },
      { label: "ROI Calculator", href: "#savings" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "https://lenseda.com/" },
      { label: "Why we started", href: "https://lenseda.com/" },
      { label: "Customers", href: "#customers" },
      { label: "Careers", href: "https://lenseda.com/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Demo Feedback", href: "/reviews" },
      { label: "Blog", href: "https://lenseda.com/" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

function FooterLink({ href, label }) {
  const isExternal = href.startsWith("http");
  const className =
    "text-sm text-neutral-500 transition-colors hover:text-neutral-900";

  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  );
}

export default function LandingFooter() {
  return (
    <footer data-testid="site-footer" className="border-t border-neutral-200 bg-white pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" aria-label="Home" className="mb-4 inline-flex">
              <img
                src={LOGO_SRC}
                alt="Lens"
                className="h-9 w-auto object-contain select-none"
                draggable={false}
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-neutral-500">
              Analog verification at silicon speed. Built for teams shipping at
              12 nm and below.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  {col.title}
                </p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href} label={link.label} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center">
          <span className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Lens EDA — All rights reserved.
          </span>
          <a
            href="https://www.linkedin.com/company/lens-eda"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 transition-colors hover:text-neutral-700"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
