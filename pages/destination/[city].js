import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import ParallaxImage from "../../components/ParallaxImage";
import { RevealTitle } from "../../components/Reveal";
import { destinations, getDestination, cities, tourCategories } from "../../lib/content";
import { whatsapp } from "../../lib/site";
import { WhatsAppIcon } from "../../components/Icons";

export default function Destination({ slug }) {
  const d = getDestination(slug);
  const idx = destinations.findIndex((x) => x.slug === slug);
  const next = destinations[(idx + 1) % destinations.length];
  const city = cities.find((c) => c.slug === slug);
  const tours = tourCategories
    .flatMap((t) => t.packages.map((p) => ({ ...p, slug: t.slug, days: t.days })))
    .filter((p) => p.route.includes(d.title))
    .slice(0, 4);

  return (
    <Layout title={`${d.title}, Sri Lanka`} description={d.description.slice(0, 155)} image={d.hero}>
      <PageHero image={d.hero} alt={d.alt} kicker={d.region} title={[d.title]} intro={d.blurb} tall />

      <section className="wrap grid gap-14 py-24 sm:py-32 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <p className="font-serif text-[1.4rem] leading-[1.6] text-ink sm:text-[1.55rem]">{d.description}</p>
        <div className="space-y-8">
          <ParallaxImage src={d.portrait} alt="" sizes="(min-width:1024px) 30vw, 100vw" amount={6} className="aspect-[4/5] max-w-sm rounded-[1.4rem]" />
          <dl className="space-y-5">
            <div>
              <dt className="text-sm font-medium text-ink-400">How long</dt>
              <dd className="mt-1 text-[1.05rem]">{d.duration}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-ink-400">Good for</dt>
              <dd className="mt-1 text-[1.05rem]">{d.idealFor.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-canopy py-24 text-mist sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <RevealTitle lines={[`What to see`, `in ${d.title}`]} className="text-big font-bold" />
            <a href={whatsapp(`Hello Ayaan Tours, I'd like to visit ${d.title}.`)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Plan a visit
            </a>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {d.highlights.map((h) => {
              const optional = /\(optional\)/i.test(h);
              return (
                <li key={h} className="flex items-baseline justify-between gap-4 border-b border-mist/10 py-4 text-[1.2rem] font-medium tracking-[-0.01em]">
                  {h.replace(/\s*\(optional\)/i, "")}
                  {optional && <span className="shrink-0 text-sm font-normal text-mist/50">optional</span>}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {(city || tours.length > 0) && (
        <section className="wrap grid gap-16 py-24 sm:py-28 lg:grid-cols-2">
          {city && (
            <div>
              <h2 className="text-[2rem] font-bold tracking-[-0.03em]">Day trips from {d.title}</h2>
              <ul className="mt-6 border-t border-ink/10">
                {city.options.map((o) => (
                  <li key={o.id} className="border-b border-ink/10">
                    <Link href={`/city-tours/${city.slug}/${o.id}`} className="group flex items-baseline justify-between gap-4 py-4">
                      <span className="text-[1.15rem] font-semibold transition-colors group-hover:text-coconut-600">{o.name}</span>
                      <span className="shrink-0 text-ink-400">{o.kind}, US${o.price}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tours.length > 0 && (
            <div>
              <h2 className="text-[2rem] font-bold tracking-[-0.03em]">Tours that stop here</h2>
              <ul className="mt-6 border-t border-ink/10">
                {tours.map((p) => (
                  <li key={p.name} className="border-b border-ink/10">
                    <Link href={`/tours/${p.slug}`} className="group flex items-baseline justify-between gap-4 py-4">
                      <span className="text-[1.15rem] font-semibold transition-colors group-hover:text-coconut-600">{p.name}</span>
                      <span className="shrink-0 text-ink-400">{p.days} days</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <Link href={`/destination/${next.slug}`} className="group relative block h-[60svh] min-h-[22rem] overflow-hidden bg-canopy text-white">
        <Image src={next.hero} alt={next.alt} fill sizes="100vw" className="object-cover opacity-70 transition-[transform,opacity] duration-[1.4s] ease-out group-hover:scale-105 group-hover:opacity-90" />
        <div className="wrap relative flex h-full flex-col justify-end pb-14">
          <p className="text-lg font-medium text-white/80">Next destination</p>
          <p className="text-mega font-extrabold">{next.title}</p>
        </div>
      </Link>
    </Layout>
  );
}

export const getStaticPaths = () => ({ paths: destinations.map((d) => ({ params: { city: d.slug } })), fallback: false });
export const getStaticProps = ({ params }) => ({ props: { slug: params.city } });
