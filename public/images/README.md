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
| `ipad-bundle.webp`         | iPad folio with tempered glass and stylus       | Accessories             |

## Wanted: three more photos

Save these three into this folder under exactly these names and the site picks
them up with no code change. They are wired up already.

| Save as                  | Should show                                           | Appears as                          |
| ------------------------ | ----------------------------------------------------- | ----------------------------------- |
| `hero-centre.webp`       | The Man Guard Gemshell anti-fall boxes (two packs)     | The big centre card in the hero fan |
| `ipad-device.webp`       | The pink iPad, front and back                          | "iPad & tablets" tile in Repairs    |
| `ipad-smart-folio.webp`  | The sage green Smart Folio on an iPad                  | "iPad folio, glass & stylus" tile   |

`.webp` is preferred but `.jpg` or `.png` work too; if you use a different
extension, change the matching path in `src/lib/images.ts`.

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
