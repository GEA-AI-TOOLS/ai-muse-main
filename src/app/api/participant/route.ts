import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  verifyAuthToken,
  getSessionData,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/cookies";

export async function GET(req: NextRequest) {
  // Check session_data cookie first — if present, use it directly
  const sessionData = await getSessionData();

  if (sessionData) {
    // Revoked check
    if (sessionData.revoked) {
      const res = NextResponse.json(
        { error: "Access revoked." },
        { status: 403 }
      );
      res.cookies.set("auth", "", { ...SESSION_COOKIE_OPTIONS, maxAge: 0 });
      res.cookies.set("session_data", "", { ...SESSION_COOKIE_OPTIONS, maxAge: 0 });
      return res;
    }

    return NextResponse.json({
      participant: {
        id: "from-session",
        name: sessionData.name,
        email: sessionData.email,
        cohortId: sessionData.cohortId,
        currentDay: sessionData.currentDay,
        status: "active",
        timezone: "UTC",
        enrolledAt: "",
        revoked: sessionData.revoked,
        daysComplete: sessionData.daysComplete,
      },
    });
  }

  // session_data missing — rebuild from Supabase using auth cookie
  const authToken = req.cookies.get("auth")?.value;
  if (!authToken) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const verified = await verifyAuthToken(authToken);
  if (!verified) {
    return NextResponse.json({ error: "Invalid session." }, { status: 401 });
  }

  // Fetch participant from Supabase
  const { data: participant, error: pError } = await supabase
    .from("participants")
    .select("id, name, email, cohort_id, current_day, status, timezone, enrolled_at, revoked")
    .eq("id", verified.participantId)
    .single();

  if (pError || !participant) {
    return NextResponse.json({ error: "Participant not found." }, { status: 404 });
  }

  // Revoked check
  if (participant.revoked) {
    const res = NextResponse.json({ error: "Access revoked." }, { status: 403 });
    res.cookies.set("auth", "", { ...SESSION_COOKIE_OPTIONS, maxAge: 0 });
    res.cookies.set("session_data", "", { ...SESSION_COOKIE_OPTIONS, maxAge: 0 });
    return res;
  }

  // Fetch day states
  const { data: dayStates } = await supabase
    .from("participant_day_state")
    .select("day, done_at")
    .eq("participant_id", participant.id);

  const daysComplete = (dayStates ?? [])
    .filter((d) => d.done_at !== null)
    .map((d) => d.day as number);

  // Rebuild session_data cookie
  const newSessionData = {
    name: participant.name,
    email: participant.email,
    cohortId: participant.cohort_id,
    currentDay: participant.current_day,
    daysComplete,
    revoked: participant.revoked,
  };

  const res = NextResponse.json({
    participant: {
      id: participant.id,
      name: participant.name,
      email: participant.email,
      cohortId: participant.cohort_id,
      currentDay: participant.current_day,
      status: participant.status,
      timezone: participant.timezone,
      enrolledAt: participant.enrolled_at,
      revoked: participant.revoked,
      daysComplete,
    },
  });

  res.cookies.set(
    "session_data",
    JSON.stringify(newSessionData),
    SESSION_COOKIE_OPTIONS
  );

  return res;
}