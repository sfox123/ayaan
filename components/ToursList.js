import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { tourCategories } from "../lib/content";
import RouteLine from "./RouteLine";

/** Tour lengths as long rows. On desktop, the row's photo slides in beside it on hover. */
export default function ToursList() {
  const [hover, setHover] = useState(null);
  return (
    <ul className="border-t border-ink/15" onMouseLeave={() => setHover(null)}>
      {tourCategories.map((t) => (
        <li key={t.slug} className="border-b border-ink/15" onMouseEnter={() => setHover(t.slug)}>
          <Link href={`/tours/${t.slug}`} className="group relative grid items-center gap-x-8 gap-y-4 py-8 md:grid-cols-[minmax(9rem,13rem)_1fr_minmax(0,22rem)] md:py-10">
            <div className="flex items-baseline gap-2">
              <span className="text-[5.5rem] font-extrabold leading-[0.8] tracking-[-0.06em] text-canopy transition-colors duration-500 group-hover:text-coconut-600 sm:text-[7rem]">
                {t.days}
              </span>
              <span className="text-xl font-semibold">days</span>
            </div>
            <div className="min-w-0">
              <p className="font-serif text-[1.25rem] leading-snug text-ink">{t.line}</p>
              <p className="mt-2 text-[0.95rem] text-ink-400">
                {t.packages.length} routes, for example:
              </p>
              <RouteLine stops={t.packages[t.featured].route} className="mt-2" />
            </div>
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl md:block">
              <Image src={t.image} alt="" fill sizes="22rem" className="object-cover opacity-60 grayscale" />
              <AnimatePresence>
                {hover === t.slug && (
                  <motion.div
                    initial={{ clipPath: "inset(0 0 0 100% round 16px)" }}
                    animate={{ clipPath: "inset(0 0 0 0% round 16px)" }}
                    exit={{ clipPath: "inset(0 100% 0 0% round 16px)" }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0"
                  >
                    <Image src={t.image} alt={t.alt} fill sizes="22rem" className="object-cover" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl md:hidden">
              <Image src={t.image} alt={t.alt} fill sizes="100vw" className="object-cover" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
