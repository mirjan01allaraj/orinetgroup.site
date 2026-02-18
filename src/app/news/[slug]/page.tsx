import type { Metadata } from "next";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import {
  formatDateISO,
  getLangFromSearchParams,
  getNews,
  getNewsBySlug,
} from "@/lib/content";

export function generateStaticParams() {
  const all = [
    ...getNews("sq").map((p) => ({ slug: p.slug })),
    ...getNews("en").map((p) => ({ slug: p.slug })),
  ];
  const seen = new Set<string>();
  return all.filter((x) => (seen.has(x.slug) ? false : (seen.add(x.slug), true)));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sp = (await searchParams) ?? undefined;

  const lang = getLangFromSearchParams(sp);
  const post = getNewsBySlug(lang, slug);
  if (!post) return { title: "News" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.cover }],
    },
  };
}

export default async function NewsDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const sp = (await searchParams) ?? undefined;

  const lang = getLangFromSearchParams(sp);
  const post = getNewsBySlug(lang, slug);

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Not found</h1>
        <p className="mt-2 text-white/70">Post not found.</p>
        <Link className="mt-6 inline-block rounded-full bg-white/10 px-5 py-2.5" href="/news">
          Back
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-neutral-950">
      <div className="relative h-[55vh] overflow-hidden">
        <img src={post.cover} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/55 to-black/90" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-16">
          <Link
            href={`/news?lang=${lang}`}
            className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
          >
            ← {lang === "en" ? "Back to News" : "Mbrapa te Lajmet"}
          </Link>

          <div className="mt-5 text-xs uppercase tracking-[0.2em] text-white/70">
            {formatDateISO(post.date, lang)}
          </div>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">{post.title}</h1>
          <p className="mt-3 max-w-2xl text-white/70">{post.excerpt}</p>
        </div>
      </div>

      <div className="relative -mt-10 px-4 pb-14">
        <div className="mx-auto max-w-6xl space-y-4">
          <GlassCard>
            <div className="space-y-3 text-white/75">
              {post.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}
