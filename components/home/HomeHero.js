import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { whatsapp } from "../../lib/site";
import { WhatsAppIcon } from "../Icons";

const SLIDES = [
  { src: "/images/pois/sigiriya_1.png", label: "Sigiriya" },
  { src: "/images/pois/ella_1.png", label: "Nine Arches Bridge, Ella" },
  { src: "/images/pois/yala_2.png", label: "Yala National Park" },
  { src: "/images/pois/mirisa_1.png", label: "Mirissa" },
  { src: "/images/pois/kandy_2.png", label: "Temple of the Tooth, Kandy" },
];

const ease = [0.16, 1, 0.3, 1];

/**
 * The signature moment: the photo starts as a window in the corner of the page
 * and opens to full-bleed as you scroll, while the headline turns from ink to white.
 */
export default function HomeHero() {
  const ref = useRef(null);
  const [i, setI] = useState(0);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const start = mobile ? [56, 4, 3, 4, 22] : [47, 4, 5, 44, 28]; // top right bottom left radius
  const top = useTransform(p, [0, 0.65], [start[0], 0]);
  const right = useTransform(p, [0, 0.65], [start[1], 0]);
  const bottom = useTransform(p, [0, 0.65], [start[2], 0]);
  const left = useTransform(p, [0, 0.65], [start[3], 0]);
  const radius = useTransform(p, [0, 0.65], [start[4], 0]);
  const clip = useMotionTemplate`inset(${top}% ${right}% ${bottom}% ${left}% round ${radius}px)`;
  const imgScale = useTransform(p, [0, 1], [1.08, 1]);
  const color = useTransform(p, [0.18, 0.45], ["#14231C", "#FFFFFF"]);
  const veil = useTransform(p, [0.2, 0.6], [0, 1]);
  const headY = useTransform(p, [0, 1], ["0%", mobile ? "0%" : "-18%"]);

  return (
    <section ref={ref} className="relative h-[230svh] bg-mist">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ clipPath: clip }} className="absolute inset-0 bg-canopy">
          <motion.div style={{ scale: imgScale }} className="absolute inset-0">
            <AnimatePresence initial={false}>
              <motion.div
                key={SLIDES[i].src}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 1.2 }, scale: { duration: 6, ease: "linear" } }}
                className="absolute inset-0"
              >
                <Image src={SLIDES[i].src} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <motion.div style={{ opacity: veil }} className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,46,36,0.78)_0%,rgba(15,46,36,0.35)_55%,rgba(15,46,36,0.1)_100%)]" />
          <div className="absolute bottom-5 right-6 flex items-center gap-3 text-sm font-medium text-white/90">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.4 }}>
                {SLIDES[i].label}
              </motion.span>
            </AnimatePresence>
            <span className="flex gap-1" aria-hidden="true">
              {SLIDES.map((s, n) => (
                <span key={s.src} className={`h-1 rounded-full bg-white transition-all duration-500 ${n === i ? "w-5" : "w-1 opacity-50"}`} />
              ))}
            </span>
          </div>
        </motion.div>

        <motion.div style={{ color, y: headY }} className="wrap relative flex h-full flex-col pt-28 sm:pt-32">
          <h1 className="text-mega font-extrabold">
            {["Sri Lanka,", "the local way"].map((line, n) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" initial={{ y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1.1, ease, delay: 0.25 + n * 0.1 }}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.6 }} className="mt-6 max-w-md md:mt-8">
            <p className="font-serif text-[1.2rem] leading-relaxed opacity-80 sm:text-[1.3rem]">
              Private tours, day trips, safari camping and airport transfers, planned and driven by a small team from Kandy.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={whatsapp("Hello Ayaan Tours, I'd like help planning a trip.")} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                Plan my trip
              </a>
              <Link href="/tours" className="btn rounded-full border border-current px-6 opacity-90 transition-opacity hover:opacity-100">
                Browse tours
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
