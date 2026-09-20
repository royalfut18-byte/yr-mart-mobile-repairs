import type { Metadata } from "next";
import Link from "next/link";
import { isSignedIn } from "@/lib/auth";
import { listProducts } from "@/lib/products-store";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { LoginForm } from "@/components/admin/LoginForm";
import { photos } from "@/lib/images";

export const metadata: Metadata = {
  title: "Shop admin",
  // A staff-only page has no business in search results.
  robots: { index: false, follow: false },
};

// Reads the session cookie and live product list, so it can never be cached.
export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const signedIn = await isSignedIn();
  const { error } = await searchParams;

  return (
    <main className="min-h-[100svh] px-5 py-10 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos.logo.src}
              alt={photos.logo.alt}
              width={1080}
              height={284}
              className="h-10 w-auto rounded-md sm:h-12"
            />
          </Link>
          <p className="text-sm text-ink-muted">
            {signedIn ? "Signed in" : "Staff only"}
          </p>
        </header>

        <div className="mt-10">
          {signedIn ? (
            <AdminDashboard products={await listProducts()} />
          ) : (
            <LoginForm failed={error === "1"} />
          )}
        </div>
      </div>
    </main>
  );
}
