"use client";

import { useMemo, useState } from "react";

type Props = {
  toEmail: string;
  lang: "sq" | "en";
};

function enc(v: string) {
  return encodeURIComponent(v);
}

export default function ContactForm({ toEmail, lang }: Props) {
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const t =
    lang === "en"
      ? {
          namePh: "Full name",
          emailPh: "Email",
          phonePh: "Phone (optional)",
          msgPh: "Message",
          send: "Send",
          note: "(This will open Gmail to send your message with the filled fields.)",
          subject: (n: string) => `ORIENT GROUP — Contact Form (${n})`,
          bodyLabelName: "Name:",
          bodyLabelEmail: "Email:",
          bodyLabelPhone: "Phone:",
          bodyLabelMsg: "Message:",
        }
      : {
          namePh: "Emër dhe mbiemër",
          emailPh: "Email",
          phonePh: "Telefon (opsional)",
          msgPh: "Mesazhi",
          send: "Dërgo",
          note: "(Do hapet Gmail për të dërguar mesazhin me fushat e plotësuara.)",
          subject: (n: string) => `ORIENT GROUP — Formular Kontakti (${n})`,
          bodyLabelName: "Emër:",
          bodyLabelEmail: "Email:",
          bodyLabelPhone: "Telefon:",
          bodyLabelMsg: "Mesazh:",
        };

  const isValid = useMemo(() => {
    return !!(name.trim() && fromEmail.trim() && message.trim());
  }, [name, fromEmail, message]);

  const buildBody = () => {
    const n = name.trim();
    const e = fromEmail.trim();
    const p = phone.trim();
    const m = message.trim();

    return [
      `${t.bodyLabelName} ${n}`,
      `${t.bodyLabelEmail} ${e}`,
      `${t.bodyLabelPhone} ${p ? p : "-"}`,
      "",
      `${t.bodyLabelMsg}`,
      m,
      "",
      "— ORIENT GROUP website contact form",
    ].join("\n");
  };

  const openGmailOrMail = () => {
    const subject = t.subject(name.trim());
    const body = buildBody();

    // ✅ Gmail web compose (best for desktop & most browsers)
    const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(
      toEmail
    )}&su=${enc(subject)}&body=${enc(body)}`;

    // fallback: default mail app
    const mailto = `mailto:${toEmail}?subject=${enc(subject)}&body=${enc(body)}`;

    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);

    // Mobile Gmail schemes (best effort)
    const gmailIOS = `googlegmail://co?to=${enc(toEmail)}&subject=${enc(
      subject
    )}&body=${enc(body)}`;

    const gmailAndroidIntent = `intent://compose?to=${enc(toEmail)}&subject=${enc(
      subject
    )}&body=${enc(body)}#Intent;scheme=googlegmail;package=com.google.android.gm;end`;

    // ✅ Desktop: DO NOT use window.open (popup blockers). Use location.
    if (!isMobile) {
      window.location.href = gmailWeb;
      return;
    }

    // ✅ Mobile: try Gmail app, then fallback to mailto
    let didFallback = false;
    const fallback = () => {
      if (didFallback) return;
      didFallback = true;
      window.location.href = mailto;
    };

    if (isIOS) {
      window.location.href = gmailIOS;
      window.setTimeout(fallback, 900);
      return;
    }

    window.location.href = gmailAndroidIntent;
    window.setTimeout(fallback, 900);
  };

  return (
    <form
      className="mt-4 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!isValid) return;
        openGmailOrMail();
      }}
    >
      <input
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t.namePh}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/20"
        required
      />

      <input
        name="email"
        type="email"
        value={fromEmail}
        onChange={(e) => setFromEmail(e.target.value)}
        placeholder={t.emailPh}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/20"
        required
      />

      <input
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder={t.phonePh}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/20"
      />

      <textarea
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t.msgPh}
        rows={5}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/20"
        required
      />

      <button
        type="submit"
        className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!isValid}
      >
        {t.send}
      </button>

      <p className="text-xs text-white/50">{t.note}</p>
    </form>
  );
}