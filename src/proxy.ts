import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const PUBLIC_PATHS = [
  "/login",
  "/enroll",
  "/api/auth",
  "/api/stub",
  "/api/participant",
  "/api/webhooks",
  "/api/enroll",
  "/api/reminders",
  "/api/account",
  "/api/r",
  "/api/reminders",
  "/verify",
  "/waiting",
  "/assets",
  "/home",
  "/audit",
];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    if (!req.cookies.get("auth")?.value) {
      const url = req.nextUrl.clone();
      url.pathname = "/home";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const authToken = req.cookies.get("auth")?.value;

  if (!authToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("reason", "new-device");
    return NextResponse.redirect(url);
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("sessions")
    .select("participant_id, expires_at")
    .eq("session_token", authToken)
    .single();

  if (error || !data || new Date(data.expires_at) < new Date()) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("reason", "new-device");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();

}export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};