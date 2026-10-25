import CityBlock from "../../components/CityBlock";
import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import { cities } from "../../lib/content";

export default function CityTours() {
  return (
    <Layout title="Day trips and city tours" description="City tours and full-day trips from Kandy, Colombo, Galle, Sigiriya and more, with a private driver." image="/images/pois/kandy_1.png">
      <PageHero
        image="/images/pois/kandy_1.png"
        alt="Queen's Hotel on a Kandy street"
        kicker="Day trips"
        title={["One day,", "done properly"]}
        intro="City tours and full-day trips with a private driver, starting from your hotel. Good for a free day, or a first taste before a longer tour."
      />
      <section className="wrap py-20 sm:py-28">
        {cities.map((c) => (
          <CityBlock key={c.slug} city={c} />
        ))}
      </section>
    </Layout>
  );
}
