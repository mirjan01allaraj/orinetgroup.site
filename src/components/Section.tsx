import Link from "next/link";

export default function Section(props: {
  title: string;
  text: string;
  cta?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-xl font-semibold md:text-2xl">{props.title}</h2>
        <p className="mt-2 max-w-2xl text-white/70">{props.text}</p>
      </div>

      {props.cta && (
        <Link
          href={props.cta.href}
          className="w-fit rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/15"
        >
          {props.cta.label}
        </Link>
      )}
    </div>
  );
}
