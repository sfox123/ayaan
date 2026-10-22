import destinationsRaw from "../data/destination";
import citiesRaw from "../data/city";
import toursRaw from "../data/tours.json";
import reviewsRaw from "../data/reviews.json";

const P = (name) => `/images/pois/${name}.png`;

/* ---------- Destinations ---------- */

const DEST_MEDIA = {
  kandy: { hero: P("kandy_2"), alt: "Temple of the Tooth Relic lit up at dusk, Kandy", region: "Hill capital", blurb: "Lake, temples and the island's cultural heart." },
  sigiriya: { hero: P("sigiriya_1"), alt: "Sigiriya Rock rising above the forest", region: "Cultural Triangle", blurb: "A palace on a 200 m rock, with Pidurangala at sunrise." },
  ella: { hero: P("ella_1"), alt: "Blue train crossing the Nine Arches Bridge in Ella", region: "Hill country", blurb: "Tea slopes, the Nine Arches Bridge and easy hikes." },
  galle: { hero: P("una_1"), alt: "Palm-lined bay near Galle", region: "South coast", blurb: "A walled Dutch fort town with beaches either side." },
  polonnaruwa: { hero: P("polonnaruwa_1"), alt: "Seated Buddha among the ruins of Polonnaruwa", region: "Cultural Triangle", blurb: "Medieval royal capital, best seen by bicycle." },
  anuradhapura: { hero: P("anuradhapura_2"), alt: "White dagoba of Ruwanwelisaya, Anuradhapura", region: "North central", blurb: "Sri Lanka's first capital and its great dagobas." },
  colombo: { hero: P("colombo_1"), alt: "Colombo skyline at night", region: "West coast", blurb: "Markets, Galle Face Green and the island's best food." },
  jaffna: { hero: P("jaffna_1"), alt: "Nallur Kandaswamy Kovil, Jaffna", region: "Far north", blurb: "Tamil temples, islands and a cuisine of its own." },
};

const ORDER = ["kandy", "sigiriya", "ella", "galle", "polonnaruwa", "anuradhapura", "colombo", "jaffna"];

export const destinations = ORDER.map((slug) => {
  const d = destinationsRaw.find((x) => x.title.toLowerCase() === slug);
  return {
    slug,
    title: d.title,
    description: d.description,
    highlights: d.highlights,
    duration: d.duration,
    idealFor: d.idealFor,
    // file names on disk are capitalised except polonnaruwa (Vercel paths are case-sensitive)
    portrait: `/images/destination/${slug === "polonnaruwa" ? slug : d.title}.png`,
    ...DEST_MEDIA[slug],
  };
});

export const getDestination = (slug) => destinations.find((d) => d.slug === slug);

/* ---------- Multi-day tours ---------- */

const TOUR_META = {
  five: { key: "5-day", days: 5, featured: 0, image: P("ella_2"), alt: "Sunrise over the ridge at Ella", line: "A first look: the rock, the temple city, tea country and a safari." },
  seven: { key: "7-day", days: 7, featured: 2, image: P("mirisa_1"), alt: "Coconut palms on the beach at Mirissa", line: "Time to add the south coast or the ancient east." },
  nine: { key: "9-day", days: 9, featured: 3, image: P("dambulla_2"), alt: "Buddha statues inside the Dambulla cave temple", line: "A full circuit with slower days in Kandy and on the beach." },
  fourteen: { key: "14-day", days: 14, featured: 0, image: P("hiri_2"), alt: "Aerial view of a curved bay on the south coast", line: "The whole island, north to south, without rushing." },
};

const PLACES = [
  "Sigiriya", "Kandy", "Nuwara Eliya", "Ella", "Yala", "Udawalawe", "Mirissa", "Bentota", "Galle",
  "Polonnaruwa", "Anuradhapura", "Trincomalee", "Arugambay", "Matale", "Pinnawala", "Colombo",
];

export const routeOf = (pkg) => {
  const seen = [];
  pkg.days.forEach((d) =>
    PLACES.forEach((p) => {
      if (d.title.includes(p) && !seen.includes(p)) seen.push(p);
    })
  );
  return seen.map((p) => (p === "Arugambay" ? "Arugam Bay" : p));
};

export const tourSlugs = Object.keys(TOUR_META);

export const tourCategories = tourSlugs.map((slug) => {
  const m = TOUR_META[slug];
  const packages = toursRaw[m.key].map((p) => ({
    name: p.name.split(":")[0].trim(),
    subtitle: p.name.includes(":") ? p.name.split(":")[1].trim() : "",
    route: routeOf(p),
    days: p.days,
  }));
  return { slug, ...m, packages };
});

export const getTourCategory = (slug) => tourCategories.find((t) => t.slug === slug);

/* ---------- City & day trips ---------- */

const CITY_IMAGE = {
  kandy: [P("kandy_2"), P("kandy_1"), P("dambulla_1"), P("sigiriya_1"), P("uda_2"), P("kithul_1"), P("uda_1"), P("ella_2")],
};

export const cities = citiesRaw.map((c) => {
  const slug = c.title.toLowerCase();
  const dest = getDestination(slug);
  return {
    slug,
    title: c.title,
    intro: c.intro || dest?.description || "",
    image: dest?.hero,
    alt: dest?.alt,
    addOns: c.customizedOptions || [],
    options: c.options.map((o, i) => ({
      id: o.id,
      name: o.name,
      kind: o.type === "city" ? "City tour" : "Day tour",
      price: o.price,
      stops: o.itenary.map((s) => {
        const [head, ...rest] = s.split(":");
        return { title: head.trim(), detail: rest.join(":").trim() };
      }),
      image: CITY_IMAGE[slug]?.[i] || dest?.hero,
    })),
  };
});

export const getCityTour = (citySlug, id) => {
  const city = cities.find((c) => c.slug === citySlug);
  if (!city) return null;
  const option = city.options.find((o) => String(o.id) === String(id));
  return option ? { city, option } : null;
};

/* ---------- Safari camping ---------- */

export const camping = [
  {
    slug: "yala",
    name: "Yala",
    title: "Leopards and red-earth tracks",
    where: "South-east coast, near Tissamaharama",
    fromKandy: "About 6 hours by road from Kandy, 2 from Ella",
    image: P("yala_2"),
    alt: "Elephant mother and calf in Yala",
    image2: P("yala_1"),
    alt2: "Safari jeep and elephant on a dirt track in Yala",
    intro:
      "Yala is Sri Lanka's best-known park and one of the best places anywhere to see a wild leopard. Scrub jungle, rock outcrops and lagoons run down to the sea, and the dirt tracks turn deep red after rain. Camping on the park boundary means you're at the gate before the first jeeps and back by a fire after the evening drive.",
    wildlife: ["Leopard", "Asian elephant", "Sloth bear", "Mugger crocodile", "Spotted deer", "Painted stork"],
    bestTime:
      "February to July is the most reliable stretch. The main block usually closes for a few weeks around September and October; during that window we take you to a quieter block of Yala or on to Kumana.",
    plan: [
      { day: "Day 1", title: "Into the bush", text: "Drive down from the hills, settle into camp by early afternoon, then head out on your first game drive until the park closes at dusk. Dinner by the fire." },
      { day: "Day 2", title: "Dawn and dusk drives", text: "Gate at first light, breakfast packed for the jeep. Rest at camp through the heat of the day, then a second drive in the late afternoon when the leopards move." },
      { day: "Day 3", title: "Coast or onward", text: "An optional short morning drive or a walk at Kirinda's rock temple and beach before we drive you to your next stop." },
    ],
  },
  {
    slug: "kumana",
    name: "Kumana",
    title: "Lagoons, birds and almost no jeeps",
    where: "East coast, south of Arugam Bay",
    fromKandy: "About 6 hours from Kandy, 1 hour from Arugam Bay",
    image: P("uda_1"),
    alt: "Elephants grazing at sunset in the south-east dry zone",
    image2: P("arugambay_1"),
    alt2: "Lagoon and coast near Arugam Bay",
    intro:
      "Kumana shares Yala's wilderness on its eastern side but sees a fraction of the visitors. Its mangrove swamp, the Kumana Villu, fills with nesting herons, spoonbills and storks, and the coastal tracks pass empty beaches where elephants cross to water. It pairs naturally with a few days in Arugam Bay.",
    wildlife: ["Painted stork", "Spoonbill", "Black-necked stork", "Asian elephant", "Leopard", "Golden jackal"],
    bestTime:
      "April to July for the bird nesting season, which is the main reason to come. The east coast is also at its driest and calmest through these months.",
    plan: [
      { day: "Day 1", title: "Arugam Bay to the wild", text: "Pick-up from Kandy, Ella or Arugam Bay, past Panama's lagoons to camp. Late afternoon drive to the Okanda side of the park." },
      { day: "Day 2", title: "The villu at dawn", text: "Early drive to the Kumana Villu for nesting birds, breakfast in the park, and a slow afternoon along the coastal tracks." },
      { day: "Day 3", title: "Surf or onward", text: "Back to Arugam Bay for the waves, or onward to Ella, Yala or the airport." },
    ],
  },
  {
    slug: "wilpattu",
    name: "Wilpattu",
    title: "Lakes in the forest",
    where: "North-west, between Puttalam and Anuradhapura",
    fromKandy: "About 4 hours from Kandy, 1 hour from Anuradhapura",
    image: P("wilpattu_2"),
    alt: "Leopard resting on a log in Wilpattu",
    image2: P("wilpattu_1"),
    alt2: "Wildlife of Wilpattu National Park",
    intro:
      "Wilpattu is Sri Lanka's largest national park: dense forest broken by dozens of natural lakes, the villus, where animals come to drink. Sightings take more patience than in Yala, but you'll often have a leopard or a sloth bear to yourself. It sits close to Anuradhapura, so it slots easily into a cultural tour.",
    wildlife: ["Leopard", "Sloth bear", "Asian elephant", "Water buffalo", "Sambar deer", "Crested serpent eagle"],
    bestTime:
      "Open all year. February to October is driest, when animals gather at the villus and are easiest to find.",
    plan: [
      { day: "Day 1", title: "Forest edge", text: "Drive from Kandy or Anuradhapura to camp at the park's edge and head straight out for an afternoon drive among the villus." },
      { day: "Day 2", title: "A full day inside", text: "With a full-day permit you stay inside from dawn to dusk, picnic by a lake and cover the quieter western tracks." },
      { day: "Day 3", title: "Ruins or the sea", text: "On to Anuradhapura's ancient city, or west to Kalpitiya for dolphins and the lagoon." },
    ],
  },
];

export const campStyles = [
  { name: "Tented camp", text: "Proper beds, an en-suite bush shower, cooked meals and a fire at night, on private land at the park boundary." },
  { name: "Park campsite", text: "Simple tents at a campsite inside the park, run by the Department of Wildlife Conservation. Limited spots, so book early." },
];

export const campIncludes = [
  "Pick-up and drop-off in our own vehicle",
  "Your camp, with meals",
  "Game drives in a safari jeep with a tracker",
  "Park permits arranged for you",
];

export const getPark = (slug) => camping.find((c) => c.slug === slug);

/* ---------- Reviews ---------- */

export const reviews = reviewsRaw;

/* ---------- Gallery ---------- */

export const galleryPhotos = [
  "sigiriya_1", "ella_1", "yala_2", "kandy_2", "mirisa_1", "polonnaruwa_1", "kalpitiya_1", "jaffna_1",
  "anuradhapura_2", "ella_2", "hiri_2", "dambulla_2", "kithul_1", "wilpattu_2", "trinco_2", "galle", "uda_2",
  "kalpitiya_2", "tangalle_2", "colombo_1", "kosgoda_2", "weligama_1", "dambulla_1", "yala_1",
].map((n) => (n === "galle" ? "/images/destination/Galle.png" : P(n)));

/** Guests' trip photos, hosted on the company Google Drive (kept from the previous gallery). */
export const tripPhotoIds = [
  "12_EcDhon6QyWYTqqBBunNqfQqJ_qNzqX",
  "1HjKnKlMtlcVKDDcGmRWQvedREDPokR-e",
  "1Os_TrSXO2Orir1UioXXntjq8eIr9NV0M",
  "1XJbeYJekoiLDYI3xTZsXfjxQ2gAtia8g",
  "12aNukvOxhUjzkDST5nNpN83RHXtZxFlB",
  "19vOdIGh2XWX1noPfnl14Z2BQPa54IdF9",
  "1dYrQBovUGEoxCdwmZb3F7fngeiU2DGFC",
  "15pSRjcTiiB_VOLXQl1nkZeBrNxamsCR_",
  "1GzAOAZzABH98e4ADcfBCDiIbY2Ec0Crl",
  "17mjPoj6_1xZoeNjcH8IjeQNQsGBoi9F6",
  "1odbjNY9Humj-WlVhVkmv50ujr-oenklC",
  "1Dks-WR6lWlQU8IITnf6aJ__pAV2QvK-L",
  "1aDP3VBiJHLrgsYOnwTfEPBGgDxeyZ08t",
  "1RH2zeBNguMPSDpmb3stgavzvGQVkRCZG",
  "1ei_Vtc3lPX7o77DWkKAxnPSTG3Nkl5aZ",
  "1kxHZOntlEaTALrF7RBgL2CfM0H05ZCEN",
  "1TVw19XcwXpg8gGmNwFiSRBD8jzCBOEhi",
  "1XJOQPNZrZch0HleB3Pm6cztfeF1NNEMV",
  "1TExA9SpUfHx40lzApvANlVVq4tEQG0Mm",
  "1kxHZOntlEaTALrF7RBgL2CfM0H05ZCEN",
  "12gnFDcymiW1SeH3gIM2LIbD91ncu1yGH",
  "1m2XLNo2xNVlVa3GwJ4ivGq8ihxoGW7ZV",
  "1C9UlTbRCzLAOP4rS60u9qVeWtN7xXQE5",
  "1r9KvbCsd1NLCpE8_BCBtSomGSA9mwnxT",
  "15GsqP1_jRFZ-Zj4ELmb4mHsdkmqChbz5",
  "1xaP_bvoLOIA_iVdEFnH-CAK8tjMjIPzj",
  "1ZLU348HGJlSffKDezr1XY-jFdRyGX3fF",
  "1DmhT3yC_gKxxqKpGwSWohMNATWYQObAa",
  "1vCmQ_2VyhKXL7OhxeW4LmBkID1e58bNG",
  "1NW4ZhvOb1tnjgnMQUKOvDIugG_jwvCUn",
  "1ehw6QUWGW6dt0VjprTV2uNHL973On8nP",
  "1l5nKmKUawfWISS7Vc89-pciEQVGapaGA",
  "1cLHy-GYfxRkdBccL2QmQ2wSrT5XYMroi",
  "1VftrHhBPDk79P7ULwjL-__02GjAdpaFE",
  "1dDru-SiaSPkKUyVNKctBYCpG39rz-kQA",
  "10KvPr_LdaEA1SgcHZpDnA0LeJSnHVShR",
  "1gXiUzdwopKbcXza-XqkhwzhnvdPiW6PQ",
  "1v3__iMcOhsfu30io3MkPaDjckdL7uKZQ",
  "1msY_7q1VNJFjwlEmOKFtoAywe-r9vWDi",
  "1W2F6C_imiooz0rHRbSDBL-zfRaojg1ye"
];
