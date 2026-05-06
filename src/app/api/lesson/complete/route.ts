import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  verifyAuthToken,
  getSessionData,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/cookies";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { day } = body;

  if (!day || typeof day !== "number" || day < 1 || day > 10) {
    return NextResponse.json(
      { ok: false, error: "Invalid day." },
      { status: 400 }
    );
  }

  // Get participant ID from auth cookie
  const authToken = req.cookies.get("auth")?.value;
  if (!authToken) {
    return NextResponse.json(
      { ok: false, error: "Not authenticated." },
      { status: 401 }
    );
  }

  const verified = await verifyAuthToken(authToken);
  if (!verified) {
    return NextResponse.json(
      { ok: false, error: "Invalid session." },
      { status: 401 }
    );
  }

  const participantId = verified.participantId;

  // Mark day as done
  const { error: updateError } = await supabase
    .from("participant_day_state")
    .update({ done_at: new Date().toISOString() })
    .eq("participant_id", participantId)
    .eq("day", day)
    .is("done_at", null); // only update if not already done

  if (updateError) {
    return NextResponse.json(
      { ok: false, error: "Failed to mark complete." },
      { status: 500 }
    );
  }

  // Fetch fresh participant data to rebuild session cookie
  const { data: participant, error: pError } = await supabase
    .from("participants")
    .select("id, name, email, cohort_id, current_day, status, timezone, enrolled_at, revoked")
    .eq("id", participantId)
    .single();

  if (pError || !participant) {
    return NextResponse.json(
      { ok: false, error: "Failed to refresh session." },
      { status: 500 }
    );
  }

  const { data: dayStates } = await supabase
    .from("participant_day_state")
    .select("day, done_at")
    .eq("participant_id", participantId);

  const daysComplete = (dayStates ?? [])
    .filter((d) => d.done_at !== null)
    .map((d) => d.day as number);

  // Build fresh session_data
  const newSessionData = {
    name: participant.name,
    email: participant.email,
    cohortId: participant.cohort_id,
    currentDay: participant.current_day,
    daysComplete,
    revoked: participant.revoked,
  };

  const res = NextResponse.json({ ok: true, daysComplete });

  // Refresh session cookie with updated daysComplete
  res.cookies.set(
    "session_data",
    JSON.stringify(newSessionData),
    SESSION_COOKIE_OPTIONS
  );

  return res;
}