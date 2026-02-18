"use client";

import { useEffect, useRef } from "react";

type StepItem = {
  title: string;
  desc: string;
};

export default function StepsGrid({ items }: { items: StepItem[] }) {
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("og-step-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {items.map((s, idx) => (
          <div
            key={s.title}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            className="og-step og-step-hidden rounded-2xl border border-white/10 bg-white/5 p-4"
            style={{ ["--d" as any]: `${idx * 90}ms` }}
          >
            {/* ✅ bigger title */}
            <div className="text-base font-semibold md:text-sm">{s.title}</div>

            {/* ✅ bigger description (replaces ORIENT GROUP • process) */}
            <div className="mt-1 text-sm leading-relaxed text-white/65 md:text-xs">
              {s.desc}
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .og-step-hidden {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 520ms ease, transform 520ms ease;
          transition-delay: var(--d, 0ms);
          will-change: transform, opacity;
        }

        .og-step-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .og-step-hidden {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
