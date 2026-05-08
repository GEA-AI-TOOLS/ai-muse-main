import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import type { SessionData } from "@/lib/types";

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
};

export function generateSessionToken(): string {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

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

export async function validateSessionToken(
  token: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from("sessions")
    .select("id, participant_id, expires_at")
    .eq("session_token", token)
    .single();

  if (error || !data) return null;

  if (new Date(data.expires_at) < new Date()) {
    await supabase.from("sessions").delete().eq("session_token", token);
    return null;
  }

  await supabase
    .from("sessions")
    .update({ last_seen_at: new Date().toISOString() })
    .eq("session_token", token);

  return data.participant_id as string;
}

export function parseDeviceLabel(userAgent: string): string {
  const ua = userAgent.toLowerCase();

  let browser = "Browser";
  if (ua.includes("chrome") && !ua.includes("edg")) browser = "Chrome";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
  else if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("edg")) browser = "Edge";

  let os = "Unknown";
  if (ua.includes("iphone")) os = "iPhone";
  else if (ua.includes("ipad")) os = "iPad";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("mac")) os = "Mac";
  else if (ua.includes("linux")) os = "Linux";

  return browser + " on " + os;
}