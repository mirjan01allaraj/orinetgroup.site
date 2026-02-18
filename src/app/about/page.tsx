import type { Metadata } from "next";
import HeroCover from "@/components/HeroCover";
import GlassCard from "@/components/GlassCard";
import { getLangFromSearchParams } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Credibility page: who we are, roles, sectors, values, and certifications.",
};

export default async function AboutPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) ?? undefined; // ✅ Next 15: searchParams is a Promise
  const lang = getLangFromSearchParams(sp);

  const t = {
    kicker: lang === "en" ? "Credibility" : "Kredibilitet",
    title: lang === "en" ? "About ORIENT GROUP shpk" : "Rreth ORIENT GROUP shpk",
    subtitle:
      lang === "en"
        ? "Investor + EPC Contractor delivering industrial, infrastructure, residential and commercial projects."
        : "Investitor + Kontraktor EPC për projekte industriale, infrastrukturore, rezidenciale dhe komerciale.",
    blocks: {
      whoTitle: lang === "en" ? "Who we are" : "Kush jemi",
      whoText:
        lang === "en"
          ? "A delivery-focused construction corporation with disciplined execution, documentation and quality control."
          : "Korporatë ndërtimi e fokusuar në dorëzim me disiplinë, dokumentim dhe kontroll cilësie.",
      rolesTitle: lang === "en" ? "Roles" : "Rolet",
      rolesText:
        lang === "en"
          ? "Investor partner, EPC contractor, and general contractor depending on project model."
          : "Partner investimi, kontraktor EPC dhe kontraktor i përgjithshëm sipas modelit të projektit.",
      sectorsTitle: lang === "en" ? "Sectors" : "Sektorët",
      sectorsText:
        lang === "en"
          ? "Infrastructure, industrial facilities, residential blocks, commercial spaces."
          : "Infrastrukturë, objekte industriale, pallate rezidenciale, hapësira komerciale.",
      valuesTitle: lang === "en" ? "Values" : "Vlerat",
      values:
        lang === "en"
          ? [
              "Safety first",
              "Documentation & traceability",
              "Cost + schedule control",
              "Quality assurance",
            ]
          : [
              "Siguria e para",
              "Dokumentim & gjurmueshmëri",
              "Kontroll kosto + afate",
              "Siguri cilësie",
            ],
      certTitle: lang === "en" ? "Certifications" : "Certifikime",
      certText:
        lang === "en"
          ? " ISO/technical certifications here."
          : " ISO/certifikimet teknike .",
    },
  };

  return (
    <main className="bg-neutral-950">
      <HeroCover
        image="/images/hero-industrial.webp"
        kicker={t.kicker}
        title={t.title}
        subtitle={t.subtitle}
        primary={{
          label: lang === "en" ? "Projects" : "Projektet",
          href: "/projects",
        }}
        secondary={{
          label: lang === "en" ? "Contact" : "Kontakt",
          href: "/contact",
        }}
      />

      <div className="relative mt-16 md:mt-20 px-4 pb-14">
        <div className="mx-auto max-w-6xl space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <GlassCard>
              <h2 className="text-xl font-semibold">{t.blocks.whoTitle}</h2>
              <p className="mt-2 text-white/70">{t.blocks.whoText}</p>
            </GlassCard>

            <GlassCard>
              <h2 className="text-xl font-semibold">{t.blocks.rolesTitle}</h2>
              <p className="mt-2 text-white/70">{t.blocks.rolesText}</p>
            </GlassCard>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <GlassCard>
              <h2 className="text-xl font-semibold">{t.blocks.sectorsTitle}</h2>
              <p className="mt-2 text-white/70">{t.blocks.sectorsText}</p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
                <Pill>{lang === "en" ? "Infrastructure" : "Infrastrukturë"}</Pill>
                <Pill>{lang === "en" ? "Industrial" : "Industrial"}</Pill>
                <Pill>{lang === "en" ? "Residential" : "Rezidencial"}</Pill>
                <Pill>{lang === "en" ? "Commercial" : "Komerciale"}</Pill>
              </div>
            </GlassCard>

            <GlassCard>
              <h2 className="text-xl font-semibold">{t.blocks.valuesTitle}</h2>
              <ul className="mt-3 space-y-2 text-white/75">
                {t.blocks.values.map((v) => (
                  <li key={v} className="flex gap-2">
                    <span className="text-white/45">✓</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          <GlassCard>
            <h2 className="text-xl font-semibold">{t.blocks.certTitle}</h2>
            <p className="mt-2 text-white/70">{t.blocks.certText}</p>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <CertCard
                title="ISO 9001"
                note={lang === "en" ? "Quality Management" : "Menaxhim Cilësie"}
              />
              <CertCard
                title="ISO 14001"
                note={lang === "en" ? "Environmental" : "Mjedisore"}
              />
              <CertCard
                title="ISO 45001"
                note={lang === "en" ? "Health & Safety" : "Shëndet & Siguri"}
              />
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
      {children}
    </span>
  );
}

function CertCard({ title, note }: { title: string; note: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-sm text-white/65">{note}</div>
    </div>
  );
}
