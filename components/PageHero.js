import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

/** Splits a heading into lines that slide up from behind a mask. Pass an array for explicit lines. */
export function MaskTitle({ lines, className = "", delay = 0.35, as: Tag = "h1" }) {
  const list = Array.isArray(lines) ? lines : [lines];
  return (
    <Tag className={className}>
      {list.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export default function PageHero({ image, alt, title, intro, kicker, children, tall = false, position = "center" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className={`relative isolate flex overflow-hidden bg-canopy text-white ${tall ? "min-h-[100svh]" : "min-h-[78svh]"}`}>
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease }}
        >
          <Image src={image} alt={alt || ""} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,46,36,0.55)_0%,rgba(15,46,36,0.05)_35%,rgba(15,46,36,0.2)_60%,rgba(15,46,36,0.85)_100%)]" />
      </motion.div>
      <motion.div style={{ opacity: fade }} className="wrap mt-auto pb-14 pt-40 sm:pb-20">
        {kicker && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease }}
            className="mb-4 text-[1.05rem] font-medium text-white/80"
          >
            {kicker}
          </motion.p>
        )}
        <MaskTitle lines={title} className="max-w-5xl text-huge font-bold" />
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.9, ease }}
            className="mt-6 max-w-xl font-serif text-[1.25rem] leading-relaxed text-white/85"
          >
            {intro}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
