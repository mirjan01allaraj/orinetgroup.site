import type { Metadata } from "next";
import GlassCard from "@/components/GlassCard";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ORIENT GROUP shpk — request an offer or consultation.",
};

export default function ContactPage() {
  return (
    <main className="bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-4xl font-bold">Kontakt</h1>
        <p className="mt-3 max-w-2xl text-white/70">
          Kërko ofertë, partneritet, ose takim në kantier.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <GlassCard>
            <h2 className="text-xl font-semibold">Detaje</h2>
            <div className="mt-4 space-y-2 text-white/75">
              <div><span className="text-white/60">Kompania:</span> {SITE.name}</div>
              <div><span className="text-white/60">Adresa:</span> {SITE.address}</div>
              <div><span className="text-white/60">Email:</span> {SITE.email}</div>
              <div><span className="text-white/60">Telefon:</span> {SITE.phone}</div>
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-semibold">Na shkruaj</h2>

            <form className="mt-4 space-y-3" action="/api/contact" method="post">
              <input
                name="name"
                placeholder="Emër dhe mbiemër"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/20"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/20"
                required
              />
              <input
                name="phone"
                placeholder="Telefon (opsional)"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/20"
              />
              <textarea
                name="message"
                placeholder="Mesazhi"
                rows={5}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/20"
                required
              />

              <button
                type="submit"
                className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
              >
                Dërgo
              </button>

              <p className="text-xs text-white/50">
                (API është placeholder — hapi tjetër: lidhje me SMTP/Resend/Mailgun.)
              </p>
            </form>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}
