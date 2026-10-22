const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\n/g, "<br/>");

/** Email to staff: a heading and a two-column table of the submitted fields. */
export function staffEmail(heading, rows) {
  const body = rows
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 14px 8px 0;color:#6B7C73;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 0;color:#14231C">${esc(v)}</td></tr>`
    )
    .join("");
  return `<div style="font-family:Arial,sans-serif;font-size:15px;max-width:560px">
<h2 style="color:#0F2E24;margin:0 0 16px">${esc(heading)}</h2>
<table style="border-collapse:collapse">${body}</table>
<p style="margin-top:20px;color:#6B7C73">Reply to this email to answer the guest directly.</p></div>`;
}

/** Confirmation to the guest. */
export function guestEmail(name, what) {
  return `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;max-width:560px;color:#14231C">
<p>Hi ${esc(name)},</p>
<p>Thanks for getting in touch about ${esc(what)}. We've received your details and will reply within a day, usually much sooner.</p>
<p>If it's urgent, message us on WhatsApp at <a href="https://wa.me/94773741989">+94 77 374 1989</a>.</p>
<p>Ayaan Tours, Kandy</p></div>`;
}

export const FROM = "Ayaan Tours <info@ayaantours.com>";
export const STAFF = ["ayaantourslk@gmail.com"];
export const resendKey = () => process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API;
