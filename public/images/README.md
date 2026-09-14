# Photos

These are the shop's real photos, exported to WebP at 1200 px max and quality 78
(about 930 KB for the whole set, down from 2 MB).

| File                       | Shows                                               | Used by                       |
| -------------------------- | --------------------------------------------------- | ----------------------------- |
| `storefront.webp`          | The Military Rd shopfront with the YR MART sign      | Visit section, Open Graph      |
| `store-interior.webp`      | Inside the shop — case walls and repair counter      | Story section                  |
| `case-rugged-armor.webp`   | KingLinks Fashion Rugged Armor MagSafe cases         | Accessories                    |
| `case-luxury-magsafe.webp` | KingLink 2-in-1 Luxury MagSafe glitter cases         | Accessories                    |
| `case-hanman-wallet.webp`  | Hanman MagSafe leather wallet cases                  | Accessories                    |
| `case-drop-plus.webp`      | Adventure Heavy Duty / Drop Plus MagSafe cases       | Accessories                    |
| `case-gemshell.webp`       | Man Guard Gemshell anti-fall clear cases             | Accessories                    |
| `case-prints.webp`         | Printed designer case range (D1–D12)                 | Accessories                    |
| `ipad-folio.webp`          | 360° rotating tablet folios, seven colours           | Accessories                    |
| `ipad-bundle.webp`         | iPad folio with tempered glass and stylus            | Accessories                    |

## Replacing or adding a photo

Keep the filename and the site picks it up with no code change. Otherwise update
the path in `src/lib/data.ts` (accessories), `src/components/Visit.tsx`
(storefront) or `src/components/Story.tsx` (interior).

- **Accessory tiles are square** (`aspect-square`), so square sources fit with no
  cropping. The storefront tile is 4:3 on mobile and 16:10 above that, cropped
  toward the top so the sign stays in frame.
- **Keep files small.** Export at roughly 1200 px on the long edge, WebP quality
  ~78. A 4 MB photo is the difference between a fast site and a slow one on
  mobile data. To re-run the optimisation after adding photos:

  ```bash
  npm install --no-save sharp@0.32.6
  node scripts/optimise-images.mjs
  ```

- **A missing file is not a broken site.** `SmartImage` falls back to a designed
  gradient tile if a file 404s, so the layout still looks finished.
