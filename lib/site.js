export const SITE = {
  name: "Ayaan Tours",
  phoneDisplay: "+94 77 374 1989",
  phone: "94773741989",
  email: "info@ayaantours.com",
  address: "32c/2 New Mosque Road, Udathalawinna, Madige, Kandy",
  facebook: "https://www.facebook.com/profile.php?id=61570293444568&mibextid=JRoKGi",
  url: "https://ayaantours.com",
};

export const whatsapp = (text = "Hello, I would like to ask about a trip in Sri Lanka.") =>
  `https://wa.me/${SITE.phone}?text=${encodeURIComponent(text)}`;

export const NAV = [
  { href: "/tours", label: "Tours" },
  { href: "/camping", label: "Safari camping" },
  { href: "/destination", label: "Destinations" },
  { href: "/city-tours", label: "Day trips" },
  { href: "/#taxi-booking", label: "Transfers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];
