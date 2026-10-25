import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { whatsapp, SITE } from "../lib/site";
import { WhatsAppIcon } from "./Icons";
import { RevealTitle } from "./Reveal";

export default function ClosingCta({ image = "/images/pois/kalpitiya_1.png", lines = ["Tell us when you land.", "We'll plan the rest."] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-canopy py-32 text-white sm:py-44">
      <motion.div style={{ y }} className="absolute -inset-y-[14%] inset-x-0 -z-10">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-canopy/55" />
      </motion.div>
      <div className="wrap">
        <RevealTitle lines={lines} className="max-w-4xl text-huge font-bold" />
        <p className="mt-6 max-w-lg font-serif text-[1.25rem] leading-relaxed text-white/85">
          Send your dates and what you'd like to see. You'll get a route, a price and the name of your driver, usually within a day.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={whatsapp("Hello Ayaan Tours, here are my travel dates:")} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            WhatsApp {SITE.phoneDisplay}
          </a>
          <a href={`mailto:${SITE.email}`} className="btn-ghost">
            Email {SITE.email}
          </a>
        </div>
      </div>
    </section>
  );
}
