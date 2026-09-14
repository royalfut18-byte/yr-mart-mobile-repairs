import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { business } from "@/lib/data";
import { schemaHours } from "@/lib/hours";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const title = "Phone Repairs Neutral Bay | YR MART Mobile Repairs";
const description =
  "Walk-in phone and tablet repairs on Military Rd, Neutral Bay. Cracked screens, batteries, back glass and charging ports fixed in about 20 minutes. Open 7 days. Call 0410 485 059.";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: title,
    template: `%s | ${business.shortName}`,
  },
  description,
  keywords: [
    "phone repair Neutral Bay",
    "iPhone screen repair Neutral Bay",
    "mobile phone repair Military Road",
    "Samsung screen replacement North Sydney",
    "battery replacement Mosman",
    "iPad repair Neutral Bay",
    "phone cases Neutral Bay",
    "YR MART Mobile Repairs",
  ],
  applicationName: business.name,
  authors: [{ name: business.name }],
  creator: business.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: business.siteUrl,
    siteName: business.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Mobile phone repair shop",
};

export const viewport: Viewport = {
  themeColor: "#f2f1ec",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** LocalBusiness markup so the shop can win the Neutral Bay map pack. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MobilePhoneStore",
  "@id": `${business.siteUrl}/#shop`,
  name: business.name,
  description,
  url: business.siteUrl,
  telephone: "+61410485059",
  priceRange: "$$",
  image: `${business.siteUrl}/images/storefront.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.addressLine,
    addressLocality: business.suburb,
    addressRegion: business.state,
    postalCode: business.postcode,
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.geo.lat,
    longitude: business.geo.lng,
  },
  hasMap: business.mapsUrl,
  openingHours: schemaHours(),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: business.rating,
    reviewCount: business.reviewCount,
    bestRating: 5,
    worstRating: 1,
  },
  areaServed: [
    "Neutral Bay",
    "Cremorne",
    "Mosman",
    "Cammeray",
    "North Sydney",
    "Kirribilli",
    "Crows Nest",
  ].map((name) => ({ "@type": "City", name })),
  makesOffer: [
    "Phone screen replacement",
    "Battery replacement",
    "Back glass repair",
    "Charging port repair",
    "Camera repair",
    "Water damage assessment",
    "iPad and tablet repair",
    "Screen protectors and cases",
    "Telstra prepaid SIM and recharge",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${outfit.variable} ${jakarta.variable}`}>
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          // Static, developer-authored object — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
