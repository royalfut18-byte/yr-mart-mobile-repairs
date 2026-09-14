/**
 * Re-compress everything in public/images to WebP at a sane size for the web.
 *
 * sharp is not a project dependency — it is only needed when photos change:
 *   npm install --no-save sharp@0.32.6
 *   node scripts/optimise-images.mjs
 *
 * (Pin 0.32.6 on Node < 20.9; newer sharp requires a newer Node.)
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIR = "public/images";
const MAX_WIDTH = 1200;
const QUALITY = 78;

const files = fs.readdirSync(DIR).filter((name) => /\.(webp|jpe?g|png)$/i.test(name));
let before = 0;
let after = 0;

for (const name of files) {
  const file = path.join(DIR, name);
  const original = fs.statSync(file).size;

  // Read the whole file first: sharp keeps a handle open otherwise, and writing
  // back to the same path fails on Windows.
  const input = fs.readFileSync(file);
  const meta = await sharp(input).metadata();

  const output = await sharp(input)
    .resize({ width: Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();

  const target = file.replace(/\.(jpe?g|png)$/i, ".webp");
  fs.writeFileSync(target, output);
  if (target !== file) fs.unlinkSync(file);

  before += original;
  after += output.length;
  console.log(
    `${path.basename(target).padEnd(26)} ${meta.width}x${meta.height}`.padEnd(45) +
      `${Math.round(original / 1024)}KB -> ${Math.round(output.length / 1024)}KB`,
  );
}

console.log(`\nTotal: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`);
