import type { Metadata } from "next";
import GlassCard from "@/components/GlassCard";
import { getLangFromSearchParams } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

import ServicesHeroWithCards from "@/components/ServicesHeroWithCards";
import StepsGrid from "@/components/StepsGrid";

type Lang = "sq" | "en";

type StepItem = {
  title: string;
  desc: string;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const sp = (await searchParams) ?? undefined;
  const lang = getLangFromSearchParams(sp);

  return buildMetadata({
    lang,
    title: lang === "en" ? "Services" : "Shërbime",
    description:
      lang === "en"
        ? "Projects & design, construction execution, and fiber internet services — part of ORIENT GROUP."
        : "Projektim, zbatim/ndërtim dhe internet me fibër optike — pjesë e ORIENT GROUP.",
    path: "/services",
    image: "/images/og.webp",
  });
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) ?? undefined;
  const lang = getLangFromSearchParams(sp) as Lang;

  const withLang = (href: string) => (lang === "en" ? `${href}?lang=en` : href);

  const t = {
    // ✅ these 3 blocks describe the 3 hero slides
    blocks: [
      {
        title: lang === "en" ? "Projects & Design" : "Projekte & Projektim",
        text:
          lang === "en"
            ? "Integrated architectural & engineering design, technical documentation, and coordination from concept to execution-ready drawings."
            : "Projektim arkitektonik dhe inxhinierik, dokumentim teknik dhe koordinim nga koncepti te vizatimet gati për zbatim.",
      },
      {
        title: lang === "en" ? "Construction & Site Execution" : "Ndërtim & Zbatim në Kantier",
        text:
          lang === "en"
            ? "Structured site execution with quality control, schedules, and disciplined delivery management."
            : "Zbatim i strukturuar në kantier me kontroll cilësie, afate dhe menaxhim të disiplinuar të dorëzimit.",
      },
      {
        title: lang === "en" ? "Orient Net — Internet" : "Orient Net — Internet",
        text:
          lang === "en"
            ? "Fiber internet services, professional installation, and reliable support for residential and business clients."
            : "Shërbime interneti me fibra optike, instalim profesional dhe suport i besueshëm për familjarë dhe biznes.",
      },
    ],

    stepsTitle: lang === "en" ? "Preconstruction steps" : "Hapat e para-ndërtimit",

    steps:
      lang === "en"
        ? ([
            {
              title: "Site review & feasibility",
              desc: "We verify access, constraints, and technical viability before planning.",
            },
            {
              title: "Budgeting & schedule baseline",
              desc: "We define a realistic budget and timeline that can be tracked.",
            },
            {
              title: "Design coordination",
              desc: "We align architecture, structure, and MEP to avoid clashes.",
            },
            {
              title: "Procurement plan",
              desc: "We plan suppliers and lead-times to protect deadlines.",
            },
            {
              title: "Risk & quality plan",
              desc: "We set controls, inspections, and mitigation actions upfront.",
            },
            {
              title: "Execution method statement",
              desc: "We document how work will be executed safely and consistently.",
            },
          ] satisfies StepItem[])
        : ([
            {
              title: "Verifikim terreni & fizibilitet",
              desc: "Verifikojmë aksesin, kufizimet dhe zbatueshmërinë teknike para planifikimit.",
            },
            {
              title: "Buxhetim & plan afatesh",
              desc: "Vendosim buxhet dhe afate reale, të matshme dhe të kontrollueshme.",
            },
            {
              title: "Koordinim projekti",
              desc: "Koordinojmë arkitekturë, strukturë dhe MEP për të shmangur konflikte.",
            },
            {
              title: "Plan prokurimi",
              desc: "Planifikojmë furnitorë dhe kohë furnizimi për të ruajtur afatet.",
            },
            {
              title: "Plan risku & cilësie",
              desc: "Përcaktojmë kontrolle, inspektime dhe masa mitigimi që në fillim.",
            },
            {
              title: "Metodologji zbatimi",
              desc: "Dokumentojmë mënyrën e punës për zbatim të sigurt dhe të qëndrueshëm.",
            },
          ] satisfies StepItem[]),
  };

  return (
    <main className="bg-neutral-950">
      {/* ✅ synced hero slider + the 3 neon cards */}
      <ServicesHeroWithCards lang={lang} blocks={t.blocks} />

      <div className="relative px-4 pb-14">
        <div className="mx-auto max-w-6xl space-y-4">
          <GlassCard>
            <h2 className="text-xl font-semibold">{t.stepsTitle}</h2>

            {/* ✅ animated entrance + bigger text happens inside StepsGrid */}
            <StepsGrid items={t.steps} />
          </GlassCard>

          <GlassCard>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {lang === "en" ? "Want a structured offer?" : "Dëshiron ofertë të strukturuar?"}
                </h2>
                <p className="mt-1 text-white/70">
                  {lang === "en"
                    ? "Send your project info and we’ll respond with a clear scope + timeline."
                    : "Dërgo informacionin e projektit dhe kthejmë përgjigje me scope + afate."}
                </p>
              </div>

              <a
                href={withLang("/contact")}
                className="w-fit rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
              >
                {lang === "en" ? "Contact" : "Kontakt"}
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}
