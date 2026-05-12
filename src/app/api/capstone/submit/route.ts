import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { validateSessionToken } from "@/lib/cookies";

const MAX_SUBMISSIONS = 3;

const DUMMY_REVIEW = {
  criteria: [
    { name: "Role defined", result: "pass", reason: "A clear role is present in the instructions." },
    { name: "Task is specific", result: "pass", reason: "The use case is well defined and concrete." },
    { name: "Output format stated", result: "pass", reason: "Format is described clearly." },
    { name: "At least one constraint", result: "fail", reason: "No constraints found — consider adding what the tool should never do." },
    { name: "Stands alone", result: "pass", reason: "The file is self-contained and understandable without extra context." },
  ],
  score: 4,
  summary: "Strong submission with a clear use case and defined output. Adding a constraint section would make it significantly more reliable.",
};

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

  // Parse multipart form data
  const formData = await req.formData();
  const description = formData.get("description") as string | null;
  const gemUrl = formData.get("gemUrl") as string | null;
  const file = formData.get("file") as File | null;

  if (!description || description.trim().length === 0) {
    return NextResponse.json(
      { ok: false, error: "Description is required." },
      { status: 400 }
    );
  }

  if (!file) {
    return NextResponse.json(
      { ok: false, error: "Instruction file is required." },
      { status: 400 }
    );
  }

  // Check submission count
  const { data: existingSubmissions } = await supabase
    .from("capstone_submissions")
    .select("id")
    .eq("participant_id", participantId);

  const attemptNumber = (existingSubmissions ?? []).length + 1;

  if (attemptNumber > MAX_SUBMISSIONS) {
    return NextResponse.json(
      { ok: false, error: "Maximum of " + String(MAX_SUBMISSIONS) + " submissions reached." },
      { status: 429 }
    );
  }

  // Upload file to Supabase Storage
  let fileUrl: string | null = null;
  try {
    const fileBuffer = await file.arrayBuffer();
    const fileName = participantId + "/attempt-" + String(attemptNumber) + "-" + file.name;

    const { error: uploadError } = await supabase.storage
      .from("capstone-submissions")
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (!uploadError) {
      const { data: urlData } = supabase.storage
        .from("capstone-submissions")
        .getPublicUrl(fileName);
      fileUrl = urlData?.publicUrl ?? null;
    }
  } catch (err) {
    console.error("File upload failed:", err);
    // Continue — cert is issued regardless
  }

  // Fetch participant for cohort
  const { data: participant } = await supabase
    .from("participants")
    .select("cohort_id")
    .eq("id", participantId)
    .single();

  // Issue mastery cert FIRST — before anything else can fail
  let masteryVerificationCode: string | null = null;
  try {
    const existingMasteryCert = await supabase
      .from("certificates")
      .select("id, verification_code")
      .eq("participant_id", participantId)
      .eq("type", "mastery")
      .single();

    if (!existingMasteryCert.data) {
      let code = generateVerificationCode();
      // Ensure uniqueness
      let attempts = 0;
      while (attempts < 5) {
        const { data: existing } = await supabase
          .from("certificates")
          .select("id")
          .eq("verification_code", code)
          .single();
        if (!existing) break;
        code = generateVerificationCode();
        attempts++;
      }

      await supabase.from("certificates").insert({
        participant_id: participantId,
        type: "mastery",
        verification_code: code,
        cohort_id: participant?.cohort_id ?? "unknown",
      });

      masteryVerificationCode = code;
    } else {
      masteryVerificationCode = existingMasteryCert.data.verification_code;
    }
  } catch (err) {
    console.error("Cert issuance failed:", err);
    // Still continue — store submission
  }

  // Store submission with dummy review result
  const { error: submissionError } = await supabase
    .from("capstone_submissions")
    .insert({
      participant_id: participantId,
      gem_url: gemUrl || null,
      description: description.trim(),
      instruction_file_url: fileUrl,
      attempt_number: attemptNumber,
      status: "reviewed",
      review_result: DUMMY_REVIEW,
      review_score: DUMMY_REVIEW.score,
    });

  if (submissionError) {
    console.error("Submission insert failed:", submissionError);
    return NextResponse.json(
      { ok: false, error: "Failed to save submission. Try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    attemptNumber,
    attemptsRemaining: MAX_SUBMISSIONS - attemptNumber,
    verificationCode: masteryVerificationCode,
    reviewResult: DUMMY_REVIEW,
  });
}