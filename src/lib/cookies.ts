import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { SessionData } from "@/lib/types";

const secret = new TextEncoder().encode(process.env.COOKIE_SECRET!);
const ALG = "HS256";

// ---------- JWT ----------

export async function signAuthToken(participantId: string): Promise<string> {
  return new SignJWT({ participantId })
    .setProtectedHeader({ alg: ALG })
    .setExpirationTime("30d")
    .sign(secret);
}

export async function verifyAuthToken(
  token: string
): Promise<{ participantId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return { participantId: payload.participantId as string };
  } catch {
    return null;
  }
}

// ---------- Cookie read ----------

export async function getAuthToken(): Promise<string | null> {
  const store = await cookies();
  return store.get("auth")?.value ?? null;
}

export async function getSessionData(): Promise<SessionData | null> {
  const store = await cookies();
  const raw = store.get("session_data")?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionData;
  } catch {
    return null;
  }
}

// ---------- Cookie write (used in API routes via NextResponse) ----------

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 30,
  path: "/",
};

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  // No maxAge = session cookie
};