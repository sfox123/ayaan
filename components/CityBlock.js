import Link from "next/link";
import Image from "next/image";

export default function CityBlock({ city, headingLevel: H = "h2" }) {
  return (
    <div className="grid gap-8 border-t border-ink/15 py-12 lg:grid-cols-[22rem_1fr] lg:gap-16">
      <div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-canopy">
          {city.image && <Image src={city.image} alt={city.alt || ""} fill sizes="(min-width:1024px) 22rem, 100vw" className="object-cover" />}
        </div>
        <H className="mt-5 text-[2.4rem] font-bold leading-none tracking-[-0.04em]">{city.title}</H>
        <p className="mt-2 text-ink-400">
          {city.options.length} {city.options.length === 1 ? "trip" : "trips"}
        </p>
      </div>
      <ul className="self-start">
        {city.options.map((o) => (
          <li key={o.id} className="border-b border-ink/10 first:border-t lg:first:border-t-0">
            <Link href={`/city-tours/${city.slug}/${o.id}`} className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5">
              <span className="text-[1.35rem] font-semibold tracking-[-0.02em] transition-colors group-hover:text-coconut-600">{o.name}</span>
              <span className="text-[1.1rem] font-semibold">US${o.price}</span>
              <span className="text-[0.95rem] text-ink-400">
                {o.kind}, {o.stops.length} stops: {o.stops.slice(0, 3).map((s) => s.title).join(", ")}
                {o.stops.length > 3 ? " and more" : ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
