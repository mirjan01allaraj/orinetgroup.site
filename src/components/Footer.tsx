import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/70">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold text-white">{SITE.name}</div>
            <div>{SITE.address}</div>
          </div>
          <div className="text-white/70">
            {SITE.email} • {SITE.phone}
          </div>
        </div>

        <div className="mt-6 text-xs text-white/50">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
