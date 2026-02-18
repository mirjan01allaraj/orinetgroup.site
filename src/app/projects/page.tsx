import type { Metadata } from "next";
import GlassCard from "@/components/GlassCard";
import HeroCover from "@/components/HeroCover";
import ProjectCard from "@/components/ProjectCard";
import { getLangFromSearchParams, getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Portfolio across infrastructure, industrial, residential and commercial sectors.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) ?? undefined; // ✅ Next 15 fix
  const lang = getLangFromSearchParams(sp);
  const projects = getProjects(lang);

  return (
    <main className="bg-neutral-950">
      <HeroCover
        image="/images/hero-industrial.webp"
        kicker={lang === "en" ? "Portfolio" : "Portofol"}
        title={lang === "en" ? "Projects" : "Projektet"}
        subtitle={
          lang === "en"
            ? "Proof of delivery — built with control, documentation and discipline."
            : "Prova e dorëzimit — me kontroll, dokumentim dhe disiplinë."
        }
        primary={{ label: lang === "en" ? "Contact" : "Kontakt", href: "/contact" }}
        secondary={{ label: lang === "en" ? "News" : "Lajme", href: "/news" }}
      />

      <div className="relative mt-6 md:-mt-10 px-4 pb-14">
        <div className="mx-auto max-w-6xl space-y-4">
          <GlassCard>
            <div className="grid gap-3 md:grid-cols-4">
              <Stat label={lang === "en" ? "Projects" : "Projekte"} value="45+" />
              <Stat label={lang === "en" ? "Clients" : "Klientë"} value="30+" />
              <Stat label={lang === "en" ? "Active sites" : "Kantiere aktive"} value="4" />
              <Stat label={lang === "en" ? "Total area" : "Sipërfaqe totale"} value="120,000 m²" />
            </div>
          </GlassCard>

          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.slug} p={p} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-white/60">{label}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  );
}
