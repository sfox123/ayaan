import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Image inside a rounded frame that drifts slightly against the scroll. */
export default function ParallaxImage({ src, alt, className = "", sizes = "100vw", amount = 10, priority = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </div>
  );
}
