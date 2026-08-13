import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { validateSessionToken } from "@/lib/cookies";
import { sendPhoneOtp, checkPhoneOtp } from "@/lib/phone";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth")?.value;
  if (!authToken) {
    return NextResponse.json({ ok: false, error: "Not logged in." }, { status: 401 });
  }

  const participantId = await validateSessionToken(authToken);
  if (!participantId) {
    return NextResponse.json({ ok: false, error: "Session expired." }, { status: 401 });
  }

  const body = await req.json();
  const { action, phone, otp } = body;

  if (!phone || typeof phone !== "string") {
    return NextResponse.json({ ok: false, error: "Phone number required." }, { status: 400 });
  }

  if (action === "send") {
    try {
      await sendPhoneOtp(phone);
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("phone otp send failed:", err);
      return NextResponse.json(
        { ok: false, error: "Could not send code. Check the number and try again." },
        { status: 500 }
      );
    }
  }

  if (action === "check") {
    if (!otp || typeof otp !== "string") {
      return NextResponse.json({ ok: false, error: "Code required." }, { status: 400 });
    }

    const approved = await checkPhoneOtp(phone, otp.trim());
    if (!approved) {
      return NextResponse.json(
        { ok: false, error: "Incorrect or expired code." },
        { status: 401 }
      );
    }

    const { error } = await supabase
      .from("participants")
      .update({
        phone,
        whatsapp_reminders: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", participantId);

    if (error) {
      console.error("phone verify save failed:", error);
      return NextResponse.json({ ok: false, error: "Could not save number." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "Unknown action." }, { status: 400 });
}