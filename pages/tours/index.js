import Link from "next/link";
import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import ToursList from "../../components/ToursList";
import ClosingCta from "../../components/ClosingCta";
import { RevealTitle } from "../../components/Reveal";

export default function Tours() {
  return (
    <Layout
      title="Private round-island tours"
      description="Private 5, 7, 9 and 14-day tours of Sri Lanka with your own driver-guide. Every route can be changed day by day."
      image="/images/pois/ella_2.png"
    >
      <PageHero
        image="/images/pois/ella_2.png"
        alt="Sunrise over the ridge at Ella"
        kicker="Round-island tours"
        title={["Fourteen routes,", "one island"]}
        intro="Each tour is private: your own vehicle and driver-guide from the airport to your last night. Use these routes as a starting point."
      />

      <section className="wrap py-24 sm:py-32">
        <ToursList />
      </section>

      <section className="wrap grid gap-10 pb-28 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <RevealTitle lines={["None of these", "quite right?"]} className="text-big font-bold" />
        <div className="prose-serif space-y-5">
          <p>
            Swap a day of temples for a day on the beach, add a night of safari camping, or start in the south instead of the north. Most guests change something, and it doesn't change how we work.
          </p>
          <div className="flex flex-wrap gap-3 font-display">
            <Link href="/camping" className="btn-dark">
              Add safari camping
            </Link>
            <Link href="/city-tours" className="btn-outline">
              See single-day trips
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta image="/images/pois/trinco_2.png" />
    </Layout>
  );
}
