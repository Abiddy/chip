import { cn } from "@/lib/utils";

/**
 * Four-column dashed grid inspired by vercep feature cards.
 * Each item: icon, optional label, title (metric), description.
 */
export function DashedFeatureGrid({ items, className }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 divide-dashed divide-neutral-400 border-neutral-400 border-t border-dashed",
        "sm:grid-cols-2 sm:divide-x",
        "lg:grid-cols-4",
        className
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const key = item.label ?? item.title;

        return (
          <div
            key={key}
            className="flex flex-col gap-5 px-5 py-8 lg:px-6 lg:py-10"
          >
            {Icon ? (
              <Icon className="size-12 text-neutral-700" strokeWidth={1.25} />
            ) : null}

            <div className="flex flex-col gap-2 pt-6 lg:pt-14">
              {item.label ? (
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                  {item.label}
                </p>
              ) : null}
              <h3 className="font-semibold text-4xl tracking-tight text-neutral-900 sm:text-5xl">
                {item.title}
              </h3>
              <p className="leading-relaxed text-neutral-500">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
