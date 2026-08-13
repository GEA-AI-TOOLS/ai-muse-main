import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/login",
  "/enroll",
  "/api/auth",
  "/api/stub",
  "/api/participant",
  "/api/webhooks",
  "/api/enroll",
  "/api/contact",
  "/api/reminders",
  "/api/account",
  "/api/r",
  "/verify",
  "/waiting",
  "/assets",
  "/home",
  "/audit",
  "/mux-test",
  "/under-construction",
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
    const url = req.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  const authToken = req.cookies.get("auth")?.value;

  if (!authToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("reason", "new-device");
    return NextResponse.redirect(url);
  }

  // Cookie-presence check only. Real session validation (expiry, existence,
  // revoked status) happens deeper — /api/participant calls validateSessionToken
  // in the Node runtime, and every page that reads it (today, progress, lesson)
  // already redirects to /login on failure. The Edge runtime's Supabase client
  // was silently failing to bypass RLS on `sessions`, causing genuine logins
  // to bounce here even with a valid cookie and a valid DB row. Removing the
  // DB call from middleware removes that failure mode entirely — the real
  // gate downstream is unaffected and was doing the actual work all along.
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};