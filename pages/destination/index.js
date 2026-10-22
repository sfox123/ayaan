import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import ClosingCta from "../../components/ClosingCta";
import { destinations } from "../../lib/content";

export default function Destinations() {
  return (
    <Layout title="Destinations" description="Kandy, Sigiriya, Ella, Galle and more: the places we take guests every week, and what to see in each." image="/images/pois/anuradhapura_1.png">
      <PageHero
        image="/images/pois/anuradhapura_1.png"
        alt="Jetavanaramaya dagoba in Anuradhapura"
        kicker="Destinations"
        title={["Ancient cities, tea hills", "and a long warm coast"]}
        intro="Sri Lanka is small enough that most of these are a few hours apart. Here's what's worth your time in each."
      />

      <section className="wrap py-24 sm:py-32">
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {destinations.map((d, i) => (
            <Link key={d.slug} href={`/destination/${d.slug}`} className={`group block ${i % 2 ? "md:mt-28" : ""}`}>
              <div className={`relative overflow-hidden rounded-[1.6rem] bg-canopy ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                <Image src={d.hero} alt={d.alt} fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm font-medium text-ink-400">{d.region}</p>
                  <h2 className="mt-1 text-[2.6rem] font-bold leading-none tracking-[-0.04em] transition-colors group-hover:text-coconut-600">{d.title}</h2>
                  <p className="mt-3 max-w-md font-serif text-[1.15rem] leading-snug text-ink-600">{d.blurb}</p>
                </div>
                <span className="mt-2 shrink-0 text-sm font-medium text-ink-400">{d.duration.split(" with")[0]}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ClosingCta image="/images/pois/thalpe_2.png" lines={["Can't choose?", "Tell us what you like."]} />
    </Layout>
  );
}
