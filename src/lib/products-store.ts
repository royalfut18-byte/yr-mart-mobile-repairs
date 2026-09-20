import { put, del, list } from "@vercel/blob";

/**
 * Products Yusuf uploads through the admin portal.
 *
 * Both the photos and a small JSON manifest live in Vercel Blob. A manifest
 * rather than a database because the whole dataset is a handful of rows that
 * are read on every page render and written a few times a week: a table would
 * be a second service to provision, back up and keep credentials for, and it
 * would buy nothing here.
 *
 * Every manifest write goes to a brand new pathname rather than overwriting one
 * fixed file. Overwriting meant each read afterwards was a cache bust against
 * the CDN, which measured 36 seconds for a single upload. A fresh pathname is
 * immutable, so it is fetchable immediately and cacheable forever; the newest
 * one wins and older ones are swept up behind it.
 */
export type UploadedProduct = {
  id: string;
  name: string;
  blurb: string;
  /** Public Blob URL of the photo. */
  image: string;
  /** Blob pathname, kept so the photo can be deleted with the record. */
  imagePath: string;
  createdAt: string;
};

const MANIFEST_PREFIX = "manifests/products-";

function token() {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

type ManifestBlob = { pathname: string; url: string; uploadedAt: Date };

async function newestManifest(): Promise<ManifestBlob | null> {
  const { blobs } = await list({ prefix: MANIFEST_PREFIX, token: token() });
  if (blobs.length === 0) return null;
  return blobs.reduce((newest, b) =>
    b.uploadedAt > newest.uploadedAt ? b : newest,
  );
}

/**
 * Every uploaded product, oldest first. Returns an empty list rather than
 * throwing when Blob is unreachable or unconfigured: the shop section falls
 * back to its built-in products, so a storage outage costs the new items but
 * never the page.
 */
export async function listProducts(): Promise<UploadedProduct[]> {
  if (!token()) return [];

  try {
    const manifest = await newestManifest();
    if (!manifest) return [];

    const res = await fetch(manifest.url);
    if (!res.ok) return [];

    const parsed: unknown = await res.json();
    if (!Array.isArray(parsed)) return [];

    // Oldest first, so a newly added product appends to the bottom of the
    // grid rather than pushing the existing stock down.
    return (parsed as UploadedProduct[]).sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt),
    );
  } catch {
    return [];
  }
}

async function writeManifest(items: UploadedProduct[]) {
  const previous = await list({ prefix: MANIFEST_PREFIX, token: token() });

  await put(`${MANIFEST_PREFIX}${Date.now()}.json`, JSON.stringify(items, null, 2), {
    access: "public",
    contentType: "application/json",
    token: token(),
    addRandomSuffix: true,
  });

  // Sweep the superseded ones. Best effort: a leftover manifest is harmless
  // because reads always take the newest.
  await Promise.allSettled(
    previous.blobs.map((b) => del(b.pathname, { token: token() })),
  );
}

export async function addProduct(input: {
  name: string;
  blurb: string;
  file: File;
}): Promise<UploadedProduct> {
  const existing = await listProducts();

  const id = crypto.randomUUID();
  const ext = input.file.type === "image/jpeg" ? "jpg" : "webp";
  const pathname = `products/${id}.${ext}`;

  const blob = await put(pathname, input.file, {
    access: "public",
    token: token(),
    addRandomSuffix: false,
    contentType: input.file.type || "image/webp",
  });

  const product: UploadedProduct = {
    id,
    name: input.name,
    blurb: input.blurb,
    image: blob.url,
    imagePath: pathname,
    createdAt: new Date().toISOString(),
  };

  await writeManifest([...existing, product]);
  return product;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const items = await listProducts();
  const target = items.find((p) => p.id === id);
  if (!target) return false;

  // Drop the record first. If the photo delete fails the item is already gone
  // from the site, which is what the click asked for; an orphan blob is a far
  // smaller problem than a product that refuses to disappear.
  await writeManifest(items.filter((p) => p.id !== id));

  try {
    await del(target.imagePath, { token: token() });
  } catch {
    /* orphaned blob, harmless */
  }
  return true;
}
