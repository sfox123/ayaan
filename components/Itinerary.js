import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Day-by-day timeline. The coconut line fills as the reader scrolls through it.
 * items: [{ label: "Day 1", title, text?, list?: [{ text, optional }] }]
 */
export default function Itinerary({ items, tone = "light" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const dark = tone === "dark";

  return (
    <ol ref={ref} className="relative">
      <div className={`absolute bottom-3 left-[11px] top-3 w-[2px] ${dark ? "bg-mist/15" : "bg-ink/10"}`} aria-hidden="true" />
      <motion.div style={{ scaleY: fill }} className="absolute bottom-3 left-[11px] top-3 w-[2px] origin-top bg-coconut" aria-hidden="true" />
      {items.map((it, i) => (
        <li key={i} className="relative pb-12 pl-12 last:pb-0">
          <span className={`absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full border-2 border-coconut ${dark ? "bg-canopy" : "bg-mist"}`}>
            <span className="h-2 w-2 rounded-full bg-coconut" />
          </span>
          <p className={`text-[0.95rem] font-semibold ${dark ? "text-coconut" : "text-coconut-600"}`}>{it.label}</p>
          <h3 className="mt-1 text-[1.6rem] font-bold leading-tight tracking-[-0.025em]">{it.title}</h3>
          {it.text && <p className={`mt-3 max-w-2xl font-serif text-[1.15rem] leading-relaxed ${dark ? "text-mist/75" : "text-ink-600"}`}>{it.text}</p>}
          {it.list && (
            <ul className={`mt-4 max-w-2xl space-y-2.5 font-serif text-[1.12rem] leading-snug ${dark ? "text-mist/80" : "text-ink-600"}`}>
              {it.list.map((a, n) => (
                <li key={n} className="flex gap-3">
                  <span className={`mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full ${dark ? "bg-mist/40" : "bg-ink/30"}`} aria-hidden="true" />
                  <span>
                    {a.text}
                    {a.optional && <span className="ml-2 font-display text-sm font-medium text-ink-400">optional</span>}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
