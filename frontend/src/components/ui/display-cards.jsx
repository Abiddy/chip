import React, { useState } from "react";
import { cn } from "@/lib/utils";

const STACK_OFFSETS = [
  "translate-x-0 translate-y-0",
  "translate-x-12 sm:translate-x-16 translate-y-8",
  "translate-x-24 sm:translate-x-32 translate-y-16",
];

const ACTIVE_OFFSET = "!translate-x-16 sm:!translate-x-20 !translate-y-10";

function DisplayCard({
  className,
  icon,
  title = "Featured",
  description = "Discover amazing content",
  titleClassName = "text-teal-600",
  index = 0,
  hoveredIndex,
  onHover,
  onLeave,
  totalCards = 3,
}) {
  const isActive = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && !isActive;
  const isBackCard = index < totalCards - 1;
  const showIdleOverlay = hoveredIndex === null && isBackCard;

  return (
    <div
      role="presentation"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      className={cn(
        "relative flex min-h-[10rem] w-full max-w-[22rem] cursor-default -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 px-4 py-4 transition-all duration-500 ease-out",
        "[grid-area:stack]",
        isActive
          ? cn(
              ACTIVE_OFFSET,
              "z-50 scale-[1.03] border-teal-500/50 bg-white shadow-xl grayscale-0"
            )
          : cn(
              STACK_OFFSETS[index] ?? STACK_OFFSETS[0],
              isDimmed
                ? "z-[1] opacity-40 grayscale border-border/60 bg-muted/50"
                : cn(
                    "z-[1] border-border/80 bg-muted/70 backdrop-blur-sm",
                    showIdleOverlay && "grayscale-[85%]",
                    index === totalCards - 1 &&
                      hoveredIndex === null &&
                      "z-[3] border-teal-500/20 bg-white shadow-md grayscale-0"
                  )
            ),
        showIdleOverlay &&
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:bg-background/45 before:content-['']",
        isBackCard &&
          !isActive &&
          "after:pointer-events-none after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:rounded-xl after:bg-gradient-to-l after:from-background after:to-transparent after:transition-opacity after:duration-500 after:content-['']",
        (isActive || (hoveredIndex === null && index === totalCards - 1)) &&
          "after:opacity-0",
        className
      )}
      style={{ zIndex: isActive ? 50 : 10 + index }}
    >
      <div>
        {icon && (
          <span className="relative mb-2 inline-block rounded-full bg-teal-800 p-1">
            {icon}
          </span>
        )}
        <p className={cn("mono text-[11px] font-medium", titleClassName)}>
          {title}
        </p>
      </div>
      <p
        className={cn(
          "text-sm leading-relaxed pr-1 transition-colors duration-500",
          isActive || (hoveredIndex === null && index === totalCards - 1)
            ? "text-foreground"
            : "text-muted-foreground"
        )}
      >
        {description}
      </p>
    </div>
  );
}

export default function DisplayCards({ cards = [] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="flex min-h-[340px] w-full items-center justify-center md:min-h-[380px]">
      <div className="grid w-full max-w-md place-items-center [grid-template-areas:'stack'] lg:max-w-lg">
        {cards.map((cardProps, index) => (
          <DisplayCard
            key={cardProps.title ?? index}
            {...cardProps}
            index={index}
            totalCards={cards.length}
            hoveredIndex={hoveredIndex}
            onHover={setHoveredIndex}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </div>
  );
}

export { DisplayCard };
