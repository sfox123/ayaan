"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  "/images/slider/1.png",
  "/images/slider/2.png",
  "/images/slider/3.png",
  "/images/slider/4.png",
  "/images/slider/5.png",
];

const Slider = () => {
  return (
    <div
      style={{
        width: "100vw", // 100% of viewport width
        // Responsive height:
        // - Tries to be 50% of viewport height (50vh)
        // - Will not go below 300px
        // - Will not go above 600px
        height: "clamp(300px, 100vh, 600px)",
        display: "flex",
        overflow: "hidden", // Important to clip animations
        position: "relative", // Good practice for positioning children
      }}
    >
      {images.map((src, index) => {
        const isEven = index % 2 === 0; // 0, 2, 4 (from bottom)

        // "100%" for y translation refers to 100% of the element's own height.
        // Since the motion.div height is set to "100%" of its parent container,
        // this will correctly move it by the full container height, which is now responsive.
        const initialY = isEven ? "100%" : "-100%";
        const animateY = "0%";

        return (
          <motion.div
            key={src}
            initial={{ y: initialY, opacity: 0 }}
            animate={{ y: animateY, opacity: 1 }}
            transition={{
              delay: index * 0.5, // Stagger the animation start
              duration: 0.8, // Speed of the animation
              ease: "easeInOut", // Ease in and out motion
            }}
            style={{
              width: "20%", // Each image takes 1/5th of the container width
              height: "100%", // Each image takes the full (now responsive) height of the container
              position: "relative", // Needed for Next/Image layout="fill"
              flexShrink: 0, // Prevent images from shrinking
            }}
          >
            <Image
              src={src}
              alt={`Collage image ${index + 1}`}
              layout="fill"
              objectFit="cover" // This will cover the area, cropping if necessary, adapting to the responsive panel size
              priority={index < 2} // Prioritize loading for initial images
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default Slider;
