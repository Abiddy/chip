import React from "react";
import { cn } from "@/lib/utils";

export function BentoCard({
  title,
  description,
  icon,
  status,
  tags,
  meta,
  cta = "Explore →",
  colSpan,
  hasPersistentHover = false,
  variant = "light",
  className,
  children,
  hideFooter = false,
  as: Component = "div",
  ...props
}) {
  const isDark = variant === "dark";
  const showFooter =
    !hideFooter && ((tags && tags.length > 0) || cta);

  return (
    <Component
      className={cn(
        "group relative rounded-xl overflow-hidden transition-all duration-300 text-left",
        isDark
          ? "border border-white/10 bg-black hover:shadow-[0_2px_12px_rgba(255,255,255,0.06)]"
          : "border border-gray-100/80 bg-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
        "hover:-translate-y-0.5 will-change-transform",
        Component === "div" ? "p-4" : "p-4 w-full appearance-none",
        colSpan === 2 && "md:col-span-2",
        colSpan === 3 && "md:col-span-3",
        colSpan === 4 && "lg:col-span-4",
        {
          "shadow-[0_2px_12px_rgba(0,0,0,0.03)] -translate-y-0.5":
            hasPersistentHover && !isDark,
          "shadow-[0_2px_12px_rgba(255,255,255,0.06)] -translate-y-0.5":
            hasPersistentHover && isDark,
        },
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          hasPersistentHover
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-[length:4px_4px]",
            isDark
              ? "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)]"
              : "bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)]"
          )}
        />
      </div>

      <div className="relative flex flex-col space-y-3">
        {(icon || status) && (
          <div className="flex items-center justify-between">
            {icon ? (
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-lg transition-all duration-300 group-hover:bg-gradient-to-br",
                  isDark ? "bg-white/10" : "bg-black/5"
                )}
              >
                {icon}
              </div>
            ) : (
              <span />
            )}
            {status && (
              <span
                className={cn(
                  "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm transition-colors duration-300",
                  isDark
                    ? "bg-white/10 text-white/80 group-hover:bg-white/15"
                    : "bg-black/5 text-gray-600 group-hover:bg-black/10"
                )}
              >
                {status}
              </span>
            )}
          </div>
        )}

        {(title || description) && (
          <div className="space-y-2">
            {title && (
              <h3
                className={cn(
                  "font-medium tracking-tight text-[15px]",
                  isDark ? "text-white" : "text-gray-900"
                )}
              >
                {title}
                {meta && (
                  <span
                    className={cn(
                      "ml-2 text-xs font-normal",
                      isDark ? "text-white/50" : "text-gray-500"
                    )}
                  >
                    {meta}
                  </span>
                )}
              </h3>
            )}
            {description && (
              <p
                className={cn(
                  "text-sm leading-snug font-[425]",
                  isDark ? "text-white/70" : "text-gray-600"
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {children}

        {showFooter && (
          <div className="flex items-center justify-between mt-2">
            <div
              className={cn(
                "flex flex-wrap items-center gap-2 text-xs",
                isDark ? "text-white/60" : "text-gray-500"
              )}
            >
              {tags?.map((tag, i) => (
                <span
                  key={i}
                  className={cn(
                    "px-2 py-1 rounded-md backdrop-blur-sm transition-all duration-200",
                    isDark
                      ? "bg-white/10 hover:bg-white/15"
                      : "bg-black/5 hover:bg-black/10"
                  )}
                >
                  #{tag}
                </span>
              ))}
            </div>
            {cta && (
              <span
                className={cn(
                  "text-xs opacity-0 group-hover:opacity-100 transition-opacity shrink-0",
                  isDark ? "text-white/50" : "text-gray-500"
                )}
              >
                {cta}
              </span>
            )}
          </div>
        )}
      </div>

      <div
        className={cn(
          "absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent to-transparent transition-opacity duration-300",
          isDark ? "via-white/10" : "via-gray-100/50",
          hasPersistentHover
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        )}
      />
    </Component>
  );
}

export function BentoGrid({ items = [], className, children }) {
  if (children) {
    return (
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-3",
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-3",
        className
      )}
    >
      {items.map((item, index) => (
        <BentoCard key={item.title ?? index} {...item} />
      ))}
    </div>
  );
}
