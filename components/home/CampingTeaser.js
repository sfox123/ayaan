import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { camping } from "../../lib/content";
import { RevealTitle } from "../Reveal";

/** Three parks as panels; the one you point at (or tap) widens and tells you about itself. */
export default function CampingTeaser() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative overflow-hidden bg-canopy py-24 text-mist sm:py-32">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="text-[0.95rem] font-medium text-coconut">New: safari camping</p>
            <RevealTitle lines={["Sleep at the edge", "of the jungle"]} className="mt-3 text-huge font-bold" />
          </div>
          <p className="max-w-md font-serif text-[1.2rem] leading-relaxed text-mist/75">
            Two or three nights in a tented camp beside Yala, Kumana or Wilpattu, with dawn and dusk game drives and dinner by the fire. We drive you there and on to wherever you're going next.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-3 lg:h-[34rem] lg:flex-row">
          {camping.map((c, i) => {
            const on = active === i;
            return (
              <motion.div
                key={c.slug}
                layout
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                transition={{ layout: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
                className={`relative min-h-[22rem] overflow-hidden rounded-[1.6rem] lg:min-h-0 ${on ? "lg:flex-[2.6]" : "lg:flex-1"}`}
              >
                <Link href={`/camping/${c.slug}`} className="group absolute inset-0 block">
                  <Image src={c.image} alt={c.alt} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-canopy via-canopy/30 to-canopy/0" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <h3 className="text-[2.6rem] font-bold leading-none tracking-[-0.04em]">{c.name}</h3>
                    <motion.div
                      initial={false}
                      animate={{ opacity: on ? 1 : 0.0, y: on ? 0 : 10 }}
                      transition={{ duration: 0.5, delay: on ? 0.25 : 0 }}
                      className="lg:max-w-md"
                    >
                      <p className="mt-2 text-lg font-semibold text-coconut">{c.title}</p>
                      <p className="mt-1 text-[0.95rem] text-mist/75">{c.where}</p>
                      <span className="mt-5 inline-flex rounded-full bg-mist px-5 py-2.5 text-sm font-semibold text-canopy">
                        See the {c.name} camp
                      </span>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
