"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import LangToggle from "@/components/LangToggle";
import MobileMenu from "@/components/MobileMenu";

const nav = [
  { href: "/about", label: { sq: "Rreth Nesh", en: "About" } },
  { href: "/services", label: { sq: "Shërbime", en: "Services" } },
  { href: "/projects", label: { sq: "Projektet", en: "Projects" } },
  { href: "/invest", label: { sq: "Investo", en: "Invest" } },
  { href: "/news", label: { sq: "Lajme", en: "News" } },
  { href: "/contact", label: { sq: "Kontakt", en: "Contact" } },
];

export default function Header() {
  const sp = useSearchParams();
  const lang = sp.get("lang") === "en" ? "en" : "sq";
  const [open, setOpen] = useState(false);

  const withLang = useMemo(() => {
    return (href: string) => {
      const params = new URLSearchParams(sp.toString());
      if (lang === "sq") params.delete("lang");
      else params.set("lang", "en");
      const q = params.toString();
      return q ? `${href}?${q}` : href;
    };
  }, [sp, lang]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        
        {/* LOGO */}
        <Link
          href={withLang("/")}
          className="font-semibold tracking-wide hover:drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]
          bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 
          bg-clip-text text-transparent"
        >
          ORIENT GROUP{" "}
          <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
            shpk
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden gap-6 text-sm text-white/80 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={withLang(n.href)}
              className="hover:text-white"
            >
              {n.label[lang]}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE CONTROLS */}
        <div className="flex items-center gap-3">
          
          {/* DESKTOP Language Toggle */}
          <div className="hidden md:block">
            <LangToggle />
          </div>

          {/* DESKTOP CTA */}
          <Link
            href={withLang("/contact")}
            className="hidden rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 md:inline-flex"
          >
            {lang === "en" ? "Request Offer" : "Kërko Ofertë"}
          </Link>

          {/* MOBILE: LangToggle next to Menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <LangToggle />
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        items={nav}
        lang={lang}
        withLang={withLang}
      />
    </header>
  );
}
