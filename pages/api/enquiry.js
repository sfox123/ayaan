import { Resend } from "resend";
import { staffEmail, guestEmail, FROM, STAFF, resendKey } from "../../lib/emails";

const LABELS = {
  name: "Name",
  email: "Email",
  phone: "Phone / WhatsApp",
  park: "Park",
  style: "Camp style",
  tour: "Tour",
  dates: "Dates",
  guests: "Guests",
  subject: "Subject",
  message: "Message",
};

const TITLES = { camping: "Safari camping enquiry", tour: "Tour enquiry", contact: "Contact form message", daytrip: "Day trip enquiry" };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST." });

  const { type = "contact", context = "", ...rest } = req.body || {};
  const name = String(rest.name || "").trim();
  const email = String(rest.email || "").trim();
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Name and a valid email are required." });
  }
  const key = resendKey();
  if (!key) return res.status(500).json({ error: "Email isn't configured on the server yet." });

  const rows = [["Enquiry about", context], ...Object.keys(LABELS).filter((k) => k in rest).map((k) => [LABELS[k], String(rest[k]).slice(0, 4000)])];
  const heading = `${TITLES[type] || "Website enquiry"} from ${name}`;

  try {
    const resend = new Resend(key);
    await resend.emails.send({ from: FROM, to: STAFF, replyTo: email, subject: heading, html: staffEmail(heading, rows) });
    await resend.emails.send({ from: FROM, to: [email], subject: "We've received your enquiry", html: guestEmail(name, context || "your trip") });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("enquiry email failed", err);
    return res.status(502).json({ error: "The enquiry didn't go through." });
  }
}
