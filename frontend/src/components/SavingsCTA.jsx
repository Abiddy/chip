import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";

// Three subtle chip variants so the confetti feels organic
function ChipSvg({ variant, size }) {
  if (variant === 0) {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
        <rect
          x="7"
          y="7"
          width="18"
          height="18"
          rx="2"
          stroke="#34d399"
          strokeWidth="1.2"
        />
        <rect
          x="11"
          y="11"
          width="10"
          height="10"
          rx="1"
          fill="#34d399"
          fillOpacity="0.18"
          stroke="#6ee7b7"
          strokeOpacity="0.5"
          strokeWidth="0.5"
        />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <line
              x1="4"
              y1={10 + i * 4}
              x2="7"
              y2={10 + i * 4}
              stroke="#34d399"
              strokeWidth="1"
            />
            <line
              x1="25"
              y1={10 + i * 4}
              x2="28"
              y2={10 + i * 4}
              stroke="#34d399"
              strokeWidth="1"
            />
            <line
              x1={10 + i * 4}
              y1="4"
              x2={10 + i * 4}
              y2="7"
              stroke="#34d399"
              strokeWidth="1"
            />
            <line
              x1={10 + i * 4}
              y1="25"
              x2={10 + i * 4}
              y2="28"
              stroke="#34d399"
              strokeWidth="1"
            />
          </g>
        ))}
      </svg>
    );
  }
  if (variant === 1) {
    return (
      <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
        <rect
          x="6"
          y="10"
          width="20"
          height="12"
          rx="1"
          stroke="#34d399"
          strokeWidth="1.2"
        />
        <circle cx="10" cy="16" r="1.3" fill="#34d399" />
        <rect
          x="13"
          y="13"
          width="10"
          height="6"
          rx="0.5"
          stroke="#6ee7b7"
          strokeOpacity="0.55"
          strokeWidth="0.5"
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line
              x1={8 + i * 4}
              y1="6"
              x2={8 + i * 4}
              y2="10"
              stroke="#34d399"
              strokeWidth="1"
            />
            <line
              x1={8 + i * 4}
              y1="22"
              x2={8 + i * 4}
              y2="26"
              stroke="#34d399"
              strokeWidth="1"
            />
          </g>
        ))}
      </svg>
    );
  }
  // variant 2 — square die with inner grid
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
      <rect
        x="5"
        y="5"
        width="22"
        height="22"
        rx="1"
        stroke="#34d399"
        strokeWidth="1.1"
      />
      <path
        d="M10 5 V27 M16 5 V27 M22 5 V27 M5 10 H27 M5 16 H27 M5 22 H27"
        stroke="#34d399"
        strokeOpacity="0.35"
        strokeWidth="0.4"
      />
      <rect
        x="13"
        y="13"
        width="6"
        height="6"
        fill="#34d399"
        fillOpacity="0.35"
      />
    </svg>
  );
}

export default function SavingsCTA() {
  // generate confetti chip config once
  const chips = useMemo(
    () =>
      Array.from({ length: 42 }).map((_, i) => {
        const size = 12 + Math.random() * 18;
        return {
          id: i,
          left: Math.random() * 100,
          size,
          variant: i % 3,
          duration: 6 + Math.random() * 7,
          delay: -Math.random() * 12,
          rotate: (Math.random() * 720 - 360) | 0,
          drift: (Math.random() * 80 - 40) | 0,
          opacity: 0.28 + Math.random() * 0.45,
          wobble: 2 + Math.random() * 3,
        };
      }),
    []
  );

  return (
    <section
      id="savings"
      data-testid="savings-section"
      className="relative overflow-hidden border-t border-b border-[#ffffff0d] bg-[#060707]"
      style={{ minHeight: "560px" }}
    >
      {/* soft green wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(52,211,153,0.10) 0%, rgba(52,211,153,0.03) 35%, transparent 70%)",
        }}
      />

      {/* falling chips confetti */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        data-testid="savings-confetti"
      >
        {chips.map((c) => (
          <span
            key={c.id}
            className="chip-fall"
            style={{
              left: `${c.left}%`,
              opacity: c.opacity,
              "--rot": `${c.rotate}deg`,
              "--drift": `${c.drift}px`,
              "--wobble": `${c.wobble}deg`,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          >
            <ChipSvg variant={c.variant} size={c.size} />
          </span>
        ))}
      </div>

      {/* content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 py-28 md:py-36 text-center flex flex-col items-center">
        <span className="mono text-[10px] uppercase tracking-[0.25em] text-[#6ee7b7] mb-5 block">
          ROI · Savings Calculator
        </span>
        <h2
          data-testid="savings-heading"
          className="serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-5 max-w-3xl"
        >
          You&apos;d be surprised how much
          <br />
          <span className="accent">we save you.</span>
        </h2>
        <p className="text-[#b9b3a7] text-base md:text-lg mb-10 max-w-md">
          Run the math. We dare you.
        </p>

        <a
          href="https://lenseda.com/ace-roi.html"
          target="_blank"
          rel="noreferrer"
          data-testid="savings-calculate-btn"
          className="btn-primary text-base"
        >
          Calculate Saving
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
