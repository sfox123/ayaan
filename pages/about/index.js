import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import ParallaxImage from "../../components/ParallaxImage";
import Reviews from "../../components/Reviews";
import ClosingCta from "../../components/ClosingCta";
import { RevealTitle } from "../../components/Reveal";
import about from "../../data/aboutUs.json";

export default function About() {
  const [founder, ...rest] = about.whyChooseUs.features;
  return (
    <Layout title="About us" description="Ayaan Tours is a Kandy-based tour company founded in 2022 by Asique Mohammed, offering private tours with an eye on responsible travel." image="/images/pois/kandy_2.png">
      <PageHero image="/images/pois/dambulla_1.png" alt="White facade of the Dambulla cave temple" kicker="About us" title={["From Kandy,", "since 2022"]} intro="A small, local company that would rather show you the real island than rush you round the famous one." />

      <section className="wrap grid gap-12 py-24 sm:py-32 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <ParallaxImage src="/images/pois/uda_1.png" alt="Elephants at sunset in Sri Lanka's dry zone" sizes="(min-width:1024px) 40vw, 100vw" className="aspect-[4/5] rounded-[1.6rem]" />
        <div>
          <RevealTitle lines={["Who we are"]} className="text-big font-bold" />
          <p className="prose-serif mt-6">{about.introduction}</p>
          <div className="mt-12 border-l-2 border-coconut pl-6">
            <h3 className="text-[1.4rem] font-bold tracking-[-0.02em]">Asique Mohammed, founder</h3>
            <p className="prose-serif mt-3">{founder.description}</p>
          </div>
        </div>
      </section>

      <section className="bg-canopy py-24 text-mist sm:py-28">
        <div className="wrap grid gap-14 md:grid-cols-2 md:gap-20">
          {[about.mission, about.vision].map((b) => (
            <div key={b.title}>
              <h2 className="text-big font-bold">{b.title}</h2>
              <p className="mt-6 font-serif text-[1.2rem] leading-relaxed text-mist/80">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap py-24 sm:py-32">
        <RevealTitle lines={["What you can expect"]} className="text-huge font-bold" />
        <div className="mt-14 grid gap-x-16 md:grid-cols-2">
          {rest.map((f) => (
            <div key={f.title} className="border-t border-ink/15 py-8">
              <h3 className="text-[1.45rem] font-bold leading-tight tracking-[-0.02em]">{f.title}</h3>
              <p className="mt-3 font-serif text-[1.1rem] leading-relaxed text-ink-600">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-mist-200/50">
        <Reviews />
      </div>
      <ClosingCta image="/images/pois/ella_1.png" />
    </Layout>
  );
}
