// pages/api/email/resend.js
import { Resend } from "resend";
import generateBookingEmail from "../../api/emailTemplate";
import generateConfirmationEmail from "../../api/confirmationTemplate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = req.body;
  const { email, passengerName } = data;

  if (
    !data.passengerName ||
    !data.email ||
    !data.contactNumber ||
    !data.vehicleType ||
    !data.from ||
    !data.to
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API);

    await resend.emails.send({
      from: "info@ayaantours.com",
      to: ["ayaantourslk@gmail.com"],
      subject: `New Taxi Booking from ${passengerName}`,
      html: generateBookingEmail(data),
    });

    await resend.emails.send({
      from: "info@ayaantours.com",
      to: [email],
      subject: "We’ve received your booking request!",
      html: generateConfirmationEmail(passengerName),
    });

    return res.status(200).json({ message: "Emails sent!" });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Failed to send emails." });
  }
}
