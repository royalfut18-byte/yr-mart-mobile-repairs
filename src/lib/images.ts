/**
 * Every photo path the site uses, in one place.
 *
 * Some entries carry a `fallback`. Those point at a photo that has been asked
 * for but is not in `public/images` yet: the page requests the new file, and if
 * it 404s `SmartImage` quietly drops back to the existing photo rather than
 * showing a placeholder. Drop the new file in under the listed name and it
 * takes over on the next load, with no code change.
 */
export type Photo = { src: string; fallback?: string; alt: string };

export const photos = {
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
    fallback: "/images/storefront.webp",
    alt: "Man Guard Gemshell anti-fall MagSafe cases, boxed",
  },

  /** "iPad & tablets" tile in the Repairs section. */
  ipadDevice: {
    src: "/images/ipad-device.webp",
    fallback: "/images/ipad-bundle.webp",
    alt: "iPad, front and back",
  },

  /** "iPad folio, glass & stylus" product tile. */
  ipadSmartFolio: {
    src: "/images/ipad-smart-folio.webp",
    fallback: "/images/ipad-bundle.webp",
    alt: "Smart Folio case fitted to an iPad",
  },
} as const satisfies Record<string, Photo>;
