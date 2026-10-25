import EnquiryForm from "./EnquiryForm";
import { RevealTitle } from "./Reveal";
import { camping, campStyles } from "../lib/content";

const NOT_SURE = "Not sure yet, help me choose";

export default function CampingEnquiry({ park }) {
  const parkOptions = park ? [park.name, ...camping.filter((c) => c.slug !== park.slug).map((c) => c.name), NOT_SURE] : [NOT_SURE, ...camping.map((c) => c.name)];
  return (
    <section id="enquire" className="scroll-mt-16 bg-canopy py-24 text-mist sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-[0.95rem] font-medium text-coconut">Book a camp</p>
          <RevealTitle lines={park ? [`Ask about ${park.name}`] : ["Ask about a camp"]} className="mt-3 text-big font-bold" />
          <p className="mt-6 max-w-md font-serif text-[1.2rem] leading-relaxed text-mist/75">
            Tell us roughly when you're travelling and how many of you there are. We'll check camp and jeep availability, then send a full price with transport from wherever you're staying.
          </p>
          <p className="mt-6 max-w-md text-[0.98rem] text-mist/60">
            Camping can be added to any of our round-island tours, usually in place of a night in a hotel near the park.
          </p>
        </div>
        <EnquiryForm
          type="camping"
          tone="dark"
          context={park ? `Safari camping in ${park.name}` : "Safari camping"}
          submitLabel="Send camping enquiry"
          fields={[
            { name: "park", label: "Park", type: "select", options: parkOptions, half: true },
            { name: "style", label: "Camp style", type: "select", options: [...campStyles.map((s) => s.name), "Either"], half: true },
            { name: "dates", label: "Rough dates", placeholder: "e.g. 3 to 6 March", half: true },
            { name: "guests", label: "Guests", type: "number", half: true, required: true },
            { name: "name", label: "Your name", required: true },
            { name: "email", label: "Email", type: "email", required: true, half: true },
            { name: "phone", label: "Phone / WhatsApp", type: "tel", half: true },
            { name: "message", label: "Anything else", type: "textarea", placeholder: "Ages of children, where you're coming from, what you'd most like to see" },
          ]}
        />
      </div>
    </section>
  );
}
