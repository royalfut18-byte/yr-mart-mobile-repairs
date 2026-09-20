import { products } from "@/lib/data";
import { accessories } from "@/lib/images";
import { listProducts } from "@/lib/products-store";
import type { ShopItem } from "@/components/Shop";

/**
 * The shop grid, as one flat list.
 *
 * Categories used to be baked into the layout, which meant anything Yusuf
 * uploaded had to be forced into "cases" or "computer". Everything now lands in
 * a single grid, so a new kind of stock needs no code change at all.
 *
 * Uploads come last and append to the end, so adding stock never reshuffles
 * what is already on the page.
 */
export async function getShopItems(): Promise<ShopItem[]> {
  const uploaded = await listProducts();

  return [
    ...products.map((p) => ({
      id: `builtin-${p.name}`,
      name: p.name,
      blurb: p.blurb,
      image: p.image,
      contain: false,
    })),
    ...accessories.map((a) => ({
      id: `acc-${a.name}`,
      name: a.name,
      blurb: a.blurb,
      image: a.src,
      // Catalogue shots sit on white, so they are contained, not cropped.
      contain: true,
    })),
    ...uploaded.map((p) => ({
      id: p.id,
      name: p.name,
      blurb: p.blurb,
      image: p.image,
      // Uploads are photographed against whatever is on the counter, so they
      // fill the tile rather than sitting letterboxed on white.
      contain: false,
    })),
  ];
}
