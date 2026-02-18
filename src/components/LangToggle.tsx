"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LangToggle() {
  const pathname = usePathname();
  const sp = useSearchParams();
  const current = sp.get("lang") === "en" ? "en" : "sq";

  const build = (lang: "sq" | "en") => {
    const params = new URLSearchParams(sp.toString());
    if (lang === "sq") params.delete("lang");
    else params.set("lang", "en");
    const q = params.toString();
    return q ? `${pathname}?${q}` : pathname;
  };

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur">
      <Link
        href={build("sq")}
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          current === "sq" ? "bg-white text-black" : "text-white/70 hover:text-white"
        }`}
      >
        SQ
      </Link>
      <Link
        href={build("en")}
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          current === "en" ? "bg-white text-black" : "text-white/70 hover:text-white"
        }`}
      >
        EN
      </Link>
    </div>
  );
}
