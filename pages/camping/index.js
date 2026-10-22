import Link from "next/link";
import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import ParallaxImage from "../../components/ParallaxImage";
import CampingEnquiry from "../../components/CampingEnquiry";
import { RevealTitle } from "../../components/Reveal";
import { scrollToId } from "../../components/SmoothScroll";
import { camping, campStyles, campIncludes } from "../../lib/content";

export default function Camping() {
  return (
    <Layout
      title="Safari camping in Yala, Kumana and Wilpattu"
      description="Two or three nights in a tented camp beside Yala, Kumana or Wilpattu national park, with game drives, meals and transport from anywhere in Sri Lanka."
      image="/images/pois/yala_1.png"
    >
      <PageHero
        image="/images/pois/yala_1.png"
        alt="Safari jeep and elephant on a dirt track in Yala"
        kicker="Safari camping"
        title={["Nights by the fire,", "mornings with leopards"]}
        intro="Tented camps on the edge of three of Sri Lanka's wildest national parks, with game drives at dawn and dusk when the animals are moving."
        tall
      >
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => scrollToId("enquire")} className="btn-primary">
            Ask about a camp
          </button>
          <button type="button" onClick={() => scrollToId("parks")} className="btn-ghost">
            Compare the parks
          </button>
        </div>
      </PageHero>

      <section className="wrap grid gap-10 py-24 sm:py-32 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <RevealTitle lines={["Why camp instead", "of staying in a hotel?"]} className="text-big font-bold" />
        <div className="prose-serif space-y-5">
          <p>
            Parks open at first light, and the best sightings happen in the first and last hours of the day. From a camp on the boundary you're through the gate before the jeeps from town arrive, and back at camp by dark without a long drive.
          </p>
          <p>
            In between, there's nothing to do but listen. Peacocks call at dusk, elephants pass in the night, and dinner is cooked over the fire.
          </p>
        </div>
      </section>

      <section id="parks" className="scroll-mt-16 pb-12">
        {camping.map((c, i) => (
          <article key={c.slug} className="wrap grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-20 lg:py-20">
            <ParallaxImage
              src={c.image}
              alt={c.alt}
              sizes="(min-width:1024px) 50vw, 100vw"
              className={`aspect-[4/3] rounded-[1.6rem] lg:aspect-[4/5] ${i % 2 ? "lg:order-2" : ""}`}
            />
            <div>
              <p className="kicker">{c.where}</p>
              <h2 className="mt-2 text-huge font-extrabold">{c.name}</h2>
              <p className="mt-3 text-[1.5rem] font-semibold tracking-[-0.02em] text-earth">{c.title}</p>
              <p className="prose-serif mt-5 max-w-xl">{c.intro}</p>
              <dl className="mt-8 grid max-w-xl gap-5 border-t border-ink/10 pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-ink-400">You might see</dt>
                  <dd className="mt-1 text-[1rem] leading-snug">{c.wildlife.slice(0, 4).join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-ink-400">Getting there</dt>
                  <dd className="mt-1 text-[1rem] leading-snug">{c.fromKandy}</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/camping/${c.slug}`} className="btn-dark">
                  See the 3-day {c.name} plan
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-earth-200/50 py-24 sm:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <RevealTitle lines={["Two ways to camp"]} className="text-big font-bold" />
            <p className="prose-serif mt-5 max-w-md">We can arrange either at all three parks, depending on availability. Tell us which you'd prefer, or ask us to suggest one for your dates.</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            {campStyles.map((s) => (
              <div key={s.name} className="border-t-2 border-earth pt-5">
                <h3 className="text-[1.6rem] font-bold tracking-[-0.025em]">{s.name}</h3>
                <p className="mt-3 font-serif text-[1.12rem] leading-relaxed text-ink-600">{s.text}</p>
              </div>
            ))}
            <div className="sm:col-span-2">
              <h3 className="text-[1.25rem] font-bold tracking-[-0.02em]">A typical stay includes</h3>
              <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {campIncludes.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[1.02rem]">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-earth" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.95rem] text-ink-400">Your quote lists exactly what's included for your dates.</p>
            </div>
          </div>
        </div>
      </section>

      <CampingEnquiry />
    </Layout>
  );
}
