import Link from "next/link";

type CTA = { label: string; href: string };

export default function HeroCover(props: {
  image: string;
  kicker: string;
  title: string;
  subtitle: string;
  primary: CTA;
  secondary?: CTA;
}) {
  return (
   <section className="relative h-full overflow-hidden">

      <img
        src={props.image}
        alt="ORIENT GROUP shpk"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/55 to-black/90" />

      <div className="relative z-10 px-5 pt-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/70">
            {props.kicker}
          </p>

          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight md:text-6xl">
            {props.title}
          </h1>

          <p className="mt-4 max-w-xl text-white/75 md:text-lg">
            {props.subtitle}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={props.primary.href}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
            >
              {props.primary.label}
            </Link>

            {props.secondary && (
              <Link
                href={props.secondary.href}
                className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-white/15"
              >
                {props.secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
