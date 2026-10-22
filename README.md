# Ayaan Tours website

Next.js 14 (pages router) + Tailwind CSS + Framer Motion + Lenis smooth scrolling.

## Run locally

```bash
npm install
npm run dev
```

## Where things live

- `data/` – content: multi-day tours (`tours.json`), day trips (`city.js`), destinations, reviews, about text
- `lib/content.js` – shapes the data for pages, plus **safari camping** (Yala, Kumana, Wilpattu), photo choices and gallery lists
- `lib/site.js` – phone, email, address, WhatsApp link, nav
- `pages/api/enquiry.js` – camping, tour, day-trip and contact enquiries (Resend email)
- `pages/api/resend.js` – transfer bookings (same URL as before)

## Environment variables (Vercel)

- `NEXT_PUBLIC_RESEND_API` (existing) or `RESEND_API_KEY` – Resend key for enquiry emails
- `NEXT_PUBLIC_GOOGLE_API` (optional) – enables Google Places suggestions in the transfer form
