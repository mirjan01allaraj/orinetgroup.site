"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import GlassCard from "@/components/GlassCard";
import Section from "@/components/Section";
import Link from "next/link";
export default function HomeScroll({
  lang,
  content,
}: {
  lang: "sq" | "en";
  content: {
    kicker: string;
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
  };
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // ✅ Smooth scroll: write progress to CSS var --p (no React re-render)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;

    const tick = () => {
      const y = window.scrollY || 0;
      const max = 520; // collapse distance
      const p = Math.min(1, Math.max(0, y / max));

      el.style.setProperty("--p", String(p));
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Fade-in sections
  const revealRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const els = revealRefs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollLabel = lang === "en" ? "Scroll Down" : "Shfleto poshtë";

  const scrollToNext = () => {
    const el = document.getElementById("next");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={rootRef} className="bg-neutral-950">
      <main className="bg-neutral-950">
        {/* Sticky hero area provides scroll space */}
        <div className="relative h-[calc(100dvh+520px)] h-[calc(100vh+520px)]">
          <section className="sticky top-0 h-[100dvh] h-screen overflow-hidden">
            {/* Background */}
            <div className="heroBg absolute inset-0 will-change-transform">
              <Image
                src="/images/hero-industrial.webp"
                alt="ORIENT GROUP"
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            {/* Overlay */}
            <div className="heroOverlay absolute inset-0 bg-gradient-to-b from-black/50 via-black/0 to-black/95" />

            {/* Vignette */}
            <div
              className="heroVignette absolute inset-0"
              style={{
                background:
                  "radial-gradient(1200px 700px at 40% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.9) 100%)",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center">
              <div className="mx-auto w-full max-w-6xl px-6">
                <div className="heroText max-w-2xl will-change-transform">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                    {content.kicker}
                  </p>

                  <h1 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">
                    {content.title}
                  </h1>

                  <p className="mt-4 max-w-xl text-white/75 md:text-lg">
                    {content.subtitle}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link href="/contact" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90">
                     {content.primary}
                         </Link>

                    <Link href="/projects" className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-white/15">
                       {content.secondary}
                       </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ Scroll hint (bouncing pill + arrow) */}
            <div className="scrollHint absolute left-1/2 bottom-20 z-20 -translate-x-1/2">
              <button
                onClick={scrollToNext}
                className="scrollBtn rounded-full border border-white/15 bg-black/25 px-4 py-2 backdrop-blur-md"
                aria-label={scrollLabel}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-[0.18em] text-white/80">
                    {scrollLabel}
                  </span>
                  <span className="scrollArrow text-white/80">↓</span>
                </div>
              </button>
            </div>

            {/* bottom fade */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-neutral-950 to-transparent" />
          </section>
        </div>

        {/* ✅ Anchor target for smooth scroll */}
        <div id="next" />

        {/* Sections */}
        <div className="sectionsPush relative px-4 pb-14">
          <div className="mx-auto max-w-6xl space-y-4">
            <Reveal setRef={(el) => (revealRefs.current[0] = el)}>
              <GlassCard>
                <Section
                  title={lang === "sq" ? "Shërbime" : "Services"}
                  text={
                    lang === "sq"
                      ? "Ndërtim turnkey, para-ndërtim, punime civile dhe dorëzim i disiplinuar."
                      : "Turnkey construction, preconstruction, civil works and disciplined delivery."
                  }
                  cta={{
                    label: lang === "sq" ? "Shiko Shërbimet" : "View Services",
                    href: "/services",
                  }}
                />
              </GlassCard>
            </Reveal>

            <Reveal setRef={(el) => (revealRefs.current[1] = el)}>
              <GlassCard>
                <Section
                  title={lang === "sq" ? "Projektet" : "Projects"}
                  text={
                    lang === "sq"
                      ? "Portofol në infrastrukturë, industriale, rezidenciale dhe komerciale."
                      : "Portfolio across infrastructure, industrial, residential and commercial sectors."
                  }
                  cta={{
                    label: lang === "sq" ? "Shfleto Projektet" : "Browse Projects",
                    href: "/projects",
                  }}
                />
              </GlassCard>
            </Reveal>

            <Reveal setRef={(el) => (revealRefs.current[2] = el)}>
              <GlassCard>
                <Section
                  title={lang === "sq" ? "Investo" : "Invest"}
                  text={
                    lang === "sq"
                      ? "Opsione investimi: parablerje, tokë për pjesë, JV."
                      : "Investment options: pre-order, land-for-share, joint ventures."
                  }
                  cta={{
                    label: lang === "sq" ? "Mëso më shumë" : "Learn More",
                    href: "/invest",
                  }}
                />
              </GlassCard>
            </Reveal>

            <Reveal setRef={(el) => (revealRefs.current[3] = el)}>
              <GlassCard>
                <Section
                  title={lang === "sq" ? "Lajme" : "News"}
                  text={
                    lang === "sq"
                      ? "Njoftime, përditësime dhe milestone të kompanisë."
                      : "Announcements, updates and company milestones."
                  }
                  cta={{
                    label: lang === "sq" ? "Lexo Lajmet" : "Read News",
                    href: "/news",
                  }}
                />
              </GlassCard>
            </Reveal>
          </div>
        </div>

        <style jsx global>{`
          :root {
            --p: 0;
          }

          .heroBg {
            transform: scale(calc(1.02 + (var(--p) * 0.03)));
            filter: brightness(calc(0.6 - (var(--p) * 0.18)))
              saturate(calc(1 - (var(--p) * 0.12)));
          }

          @media (hover: hover) and (pointer: fine) {
            .heroBg {
              filter: blur(calc(var(--p) * 4px))
                brightness(calc(0.6 - (var(--p) * 0.18)))
                saturate(calc(1 - (var(--p) * 0.12)));
            }
          }

          .heroText {
            transform: translateY(calc(var(--p) * -22px))
              scale(calc(1 - (var(--p) * 0.09)));
            opacity: calc(1 - (var(--p) * 0.55));
          }

          .heroOverlay {
            opacity: calc(0.35 + (var(--p) * 0.25));
          }

          .heroVignette {
            opacity: calc(0.35 + (var(--p) * 0.35));
          }

          .sectionsPush {
            transform: translateY(calc(-60px - (var(--p) * 120px)));
            will-change: transform;
          }

          .reveal.is-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }

          /* ✅ Scroll hint stays in hero and fades as you scroll */
          .scrollHint {
            opacity: calc(1 - (var(--p) * 1.35));
            transition: opacity 180ms linear;
          }

          /* Whole pill bounce */
          .scrollBtn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            animation: bounceY 1.6s ease-in-out infinite;
            will-change: transform;
          }

          /* Arrow slightly stronger bounce */
          .scrollArrow {
            display: inline-block;
            animation: arrowBounce 1.6s ease-in-out infinite;
            will-change: transform;
          }

          @keyframes bounceY {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes arrowBounce {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-12px);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .scrollBtn,
            .scrollArrow {
              animation: none !important;
            }
          }
        `}</style>
      </main>
    </div>
  );
}

function Reveal({
  children,
  setRef,
}: {
  children: React.ReactNode;
  setRef: (el: HTMLElement | null) => void;
}) {
  return (
    <div
      ref={setRef as any}
      className="reveal opacity-0 translate-y-6 transition duration-700 ease-out will-change-transform"
    >
      {children}
    </div>
  );
}
