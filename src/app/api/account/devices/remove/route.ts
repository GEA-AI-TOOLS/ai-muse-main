import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { validateSessionToken } from "@/lib/cookies";

export async function POST(req: NextRequest) {
  const authToken = req.cookies.get("auth")?.value;
  if (!authToken) {
    return NextResponse.json(
      { ok: false, error: "Not authenticated." },
      { status: 401 }
    );
  }

  const participantId = await validateSessionToken(authToken);
  if (!participantId) {
    return NextResponse.json(
      { ok: false, error: "Invalid session." },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { sessionId } = body;

  if (!sessionId) {
    return NextResponse.json(
      { ok: false, error: "Session ID required." },
      { status: 400 }
    );
  }

  const { data: session } = await supabase
    .from("sessions")
    .select("id, session_token")
    .eq("id", sessionId)
    .eq("participant_id", participantId)
    .single();

  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Session not found." },
      { status: 404 }
    );
  }

  await supabase.from("sessions").delete().eq("id", sessionId);

  const removedCurrent = session.session_token === authToken;

  const res = NextResponse.json({ ok: true, removedCurrent });

  if (removedCurrent) {
    res.cookies.set("auth", "", { httpOnly: true, maxAge: 0, path: "/" });
    res.cookies.set("session_data", "", { httpOnly: true, maxAge: 0, path: "/" });
  }

  return res;
}