import { cn } from "@/lib/utils";

const POSITIONS = {
  "top-right": "-right-[8%] -top-[6%] md:-right-[5%] md:-top-[4%]",
  "bottom-right": "-right-[10%] -bottom-[8%] md:-right-[6%] md:-bottom-[5%]",
  "top-left": "-left-[8%] -top-[6%] md:-left-[5%] md:-top-[4%]",
  "bottom-left": "-left-[10%] -bottom-[8%] md:-left-[6%] md:-bottom-[5%]",
  center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
};

const SIZES = {
  sm: "w-[min(28vw,220px)]",
  default: "w-[min(36vw,280px)]",
  lg: "w-[min(44vw,340px)]",
  xl: "w-[min(52vw,400px)]",
};

export default function SectionWatermark({
  src,
  alt = "",
  position = "top-right",
  size = "default",
  blend = "normal",
  className,
  imageClassName,
}) {
  const blendClass =
    blend === "screen" ? "mix-blend-screen" : blend === "soft" ? "mix-blend-soft-light" : "";

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className={cn(
          "absolute max-w-none select-none object-contain",
          SIZES[size] ?? SIZES.default,
          POSITIONS[position] ?? POSITIONS["top-right"],
          blendClass,
          imageClassName
        )}
      />
    </div>
  );
}
