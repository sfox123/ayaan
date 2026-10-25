import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import { ArrowIcon } from "../../components/Icons";
import { galleryPhotos, tripPhotoIds } from "../../lib/content";

const label = (src) =>
  src
    .split("/")
    .pop()
    .replace(/(_\d)?\.png$/i, "")
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace("Mirisa", "Mirissa")
    .replace("Hiri", "Hiriketiya")
    .replace("Trinco", "Trincomalee")
    .replace("Uda", "Udawalawe")
    .replace("Kithul", "Kitulgala")
    .replace("Una", "Unawatuna");

const local = galleryPhotos.map((src) => ({ src, alt: label(src), local: true }));
const remote = [...new Set(tripPhotoIds)].map((id) => ({ src: `https://lh3.googleusercontent.com/d/${id}=w1600`, alt: "Photo from an Ayaan Tours trip", local: false }));

function Tile({ p, i, onOpen, onFail }) {
  const tall = i % 5 === 1 || i % 5 === 3;
  return (
    <motion.button
      type="button"
      layoutId={`ph-${p.src}`}
      onClick={onOpen}
      className="group relative mb-4 block w-full overflow-hidden rounded-2xl bg-mist-300 text-left"
      style={{ aspectRatio: tall ? "3 / 4" : "4 / 3" }}
      aria-label={`Open photo: ${p.alt}`}
    >
      {p.local ? (
        <Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.src} alt={p.alt} loading="lazy" referrerPolicy="no-referrer" onError={onFail} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
      )}
      {p.local && (
        <span className="absolute bottom-3 left-3 rounded-full bg-canopy/70 px-3 py-1 text-sm font-medium text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          {p.alt}
        </span>
      )}
    </motion.button>
  );
}

export default function Gallery() {
  const [failed, setFailed] = useState(() => new Set());
  const photos = [...local, ...remote.filter((r) => !failed.has(r.src))];
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o + 1) % photos.length);
      if (e.key === "ArrowLeft") setOpen((o) => (o - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
    };
  }, [open, photos.length]);

  const current = open !== null ? photos[open] : null;

  return (
    <Layout title="Gallery" description="Photos from around Sri Lanka: Sigiriya, Ella, Yala, Kandy, the south coast and more." image="/images/pois/kalpitiya_1.png">
      <PageHero image="/images/pois/kalpitiya_1.png" alt="Outrigger sailing boat on the beach at Kalpitiya" kicker="Gallery" title={["The island,", "in pictures"]} />

      <section className="wrap py-20 sm:py-28">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {photos.map((p, i) => (
            <Tile key={p.src} p={p} i={i} onOpen={() => setOpen(i)} onFail={() => setFailed((f) => new Set(f).add(p.src))} />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-canopy/95 p-4 backdrop-blur sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
          >
            <motion.div layoutId={`ph-${current.src}`} className="relative h-full max-h-[82vh] w-full max-w-6xl overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}>
              {current.local ? (
                <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current.src} alt={current.alt} referrerPolicy="no-referrer" className="absolute inset-0 h-full w-full object-contain" />
              )}
            </motion.div>
            <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3 text-mist" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => setOpen((o) => (o - 1 + photos.length) % photos.length)} className="grid h-12 w-12 place-items-center rounded-full bg-mist/10 hover:bg-mist/20" aria-label="Previous photo">
                <ArrowIcon dir="left" />
              </button>
              <p className="min-w-[8rem] text-center text-sm">{current.local ? current.alt : `${open + 1} of ${photos.length}`}</p>
              <button type="button" onClick={() => setOpen((o) => (o + 1) % photos.length)} className="grid h-12 w-12 place-items-center rounded-full bg-mist/10 hover:bg-mist/20" aria-label="Next photo">
                <ArrowIcon />
              </button>
            </div>
            <button type="button" onClick={() => setOpen(null)} className="absolute right-4 top-4 rounded-full bg-mist/10 px-4 py-2 text-sm font-semibold text-mist hover:bg-mist/20">
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
