"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import taxiAnimationData from "@/../public/lottie/taxi.json";

import LottieAnimation from "../Lottie";
import styles from "./taxi.module.css";
import BookingDetailsForm from "./BookingDetailsForm";
import VehicleSelection from "./VehicleSelection";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.9,
  }),
};

export default function Taxi() {
  // We can start with the animation being "complete" for debugging,
  // or set it to false and rely on the onComplete callback.
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
  };

  const handleNextStep = () => {
    setDirection(1);
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const handleSubmit = () => {
    alert("Taxi Booked!");
  };

  return (
    <section className={styles.container}>
      <div className={styles.lottieBackground}>
        <LottieAnimation
          loop={false}
          // --- FIX 2: Pass the imported data object ---
          animationData={taxiAnimationData}
          onComplete={handleAnimationComplete}
        />
      </div>

      {isAnimationComplete && (
        // This wrapper is the card on the right. It's the stable "stage" for the animation.
        <div className={styles.formWrapper}>
          <AnimatePresence initial={false} custom={direction}>
            {step === 1 && (
              <motion.div
                key={1}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                // This is the animated card that stacks inside the wrapper
                className={styles.formContainer}
              >
                <BookingDetailsForm onNext={handleNextStep} />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key={2}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className={styles.formContainer}
              >
                <VehicleSelection
                  onPrevious={handlePrevStep}
                  onSubmit={handleSubmit}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
