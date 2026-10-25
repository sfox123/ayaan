import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import EnquiryForm from "../../components/EnquiryForm";
import { SITE, whatsapp } from "../../lib/site";
import { WhatsAppIcon } from "../../components/Icons";

const Row = ({ label, children }) => (
  <div className="border-t border-ink/15 py-6">
    <p className="text-sm font-medium text-ink-400">{label}</p>
    <div className="mt-1 text-[1.35rem] font-semibold tracking-[-0.02em]">{children}</div>
  </div>
);

export default function Contact() {
  return (
    <Layout title="Contact" description="WhatsApp, call or email Ayaan Tours in Kandy, Sri Lanka." image="/images/pois/kandy_1.png">
      <PageHero image="/images/pois/hiri_1.png" alt="Aerial view of Hiriketiya bay" kicker="Contact" title={["Say hello"]} intro="WhatsApp is the fastest way to reach us. Email works too." />

      <section className="wrap grid gap-16 py-24 sm:py-32 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
        <div>
          <Row label="WhatsApp or call">
            <a href={whatsapp()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-coconut-600">
              <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />
              {SITE.phoneDisplay}
            </a>
          </Row>
          <Row label="Email">
            <a href={`mailto:${SITE.email}`} className="hover:text-coconut-600">
              {SITE.email}
            </a>
          </Row>
          <Row label="Office">
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`} target="_blank" rel="noopener noreferrer" className="hover:text-coconut-600">
              {SITE.address}
            </a>
          </Row>
          <Row label="Follow">
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-coconut-600">
              Facebook
            </a>
          </Row>
        </div>
        <div>
          <h2 className="text-big font-bold">Send a message</h2>
          <div className="mt-8">
            <EnquiryForm
              type="contact"
              context="General question"
              submitLabel="Send message"
              fields={[
                { name: "name", label: "Your name", required: true, half: true },
                { name: "email", label: "Email", type: "email", required: true, half: true },
                { name: "phone", label: "Phone / WhatsApp", type: "tel", half: true },
                { name: "subject", label: "Subject", half: true, placeholder: "Tour, transfer, camping…" },
                { name: "message", label: "Message", type: "textarea", required: true },
              ]}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
