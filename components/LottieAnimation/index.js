"use client";
// You will need to install this library: npm install lottie-react
import React from "react";
// Import the Lottie component and the useLottie hook
import Lottie, { useLottie } from "lottie-react";

// Define the configuration for the Lottie animation
// The component is designed to be very simple, but we use the hook
// to get access to the events/controls if needed.

export default function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  onComplete,
  style = {},
}) {
  // 1. Define the options that will be passed to the Lottie component
  const options = {
    animationData: animationData,
    loop: loop,
    autoplay: autoplay,
    // Note: lottie-react uses a simpler setup for basic use,
    // but for specific events like 'complete' for non-looping animations,
    // using the useLottie hook is the most robust way.
  };

  // 2. Use the useLottie hook to get control over the animation
  const { View, animationItem } = useLottie(options, style);

  // 3. Attach the onComplete listener once when the animationItem becomes available.
  //    Avoid removing it manually on unmount to prevent races with lottie-react's
  //    internal destroy(), which can null internal callback maps.
  const attachedRef = React.useRef(false);
  React.useEffect(() => {
    if (!attachedRef.current && animationItem && onComplete && !loop) {
      animationItem.addEventListener("complete", onComplete);
      attachedRef.current = true;
    }
  }, [animationItem, onComplete, loop]);

  // The 'View' returned by useLottie is the component that renders the animation
  return View;
}