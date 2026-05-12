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

  // Latest submission
  const { data: submissions } = await supabase
    .from("capstone_submissions")
    .select("id, attempt_number, description, gem_url, status, review_result, review_score, submitted_at")
    .eq("participant_id", participantId)
    .order("attempt_number", { ascending: false })
    .limit(1);

  const latest = submissions?.[0] ?? null;
  const totalSubmissions = submissions ? await supabase
    .from("capstone_submissions")
    .select("id", { count: "exact" })
    .eq("participant_id", participantId)
    .then((r) => r.count ?? 0) : 0;

  // Certs
  const { data: certs } = await supabase
    .from("certificates")
    .select("id, type, issued_at, verification_code, cohort_id")
    .eq("participant_id", participantId);

  const completionCert = certs?.find((c) => c.type === "completion") ?? null;
  const masteryCert = certs?.find((c) => c.type === "mastery") ?? null;

  return NextResponse.json({
    ok: true,
    submission: latest,
    totalSubmissions,
    attemptsRemaining: Math.max(0, 3 - Number(totalSubmissions)),
    completionCert,
    masteryCert,
  });
}