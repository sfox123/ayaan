import Link from "next/link";
import Logo from "./Logo";
import { SITE, whatsapp } from "../lib/site";
import { destinations, tourCategories, camping } from "../lib/content";

const Col = ({ title, children }) => (
  <div>
    <h3 className="mb-4 text-[0.95rem] font-medium text-mist/50">{title}</h3>
    <ul className="space-y-2.5 text-[1rem]">{children}</ul>
  </div>
);

const FLink = ({ href, children }) => (
  <li>
    <Link href={href} className="text-mist/85 transition-colors hover:text-coconut">
      {children}
    </Link>
  </li>
);

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-canopy text-mist">
      <div className="wrap pt-24">
        <div className="grid gap-12 border-b border-mist/10 pb-16 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo variant="stacked" />
            <p className="mt-6 font-serif text-[1.15rem] leading-relaxed text-mist/75">
              Private tours, safari camping and airport transfers across Sri Lanka, run from Kandy since 2022.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsapp()} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Message us on WhatsApp
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <Col title="Tours">
              {tourCategories.map((t) => (
                <FLink key={t.slug} href={`/tours/${t.slug}`}>
                  {t.days} days
                </FLink>
              ))}
              <FLink href="/city-tours">Day trips</FLink>
            </Col>
            <Col title="Safari camping">
              {camping.map((c) => (
                <FLink key={c.slug} href={`/camping/${c.slug}`}>
                  {c.name}
                </FLink>
              ))}
            </Col>
            <Col title="Destinations">
              {destinations.slice(0, 6).map((d) => (
                <FLink key={d.slug} href={`/destination/${d.slug}`}>
                  {d.title}
                </FLink>
              ))}
            </Col>
            <Col title="Contact">
              <li className="text-mist/85">{SITE.address}</li>
              <li>
                <a href={`tel:+${SITE.phone}`} className="text-mist/85 hover:text-coconut">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="text-mist/85 hover:text-coconut">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="text-mist/85 hover:text-coconut">
                  Facebook
                </a>
              </li>
            </Col>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 py-6 text-sm text-mist/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Ayaan Tours Sri Lanka</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-mist">About</Link>
            <Link href="/contact" className="hover:text-mist">Contact</Link>
            <Link href="/gallery" className="hover:text-mist">Gallery</Link>
          </div>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap px-4 text-center text-[24vw] font-extrabold leading-[0.72] tracking-[-0.06em] text-mist/[0.06]"
      >
        ayaan
      </p>
    </footer>
  );
}
