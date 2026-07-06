import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const VALID_SECTIONS = ["essential", "advanced", "learnmore"] as const;
type Section = (typeof VALID_SECTIONS)[number];

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const fallback = new URL("/today", req.url);

  // 1. Parse + validate ?s= param
  const rawSection = req.nextUrl.searchParams.get("s") ?? "essential";
  const section: Section = (VALID_SECTIONS as readonly string[]).includes(rawSection)
    ? (rawSection as Section)
    : "essential";

  const supabase = getServiceClient();

  // 2. Look up token
  const { data: tokenRow } = await supabase
    .from("tracking_tokens")
    .select("participant_id, day")
    .eq("token", token)
    .maybeSingle();

  if (!tokenRow) {
    return NextResponse.redirect(fallback, { status: 302 });
  }

  const { participant_id, day } = tokenRow;
  const userAgent = req.headers.get("user-agent") ?? "";

  // 3. Fire all DB writes in parallel — don't block the redirect on any failure
  await Promise.allSettled([
    // Always log the click
    supabase.from("click_logs").insert({
      participant_id,
      day,
      section,
      tracking_token: token,
      user_agent: userAgent,
      clicked_at: new Date().toISOString(),
    }),

    // Mark first click on participant_day_state (only if not already set)
    supabase
      .from("participant_day_state")
      .update({ link_clicked_at: new Date().toISOString() })
      .eq("participant_id", participant_id)
      .eq("day", day)
      .is("link_clicked_at", null),

    // Track essential clicks on participants table
    ...(section === "essential"
      ? [
          supabase
            .from("participants")
            .update({ last_essential_click_at: new Date().toISOString() })
            .eq("id", participant_id),
        ]
      : []),
  ]);

  // 4. Redirect to the SPECIFIC day this link was for (from the token), not /today.
  //    A Day 4 link must open Day 4 even if the participant is now on Day 5.
  const dest = new URL("/lesson/" + String(day), req.url);
  dest.searchParams.set("s", section);
  return NextResponse.redirect(dest, { status: 302 });
}