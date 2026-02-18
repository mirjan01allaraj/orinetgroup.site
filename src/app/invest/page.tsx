import type { Metadata } from "next";
import HeroCover from "@/components/HeroCover";
import GlassCard from "@/components/GlassCard";
import { getLangFromSearchParams } from "@/lib/content";

export const metadata: Metadata = {
  title: "Invest",
  description: "Investment options: pre-order property, land-for-share, joint ventures.",
};

export default function InvestPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const lang = getLangFromSearchParams(searchParams);

  const t = {
    kicker: lang === "en" ? "Partnership" : "Partneritet",
    title: lang === "en" ? "Invest" : "Investo",
    subtitle:
      lang === "en"
        ? "Structured investment models with transparent scope, timeline and documentation."
        : "Modele investimi të strukturuara me scope, afate dhe dokumentim transparent.",
    cards: [
      {
        title: lang === "en" ? "Pre-order property" : "Parablerje prone",
        text:
          lang === "en"
            ? "Secure units early with clear milestones and delivery terms."
            : "Rezervim i hershëm me milestone të qarta dhe kushte dorëzimi.",
      },
      {
        title: lang === "en" ? "Land-for-share" : "Tokë për pjesë",
        text:
          lang === "en"
            ? "Land contribution exchanged for a defined share in the development."
            : "Kontribut i tokës në këmbim të një pjese të përcaktuar në zhvillim.",
      },
      {
        title: lang === "en" ? "Joint Venture (JV)" : "Sipërmarrje e përbashkët (JV)",
        text:
          lang === "en"
            ? "Co-invest with defined roles: funding, execution, and profit-sharing."
            : "Bashkë-investim me role të qarta: financim, zbatim dhe ndarje fitimi.",
      },
    ],
  };

  return (
    <main className="bg-neutral-950">
      <HeroCover
        image="/images/hero-industrial.webp"
        kicker={t.kicker}
        title={t.title}
        subtitle={t.subtitle}
        primary={{ label: lang === "en" ? "Contact" : "Kontakt", href: "/contact" }}
        secondary={{ label: lang === "en" ? "Projects" : "Projektet", href: "/projects" }}
      />

      <div className="relative mt-6 md:mt-10 px-4 pb-14">
        <div className="mx-auto max-w-6xl space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {t.cards.map((c) => (
              <GlassCard key={c.title}>
                <h2 className="text-xl font-semibold">{c.title}</h2>
                <p className="mt-2 text-white/70">{c.text}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
                  <Pill>{lang === "en" ? "Transparency" : "Transparencë"}</Pill>
                  <Pill>{lang === "en" ? "Documentation" : "Dokumentim"}</Pill>
                  <Pill>{lang === "en" ? "Milestones" : "Milestone"}</Pill>
                </div>
              </GlassCard>
            ))}
          </div>

          <GlassCard>
            <h2 className="text-xl font-semibold">{lang === "en" ? "What we provide" : "Çfarë ofrojmë"}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <Bullet text={lang === "en" ? "Investment model proposal" : "Propozim modeli investimi"} />
              <Bullet text={lang === "en" ? "Project scope + timeline" : "Scope projekti + afate"} />
              <Bullet text={lang === "en" ? "Cost baseline + reporting" : "Buxhet bazë + raportim"} />
              <Bullet text={lang === "en" ? "Handover documentation" : "Dokumentim për dorëzim"} />
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

function Bullet({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80">
      <span className="text-white/45">✓</span> <span className="ml-2">{text}</span>
    </div>
  );
}
