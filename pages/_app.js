import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import SmoothScroll, { scrollToId, scrollToTop } from "../components/SmoothScroll";
import Logo from "../components/Logo";

const ease = [0.76, 0, 0.24, 1];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const key = router.asPath.split("#")[0].split("?")[0];

  const afterExit = () => {
    const hash = window.location.hash.slice(1);
    scrollToTop();
    if (hash) setTimeout(() => scrollToId(hash, { immediate: true }), 50);
  };

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <AnimatePresence mode="wait" initial={false} onExitComplete={afterExit}>
        <motion.div key={key}>
          {/* curtain rises over the old page */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[90] origin-bottom bg-canopy"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.55, ease }}
          />
          {/* and lifts off the new one */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[90] grid origin-top place-items-center bg-canopy text-mist"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.65, ease, delay: 0.1 }}
          >
            <motion.span initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <Logo />
            </motion.span>
          </motion.div>
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
