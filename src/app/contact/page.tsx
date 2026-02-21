import type { Metadata } from "next";
import GlassCard from "@/components/GlassCard";
import { SITE } from "@/lib/site";
import { getLangFromSearchParams } from "@/lib/content";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ORIENT GROUP shpk — request an offer or consultation.",
};

export default function ContactPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const lang = getLangFromSearchParams(searchParams);

  const t =
    lang === "en"
      ? {
          h1: "Contact",
          intro: "Request an offer, partnership, or a site meeting.",
          details: "Details",
          company: "Company:",
          address: "Address:",
          email: "Email:",
          phone: "Phone:",
          write: "Write to us",
        }
      : {
          h1: "Kontakt",
          intro: "Kërko ofertë, partneritet, ose takim në kantier.",
          details: "Detaje",
          company: "Kompania:",
          address: "Adresa:",
          email: "Email:",
          phone: "Telefon:",
          write: "Na shkruaj",
        };

  return (
    <main className="bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-4xl font-bold">{t.h1}</h1>
        <p className="mt-3 max-w-2xl text-white/70">{t.intro}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <GlassCard>
            <h2 className="text-xl font-semibold">{t.details}</h2>
            <div className="mt-4 space-y-2 text-white/75">
              <div>
                <span className="text-white/60">{t.company}</span> {SITE.name}
              </div>
              <div>
                <span className="text-white/60">{t.address}</span> {SITE.address}
              </div>
              <div>
                <span className="text-white/60">{t.email}</span> {SITE.email}
              </div>
              <div>
                <span className="text-white/60">{t.phone}</span> {SITE.phone}
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-semibold">{t.write}</h2>

            {/* ✅ Client form that opens Gmail / Mail with prefilled fields */}
            <ContactForm toEmail={SITE.email} lang={lang} />
          </GlassCard>
        </div>
      </div>
    </main>
  );
}