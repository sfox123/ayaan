import Link from "next/link";
import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import Itinerary from "../../components/Itinerary";
import EnquiryForm from "../../components/EnquiryForm";
import CityBlock from "../../components/CityBlock";
import { cities, getCityTour } from "../../lib/content";
import { whatsapp } from "../../lib/site";
import { WhatsAppIcon } from "../../components/Icons";

function CityPage({ city }) {
  return (
    <Layout title={`Day trips from ${city.title}`} description={city.intro.slice(0, 155)} image={city.image}>
      <PageHero image={city.image} alt={city.alt} kicker="Day trips" title={[`${city.title} in a day`]} intro={city.intro.split(". ")[0] + "."} />
      <section className="wrap py-20">
        <CityBlock city={city} />
      </section>
    </Layout>
  );
}

function TripPage({ city, option }) {
  const others = city.options.filter((o) => o.id !== option.id);
  return (
    <Layout title={`${option.name}: ${option.kind.toLowerCase()} from ${city.title}`} description={option.stops.map((s) => s.title).join(", ")} image={option.image}>
      <PageHero image={option.image} alt={city.alt} kicker={`${option.kind} from ${city.title}`} title={[option.name]}>
        <div className="flex flex-wrap items-center gap-4">
          <span className="rounded-full bg-white/15 px-5 py-3 text-lg font-semibold backdrop-blur">US${option.price}</span>
          <a href={whatsapp(`Hello Ayaan Tours, I'd like to book "${option.name}" (${city.title}).`)} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            Book on WhatsApp
          </a>
        </div>
      </PageHero>

      <section className="wrap grid gap-14 py-24 sm:py-28 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div>
          <h2 className="text-big font-bold">The stops</h2>
          <div className="mt-10">
            <Itinerary items={option.stops.map((s, i) => ({ label: `Stop ${i + 1}`, title: s.title, text: s.detail }))} />
          </div>
          {city.addOns.length > 0 && (
            <div className="mt-16">
              <h3 className="text-[1.6rem] font-bold tracking-[-0.025em]">Add to your day</h3>
              <ul className="mt-5 border-t border-ink/10">
                {city.addOns.map((a) => {
                  const [t, ...rest] = a.split(":");
                  return (
                    <li key={a} className="border-b border-ink/10 py-4">
                      <p className="text-[1.1rem] font-semibold">{t}</p>
                      {rest.length > 0 && <p className="mt-1 font-serif text-[1.05rem] text-ink-600">{rest.join(":").trim()}</p>}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[1.6rem] bg-white p-6 sm:p-8">
            <p className="text-sm font-medium text-ink-400">Book this trip</p>
            <p className="mt-1 text-[1.5rem] font-bold tracking-[-0.025em]">{option.name}</p>
            <div className="mt-6">
              <EnquiryForm
                type="daytrip"
                context={`${option.name} (${city.title} ${option.kind.toLowerCase()})`}
                submitLabel="Request this trip"
                fields={[
                  { name: "dates", label: "Date", type: "date", half: true },
                  { name: "guests", label: "Guests", type: "number", half: true, required: true },
                  { name: "name", label: "Your name", required: true },
                  { name: "email", label: "Email", type: "email", required: true },
                  { name: "phone", label: "Phone / WhatsApp", type: "tel" },
                ]}
              />
            </div>
          </div>
          {others.length > 0 && (
            <div className="mt-8">
              <p className="text-sm font-medium text-ink-400">More from {city.title}</p>
              <ul className="mt-2">
                {others.map((o) => (
                  <li key={o.id}>
                    <Link href={`/city-tours/${city.slug}/${o.id}`} className="flex justify-between border-b border-ink/10 py-3 font-semibold hover:text-coconut-600">
                      {o.name}
                      <span className="font-normal text-ink-400">US${o.price}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>
    </Layout>
  );
}

export default function CityTourRoute({ citySlug, id }) {
  if (id) {
    const found = getCityTour(citySlug, id);
    return <TripPage city={found.city} option={found.option} />;
  }
  return <CityPage city={cities.find((c) => c.slug === citySlug)} />;
}

export const getStaticPaths = () => ({
  paths: cities.flatMap((c) => [{ params: { slug: [c.slug] } }, ...c.options.map((o) => ({ params: { slug: [c.slug, String(o.id)] } }))]),
  fallback: false,
});

export const getStaticProps = ({ params }) => ({ props: { citySlug: params.slug[0], id: params.slug[1] || null } });
