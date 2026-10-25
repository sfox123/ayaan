import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

/** Masked line reveal for section headings when they scroll into view. */
export function RevealTitle({ lines, className = "", as: Tag = "h2" }) {
  const list = Array.isArray(lines) ? lines : [lines];
  return (
    <Tag className={className}>
      {list.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.95, ease, delay: i * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
