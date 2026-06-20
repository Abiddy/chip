import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FinalCtaSection() {
  return (
    <section id="cta" className="bg-neutral-950 py-24 text-white md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-400">
          Ready to start?
        </p>
        <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl">
          Stop waiting on verification.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
          Join the engineering teams already cutting verification cycles from
          weeks to hours with ACE.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://lenseda.com/"
            className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
          >
            Get Started
          </a>
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-600 px-6 py-3 text-sm font-medium text-neutral-200 transition-colors hover:bg-neutral-900"
          >
            Share Demo Feedback
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
