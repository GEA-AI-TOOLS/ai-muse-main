import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  const cleanEmail = String(email).toLowerCase().trim();
  if (!EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  try {
    await sendContactEmail(String(name).trim(), cleanEmail, String(message).trim());
  } catch (err) {
    console.error("contact email failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
