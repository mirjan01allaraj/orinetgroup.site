"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) return;

    const subject = `Kërkesë nga website — ${name}`;

    const body = `
Mesazh nga website ORIENT GROUP:

Emri: ${name}
Email: ${email}
Telefon: ${phone || "-"}

Mesazhi:
${message}
    `;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    const isMobile =
      typeof navigator !== "undefined" &&
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    let url = "";

    if (isMobile) {
      // 📱 Mobile → default mail app
      url = `mailto:${SITE.email}?subject=${encodedSubject}&body=${encodedBody}`;
      window.location.href = url;
    } else {
      // 💻 Desktop → open Gmail in browser
      url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        SITE.email
      )}&su=${encodedSubject}&body=${encodedBody}`;
      window.open(url, "_blank");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-3">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Emër dhe mbiemër"
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/20"
        required
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/20"
        required
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Telefon (opsional)"
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/20"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
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
    </form>
  );
}
