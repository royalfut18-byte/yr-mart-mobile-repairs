import { NextResponse } from "next/server";
import { checkCredentials, createSessionValue, sessionCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData();
  const username = String(form.get("username") ?? "");
  const password = String(form.get("password") ?? "");

  if (!checkCredentials(username, password)) {
    // Redirect rather than render, so a refresh does not re-post the form.
    return NextResponse.redirect(new URL("/admin?error=1", request.url), 303);
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set(sessionCookie.name, createSessionValue(), {
    ...sessionCookie.options,
    maxAge: sessionCookie.maxAge,
  });
  return response;
}
