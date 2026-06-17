import { ArrowUpRight } from "lucide-react";

export default function ProductIntro() {
  return (
    <section
      id="product"
      data-testid="product-intro"
      className="relative py-32 md:py-40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left — sticky meta */}
        <div className="lg:col-span-4 lg:sticky lg:top-32">
          <span className="mono text-[10px] text-teal-600 mb-4 block">
            01 — The Engine
          </span>
          <h2 className="serif text-4xl md:text-5xl leading-[1.05] mb-6">
            Meet <span className="accent">ACE.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
            ACE isn&apos;t another EDA tool grafted onto legacy stacks.
            It&apos;s a clean-sheet analog verification engine, purpose-built
            for the deep-node era — where every nanosecond and every nanometer
            counts.
          </p>
          <a
            href="#features"
            data-testid="product-link"
            className="inline-flex items-center gap-2 text-foreground border-b border-teal-600 pb-1 hover:text-teal-700 transition-colors"
          >
            Explore the platform
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Right — visual + copy */}
        <div className="lg:col-span-8">
          <div className="relative rounded-xl border border-border bg-gradient-to-br from-slate-50 to-white overflow-hidden shadow-sm">
            {/* simulated waveform / chip viz */}
            <ChipViz />

            <div className="p-8 md:p-10 border-t border-border">
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  {
                    k: "Simulation",
                    v: "Faster runs without simplification — full SPICE-grade fidelity, accelerated.",
                  },
                  {
                    k: "Debugging",
                    v: "AI-driven root-cause traces. Skip the false alarms, find the real bug.",
                  },
                  {
                    k: "Integration",
                    v: "Drops into your existing tape-out flow. No rewrite. No friction.",
                  },
                ].map((c) => (
                  <div key={c.k}>
                    <div className="mono text-[10px] text-teal-600 mb-2">
                      {c.k}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {c.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChipViz() {
  return (
    <div className="relative h-[320px] md:h-[420px] w-full overflow-hidden">
      {/* circuit grid */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 420"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="trace" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="800" height="420" fill="#f8fafc" />

        {/* base grid */}
        <g stroke="#0f172a" strokeOpacity="0.06" strokeWidth="0.5">
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 40}
              y1="0"
              x2={i * 40}
              y2="420"
            />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 40}
              x2="800"
              y2={i * 40}
            />
          ))}
        </g>

        {/* circuit traces */}
        <g
          fill="none"
          stroke="#34d399"
          strokeOpacity="0.55"
          strokeWidth="1"
          strokeLinecap="round"
        >
          <path d="M 40 80 L 200 80 L 200 200 L 320 200" />
          <path d="M 40 200 L 120 200 L 120 320 L 240 320" />
          <path d="M 480 80 L 600 80 L 600 200 L 760 200" />
          <path d="M 480 320 L 600 320 L 600 240" />
          <path d="M 320 80 L 480 80" />
          <path d="M 320 320 L 480 320" />
        </g>

        {/* chip die */}
        <g>
          <rect
            x="320"
            y="160"
            width="160"
            height="100"
            rx="6"
            fill="#ffffff"
            stroke="#0d9488"
            strokeOpacity="0.7"
            strokeWidth="1.2"
          />
          <rect
            x="335"
            y="175"
            width="130"
            height="70"
            rx="2"
            fill="none"
            stroke="#34d399"
            strokeOpacity="0.3"
            strokeDasharray="2 2"
          />
          <text
            x="400"
            y="215"
            textAnchor="middle"
            fontSize="11"
            fontFamily="Inter"
            fill="#0f766e"
            letterSpacing="2"
          >
            ACE / 12nm
          </text>
          {/* pins */}
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i}>
              <line
                x1={335 + i * 22}
                y1="160"
                x2={335 + i * 22}
                y2="150"
                stroke="#34d399"
                strokeOpacity="0.5"
              />
              <line
                x1={335 + i * 22}
                y1="260"
                x2={335 + i * 22}
                y2="270"
                stroke="#34d399"
                strokeOpacity="0.5"
              />
            </g>
          ))}
        </g>

        {/* moving signal */}
        <rect
          x="0"
          y="79"
          width="200"
          height="2"
          fill="url(#trace)"
        >
          <animate
            attributeName="x"
            from="-200"
            to="800"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="0"
          y="319"
          width="160"
          height="2"
          fill="url(#trace)"
        >
          <animate
            attributeName="x"
            from="-160"
            to="800"
            dur="5s"
            begin="1s"
            repeatCount="indefinite"
          />
        </rect>

        {/* nodes */}
        {[
          [120, 200],
          [200, 200],
          [200, 80],
          [320, 80],
          [480, 80],
          [600, 200],
          [600, 320],
          [240, 320],
          [600, 240],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#34d399" />
        ))}
      </svg>

      {/* HUD top-left */}
      <div className="absolute top-4 left-4 mono text-[10px] text-muted-foreground">
        <span className="text-teal-600">●</span> live · run #4138 · pass
      </div>
      <div className="absolute top-4 right-4 mono text-[10px] text-muted-foreground">
        node 12nm · 150× · 0 false alarms
      </div>
    </div>
  );
}
