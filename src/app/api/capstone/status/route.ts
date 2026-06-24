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

  // Run all three independent queries in parallel instead of sequentially
  const [submissionsRes, certsRes, participantRes] = await Promise.all([
    supabase
      .from("capstone_submissions")
      .select("id, description, gem_url, status, review_report, submitted_at")
      .eq("participant_id", participantId)
      .order("submitted_at", { ascending: false })
      .limit(1),
    supabase
      .from("certificates")
      .select("id, type, issued_at, verification_code, cohort_id")
      .eq("participant_id", participantId),
    supabase
      .from("participants")
      .select("certs_enabled")
      .eq("id", participantId)
      .single(),
  ]);

  const submission = submissionsRes.data?.[0] ?? null;

  const certs = certsRes.data ?? [];
  const completionCert = certs.find((c) => c.type === "completion") ?? null;
  const masteryCert = certs.find((c) => c.type === "mastery") ?? null;

  const certsEnabled = participantRes.data?.certs_enabled ?? true;

  return NextResponse.json({
    ok: true,
    submission,
    completionCert,
    masteryCert,
    certsEnabled,
  });
}