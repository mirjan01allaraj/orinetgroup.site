// src/app/page.tsx
import HomeScroll from "@/components/HomeScroll";
import { getLangFromSearchParams } from "@/lib/content";

export default function HomePage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const lang = getLangFromSearchParams(searchParams);

  const content = {
    sq: {
      kicker: "PROJEKTIM • ZBATIM/NDËRTIM • INTERNET ISP",
      title: "Ndërtojmë Ëndrrat,Dizajnojmë Jetën..",
      subtitle:
        "ORIENT GROUP shpk ofron ekzekutim premium në sektorët industrial, infrastrukturor, rezidencial dhe komercial.",
      primary: "Kërko Ofertë",
      secondary: "Shiko Projektet",
    },
    en: {
      kicker: "DESIGN • CONSTRUCTION/IMPLEMENTATION • INTERNET ISP",
      title: "Delivering Excellence in Design and Construction.",
      subtitle:
        "ORIENT GROUP shpk delivers premium execution across industrial, infrastructure, residential and commercial sectors.",
      primary: "Request Offer",
      secondary: "View Projects",
    },
  }[lang];

  return <HomeScroll lang={lang} content={content} />;
}
