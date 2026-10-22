import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Logo from "./Logo";
import { NAV, SITE, whatsapp } from "../lib/site";
import { scrollToId } from "./SmoothScroll";
import { WhatsAppIcon } from "./Icons";

export default function Nav({ tone = "light" }) {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 420 && y > prev && !open);
  });

  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
  }, [open]);

  const onHashLink = (e, href) => {
    const [path, hash] = href.split("#");
    if (hash && (path || "/") === router.pathname) {
      e.preventDefault();
      setOpen(false);
      scrollToId(hash);
    }
  };

  const light = tone === "light" && !solid && !open;
  const isActive = (href) => href !== "/" && !href.includes("#") && router.asPath.startsWith(href);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ${
          open ? "text-mist" : light ? "text-white" : "text-ink"
        } ${solid && !open ? "bg-mist/85 shadow-[0_1px_0_rgba(20,35,28,0.08)] backdrop-blur-xl" : ""}`}
      >
        <div className="wrap flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label="Ayaan Tours home" className="relative z-10">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => onHashLink(e, item.href)}
                    className={`group relative rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-opacity hover:opacity-100 ${
                      isActive(item.href) ? "opacity-100" : "opacity-80"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-3.5 bottom-1 h-px origin-left bg-current transition-transform duration-500 ease-out ${
                        isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <a
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden items-center gap-2 rounded-full px-4 py-2.5 text-[0.95rem] font-semibold transition-colors sm:inline-flex ${
                light ? "bg-white/15 backdrop-blur hover:bg-white/25" : "bg-canopy text-mist hover:bg-canopy-600"
              } ${open ? "!bg-mist/10" : ""}`}
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              {SITE.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 place-items-center rounded-full xl:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className="relative block h-3 w-6">
                <span className={`absolute left-0 top-0 h-[2px] w-6 bg-current transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-[2px] w-6 bg-current transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 36px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-canopy pt-[96px] text-mist xl:hidden"
          >
            <nav aria-label="Mobile" className="wrap flex-1 overflow-y-auto">
              <ul>
                {[{ href: "/", label: "Home" }, ...NAV, { href: "/contact", label: "Contact" }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.045, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-mist/10"
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => onHashLink(e, item.href)}
                      className="block py-3 text-[2.1rem] font-semibold leading-tight tracking-[-0.03em] transition-colors hover:text-coconut"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="wrap flex flex-wrap gap-x-6 gap-y-2 py-8 text-mist/70">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
                WhatsApp {SITE.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
