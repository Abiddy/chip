import { Play } from "lucide-react";

const HERO_IMG = `${process.env.PUBLIC_URL}/ace-hero-banner.png`;

export default function LandingHero() {
  return (
    <section
      data-testid="hero-section"
      className="relative overflow-hidden bg-white pb-16 pt-12 md:pb-24 md:pt-16"
    >
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-600">
          Introducing ACE 2.0 Platform
        </p>
        <h1
          data-testid="hero-headline"
          className="text-4xl font-semibold leading-[1.08] tracking-tight text-neutral-900 md:text-5xl lg:text-6xl"
        >
          The Verification Solution
          <br />
          At Lightning Speed.
        </h1>
        <p
          data-testid="hero-subline"
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg"
        >
          A complete suite of tools for SOC verification teams — built for
          production flows at TSMC, Samsung, Intel foundry, and beyond.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#cta"
            data-testid="hero-book-demo"
            className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Get Started
          </a>
          <a
            href="#product"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            <Play size={14} className="fill-neutral-800 text-neutral-800" />
            Watch Demo
          </a>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-5xl px-4 md:mt-16 lg:px-10">
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.25)]">
          <div className="flex items-center gap-2 border-b border-neutral-200 bg-white px-4 py-3">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </div>
          <img
            src={HERO_IMG}
            alt="ACE Design Workspace"
            width={1024}
            height={576}
            draggable={false}
            className="w-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
