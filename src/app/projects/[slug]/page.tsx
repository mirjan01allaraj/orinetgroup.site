import type { Metadata } from "next";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import ProjectGalleryCarousel from "@/components/ProjectGalleryCarousel";
import { getProjects, getProjectBySlug, getLangFromSearchParams } from "@/lib/content";

export function generateStaticParams() {
  const all = [
    ...getProjects("sq").map((p) => ({ slug: p.slug })),
    ...getProjects("en").map((p) => ({ slug: p.slug })),
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
  const project = getProjectBySlug(lang, slug);
  if (!project) return { title: "Project" };

  return {
    title: project.name,
    description: project.excerpt,
    openGraph: {
      title: project.name,
      description: project.excerpt,
      images: [{ url: project.cover }],
    },
  };
}

export default async function ProjectDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const sp = (await searchParams) ?? undefined;

  const lang = getLangFromSearchParams(sp);
  const project = getProjectBySlug(lang, slug);

  if (!project) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Not found</h1>
        <p className="mt-2 text-white/70">Project not found.</p>
        <Link className="mt-6 inline-block rounded-full bg-white/10 px-5 py-2.5" href="/projects">
          Back
        </Link>
      </main>
    );
  }

  // ✅ Gallery images (fallback to cover) — type-safe even if Project type has no gallery yet
  const gallery = (project as any).gallery as string[] | undefined;

  const images =
    gallery?.length
      ? gallery.map((src) => ({ src, alt: project.name }))
      : [{ src: project.cover, alt: project.name }];

  return (
    <main className="bg-neutral-950">
      <div className="relative h-[55vh] overflow-hidden">
        <img src={project.cover} alt={project.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/55 to-black/90" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-16">
          <Link
            href={`/projects?lang=${lang}`}
            className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
          >
            ← {lang === "en" ? "Back to Projects" : "Mbrapa te Projektet"}
          </Link>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">{project.name}</h1>
          <p className="mt-3 max-w-2xl text-white/70">{project.excerpt}</p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/70">
            <Pill>{project.sector}</Pill>
            <Pill>{project.year}</Pill>
            <Pill>{project.location}</Pill>
            <Pill>{project.areaM2.toLocaleString()} m²</Pill>
            <Pill>Roles: {project.roles.join(", ")}</Pill>
          </div>
        </div>
      </div>

      <div className="relative -mt-10 px-4 pb-14">
        <div className="mx-auto max-w-6xl space-y-4">
          <GlassCard>
            <h2 className="text-xl font-semibold">{lang === "en" ? "Overview" : "Përmbledhje"}</h2>

            {/* ✅ Project Gallery Carousel */}
            <ProjectGalleryCarousel images={images} height={360} className="mt-4" />

            <div className="mt-4 space-y-3 text-white/75">
              {project.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">{children}</span>;
}
