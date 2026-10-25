import Link from "next/link";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";

export default function NotFound() {
  return (
    <Layout title="Page not found">
      <PageHero image="/images/pois/ratnapura_2.png" alt="Rough gemstones from Ratnapura" kicker="Page not found" title={["This road doesn't", "go anywhere"]} intro="The page may have moved when we rebuilt the site. Try one of these instead.">
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">Go to the home page</Link>
          <Link href="/tours" className="btn-ghost">Browse tours</Link>
          <Link href="/camping" className="btn-ghost">Safari camping</Link>
        </div>
      </PageHero>
    </Layout>
  );
}
