import projectsSQ from "@/content/projects.sq.json";
import projectsEN from "@/content/projects.en.json";
import newsSQ from "@/content/news.sq.json";
import newsEN from "@/content/news.en.json";

export type Lang = "sq" | "en";

export type Project = {
  slug: string;
  name: string;
  location: string;
  year: number;
  sector: string;
  roles: string[];
  areaM2: number;
  excerpt: string;
  cover: string;
  body: string[];
};

export type NewsPost = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  cover: string;
  body: string[];
};



export function getLangFromSearchParams(
  searchParams?: Record<string, string | string[] | undefined>
): Lang {
  const raw = searchParams?.lang;

  const lang = Array.isArray(raw) ? raw[0] : raw;

  return lang === "en" ? "en" : "sq";
}

export function getProjects(lang: Lang): Project[] {
  const data = (lang === "en" ? projectsEN : projectsSQ) as Project[];
  return [...data].sort((a, b) => b.year - a.year);
}

export function getProjectBySlug(lang: Lang, slug: string): Project | null {
  return getProjects(lang).find((p) => p.slug === slug) ?? null;
}

export function getNews(lang: Lang): NewsPost[] {
  const data = (lang === "en" ? newsEN : newsSQ) as NewsPost[];
  return [...data].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNewsBySlug(lang: Lang, slug: string): NewsPost | null {
  return getNews(lang).find((p) => p.slug === slug) ?? null;
}

export function formatDateISO(dateISO: string, lang: Lang) {
  const d = new Date(dateISO + "T00:00:00");
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "sq-AL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}
