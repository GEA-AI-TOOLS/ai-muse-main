import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  validateSessionToken,
  getSessionData,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/cookies";

const SESSION_TTL_MS = 10 * 60 * 1000; // 10 min

export async function GET(req: NextRequest) {

  const sessionData = await getSessionData();

  // --- Fast path: serve from cookie if fresh and not revoked ---
  if (sessionData && sessionData.fetchedAt) {
    const age = Date.now() - sessionData.fetchedAt;

    if (sessionData.revoked) {
      const res = NextResponse.json({ error: "Access revoked." }, { status: 403 });
      res.cookies.set("auth", "", { ...SESSION_COOKIE_OPTIONS, maxAge: 0 });
      res.cookies.set("session_data", "", { ...SESSION_COOKIE_OPTIONS, maxAge: 0 });
      return res;
    }

    if (age < SESSION_TTL_MS) {
      // Fresh enough — zero DB calls
      return NextResponse.json({
        participant: {
          id: "from-session",
          name: sessionData.name,
          email: sessionData.email,
          cohortId: sessionData.cohortId,
          currentDay: sessionData.currentDay,
          status: sessionData.status ?? "active",
          timezone: "UTC",
          enrolledAt: "",
          revoked: sessionData.revoked,
          daysComplete: sessionData.daysComplete,
        },
      });
    }
  }

  // --- Slow path: cookie missing or stale → refresh from DB ---
  const authToken = req.cookies.get("auth")?.value;
  if (!authToken) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const participantId = await validateSessionToken(authToken);
  if (!participantId) {
    return NextResponse.json({ error: "Invalid or expired session." }, { status: 401 });
  }

  const { data: participant, error: pError } = await supabase
    .from("participants")
    .select("id, name, email, cohort_id, current_day, status, timezone, enrolled_at, revoked")
    .eq("id", participantId)
    .single();

  if (pError || !participant) {
    return NextResponse.json({ error: "Participant not found." }, { status: 404 });
  }

  if (participant.revoked) {
    const res = NextResponse.json({ error: "Access revoked." }, { status: 403 });
    res.cookies.set("auth", "", { ...SESSION_COOKIE_OPTIONS, maxAge: 0 });
    res.cookies.set("session_data", "", { ...SESSION_COOKIE_OPTIONS, maxAge: 0 });
    return res;
  }

  const { data: dayStates } = await supabase
    .from("participant_day_state")
    .select("day, done_at")
    .eq("participant_id", participant.id);

  const daysComplete = (dayStates ?? [])
    .filter((d) => d.done_at !== null)
    .map((d) => d.day as number);

  const newSessionData = {
    name: participant.name,
    email: participant.email,
    cohortId: participant.cohort_id,
    currentDay: participant.current_day,
    daysComplete,
    revoked: participant.revoked,
    status: participant.status,
    fetchedAt: Date.now(),
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

  res.cookies.set("session_data", JSON.stringify(newSessionData), SESSION_COOKIE_OPTIONS);
  return res;
}