import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import Itinerary from "../../components/Itinerary";
import ParallaxImage from "../../components/ParallaxImage";
import CampingEnquiry from "../../components/CampingEnquiry";
import { RevealTitle } from "../../components/Reveal";
import { scrollToId } from "../../components/SmoothScroll";
import { camping, campStyles, campIncludes, getPark } from "../../lib/content";
import { whatsapp } from "../../lib/site";
import { WhatsAppIcon } from "../../components/Icons";

export default function Park({ slug }) {
  const c = getPark(slug);
  const others = camping.filter((x) => x.slug !== slug);

  return (
    <Layout title={`Camping in ${c.name}: ${c.title}`} description={c.intro.slice(0, 155)} image={c.image}>
      <PageHero image={c.image} alt={c.alt} kicker={`Safari camping in ${c.name}`} title={[c.title]} intro={c.where} tall>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => scrollToId("enquire")} className="btn-primary">
            Ask about {c.name}
          </button>
          <a href={whatsapp(`Hello Ayaan Tours, I'd like to ask about camping in ${c.name}.`)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            WhatsApp us
          </a>
        </div>
      </PageHero>

      <section className="wrap grid gap-12 py-24 sm:py-32 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div>
          <p className="prose-serif text-[1.35rem] leading-[1.6] text-ink">{c.intro}</p>
        </div>
        <dl className="space-y-6 lg:border-l lg:border-ink/10 lg:pl-10">
          <div>
            <dt className="text-sm font-medium text-ink-400">Where</dt>
            <dd className="mt-1 text-[1.05rem]">{c.where}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-ink-400">Getting there</dt>
            <dd className="mt-1 text-[1.05rem]">{c.fromKandy}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-ink-400">When to go</dt>
            <dd className="mt-1 text-[1.05rem] leading-relaxed">{c.bestTime}</dd>
          </div>
        </dl>
      </section>

      <section className="overflow-hidden border-y border-ink/10 py-16" aria-label={`Wildlife in ${c.name}`}>
        <div className="wrap">
          <p className="kicker">What you might see</p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
            {c.wildlife.map((w, i) => (
              <li key={w} className={`text-[clamp(1.8rem,4.2vw,3.6rem)] font-bold leading-[1.1] tracking-[-0.04em] ${i % 2 ? "text-ink-400" : "text-ink"}`}>
                {w}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-xl text-[0.95rem] text-ink-400">Wild animals keep their own schedule, so no sighting is guaranteed. Your tracker will know where they've been seen that week.</p>
        </div>
      </section>

      <section className="wrap grid gap-14 py-24 sm:py-32 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <RevealTitle lines={["Three days,", "two nights"]} className="text-big font-bold" />
          <p className="prose-serif mt-5 max-w-md">A sample plan. Stay longer, start from a different town, or join it to a round-island tour.</p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <ParallaxImage src={c.image2} alt={c.alt2} sizes="(min-width:1024px) 22vw, 50vw" amount={6} className="aspect-[3/4] rounded-2xl" />
            <ParallaxImage src={c.image} alt="" sizes="(min-width:1024px) 22vw, 50vw" amount={6} className="mt-10 aspect-[3/4] rounded-2xl" />
          </div>
        </div>
        <Itinerary items={c.plan.map((d) => ({ label: d.day, title: d.title, text: d.text }))} />
      </section>

      <section className="bg-earth-200/50 py-20">
        <div className="wrap grid gap-10 md:grid-cols-3">
          {campStyles.map((s) => (
            <div key={s.name} className="border-t-2 border-earth pt-5">
              <h3 className="text-[1.4rem] font-bold tracking-[-0.025em]">{s.name}</h3>
              <p className="mt-2 font-serif text-[1.08rem] leading-relaxed text-ink-600">{s.text}</p>
            </div>
          ))}
          <div className="border-t-2 border-earth pt-5">
            <h3 className="text-[1.4rem] font-bold tracking-[-0.025em]">Usually included</h3>
            <ul className="mt-2 space-y-1.5 font-serif text-[1.08rem] text-ink-600">
              {campIncludes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CampingEnquiry park={c} />

      <section className="wrap py-24">
        <h2 className="text-big font-bold">The other camps</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} href={`/camping/${o.slug}`} className="group relative block aspect-[16/10] overflow-hidden rounded-[1.6rem]">
              <Image src={o.image} alt={o.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-canopy/85 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white sm:p-8">
                <p className="text-[2.4rem] font-bold leading-none tracking-[-0.04em]">{o.name}</p>
                <p className="mt-2 text-lg text-white/85">{o.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths = () => ({ paths: camping.map((c) => ({ params: { park: c.slug } })), fallback: false });
export const getStaticProps = ({ params }) => ({ props: { slug: params.park } });
