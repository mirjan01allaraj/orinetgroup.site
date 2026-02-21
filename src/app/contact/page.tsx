import type { Metadata } from "next";
import GlassCard from "@/components/GlassCard";
import { SITE } from "@/lib/site";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ORIENT GROUP shpk — request an offer or consultation.",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const sp: SearchParams = searchParams ? await searchParams : {};

  const langParam = sp.lang;
  const lang =
    (Array.isArray(langParam) ? langParam[0] : langParam) === "en" ? "en" : "sq";

  return (
    <main className="bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-4xl font-bold">{lang === "en" ? "Contact" : "Kontakt"}</h1>
        <p className="mt-3 max-w-2xl text-white/70">
          {lang === "en"
            ? "Request an offer, partnership, or a site meeting."
            : "Kërko ofertë, partneritet, ose takim në kantier."}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <GlassCard>
            <h2 className="text-xl font-semibold">{lang === "en" ? "Details" : "Detaje"}</h2>
            <div className="mt-4 space-y-2 text-white/75">
              <div>
                <span className="text-white/60">{lang === "en" ? "Company:" : "Kompania:"}</span>{" "}
                {SITE.name}
              </div>
              <div>
                <span className="text-white/60">{lang === "en" ? "Address:" : "Adresa:"}</span>{" "}
                {SITE.address}
              </div>
              <div>
                <span className="text-white/60">Email:</span> {SITE.email}
              </div>
              <div>
                <span className="text-white/60">{lang === "en" ? "Phone:" : "Telefon:"}</span>{" "}
                {SITE.phone}
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-semibold">{lang === "en" ? "Write to us" : "Na shkruaj"}</h2>

            {/* ✅ required prop */}
            <ContactForm lang={lang} toEmail={SITE.email} />
          </GlassCard>
        </div>
      </div>
    </main>
  );
}