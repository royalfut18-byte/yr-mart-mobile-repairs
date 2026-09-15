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

  /**
   * The damage shot for the front page. Native size is 480x640, so it is shown
   * as a device-sized object inside a wide panel rather than stretched across
   * one: upscaling it to full width would fall apart.
   */
  crackedIpad: {
    src: "/images/cracked-ipad.webp",
    alt: "An iPad with a badly shattered screen",
  },
} as const satisfies Record<string, Photo>;

/** Computer and laptop accessories carried in store. */
export const accessories = [
  {
    src: "/images/acc-mac-charger.webp",
    name: "Mac & laptop chargers",
    blurb: "USB-C and MagSafe replacements for Mac and Windows laptops.",
  },
  {
    src: "/images/acc-usb-hub.webp",
    name: "USB hubs & adapters",
    blurb: "Multi-port hubs, USB-C adapters and the dongle you keep losing.",
  },
  {
    src: "/images/acc-mouse.webp",
    name: "Mice",
    blurb: "Wireless and wired, from everyday office to low-latency gaming.",
  },
  {
    src: "/images/acc-keyboard.webp",
    name: "Keyboards",
    blurb: "Full size, compact and backlit mechanical boards.",
  },
] as const;
