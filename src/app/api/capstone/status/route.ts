import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { validateSessionToken } from "@/lib/cookies";

export async function GET(req: NextRequest) {
  const authToken = req.cookies.get("auth")?.value;
  if (!authToken) {
    return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });
  }

  const participantId = await validateSessionToken(authToken);
  if (!participantId) {
    return NextResponse.json({ ok: false, error: "Invalid session." }, { status: 401 });
  }

  // Latest submission (one row per participant on pass)
  const { data: submissions } = await supabase
    .from("capstone_submissions")
    .select("id, description, gem_url, status, review_report, submitted_at")
    .eq("participant_id", participantId)
    .order("submitted_at", { ascending: false })
    .limit(1);

  const submission = submissions?.[0] ?? null;

  // Certs
  const { data: certs } = await supabase
    .from("certificates")
    .select("id, type, issued_at, verification_code, cohort_id")
    .eq("participant_id", participantId);

  const completionCert = certs?.find((c) => c.type === "completion") ?? null;
  const masteryCert = certs?.find((c) => c.type === "mastery") ?? null;

  // Cert visibility flag — when false, certs exist but are hidden from participant
  const { data: participant } = await supabase
    .from("participants")
    .select("certs_enabled")
    .eq("id", participantId)
    .single();

  const certsEnabled = participant?.certs_enabled ?? true;

  return NextResponse.json({
    ok: true,
    submission,
    completionCert,
    masteryCert,
    certsEnabled,
  });
}