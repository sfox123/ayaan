import { Resend } from "resend";
import generateBookingEmail from "../../api/generateBookingEmail";
import generateConfirmationEmail from "../../api/confirmationTemplate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = req.body;
  const { name, email, subject, lastname, message } = data;

  // Validate required fields
  if (!name || !email || !subject || !lastname || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API);

    // Send email to staff
    await resend.emails.send({
      from: "info@ayaantours.com",
      to: ["ayaantourslk@gmail.com"], // Replace with your staff email
      subject: `New Contact Form Submission from ${name} ${lastname}`,
      html: generateBookingEmail(data),
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: "info@ayaantours.com",
      to: [email],
      subject: "We’ve received your message!",
      html: generateConfirmationEmail(name),
    });

    return res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Failed to send emails." });
  }
}
