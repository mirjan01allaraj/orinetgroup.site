import type { Metadata } from "next";
import GlassCard from "@/components/GlassCard";
import HeroCover from "@/components/HeroCover";
import NewsCard from "@/components/NewsCard";
import { getLangFromSearchParams, getNews } from "@/lib/content";

export const metadata: Metadata = {
  title: "News",
  description: "Announcements, project updates, and company milestones.",
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) ?? undefined; // ✅ Next 15: searchParams is a Promise
  const lang = getLangFromSearchParams(sp);
  const posts = getNews(lang);

  return (
    <main className="bg-neutral-950">
      <HeroCover
        image="/images/hero-industrial.webp"
        kicker={lang === "en" ? "Updates" : "Përditësime"}
        title="News"
        subtitle={
          lang === "en"
            ? "Announcements, project updates, and company milestones."
            : "Njoftime, ecuri projektesh dhe arritje të kompanisë."
        }
        primary={{ label: lang === "en" ? "Projects" : "Projektet", href: "/projects" }}
        secondary={{ label: lang === "en" ? "Contact" : "Kontakt", href: "/contact" }}
      />

      <div className="relative mt-16 md:mt-20 px-4 pb-14">
        <div className="mx-auto max-w-6xl space-y-4">
          <GlassCard>
            <div>
              <h2 className="text-xl font-semibold">
                {lang === "en" ? "Latest posts" : "Postimet e fundit"}
              </h2>
              <p className="mt-1 text-white/70">
                {lang === "en"
                  ? "Company updates and progress."
                  : "Përditësime të kompanisë dhe progres."}
              </p>
            </div>
          </GlassCard>

          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <NewsCard key={post.slug} post={post} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
