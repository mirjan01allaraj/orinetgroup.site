import Link from "next/link";
import type { Project, Lang } from "@/lib/content";

export default function ProjectCard({ p, lang }: { p: Project; lang: Lang }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
      <div className="relative h-48 w-full md:h-56">
        <img src={p.cover} alt={p.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xs uppercase tracking-[0.2em] text-white/70">
            {p.sector} • {p.year} • {p.areaM2.toLocaleString()} m²
          </div>
          <div className="mt-1 text-lg font-semibold">{p.name}</div>
          <div className="text-white/70">{p.location}</div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-white/70">{p.excerpt}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-white/60">Roles: {p.roles.join(", ")}</div>
          <Link
            href={`/projects/${p.slug}?lang=${lang}`}
            className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/15"
          >
            {lang === "en" ? "Read more" : "Shiko detaje"}
          </Link>
        </div>
      </div>
    </div>
  );
}
