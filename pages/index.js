import Link from "next/link";
import Layout from "../components/Layout";
import HomeHero from "../components/home/HomeHero";
import DestinationsRail from "../components/home/DestinationsRail";
import CampingTeaser from "../components/home/CampingTeaser";
import ToursList from "../components/ToursList";
import Reviews from "../components/Reviews";
import TaxiBooking from "../components/TaxiBooking";
import ClosingCta from "../components/ClosingCta";
import { RevealTitle } from "../components/Reveal";

export default function Home() {
  return (
    <Layout navTone="dark">
      <HomeHero />

      <section className="wrap grid gap-10 py-24 sm:py-32 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <RevealTitle
          lines={["A small Kandy company.", "Your own car, your own", "driver, your own pace."]}
          className="text-big font-bold"
        />
        <div className="prose-serif space-y-5 lg:pt-2">
          <p>
            Ayaan Tours was founded in 2022 by Asique Mohammed, a trainer and former international civil servant with more than twenty years at organisations including the United Nations. Many of our guests travel with Asique himself.
          </p>
          <p>
            There are no shared coaches and no fixed departure dates. Pick one of our routes as a starting point, or tell us what you'd like to see and we'll draw one up.
          </p>
          <Link href="/about" className="inline-block font-display text-[1rem] font-semibold text-canopy underline decoration-coconut decoration-2 underline-offset-[6px]">
            More about us
          </Link>
        </div>
      </section>

      <DestinationsRail />

      <section className="wrap py-24 sm:py-32">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="kicker">Round-island tours</p>
            <RevealTitle lines={["How long have you got?"]} className="mt-3 text-huge font-bold" />
          </div>
          <p className="prose-serif max-w-md">
            Every tour is private and starts wherever you land. These are the routes guests ask for most; each one can be changed day by day.
          </p>
        </div>
        <ToursList />
      </section>

      <CampingTeaser />

      <section id="taxi-booking" className="scroll-mt-20 bg-mist-200/50 py-24 sm:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="kicker">Transfers</p>
            <RevealTitle lines={["Airport pick-ups and", "rides across the island"]} className="mt-3 text-big font-bold" />
            <p className="prose-serif mt-6 max-w-md">
              We'll meet you at the airport or collect you from any hotel or address. Choose a vehicle that fits your group and bags, tell us where you're going, and we'll confirm the price before you travel.
            </p>
            <ul className="mt-8 space-y-3 text-[1.02rem]">
              {["Price confirmed before you travel", "English-speaking drivers", "Cars, vans and a 21-seat mini bus", "Any town to any town on the island"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-coconut" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <TaxiBooking />
        </div>
      </section>

      <Reviews />
      <ClosingCta />
    </Layout>
  );
}
