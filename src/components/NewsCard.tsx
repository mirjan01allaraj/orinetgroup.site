import Link from "next/link";
import type { NewsPost, Lang } from "@/lib/content";
import { formatDateISO } from "@/lib/content";

export default function NewsCard({ post, lang }: { post: NewsPost; lang: Lang }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
      <div className="relative h-44 w-full">
        <img src={post.cover} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xs uppercase tracking-[0.2em] text-white/70">
            {formatDateISO(post.date, lang)}
          </div>
          <div className="mt-1 text-lg font-semibold">{post.title}</div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-white/70">{post.excerpt}</p>
        <div className="mt-4 flex justify-end">
          <Link
            href={`/news/${post.slug}?lang=${lang}`}
            className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/15"
          >
            {lang === "en" ? "Read" : "Lexo"}
          </Link>
        </div>
      </div>
    </div>
  );
}
