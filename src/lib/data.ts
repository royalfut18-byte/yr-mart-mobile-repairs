export const business = {
  name: "YR MART MOBILE REPAIRS",
  shortName: "YR MART",
  owner: "Yusuf",
  tagline: "Neutral Bay's phone repair shop",
  addressLine: "Shop 20/166-174 Military Rd",
  suburb: "Neutral Bay",
  state: "NSW",
  postcode: "2089",
  country: "Australia",
  fullAddress: "Shop 20/166-174 Military Rd, Neutral Bay NSW 2089",
  phoneDisplay: "0410 485 059",
  phoneHref: "tel:+61410485059",
  smsHref: "sms:+61410485059",
  rating: 4.6,
  reviewCount: 72,
  geo: { lat: -33.8318, lng: 151.2192 },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=YR+MART+MOBILE+REPAIRS+166-174+Military+Rd+Neutral+Bay+NSW+2089",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Shop%2020%2F166-174%20Military%20Rd%2C%20Neutral%20Bay%20NSW%202089&z=16&output=embed",
  siteUrl: "https://yrmartmobilerepairs.com.au",
} as const;

/** 0 = Sunday ... 6 = Saturday. Times are local Sydney time, 24h. */
export const hours: { day: string; short: string; open: number; close: number }[] = [
  { day: "Sunday", short: "Sun", open: 10, close: 18 },
  { day: "Monday", short: "Mon", open: 10, close: 18 },
  { day: "Tuesday", short: "Tue", open: 10, close: 17 },
  { day: "Wednesday", short: "Wed", open: 10, close: 18 },
  { day: "Thursday", short: "Thu", open: 10, close: 18 },
  { day: "Friday", short: "Fri", open: 10, close: 18 },
  { day: "Saturday", short: "Sat", open: 10, close: 18 },
];

export type IconName =
  | "screen"
  | "battery"
  | "glass"
  | "port"
  | "camera"
  | "water"
  | "tablet"
  | "shield"
  | "sim"
  | "data";

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  turnaround: string;
  icon: IconName;
  highlights: string[];
};

export const services: Service[] = [
  {
    slug: "screen-replacement",
    title: "Screen replacement",
    blurb:
      "Cracked, black, ghost-touching or lagging? Most iPhone and Samsung screens are swapped while you wait at the counter.",
    turnaround: "From 20 min",
    icon: "screen",
    highlights: ["iPhone & Samsung", "Walk-in, no booking", "Done while you wait"],
  },
  {
    slug: "battery-replacement",
    title: "Battery replacement",
    blurb:
      "Phone dying by lunchtime or shutting down in the cold? A fresh battery makes an older handset feel brand new again.",
    turnaround: "From 30 min",
    icon: "battery",
    highlights: ["Health back to 100%", "All major models", "Swollen batteries handled safely"],
  },
  {
    slug: "back-glass",
    title: "Back glass & housing",
    blurb:
      "Shattered rear glass repaired so your phone is safe to hold and ready to trade in, sell or hand down.",
    turnaround: "Same day",
    icon: "glass",
    highlights: ["Rear glass", "Frame & housing", "Camera lens glass"],
  },
  {
    slug: "charging-port",
    title: "Charging & audio ports",
    blurb:
      "Cable falling out, charging only at one angle, or no sound on calls? Ports get cleaned or replaced properly.",
    turnaround: "From 30 min",
    icon: "port",
    highlights: ["Lightning & USB-C", "Earpiece & speaker", "Free port clean-out"],
  },
  {
    slug: "camera-repair",
    title: "Camera & flash",
    blurb:
      "Blurry, black or shaking cameras and dead torches fixed - front and rear modules replaced in store.",
    turnaround: "From 30 min",
    icon: "camera",
    highlights: ["Front & rear modules", "Flash / torch", "Lens glass only options"],
  },
  {
    slug: "water-damage",
    title: "Water damage rescue",
    blurb:
      "Dropped it in the sink or caught in the rain? Bring it in switched off and we will clean the board and assess it fast.",
    turnaround: "Assessed same day",
    icon: "water",
    highlights: ["Board clean", "Honest assessment first", "Told straight if it cannot be saved"],
  },
  {
    slug: "tablet-repair",
    title: "iPad & tablet repair",
    blurb:
      "Screens, batteries and charging ports for iPads and Samsung tablets, plus cases and glass to keep them safe.",
    turnaround: "1-2 days",
    icon: "tablet",
    highlights: ["iPad & Galaxy Tab", "Screens & batteries", "Cases fitted in store"],
  },
  {
    slug: "screen-protectors",
    title: "Screen protectors, fitted",
    blurb:
      "Tempered glass and privacy protectors applied on the spot - cleaned, aligned and checked for bubbles before you leave.",
    turnaround: "5 min",
    icon: "shield",
    highlights: ["Fitted while you wait", "Privacy & matte options", "Checked bubble-free"],
  },
  {
    slug: "sim-prepaid",
    title: "Prepaid SIM & recharge",
    blurb:
      "Telstra prepaid SIMs, recharges and data packs, plus help getting your new SIM activated before you walk out.",
    turnaround: "Walk-in",
    icon: "sim",
    highlights: ["Telstra prepaid", "Recharge in store", "Activation help"],
  },
  {
    slug: "setup-transfer",
    title: "Setup & data transfer",
    blurb:
      "New phone? We will move your photos, contacts and apps across and show you how everything works before you go.",
    turnaround: "Walk-in",
    icon: "data",
    highlights: ["Photos & contacts", "Backups", "Plain-English help"],
  },
];

export type Review = {
  name: string;
  meta: string;
  when: string;
  text: string;
  rating: number;
};

/** Excerpts from the shop's public Google reviews. */
export const reviews: Review[] = [
  {
    name: "vicky",
    meta: "Local Guide · 14 reviews",
    when: "9 months ago",
    rating: 5,
    text: "Yusuf gives an amazing customer service. I have been in the shop for many issues. He always fixed it at such a reasonable price. I bought a new battery for my iPhone. Such a good price and my phone is like new.",
  },
  {
    name: "Cortney Moore",
    meta: "7 reviews",
    when: "3 months ago",
    rating: 5,
    text: "My friend had smashed her phone and he waited until 6:00pm for us to finish work and get home from the city, gave us an amazing deal and fixed it so quickly. Highly recommend his service.",
  },
  {
    name: "cameron bonds",
    meta: "12 reviews",
    when: "6 months ago",
    rating: 5,
    text: "Yusuf fixed my phone and threw in a free case. His work was flawless and he even replaced the back glass. The work was exceptional.",
  },
  {
    name: "J Nweke",
    meta: "6 reviews",
    when: "1 week ago",
    rating: 5,
    text: "Had my phone fixed in 20 minutes and gave me a free charger with repair. Nice guy and good service.",
  },
  {
    name: "Will",
    meta: "1 review",
    when: "4 weeks ago",
    rating: 5,
    text: "Had a great experience at this phone shop! Yousef was really friendly, helpful, and professional. I got a screen protector replacement and a brand-new phone case at a really great price.",
  },
  {
    name: "Kyle Farah",
    meta: "5 reviews",
    when: "2 weeks ago",
    rating: 5,
    text: "Repaired my screen and gave me a new phone case at a great price. Great guy, and beautiful job on the new screen.",
  },
  {
    name: "Kirsten Atkins",
    meta: "Local Guide · 16 reviews",
    when: "5 months ago",
    rating: 5,
    text: "Very helpful and obliging. No appointment. Spent time fixing my remote. Convenient and open after hours.",
  },
  {
    name: "Ryan Forsyth",
    meta: "9 reviews",
    when: "3 years ago",
    rating: 5,
    text: "It was a Sunday and the store was open. Yousef replaced my screen while I waited, which only took 20 mins. Very good price and very fast & friendly service.",
  },
  {
    name: "Stephen Berry",
    meta: "Local Guide · 76 reviews",
    when: "1 year ago",
    rating: 5,
    text: "Yusuf is a fantastic guy. Very personal service. If he does not have the item in stock it is there in 48 hours. Highly recommended.",
  },
  {
    name: "Sam Widmer",
    meta: "10 reviews",
    when: "5 years ago",
    rating: 5,
    text: "Got 2 phones fixed on the spot. Only needed the plastic cover and not the glass screen it turned out. Charge was cheap and he didn't try to sell me the more expensive option.",
  },
  {
    name: "Francesca Evans",
    meta: "16 reviews",
    when: "5 months ago",
    rating: 5,
    text: "Genuine knowledgeable service. I always go there to support Yusuf whenever there's a problem with anything. No problem is too small for him to fix.",
  },
  {
    name: "Gus Mackinnon",
    meta: "1 review",
    when: "8 months ago",
    rating: 5,
    text: "5 star experience. Phone screen was repaired perfectly in a very short time for a very affordable price.",
  },
  {
    name: "Milroy Berenger",
    meta: "Local Guide · 25 reviews",
    when: "2 years ago",
    rating: 5,
    text: "Yusuf, a very knowledgeable technician, kind & pleasant to deal with. His prices are very reasonable and his service is quick.",
  },
  {
    name: "Sonia Forato",
    meta: "18 reviews",
    when: "4 months ago",
    rating: 5,
    text: "Yusuf saved my phone. Thanks so much for your care and for doing an amazing repair on my phone. I am a very grateful customer.",
  },
  {
    name: "Helen Wu",
    meta: "Local Guide · 20 reviews",
    when: "5 years ago",
    rating: 5,
    text: "Bought the wrong phone protector and went back in to get it exchanged - Yusuf was incredibly helpful and proactively volunteered to put the new one on for me! Stellar customer service and great pricing.",
  },
  {
    name: "Arz Eats",
    meta: "Local Guide · 203 reviews",
    when: "2 years ago",
    rating: 5,
    text: "Excellent service and good prices. The owner is very friendly and gave me a discount which I appreciated. It's nice to find honest hard working people who will look after you.",
  },
];

export type Product = {
  name: string;
  category: string;
  blurb: string;
  image: string;
  accent: string;
};

export const products: Product[] = [
  {
    name: "MagSafe rugged armor",
    category: "Cases",
    blurb: "Drop-tested to 3 metres with a rotating ring kickstand and full MagSafe pull.",
    image: "/images/case-rugged-armor.webp",
    accent: "from-sky-500/40 to-blue-700/10",
  },
  {
    name: "Luxury MagSafe glitter",
    category: "Cases",
    blurb: "Electroplated edges, camera lens rings and a shimmer back, in six finishes.",
    image: "/images/case-luxury-magsafe.webp",
    accent: "from-fuchsia-500/40 to-violet-700/10",
  },
  {
    name: "Hanman leather wallet",
    category: "Wallet cases",
    blurb: "Detachable magnetic wallet with card slots that still charges on MagSafe.",
    image: "/images/case-hanman-wallet.webp",
    accent: "from-amber-500/40 to-rose-700/10",
  },
  {
    name: "Heavy duty Drop Plus",
    category: "Cases",
    blurb: "Military-grade multilayer defence for tradies, kids and butterfingers alike.",
    image: "/images/case-drop-plus.webp",
    accent: "from-red-500/40 to-orange-700/10",
  },
  {
    name: "Anti-fall gemshell",
    category: "Cases",
    blurb: "Crystal-clear shock absorption that still shows off the phone you paid for.",
    image: "/images/case-gemshell.webp",
    accent: "from-cyan-400/40 to-teal-700/10",
  },
  {
    name: "Designer print series",
    category: "Cases",
    blurb: "Twelve seasonal prints - florals, festive, character art and more in store.",
    image: "/images/case-prints.webp",
    accent: "from-pink-500/40 to-purple-700/10",
  },
  {
    name: "360 rotating iPad folio",
    category: "Tablets",
    blurb: "Spin-to-stand leather folio in seven colours, with glass and stylus bundles.",
    image: "/images/ipad-folio.webp",
    accent: "from-red-500/40 to-rose-700/10",
  },
  {
    name: "iPad folio, glass & stylus",
    category: "Tablets",
    blurb: "Case, tempered glass and a stylus in one bundle, fitted before you leave.",
    image: "/images/ipad-bundle.webp",
    accent: "from-emerald-400/40 to-sky-700/10",
  },
];

export const faqs = [
  {
    q: "Do I need to book an appointment?",
    a: "No. YR MART is a walk-in shop - come in any time during opening hours and Yusuf will look at your device on the spot. Most screen and battery jobs are finished while you wait.",
  },
  {
    q: "How long does a screen replacement take?",
    a: "Most iPhone and Samsung screens take about 20-30 minutes at the counter. If a part has to be ordered in it is usually here within 48 hours, and you get a call the moment it lands.",
  },
  {
    q: "What does a repair cost?",
    a: "It depends on your exact model and which screen grade you choose. Call 0410 485 059 with your model and you will get a straight answer before anything is opened - no surprise charges at pickup.",
  },
  {
    q: "Will I lose my photos and data?",
    a: "Screen, battery, port and camera repairs do not touch your storage, so your data stays exactly where it is. A quick backup before any repair is still a good idea, and we are happy to help you set one up.",
  },
  {
    q: "Do you repair anything other than phones?",
    a: "Yes - iPads and tablets, and we will happily take a look at accessories and small gear like remotes and chargers. If something is beyond saving you get told straight rather than charged to find out.",
  },
  {
    q: "Where exactly are you?",
    a: "Shop 20, 166-174 Military Road, Neutral Bay - on the main strip, right next to the Neutral Bay bus stop. Look for the yellow, red and blue YR MART sign.",
  },
  {
    q: "Do you sell cases and accessories too?",
    a: "The whole shop is lined with them: MagSafe cases, wallet folios, iPad covers, tempered glass, chargers, cables, power banks, headphones, car holders, ring lights and Telstra prepaid SIMs.",
  },
];
