# Photos

The shop's real photos, exported to WebP at 1200 px max and quality 78 (about
930 KB for the whole set, down from 2 MB).

| File                       | Shows                                          | Used by                 |
| -------------------------- | ---------------------------------------------- | ----------------------- |
| `storefront.webp`          | The Military Rd shopfront with the YR MART sign | Open Now block, Open Graph |
| `store-interior.webp`      | Inside the shop, case walls and repair counter  | Services tile, blue band |
| `case-rugged-armor.webp`   | KingLinks Fashion Rugged Armor MagSafe cases    | Hero fan, accessories   |
| `case-luxury-magsafe.webp` | KingLink 2-in-1 Luxury MagSafe glitter cases    | Hero fan, accessories   |
| `case-hanman-wallet.webp`  | Hanman MagSafe leather wallet cases             | Hero fan, accessories   |
| `case-drop-plus.webp`      | Adventure Heavy Duty / Drop Plus MagSafe cases  | Accessories             |
| `case-gemshell.webp`       | Man Guard Gemshell anti-fall clear cases        | Accessories             |
| `case-prints.webp`         | Printed designer case range (D1 to D12)         | Accessories             |
| `ipad-folio.webp`          | 360 degree rotating tablet folios               | Hero fan, accessories   |
| `ipad-bundle.webp`         | iPad folio with tempered glass and stylus       | (spare)                 |
| `hero-centre.webp`         | Man Guard Gemshell anti-fall cases, boxed       | Hero fan, centre card   |
| `ipad-device.webp`         | iPad, front and back                            | "iPads & tablets" tile  |
| `ipad-smart-folio.webp`    | Smart Folio fitted to an iPad                   | Accessories             |
| `logo-banner.webp`         | The shop's full signage artwork                 | Nav, footer, "look for this sign" |

The logo is always shown whole. The favicon at `src/app/icon.png` is a square
crop of the leaf emblem, which is the one place the full banner will not fit.

| `cracked-ipad.webp`        | Shattered iPad screen                           | Front page damage band  |
| `acc-mac-charger.webp`     | Mac / laptop USB-C charger                      | Computer accessories    |
| `acc-usb-hub.webp`         | Multi-port USB hub                              | Computer accessories    |
| `acc-mouse.webp`           | Wireless mouse                                  | Computer accessories    |
| `acc-keyboard.webp`        | Backlit mechanical keyboard                     | Computer accessories    |
| `acc-headphones.webp`      | Over-ear headphones (225px, too small to use)   | unused                  |

## Worth replacing

The six files above are stock product shots off the web, not the shop's own
stock. They are fine as placeholders but two things argue for swapping them:
they are somebody else's copyright, and photos of the actual products on the
shelf sell better than a generic render. `acc-headphones.webp` is only 225px,
which is too soft for a tile, so headphones stay as an icon until a real photo
arrives.

A **cracked phone** shot is still missing. The band currently shows only the
iPad, and Yusuf asked for phones as well.

## Replacing or adding a photo

Keep the filename and the site picks it up with no code change. Otherwise update
the path in `src/lib/images.ts`, which is the single place every photo path is
declared.

- **Accessory tiles are square** (`aspect-square`), so square sources fit with no
  cropping. The hero fan cards are tall, so upright or square images suit them
  best.
- **Keep files small.** Export at roughly 1200 px on the long edge, WebP quality
  ~78. A 4 MB photo is the difference between a fast site and a slow one on
  mobile data. To re-run the optimisation after adding photos:

  ```bash
  npm install --no-save sharp@0.32.6
  node scripts/optimise-images.mjs
  ```

- **A missing file is not a broken site.** `SmartImage` falls back to a designed
  gradient tile if a file 404s, so the layout still looks finished.
