import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { validateSessionToken } from "@/lib/cookies";

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
  const { emailReminders, whatsappReminders } = body;

  if (typeof emailReminders !== "boolean" || typeof whatsappReminders !== "boolean") {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (whatsappReminders) {
    const { data: participant } = await supabase
      .from("participants")
      .select("phone")
      .eq("id", participantId)
      .single();

    if (!participant?.phone || participant.phone.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: "Verify a WhatsApp number first." },
        { status: 400 }
      );
    }
  }

  const { error } = await supabase
    .from("participants")
    .update({
      email_reminders: emailReminders,
      whatsapp_reminders: whatsappReminders,
      updated_at: new Date().toISOString(),
    })
    .eq("id", participantId);

  if (error) {
    console.error("preferences update failed:", error);
    return NextResponse.json({ ok: false, error: "Could not save. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}