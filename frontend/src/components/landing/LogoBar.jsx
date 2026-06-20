import { cn } from "@/lib/utils";

const PARTNERS = [
  { name: "Lattice Semi", className: "text-emerald-700" },
  { name: "Avicena Tech", className: "text-teal-700" },
  { name: "Mixel", className: "text-neutral-800" },
  { name: "Silicon Vision", className: "text-indigo-700" },
  { name: "GlobalFoundries", className: "text-orange-600" },
  { name: "Cadence", className: "text-red-700" },
  { name: "Altera", className: "text-blue-700" },
];

export default function LogoBar() {
  return (
    <section
      id="customers"
      data-testid="trusted-by"
      className="border-y border-neutral-200 bg-neutral-50 py-10 md:py-12"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="mb-8 text-center text-sm text-neutral-500">
          Demonstrated with industry-leading teams across analog, foundry, and EDA.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
          {PARTNERS.map(({ name, className }) => (
            <span
              key={name}
              className={cn(
                "text-base font-semibold tracking-tight opacity-70 grayscale transition-opacity hover:opacity-100 md:text-lg",
                className
              )}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
