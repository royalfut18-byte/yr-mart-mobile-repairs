/**
 * Every photo path the site uses, in one place.
 *
 * An entry may carry a `fallback`, which `SmartImage` swaps to if the main file
 * 404s. That lets a photo be swapped out ahead of the file actually landing,
 * without the tile breaking in the meantime.
 */
export type Photo = { src: string; fallback?: string; alt: string };

export const photos = {
  /** The shop's own signage artwork, shown whole wherever the logo appears. */
  logo: {
    src: "/images/logo-banner.webp",
    alt: "YR MART Mobile Phone Repair",
  },
  storefront: {
    src: "/images/storefront.webp",
    alt: "The YR MART shopfront on Military Road, Neutral Bay",
  },
  storeInterior: {
    src: "/images/store-interior.webp",
    alt: "Inside YR MART: walls of phone cases and the repair counter",
  },

  /** Centre card of the hero fan. */
  heroCentre: {
    src: "/images/hero-centre.webp",
    alt: "Man Guard Gemshell anti-fall MagSafe cases, boxed",
  },

  /** "iPad & tablets" tile in the Repairs section. */
  ipadDevice: {
    src: "/images/ipad-device.webp",
    alt: "iPad, front and back",
  },

  /** "iPad folio, glass & stylus" product tile. */
  ipadSmartFolio: {
    src: "/images/ipad-smart-folio.webp",
    alt: "Smart Folio case fitted to an iPad",
  },
} as const satisfies Record<string, Photo>;
