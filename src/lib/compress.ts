/**
 * Shrinks a photo in the browser before it is uploaded.
 *
 * Doing this client side rather than on the server is the point: a 4MB photo
 * straight off a phone camera never leaves the phone, so the upload is quick on
 * shop wifi, the stored file stays small, and every visitor to the site
 * afterwards downloads ~60KB instead of several megabytes. That is the
 * difference between the products section feeling instant and feeling broken.
 */
const MAX_EDGE = 1200;
const QUALITY = 0.82;

export type CompressResult = {
  file: File;
  originalBytes: number;
  compressedBytes: number;
  width: number;
  height: number;
};

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("That file could not be read as an image"));
    };
    img.src = url;
  });
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, type, quality),
  );
}

export async function compressImage(file: File): Promise<CompressResult> {
  const img = await loadImage(file);

  // Only ever scale down. Enlarging a small photo adds bytes and no detail.
  const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser could not process that image");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, width, height);

  // WebP where the browser supports encoding it, JPEG otherwise. PNG is
  // deliberately not used: product photos are photographic, so PNG would be
  // several times larger for no visible gain.
  let type = "image/webp";
  let blob = await toBlob(canvas, type, QUALITY);
  if (!blob || blob.type !== type) {
    type = "image/jpeg";
    blob = await toBlob(canvas, type, QUALITY);
  }
  if (!blob) throw new Error("Your browser could not process that image");

  // A already-small source can compress to something larger than it started.
  // Keep whichever is smaller, as long as the original is a format we can serve.
  const keepOriginal =
    blob.size >= file.size && /^image\/(webp|jpeg|png)$/.test(file.type);

  const finalBlob = keepOriginal ? file : blob;
  const ext = keepOriginal
    ? (file.name.split(".").pop() ?? "jpg")
    : type === "image/webp"
      ? "webp"
      : "jpg";

  const base = file.name.replace(/\.[^.]+$/, "") || "product";
  const out = new File([finalBlob], `${base}.${ext}`, {
    type: keepOriginal ? file.type : type,
  });

  return {
    file: out,
    originalBytes: file.size,
    compressedBytes: out.size,
    width,
    height,
  };
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
