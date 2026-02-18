"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Lang = "sq" | "en";

type Slide = {
  image: string;
  kicker: { sq: string; en: string };
  title: { sq: string; en: string };
  subtitle: { sq: string; en: string };
};

export default function ServicesHeroCarousel({
  lang,
  index,
  onIndexChange,
}: {
  lang: Lang;
  index?: number; // optional controlled index
  onIndexChange?: (i: number) => void; // optional controlled setter
}) {
  const slides: Slide[] = useMemo(
    () => [
      {
        image: "/images/services-1-wide.webp",
        kicker: { sq: "ORIENT GROUP", en: "ORIENT GROUP" },
        title: { sq: "PROJECTS & DESIGN", en: "PROJECTS & DESIGN" },
        subtitle: {
          sq: "Projektim i integruar dhe koordinim i plotë — nga koncepti te dokumentimi teknik.",
          en: "Integrated design and full coordination — from concept to technical documentation.",
        },
      },
      {
        image: "/images/services-2-wide.webp",
        kicker: { sq: "ORIENT GROUP", en: "ORIENT GROUP" },
        title: { sq: "CONSTRUCTION", en: "CONSTRUCTION" },
        subtitle: {
          sq: "Zbatim i disiplinuar në kantier — cilësi, afate dhe kontroll i vazhdueshëm.",
          en: "Disciplined site execution — quality, timelines, and continuous control.",
        },
      },
      {
        image: "/images/services-3-wide.webp",
        kicker: { sq: "ORIENT NET", en: "ORIENT NET" },
        title: {
          sq: "INTERNET — pjesë e ORIENT GROUP",
          en: "INTERNET — part of ORIENT GROUP",
        },
        subtitle: {
          sq: "Internet me fibra optike, instalim profesional dhe mbështetje e shpejtë për klientët.",
          en: "Fiber internet, professional installation, and fast customer support.",
        },
      },
    ],
    []
  );

  const len = slides.length;

  // Uncontrolled fallback state
  const [internalI, setInternalI] = useState(0);

  // Current index (controlled if provided)
  const i = typeof index === "number" ? ((index % len) + len) % len : internalI;

  // Keep callback stable to avoid deps array size changes / HMR weirdness
  const onIndexChangeRef = useRef<typeof onIndexChange>(onIndexChange);
  useEffect(() => {
    onIndexChangeRef.current = onIndexChange;
  }, [onIndexChange]);

  const setI = (nextIndex: number) => {
    const v = ((nextIndex % len) + len) % len;
    const cb = onIndexChangeRef.current;
    if (cb) cb(v);
    else setInternalI(v);
  };

  const next = () => setI(i + 1);
  const prev = () => setI(i - 1);

  // Auto-slide (no “deps size changed”)
  const iRef = useRef(i);
  useEffect(() => {
    iRef.current = i;
  }, [i]);

  useEffect(() => {
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const t = window.setInterval(() => {
      setI(iRef.current + 1);
    }, 6500);

    return () => window.clearInterval(t);
  }, [len]); // ✅ constant deps length

  // Swipe / drag
  const startX = useRef<number | null>(null);
  const dragging = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;

    const sx = startX.current;
    if (sx == null) return;

    const dx = e.clientX - sx;
    startX.current = null;

    const threshold = 45;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
  };

  const s = slides[i];
  const kicker = s.kicker[lang];
  const title = s.title[lang];
  const subtitle = s.subtitle[lang];

  // Special CTA for ORIENT NET slide (3rd slide)
  const isOrientNet = i === 2;

  return (
    <section
      className="relative overflow-hidden rounded-none border-b border-white/10"
      style={{
        minHeight: "clamp(340px, 52vh, 520px)",
      }}
    >
      {/* Background images (cross-fade) */}
      <div className="absolute inset-0">
        {slides.map((sl, idx) => (
          <div
            key={sl.image}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={sl.image}
              alt="ORIENT GROUP"
              fill
              priority={idx === i}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Premium overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/35 to-black/85" />

      {/* Content */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-6xl items-end px-4 pb-10 pt-10 md:px-6"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragging.current = false;
          startX.current = null;
        }}
        style={{ touchAction: "pan-y" }}
      >
        {/* ✅ Ultra-tight frosted strips (hug text) */}
        <div className="max-w-2xl space-y-3">
          {/* Kicker strip */}
          <p className="inline-flex items-center rounded-md bg-black/20 px-2.5 py-1 text-xs uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm">
            {kicker}
          </p>

          {/* Title strip */}
          <h1 className="inline-block rounded-lg bg-black/22 px-3 py-1.5 text-4xl font-bold leading-tight text-white backdrop-blur-md md:text-6xl">
            {title}
          </h1>

          {/* Subtitle strip */}
          <p className="inline-block max-w-xl rounded-md bg-black/18 px-3 py-1.5 text-white/90 backdrop-blur-sm md:text-lg">
            {subtitle}
          </p>

          {/* Buttons */}
          <div className="mt-4 flex flex-wrap gap-3">
            {isOrientNet ? (
              <a
                href="https://orientnet.al/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
              >
                OrientNet
              </a>
            ) : (
              <Link
                href="/projects"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
              >
                {lang === "en" ? "Projects" : "Projektet"}
              </Link>
            )}

            <Link
              href="/contact"
              className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-white/15"
            >
              {lang === "en" ? "Contact" : "Kontakt"}
            </Link>
          </div>
        </div>

        {/* Arrows */}
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <button
            onClick={prev}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15 backdrop-blur"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            onClick={next}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15 backdrop-blur"
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="pointer-events-auto relative z-10 mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 pb-4 md:justify-start md:px-6">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              idx === i ? "bg-white" : "bg-white/35 hover:bg-white/55"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
