import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { validateSessionToken } from "@/lib/cookies";

function generateVerificationCode(): string {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return "MUSE-" + String(year) + "-" + code;
}

export async function POST(req: NextRequest) {
  const authToken = req.cookies.get("auth")?.value;
  if (!authToken) {
    return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });
  }

  const participantId = await validateSessionToken(authToken);
  if (!participantId) {
    return NextResponse.json({ ok: false, error: "Invalid session." }, { status: 401 });
  }

  // Check if completion cert already exists
  const { data: existingCert } = await supabase
    .from("certificates")
    .select("id, verification_code, issued_at")
    .eq("participant_id", participantId)
    .eq("type", "completion")
    .maybeSingle();

  if (existingCert) {
    return NextResponse.json({
      ok: true,
      alreadyIssued: true,
      verificationCode: existingCert.verification_code,
      issuedAt: existingCert.issued_at,
    });
  }

  // Verify all 10 days are done via DB (source of truth — not cookie)
  const { data: dayStates } = await supabase
    .from("participant_day_state")
    .select("day, done_at")
    .eq("participant_id", participantId);

  const completedDays = (dayStates ?? []).filter((d) => d.done_at !== null);

  if (completedDays.length < 10) {
    return NextResponse.json(
      {
        ok: false,
        error: "Complete all 10 days before issuing your Certificate of Completion.",
      },
      { status: 403 }
    );
  }

  // Fetch participant for cohort_id
  const { data: participant } = await supabase
    .from("participants")
    .select("cohort_id")
    .eq("id", participantId)
    .single();

  if (!participant) {
    return NextResponse.json({ ok: false, error: "Participant not found." }, { status: 404 });
  }

  // Generate unique verification code
  let verificationCode = generateVerificationCode();
  let attempts = 0;
  while (attempts < 10) {
    const { data: existing } = await supabase
      .from("certificates")
      .select("id")
      .eq("verification_code", verificationCode)
      .maybeSingle();
    if (!existing) break;
    verificationCode = generateVerificationCode();
    attempts++;
  }

  // Issue cert
  const { error: certError } = await supabase.from("certificates").insert({
    participant_id: participantId,
    type: "completion",
    verification_code: verificationCode,
    cohort_id: participant.cohort_id,
  });

  if (certError) {
    console.error("Completion cert issuance failed:", certError);
    return NextResponse.json(
      { ok: false, error: "Failed to issue certificate. Try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    alreadyIssued: false,
    verificationCode,
    issuedAt: new Date().toISOString(),
  });
}