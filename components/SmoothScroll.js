import { useEffect } from "react";
import Lenis from "lenis";

/** Lenis smooth scrolling. Exposes the instance on window.__lenis so links can scroll to anchors. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;
    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
  return null;
}

export function scrollToId(id, { immediate = false } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80, immediate });
  else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  return true;
}

export function scrollToTop() {
  if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
  window.scrollTo(0, 0);
}
