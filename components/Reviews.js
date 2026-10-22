import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { reviews } from "../lib/content";
import { ArrowIcon, StarIcon } from "./Icons";

export default function Reviews() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (d) => {
    setDir(d);
    setI((n) => (n + d + reviews.length) % reviews.length);
  };
  const r = reviews[i];

  return (
    <section className="py-24 sm:py-32" aria-roledescription="carousel" aria-label="Guest reviews">
      <div className="wrap grid gap-10 lg:grid-cols-[16rem_1fr]">
        <div>
          <p className="kicker">From our guests</p>
          <div className="mt-4 flex text-coconut" aria-label="Rated 5 out of 5">
            {[...Array(5)].map((_, n) => (
              <StarIcon key={n} className="h-5 w-5" />
            ))}
          </div>
          <div className="mt-8 flex gap-2">
            <button type="button" onClick={() => go(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-mist" aria-label="Previous review">
              <ArrowIcon dir="left" />
            </button>
            <button type="button" onClick={() => go(1)} className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-mist" aria-label="Next review">
              <ArrowIcon />
            </button>
          </div>
          <p className="mt-4 text-sm text-ink-400" aria-live="polite">
            {i + 1} of {reviews.length}
          </p>
        </div>
        <div className="relative min-h-[22rem] sm:min-h-[19rem]">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.figure
              key={i}
              custom={dir}
              variants={{
                enter: (d) => ({ opacity: 0, x: d * 40 }),
                center: { opacity: 1, x: 0 },
                exit: (d) => ({ opacity: 0, x: d * -40 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="font-serif text-[1.45rem] leading-[1.45] text-ink sm:text-[1.8rem]">
                “{r.review}”
              </blockquote>
              <figcaption className="mt-6 text-[1rem] font-semibold">{r.author}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
