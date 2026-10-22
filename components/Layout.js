import Head from "next/head";
import { useRouter } from "next/router";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { SITE, whatsapp } from "../lib/site";
import { WhatsAppIcon } from "./Icons";

const DEFAULT_DESC =
  "Private Sri Lanka tours with a local driver-guide from Kandy: multi-day trips, day tours, safari camping in Yala, Kumana and Wilpattu, and airport transfers.";

export default function Layout({ title, description = DEFAULT_DESC, image = "/images/pois/sigiriya_1.png", navTone = "light", children }) {
  const router = useRouter();
  const full = title ? `${title} | Ayaan Tours Sri Lanka` : "Ayaan Tours | Private tours across Sri Lanka";
  const { scrollY } = useScroll();
  const [showFab, setShowFab] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShowFab(y > 600));

  return (
    <>
      <Head>
        <title>{full}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={full} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${SITE.url}${image}`} />
        <meta property="og:url" content={`${SITE.url}${router.asPath.split("#")[0]}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-coconut focus:px-4 focus:py-2 focus:text-canopy">
        Skip to content
      </a>
      <Nav tone={navTone} />
      <main id="main">{children}</main>
      <Footer />
      <motion.a
        href={whatsapp()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        initial={false}
        animate={{ scale: showFab ? 1 : 0, opacity: showFab ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(15,46,36,0.6)]"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </motion.a>
    </>
  );
}
