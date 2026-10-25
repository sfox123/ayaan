import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import Itinerary from "../../components/Itinerary";
import RouteLine from "../../components/RouteLine";
import EnquiryForm from "../../components/EnquiryForm";
import { scrollToId } from "../../components/SmoothScroll";
import { getTourCategory, tourCategories, tourSlugs } from "../../lib/content";
import { whatsapp } from "../../lib/site";
import { WhatsAppIcon } from "../../components/Icons";

export default function TourPage({ slug }) {
  const t = getTourCategory(slug);
  const [idx, setIdx] = useState(0);
  const pkg = t.packages[idx];
  const others = tourCategories.filter((x) => x.slug !== slug);

  const choose = (i) => {
    setIdx(i);
    scrollToId("itinerary");
  };

  return (
    <Layout title={`${t.days}-day Sri Lanka tours`} description={`${t.line} Private ${t.days}-day routes with your own driver-guide.`} image={t.image}>
      <PageHero image={t.image} alt={t.alt} kicker="Private tour" title={[`${t.days} days in Sri Lanka`]} intro={t.line} />

      <section id="itinerary" className="scroll-mt-16">
        <div className="sticky top-0 z-30 border-b border-ink/10 bg-mist/90 backdrop-blur-xl">
          <div className="wrap flex gap-1 overflow-x-auto py-3 [scrollbar-width:none]" role="tablist" aria-label="Routes">
            {t.packages.map((p, i) => (
              <button
                key={p.name}
                role="tab"
                aria-selected={i === idx}
                onClick={() => choose(i)}
                className={`relative shrink-0 rounded-full px-4 py-2.5 text-[0.95rem] font-semibold transition-colors ${i === idx ? "text-mist" : "text-ink-600 hover:text-ink"}`}
              >
                {i === idx && <motion.span layoutId="pkg-pill" className="absolute inset-0 rounded-full bg-canopy" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="relative">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="wrap grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-big font-bold">{pkg.name}</h2>
              {pkg.subtitle && <p className="mt-2 text-[1.2rem] font-medium text-ink-400">{pkg.subtitle}</p>}
              <RouteLine stops={pkg.route} className="mt-6" />
              <div className="mt-12">
                <Itinerary items={pkg.days.map((d) => ({ label: `Day ${d.day}`, title: d.title, list: d.activities }))} />
              </div>
            </motion.div>
          </AnimatePresence>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.6rem] bg-white p-6 sm:p-8">
              <p className="text-sm font-medium text-ink-400">This route</p>
              <p className="mt-1 text-[1.5rem] font-bold leading-tight tracking-[-0.025em]">{pkg.name}</p>
              <dl className="mt-6 space-y-4 border-t border-ink/10 pt-6 text-[1rem]">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-400">Length</dt>
                  <dd className="font-medium">{t.days} days</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-400">Starts</dt>
                  <dd className="text-right font-medium">{pkg.route[0]}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-400">Ends</dt>
                  <dd className="text-right font-medium">{pkg.route[pkg.route.length - 1]}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-400">Travel</dt>
                  <dd className="text-right font-medium">Private vehicle and driver-guide</dd>
                </div>
              </dl>
              <div className="mt-8 grid gap-3">
                <a href={whatsapp(`Hello Ayaan Tours, I'm interested in the ${t.days}-day "${pkg.name}" tour.`)} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                  Ask about this route
                </a>
                <button type="button" onClick={() => scrollToId("tour-enquiry")} className="btn-outline">
                  Send an email enquiry
                </button>
              </div>
              <p className="mt-5 text-[0.92rem] leading-relaxed text-ink-400">Prices depend on your dates, group size and hotels. You'll get a full quote before you book.</p>
            </div>
          </aside>
        </div>
      </section>

      <section id="tour-enquiry" className="scroll-mt-20 bg-mist-200/60 py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <h2 className="text-big font-bold">Make it yours</h2>
            <p className="prose-serif mt-5 max-w-md">Tell us when you arrive and what you'd change. We'll send back a day-by-day plan with hotels and a price.</p>
          </div>
          <EnquiryForm
            type="tour"
            context={`${t.days}-day tour: ${pkg.name}`}
            submitLabel="Send tour enquiry"
            fields={[
              { name: "tour", label: "Route", type: "select", options: t.packages.map((p) => p.name), half: true },
              { name: "dates", label: "Arrival date", type: "date", half: true },
              { name: "guests", label: "Guests", type: "number", half: true, required: true },
              { name: "name", label: "Your name", required: true, half: true },
              { name: "email", label: "Email", type: "email", required: true, half: true },
              { name: "phone", label: "Phone / WhatsApp", type: "tel", half: true },
              { name: "message", label: "What would you change?", type: "textarea", placeholder: "More beach, less driving, a night of camping in Yala…" },
            ]}
            initial={{ tour: pkg.name }}
            key={pkg.name}
          />
        </div>
      </section>

      <section className="wrap py-24">
        <h2 className="text-big font-bold">Other lengths</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {others.map((o) => (
            <Link key={o.slug} href={`/tours/${o.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[1.6rem]">
              <Image src={o.image} alt={o.alt} fill sizes="(min-width:640px) 33vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-canopy/85 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <p className="text-[4rem] font-extrabold leading-[0.85] tracking-[-0.06em]">{o.days}</p>
                <p className="mt-1 text-lg font-semibold">days</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths = () => ({ paths: tourSlugs.map((slug) => ({ params: { slug } })), fallback: false });
export const getStaticProps = ({ params }) => ({ props: { slug: params.slug } });
