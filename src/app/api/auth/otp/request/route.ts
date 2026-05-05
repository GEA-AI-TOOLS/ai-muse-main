import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { ok: false, error: "Email required." },
      { status: 400 }
    );
  }

  // STUB: in prod, call n8n send_login_otp workflow.
  // n8n checks email exists in participants, generates OTP, emails it.
  console.log("[stub] would send OTP to:", email);

  return NextResponse.json({ ok: true });
}