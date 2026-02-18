"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import GlassCard from "@/components/GlassCard";
import ServicesHeroCarousel from "@/components/ServicesHeroCarousel";

type Lang = "sq" | "en";

type Block = {
  title: string;
  text: string;
};

export default function ServicesHeroWithCards({
  lang,
  blocks,
}: {
  lang: Lang;
  blocks: Block[];
}) {
  const [active, setActive] = useState(0);



  // ✅ Neon palette (1 green, 2 yellow→orange, 3 blue)
  const neon = useMemo(
    () => [
      // 1) GREEN
      {
        ring: "rgba(34,197,94,.62)",
        glow: "rgba(34,197,94,.22)",
        fillA: "rgba(34,197,94,.22)",
        fillB: "rgba(34,197,94,.06)",
      },
      // 2) YELLOW → ORANGE
      {
        ring: "rgba(234,179,8,.62)",
        glow: "rgba(249,115,22,.20)",
        fillA: "rgba(234,179,8,.20)",
        fillB: "rgba(249,115,22,.08)",
      },
      // 3) BLUE
      {
        ring: "rgba(59,130,246,.62)",
        glow: "rgba(59,130,246,.20)",
        fillA: "rgba(59,130,246,.20)",
        fillB: "rgba(59,130,246,.06)",
      },
    ],
    []
  );

  const items = blocks.slice(0, 3);

  // -------------------------
  // Mobile swipe carousel
  // -------------------------
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
    if (dx > threshold) setActive((v) => (v + 2) % 3); // prev
    else if (dx < -threshold) setActive((v) => (v + 1) % 3); // next
  };

  return (
    <>
      {/* HERO (controlled) */}
      <ServicesHeroCarousel lang={lang} index={active} onIndexChange={setActive} />

      {/* CARDS */}
      <div className="relative -mt-10 px-4 pb-6">
        <div className="mx-auto max-w-6xl">
          {/* ✅ DESKTOP: 3-column grid */}
          <div className="hidden gap-4 md:grid md:grid-cols-3">
            {items.map((b, idx) => {
              const isActive = idx === active;
              const c = neon[idx] ?? neon[0];

              return (
                <div
                  key={b.title}
                  className="transition-transform duration-500 ease-out"
                  style={{
                    transform: isActive
                      ? "translateY(-6px) scale(1.03)"
                      : "translateY(0) scale(1)",
                  }}
                >
                  <div
                    className="relative rounded-3xl"
                    style={{
                      boxShadow: isActive
                        ? `0 0 0 2px ${c.ring}, 0 0 32px ${c.glow}, 0 0 90px rgba(0,0,0,0.35)`
                        : "none",
                    }}
                  >
                    {/* subtle neon fill when active */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-3xl"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transition: "opacity 450ms ease",
                        background: `radial-gradient(900px 260px at 30% 0%, ${c.fillA} 0%, ${c.fillB} 35%, rgba(255,255,255,0) 65%)`,
                      }}
                    />
                    <GlassCard>
                      <h2 className="text-xl font-semibold">{b.title}</h2>
                      <p className="mt-2 text-white/70">{b.text}</p>
                    </GlassCard>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ✅ MOBILE: carousel (1 card at a time) */}
          <div className="md:hidden">
            <div
              className="relative overflow-hidden"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => {
                dragging.current = false;
                startX.current = null;
              }}
              style={{ touchAction: "pan-y" }} // allow vertical scroll, still detect horizontal swipes
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${active * 100}%)`,
                }}
              >
                {items.map((b, idx) => {
                  const isActive = idx === active;
                  const c = neon[idx] ?? neon[0];

                  return (
                    <div key={b.title} className="w-full flex-none pr-0">
                      <div
                        className="relative rounded-3xl transition-transform duration-500 ease-out"
                        style={{
                          transform: isActive ? "scale(1.02)" : "scale(0.98)",
                          boxShadow: isActive
                            ? `0 0 0 2px ${c.ring}, 0 0 28px ${c.glow}, 0 0 80px rgba(0,0,0,0.35)`
                            : "none",
                        }}
                      >
                        <div
                          className="pointer-events-none absolute inset-0 rounded-3xl"
                          style={{
                            opacity: isActive ? 1 : 0,
                            transition: "opacity 450ms ease",
                            background: `radial-gradient(900px 260px at 30% 0%, ${c.fillA} 0%, ${c.fillB} 35%, rgba(255,255,255,0) 65%)`,
                          }}
                        />
                        <GlassCard>
                          <h2 className="text-xl font-semibold">{b.title}</h2>
                          <p className="mt-2 text-white/70">{b.text}</p>
                        </GlassCard>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile dots (synced) */}
            <div className="mt-3 flex items-center justify-center gap-2">
              {[0, 1, 2].map((k) => (
                <button
                  key={k}
                  onClick={() => setActive(k)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    active === k ? "bg-white" : "bg-white/35 hover:bg-white/55"
                  }`}
                  aria-label={`Select card ${k + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
