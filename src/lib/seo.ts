import type { Metadata } from "next";

export type Lang = "sq" | "en";

const SITE = {
  name: "ORIENT GROUP shpk",
  domain: "orientgroup.al", // ✅ change to your real domain
  ogImage: "/images/og.webp", // must exist in /public/images/
  twitterHandle: "", // optional e.g. "@orientgroup"
};

const BRAND = {
  sq: {
    title: "ORIENT GROUP shpk",
    description:
      "Investitor + Kontraktor EPC për projekte industriale, infrastrukturore, rezidenciale dhe komerciale.",
    keywords: [
      "ndërtim",
      "EPC",
      "kontraktor",
      "infrastrukturë",
      "rezidenciale",
      "komerciale",
      "projektim",
      "zbatim",
      "Tiranë",
      "Shqipëri",
    ],
  },
  en: {
    title: "ORIENT GROUP shpk",
    description:
      "Investor + EPC contractor for industrial, infrastructure, residential and commercial projects.",
    keywords: [
      "construction",
      "EPC",
      "contractor",
      "infrastructure",
      "residential",
      "commercial",
      "design",
      "execution",
      "Tirana",
      "Albania",
    ],
  },
};

export function absoluteUrl(path: string) {
  const base = `https://${SITE.domain}`;
  if (!path) return base;
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata(opts: {
  lang: Lang;
  title?: string; // page title
  description?: string;
  path?: string; // e.g. "/services"
  image?: string; // e.g. "/images/og-services.webp"
  noIndex?: boolean;
}): Metadata {
  const { lang, title, description, path, image, noIndex } = opts;

  const t = BRAND[lang];
  const pageTitle = title ? `${title} | ${t.title}` : t.title;
  const pageDesc = description ?? t.description;
  const url = absoluteUrl(path ?? "/");
  const ogImg = absoluteUrl(image ?? SITE.ogImage);

  return {
    metadataBase: new URL(absoluteUrl("/")),
    title: pageTitle,
    description: pageDesc,
    keywords: t.keywords,
    alternates: {
      canonical: url,
      languages: {
        sq: absoluteUrl(path ? `${path}` : "/"),
        en: absoluteUrl(path ? `${path}?lang=en` : "/?lang=en"),
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: pageTitle,
      description: pageDesc,
      url,
      images: [{ url: ogImg, width: 1200, height: 630, alt: SITE.name }],
      locale: lang === "sq" ? "sq_AL" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
      images: [ogImg],
      creator: SITE.twitterHandle || undefined,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    icons: {
      icon: "/icons/favicon.ico",
      apple: "/icons/apple-touch-icon.png",
    },
  };
}
