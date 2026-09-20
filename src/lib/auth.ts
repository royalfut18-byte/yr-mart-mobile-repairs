import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Single-operator login for the admin portal.
 *
 * Credentials come from the environment so they can be rotated in the Vercel
 * dashboard without a code change or redeploy of the source. The defaults are
 * the ones the shop asked for; see the note in README about changing them.
 */
const USERNAME = process.env.ADMIN_USERNAME ?? "yusuf";
const PASSWORD = process.env.ADMIN_PASSWORD ?? "1234";

/**
 * Signing key for the session cookie. Falls back to a value derived from the
 * password so the portal works before anything is configured, but a real
 * ADMIN_SECRET means sessions survive a password change and cannot be forged
 * by anyone who guesses the password alone.
 */
const SECRET = process.env.ADMIN_SECRET ?? `yrmart:${PASSWORD}:session`;

const COOKIE = "yrmart_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12;

/** Constant-time compare that tolerates differing lengths. */
function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/**
 * The username is matched case-insensitively and with surrounding whitespace
 * trimmed; the password is matched exactly.
 *
 * That asymmetry is deliberate. Yusuf signs in from a phone in the shop, and a
 * mobile keyboard autocapitalises the first letter of a text field, so a
 * strictly lowercase username would be rejected by default on the device he
 * actually uses. A username is an identifier, not a secret, so nothing is given
 * away by being lenient with it. The password stays byte-exact.
 */
export function checkCredentials(username: string, password: string) {
  const given = username.trim().toLowerCase();
  const expected = USERNAME.trim().toLowerCase();
  return safeEqual(given, expected) && safeEqual(password, PASSWORD);
}

function sign(expiry: number) {
  return createHmac("sha256", SECRET).update(`admin:${expiry}`).digest("hex");
}

export function createSessionValue() {
  const expiry = Date.now() + MAX_AGE_SECONDS * 1000;
  return `${expiry}.${sign(expiry)}`;
}

function verify(value: string | undefined) {
  if (!value) return false;
  const [expiryRaw, signature] = value.split(".");
  const expiry = Number(expiryRaw);
  if (!expiry || !signature) return false;
  if (Date.now() > expiry) return false;
  return safeEqual(signature, sign(expiry));
}

export async function isSignedIn() {
  const store = await cookies();
  return verify(store.get(COOKIE)?.value);
}

export const sessionCookie = {
  name: COOKIE,
  maxAge: MAX_AGE_SECONDS,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    // Vercel serves over HTTPS; locally this would stop the cookie being set.
    secure: process.env.NODE_ENV === "production",
    path: "/",
  },
};
