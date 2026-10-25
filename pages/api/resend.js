// Taxi / transfer booking. Kept at the original URL.
import { Resend } from "resend";
import { staffEmail, guestEmail, FROM, STAFF, resendKey } from "../../lib/emails";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST." });

  const d = req.body || {};
  const required = ["passengerName", "email", "contactNumber", "vehicleType", "from", "to"];
  if (required.some((k) => !String(d[k] || "").trim())) {
    return res.status(400).json({ error: "Fill in every field to book a transfer." });
  }
  const key = resendKey();
  if (!key) return res.status(500).json({ error: "Email isn't configured on the server yet." });

  const heading = `Transfer booking from ${d.passengerName}`;
  try {
    const resend = new Resend(key);
    await resend.emails.send({
      from: FROM,
      to: STAFF,
      replyTo: d.email,
      subject: heading,
      html: staffEmail(heading, [
        ["Name", d.passengerName],
        ["Email", d.email],
        ["Phone", d.contactNumber],
        ["Vehicle", d.vehicleType],
        ["Passengers", d.passengers],
        ["Date", d.date],
        ["Time", d.time],
        ["From", d.from],
        ["To", d.to],
        ["Notes", d.notes],
      ]),
    });
    await resend.emails.send({ from: FROM, to: [d.email], subject: "We've received your transfer request", html: guestEmail(d.passengerName, "your transfer") });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("transfer email failed", err);
    return res.status(502).json({ error: "The booking didn't go through." });
  }
}
