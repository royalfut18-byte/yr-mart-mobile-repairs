"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { compressImage, formatBytes, type CompressResult } from "@/lib/compress";
import type { UploadedProduct } from "@/lib/products-store";

type Status =
  | { kind: "idle" }
  | { kind: "compressing" }
  | { kind: "uploading" }
  | { kind: "error"; message: string }
  | { kind: "done"; saved: number };

export function AdminDashboard({ products }: { products: UploadedProduct[] }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [preview, setPreview] = useState<CompressResult | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  /**
   * Compress as soon as a file is picked, so the shrink is visible before
   * anything is sent and a slow phone photo is not mistaken for a slow upload.
   */
  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }
    setStatus({ kind: "compressing" });
    try {
      const result = await compressImage(file);
      setPreview(result);
      setStatus({ kind: "idle" });
    } catch (e) {
      setPreview(null);
      setStatus({ kind: "error", message: (e as Error).message });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!preview) {
      setStatus({ kind: "error", message: "Choose a photo first" });
      return;
    }

    // Send the compressed file, never the original off the camera.
    data.set("photo", preview.file);
    setStatus({ kind: "uploading" });

    try {
      const res = await fetch("/api/admin/products", { method: "POST", body: data });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Upload failed");
      }
      const saved = preview.originalBytes - preview.compressedBytes;
      form.reset();
      setPreview(null);
      setStatus({ kind: "done", saved });
      router.refresh();
    } catch (e) {
      setStatus({ kind: "error", message: (e as Error).message });
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Remove "${name}" from the website?`)) return;
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Could not remove that product");
      router.refresh();
    } catch (e) {
      setStatus({ kind: "error", message: (e as Error).message });
    } finally {
      setBusyId(null);
    }
  }

  const busy = status.kind === "uploading" || status.kind === "compressing";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Products
        </h1>
        <form method="POST" action="/api/admin/logout">
          <button
            type="submit"
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
          >
            Sign out
          </button>
        </form>
      </div>

      {/* Add a product */}
      <form ref={formRef} onSubmit={handleSubmit} className="card p-6 sm:p-8">
        <h2 className="font-display text-lg font-bold tracking-tight">Add a product</h2>
        <p className="mt-1.5 text-sm text-ink-muted">
          Photos are shrunk automatically before they are uploaded, so the website
          stays fast no matter what size the picture is.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="photo"
              className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted"
            >
              Photo
            </label>
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              required
              onChange={handleFile}
              className="mt-2 w-full rounded-2xl border border-ink/12 bg-white px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-brand file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={80}
              placeholder="iPhone 13 128GB, refurbished"
              className="mt-2 w-full rounded-2xl border border-ink/12 bg-white px-4 py-3.5 text-base outline-none focus:border-brand"
            />
          </div>

          <div>
            <label
              htmlFor="blurb"
              className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted"
            >
              Short description <span className="font-normal normal-case">(optional)</span>
            </label>
            <input
              id="blurb"
              name="blurb"
              type="text"
              maxLength={140}
              placeholder="Unlocked, battery 92%, 6 month warranty"
              className="mt-2 w-full rounded-2xl border border-ink/12 bg-white px-4 py-3.5 text-base outline-none focus:border-brand"
            />
          </div>
        </div>

        {preview ? (
          <div className="mt-5 flex items-center gap-4 rounded-2xl bg-paper p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={URL.createObjectURL(preview.file)}
              alt=""
              className="h-20 w-20 rounded-xl object-cover"
            />
            <div className="text-sm">
              <p className="font-semibold text-ink">Ready to upload</p>
              <p className="mt-1 text-ink-muted">
                {formatBytes(preview.originalBytes)} to{" "}
                <span className="font-semibold text-ink">
                  {formatBytes(preview.compressedBytes)}
                </span>{" "}
                · {preview.width}×{preview.height}
              </p>
            </div>
          </div>
        ) : null}

        {status.kind === "error" ? (
          <p role="alert" className="mt-5 rounded-2xl bg-ember/10 px-4 py-3 text-sm font-medium text-ember">
            {status.message}
          </p>
        ) : null}
        {status.kind === "done" ? (
          <p className="mt-5 rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700">
            Added to the website. Saved {formatBytes(status.saved)} on that photo.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 rounded-full bg-brand px-7 py-3.5 font-display text-base font-bold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
        >
          {status.kind === "compressing"
            ? "Shrinking photo…"
            : status.kind === "uploading"
              ? "Uploading…"
              : "Add to website"}
        </button>
      </form>

      {/* What is already up */}
      <div className="card p-6 sm:p-8">
        <h2 className="font-display text-lg font-bold tracking-tight">
          On the website ({products.length})
        </h2>

        {products.length === 0 ? (
          <p className="mt-4 rounded-2xl bg-paper px-4 py-6 text-center text-sm text-ink-muted">
            Nothing uploaded yet. Anything you add here appears in the products
            section of the website straight away.
          </p>
        ) : (
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex items-center gap-4 rounded-2xl bg-paper p-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt=""
                  className="h-16 w-16 shrink-0 rounded-xl bg-white object-contain"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">{product.name}</p>
                  {product.blurb ? (
                    <p className="truncate text-xs text-ink-muted">{product.blurb}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(product.id, product.name)}
                  disabled={busyId === product.id}
                  className="shrink-0 rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-ember hover:text-ember disabled:opacity-50"
                >
                  {busyId === product.id ? "Removing…" : "Remove"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
