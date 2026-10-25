import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { destinations } from "../../lib/content";

function Card({ d, i }) {
  return (
    <Link href={`/destination/${d.slug}`} className="group block w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[28vw] xl:w-[24vw]">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.6rem] bg-canopy">
        <Image
          src={d.hero}
          alt={d.alt}
          fill
          sizes="(min-width:1280px) 26vw, (min-width:1024px) 30vw, (min-width:640px) 46vw, 78vw"
          className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canopy/80 via-canopy/0 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="text-sm font-medium text-white/75">{d.region}</p>
          <h3 className="mt-1 text-[2.2rem] font-bold leading-none tracking-[-0.035em]">{d.title}</h3>
          <p className="mt-3 max-h-0 overflow-hidden font-serif text-[1.05rem] leading-snug text-white/85 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 group-focus-visible:max-h-24 group-focus-visible:opacity-100">
            {d.blurb}
          </p>
        </div>
      </div>
    </Link>
  );
}

/** Pinned section whose card track scrolls sideways as the page scrolls down (desktop). Native swipe on touch. */
export default function DestinationsRail() {
  const section = useRef(null);
  const track = useRef(null);
  const [dist, setDist] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const decide = () =>
      setPinned(window.matchMedia("(min-width: 1024px)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    decide();
    window.addEventListener("resize", decide);
    return () => window.removeEventListener("resize", decide);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const measure = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const raw = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const x = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const header = (
    <div className="wrap flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="kicker">Destinations</p>
        <h2 className="mt-3 max-w-4xl text-huge font-bold">Eight places we drive to every week</h2>
      </div>
      <Link href="/destination" className="btn-outline">
        All destinations
      </Link>
    </div>
  );

  if (!pinned) {
    return (
      <section className="py-24 sm:py-32">
        {header}
        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-8 [scrollbar-width:none]">
          {destinations.map((d, i) => (
            <Card key={d.slug} d={d} i={i} />
          ))}
          <div className="w-1 shrink-0" />
        </div>
      </section>
    );
  }

  return (
    <section ref={section} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {header}
        <motion.div ref={track} style={{ x }} className="mt-12 flex gap-5 pl-12 pr-[6vw] will-change-transform">
          {destinations.map((d, i) => (
            <Card key={d.slug} d={d} i={i} />
          ))}
        </motion.div>
        <div className="wrap mt-10">
          <div className="h-px w-full bg-ink/10">
            <motion.div style={{ width: bar }} className="h-px bg-ink" />
          </div>
        </div>
      </div>
    </section>
  );
}
