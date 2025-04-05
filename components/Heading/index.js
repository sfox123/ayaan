import React, { useRef } from "react";
import PropTypes from "prop-types";
import { motion, useInView } from "framer-motion";

const Heading = ({ text, size }) => {
  const ref = useRef(null); // Create a ref for the heading container
  const isInView = useInView(ref, { once: true }); // Trigger animation only once when visible

  return (
    <div className="heading-container" ref={ref}>
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}} // Animate only when in view
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={`heading ${size}`}
      >
        {text}
      </motion.h1>
    </div>
  );
};

Heading.propTypes = {
  text: PropTypes.string.isRequired, // The heading text
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]).isRequired, // The size of the heading
};

export default Heading;
