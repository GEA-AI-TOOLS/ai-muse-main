// src/lib/urls.ts
const BASE = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");

/** Build an absolute app URL. appUrl("verify/MUSE-2026-A3F7") → https://<deployment>/verify/MUSE-2026-A3F7 */
export const appUrl = (path = "") => `${BASE}/${path.replace(/^\//, "")}`;

/** Bare host without scheme, for display (e.g. cert "sparks-v.bryancassady.com/verify") */
export const appHost = () => BASE.replace(/^https?:\/\//, "");