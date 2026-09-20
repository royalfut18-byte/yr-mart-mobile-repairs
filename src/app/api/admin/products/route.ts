import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isSignedIn } from "@/lib/auth";
import { addProduct, deleteProduct } from "@/lib/products-store";

export const runtime = "nodejs";

/** Refuses anything that is not an image, or larger than this after compression. */
const MAX_BYTES = 6 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isSignedIn())) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("photo");
  const name = String(form.get("name") ?? "").trim();
  const blurb = String(form.get("blurb") ?? "").trim();

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Choose a photo" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "That file is not an image" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "That photo is too large even after compression" },
      { status: 413 },
    );
  }
  if (!name) {
    return NextResponse.json({ error: "Give the product a name" }, { status: 400 });
  }

  const product = await addProduct({ name, blurb, file });

  // The shop section is statically rendered, so it has to be rebuilt for the
  // new item to appear straight away rather than on the next revalidation.
  revalidatePath("/");
  revalidatePath("/admin");

  return NextResponse.json({ product });
}

export async function DELETE(request: Request) {
  if (!(await isSignedIn())) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { id } = await request.json();
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const removed = await deleteProduct(id);
  if (!removed) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  revalidatePath("/");
  revalidatePath("/admin");

  return NextResponse.json({ ok: true });
}
