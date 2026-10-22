// Legacy contact endpoint, kept so old links/forms still work. New forms post to /api/enquiry.
import enquiry from "./enquiry";

export default function handler(req, res) {
  const b = req.body || {};
  req.body = {
    type: "contact",
    context: b.subject || "General question",
    name: [b.name, b.lastname].filter(Boolean).join(" "),
    email: b.email,
    message: b.message,
  };
  return enquiry(req, res);
}
