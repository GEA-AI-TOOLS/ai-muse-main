import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.COOKIE_SECRET!);

const PUBLIC_PATHS = [
  "/login",
  "/enroll",
  "/api/auth",
  "/api/stub",
  "/api/participant",
  "/api/webhooks",
  "/api/enroll",
  "/waiting",
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

  const authToken = req.cookies.get("auth")?.value;

  if (!authToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("reason", "new-device");
    return NextResponse.redirect(url);
  }

  try {
    await jwtVerify(authToken, secret);
    return NextResponse.next();
  } catch {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("reason", "new-device");
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};