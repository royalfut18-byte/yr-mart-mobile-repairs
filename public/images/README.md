# Photos

Drop the shop's real photos in this folder using the exact filenames below. The
site picks them up automatically — no code changes needed.

Until a file exists, that tile renders a designed gradient placeholder instead of
a broken image, so the site always looks finished.

| Filename                   | What it should show                                    | Best shape        |
| -------------------------- | ------------------------------------------------------ | ----------------- |
| `storefront.jpg`           | The shopfront on Military Rd with the YR MART sign      | Landscape 16:9    |
| `store-interior.jpg`       | Inside the shop — the case walls and repair counter     | Landscape 5:4     |
| `case-rugged-armor.jpg`    | KingLinks Fashion Rugged Armor MagSafe cases            | Portrait 4:5      |
| `case-luxury-magsafe.jpg`  | KingLink Luxury MagSafe glitter cases (six finishes)    | Portrait 4:5      |
| `case-hanman-wallet.jpg`   | Hanman MagSafe leather wallet cases                     | Portrait 4:5      |
| `case-drop-plus.jpg`       | Adventure Heavy Duty / Drop Plus MagSafe cases          | Portrait 4:5      |
| `case-gemshell.jpg`        | Man Guard Gemshell anti-fall clear cases                | Portrait 4:5      |
| `case-prints.jpg`          | The printed designer case range (D1–D12)                | Portrait 4:5      |
| `ipad-folio.jpg`           | 360° rotating iPad folio cases                          | Portrait 4:5      |
| `screen-protectors.jpg`    | Tempered glass / screen protectors                      | Portrait 4:5      |

## Tips

- **Keep them under ~300 KB each.** These are decorative product shots; a 4 MB
  photo is the difference between a fast site and a slow one on mobile data.
  Export at roughly 1200 px on the long edge at 80% JPEG quality.
- **`.jpg` is what the code expects.** If you want to use WebP instead, rename
  the reference in `src/lib/data.ts` (products) or the component that uses it
  (`storefront.jpg` in `src/components/Visit.tsx`, `store-interior.jpg` in
  `src/components/Story.tsx`).
- **Crop to the shape in the table.** The tiles use `object-cover`, so an
  off-shape photo will be cropped from the centre rather than squashed.
