"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Lang = "sq" | "en";
type Item = { href: string; label: { sq: string; en: string } };

export default function MobileMenu({
  open,
  onClose,
  items,
  lang,
  withLang,
}: {
  open: boolean;
  onClose: () => void;
  items: Item[];
  lang: Lang;
  withLang: (href: string) => string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted) return null;

  const ui = (
    <div
      className={`fixed inset-0 z-[99999] isolate transition-opacity duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Deep frosted full sheet */}
      <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-[50px]" />

      {/* Click outside closes */}
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      {/* Content */}
      <div
        className={`relative h-full w-full overflow-y-auto text-white
          transition-transform duration-300 ease-out
          ${open ? "translate-y-0" : "-translate-y-2"}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div
          className={`flex items-center justify-between px-6 py-5
            transition-all duration-300 ease-out
            ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
          style={{ transitionDelay: open ? "70ms" : "0ms" }}
        >
          <div className="font-semibold tracking-wide">
            ORIENT GROUP <span className="text-white/70">shpk</span>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition"
          >
            ✕
          </button>
        </div>

        <div className="px-6 pb-16">
          <div
            className={`text-xs uppercase tracking-[0.25em] text-white/70
              transition-all duration-300 ease-out
              ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            style={{ transitionDelay: open ? "120ms" : "0ms" }}
          >
            {lang === "en" ? "Menu" : "Menu"}
          </div>

          {/* Menu items (stagger) */}
          <nav className="mt-6 space-y-4">
            {items.map((it, i) => (
              <Link
                key={it.href}
                href={withLang(it.href)}
                onClick={onClose}
                className={`flex items-center justify-between rounded-2xl border border-white/20 bg-white/10
                  px-5 py-4 text-lg font-semibold hover:bg-white/15 transition
                  will-change-transform
                  transition-all duration-300 ease-out
                  ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                style={{ transitionDelay: open ? `${170 + i * 60}ms` : "0ms" }}
              >
                {it.label[lang]}
                <span className="text-white/50">→</span>
              </Link>
            ))}
          </nav>

          {/* CTA (slightly later) */}
          <div
            className={`mt-10 rounded-3xl border border-white/20 bg-white/10 p-6
              transition-all duration-400 ease-out
              ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{ transitionDelay: open ? `${170 + items.length * 60 + 80}ms` : "0ms" }}
          >
            <div className="text-lg font-semibold">
              {lang === "en" ? "Request an offer" : "Kërko ofertë"}
            </div>

            <p className="mt-2 text-sm text-white/70">
              {lang === "en"
                ? "Send us a message and we’ll respond fast."
                : "Na shkruaj dhe të kthejmë përgjigje shpejt."}
            </p>

            <Link
              href={withLang("/contact")}
              onClick={onClose}
              className="mt-5 inline-flex w-full justify-center rounded-full bg-white px-6 py-3 font-semibold text-black hover:bg-white/90 transition"
            >
              {lang === "en" ? "Contact" : "Kontakt"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(ui, document.body);
}
