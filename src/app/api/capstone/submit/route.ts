import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { validateSessionToken } from "@/lib/cookies";

const PASS_KEYWORD = "MUSE-EVAL-VERIFIED-4X9";
const FAIL_KEYWORD = "[ref:MUSE-EVAL-PENDING-4X9]";
const REVIEW_GPT_LABEL = "the AI review tool listed above";

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

  // Check if already passed — one row per participant, on pass only
  const { data: existingCert } = await supabase
    .from("certificates")
    .select("id, verification_code")
    .eq("participant_id", participantId)
    .eq("type", "mastery")
    .single();

  if (existingCert) {
    return NextResponse.json(
      { ok: false, error: "You have already submitted your capstone and earned your Certificate of Mastery." },
      { status: 409 }
    );
  }

  // Parse JSON body
  let body: { reviewReport?: string; description?: string; gemUrl?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { reviewReport, description, gemUrl } = body;

  if (!reviewReport || reviewReport.trim().length === 0) {
    return NextResponse.json(
      { ok: false, error: "Please paste the report from the Review GPT." },
      { status: 400 }
    );
  }

  if (!description || description.trim().length === 0) {
    return NextResponse.json(
      { ok: false, error: "Description is required." },
      { status: 400 }
    );
  }

  const report = reviewReport.trim();

  // Keyword check
  if (!report.includes(PASS_KEYWORD) && !report.includes(FAIL_KEYWORD)) {
    return NextResponse.json({
      ok: false,
      result: "wrong_source",
      error: "Please use " + REVIEW_GPT_LABEL + " and paste the complete result.",
    });
  }

  if (report.includes(FAIL_KEYWORD) && !report.includes(PASS_KEYWORD)) {
    return NextResponse.json({
      ok: false,
      result: "fail",
      error: "Try again after making changes to your AI tool.",
    });
  }

  // PASS — report contains PASS_KEYWORD
  // Fetch participant for cohort_id and certs_enabled flag
  const { data: participant } = await supabase
    .from("participants")
    .select("cohort_id, certs_enabled")
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

  // Issue mastery cert
  const { data: newCert, error: certError } = await supabase
    .from("certificates")
    .insert({
      participant_id: participantId,
      type: "mastery",
      verification_code: verificationCode,
      cohort_id: participant.cohort_id,
    })
    .select("id")
    .single();

  if (certError) {
    console.error("Cert issuance failed:", certError);
    return NextResponse.json(
      { ok: false, error: "Failed to issue certificate. Try again." },
      { status: 500 }
    );
  }

  // Save submission row (pass only — one row per participant ever)
  const { error: submissionError } = await supabase
    .from("capstone_submissions")
    .insert({
      participant_id: participantId,
      gem_url: gemUrl?.trim() || null,
      description: description.trim(),
      review_report: report,
      status: "reviewed",
    });

  if (submissionError) {
    console.error("Submission insert failed:", submissionError);
    // Cert already issued — don't fail the request, just log
  }

  return NextResponse.json({
    ok: true,
    result: "pass",
    verificationCode,
    certId: newCert?.id ?? "",
    certsEnabled: participant.certs_enabled ?? true,
  });
}