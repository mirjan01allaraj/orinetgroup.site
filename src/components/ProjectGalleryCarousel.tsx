"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  images: { src: string; alt?: string }[];
  className?: string;
  height?: number; // px
};

export default function ProjectGalleryCarousel({
  images,
  className = "",
  height = 320,
}: Props) {
  const safeImages = useMemo(() => images?.filter(Boolean) ?? [], [images]);
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const deltaX = useRef<number>(0);

  useEffect(() => {
    // If images list changes, keep index valid
    if (index > safeImages.length - 1) setIndex(0);
  }, [safeImages.length, index]);

  const go = (next: number) => {
    if (!safeImages.length) return;
    const n = (next + safeImages.length) % safeImages.length;
    setIndex(n);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
  };

  const onTouchEnd = () => {
    const dx = deltaX.current;
    startX.current = null;
    deltaX.current = 0;

    // Swipe threshold
    if (Math.abs(dx) < 40) return;
    if (dx < 0) go(index + 1);
    else go(index - 1);
  };

  if (!safeImages.length) return null;

  return (
    <div className={`w-full ${className}`}>
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ height }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Track */}
        <div
          className="absolute inset-0 flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {safeImages.map((img, i) => (
            <div key={img.src + i} className="relative w-full h-full shrink-0">
              <Image
                src={img.src}
                alt={img.alt ?? `Project image ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Prev / Next */}
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => go(index - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 backdrop-blur px-3 py-2 text-white hover:bg-black/55 transition"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={() => go(index + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 backdrop-blur px-3 py-2 text-white hover:bg-black/55 transition"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {safeImages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
