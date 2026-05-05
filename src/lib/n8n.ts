// All calls to n8n (or the stub during dev) go through this module.
// To swap stub for real n8n later, just change N8N_BASE.
import { cookies } from "next/headers";
import type {
  ParticipantResponse,
  ClickResponse,
  ApiError,
} from "./types";

// Read base URL from env. In dev it points at our local stub.
// In prod it'll point at the real n8n webhook host.
const N8N_BASE =
  process.env.N8N_WEBHOOK_BASE_URL ?? "http://localhost:3000/api/stub";

class N8nError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, body: unknown, message: string) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

async function call<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const url = `${N8N_BASE}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    // Server components: never cache n8n responses by default.
    cache: "no-store",
  });

  if (!res.ok) {
    let body: ApiError | unknown = null;
    try {
      body = await res.json();
    } catch {
      // ignore
    }
    throw new N8nError(
      res.status,
      body,
      `n8n call failed: ${path} → ${res.status}`
    );
  }

  return (await res.json()) as T;
}

// ---------- Public API ----------

export async function getParticipant(): Promise<ParticipantResponse> {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  
  // Forward cookies from the incoming request
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll()
    .map((c) => c.name + "=" + c.value)
    .join("; ");

  const res = await fetch(base + "/api/participant", {
    cache: "no-store",
    headers: {
      cookie: cookieHeader,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new N8nError(res.status, body, "getParticipant failed");
  }

  return res.json() as Promise<ParticipantResponse>;
}


export async function recordClick(
  token: string,
  section?: "essential" | "advanced" | "learnmore"
): Promise<ClickResponse> {
  return call<ClickResponse>("/click", {
    method: "POST",
    body: JSON.stringify({ token, section }),
  });
}

export { N8nError };