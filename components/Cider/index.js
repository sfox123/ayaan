import React, { useState, useEffect } from "react";
import FontAwesome from "react-fontawesome";

const imagesData = [
  {
    src: [
      "/images/cider/1.png", // base
      "/images/cider/2.png", // mountain
      "/images/cider/3.png", // rock
    ],
    title: "Ayaan Tours",
    alt: "Cider Slide 1",
  },
  {
    src: [
      "/images/cider/4.png", // base
      "/images/cider/5.png", // mountain
      "/images/cider/6.png", // rock
    ],
    title: "Ayaan Tours",
    alt: "Cider Slide 2",
  },
  {
    src: [
      "/images/cider/7.png", // base
      "/images/cider/8.png", // mountain
      "/images/cider/9.png", // rock
    ],
    title: "Ayaan Tours",
    alt: "Cider Slide 3",
  },
  // …more slide‑sets
];

export default function Cider() {
  const [current, setCurrent] = useState(0);
  const { src, title, alt } = imagesData[current];

  const prevSlide = () =>
    setCurrent((i) => (i - 1 + imagesData.length) % imagesData.length);
  const nextSlide = () => setCurrent((i) => (i + 1) % imagesData.length);
  const goToSlide = (idx) => setCurrent(idx);

  // Auto-advance the slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((i) => (i + 1) % imagesData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cider-wrapper">
      {/* Remount on current so animations always replay */}
      <div className="cider-slide" key={current}>
        {/* 1) Base image (responsive) */}
        <img
          src={src[0]}
          alt={`${alt} — base`}
          className="cider-slide-image-base"
        />

        {/* 2) Overlays: auto‑delayed fades */}
        {src.slice(1).map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${alt} — overlay ${idx + 1}`}
            className="cider-slide-image-overlay"
            style={{ animationDelay: `${(idx + 1) * 2}s` }}
          />
        ))}

        {/* 3) Title */}
        <div className="cider-slide-title">{title}</div>
      </div>

      {/* Arrows */}
      <button
        className="cider-nav cider-nav-prev"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <FontAwesome name="chevron-left" size="2x" />
      </button>
      <button
        className="cider-nav cider-nav-next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <FontAwesome name="chevron-right" size="2x" />
      </button>

      {/* Dots */}
      <div className="cider-dots">
        {imagesData.map((_, idx) => (
          <span
            key={idx}
            className={
              idx === current ? "cider-dot cider-dot-active" : "cider-dot"
            }
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
}
