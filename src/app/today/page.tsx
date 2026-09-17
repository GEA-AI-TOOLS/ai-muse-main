import { getParticipant, N8nError } from "@/lib/n8n";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { needsProfileSetup } from "@/lib/profile-gate";

export const dynamic = "force-dynamic";

export default async function TodayPage({
  searchParams,
}: {
  searchParams: Promise<{ s?: string }>;
}) {
  let participantRes;

  try {
    participantRes = await getParticipant();
  } catch (err) {
    if (err instanceof N8nError) {
      redirect("/login?reason=new-device");
    }
    throw err;
  }

  const { participant } = participantRes;

  if (await needsProfileSetup(participant.id)) {
    redirect("/enroll/complete");
  }

  const allDone = (participant.daysComplete ?? []).length === 10;

  if (allDone) {
    // Capstone status is tracked on its own submission row, not inferred
    // from whether a certificate happens to exist yet — cert issuance can
    // lag behind an actual reviewed submission.
    const { data: submission } = await supabase
      .from("capstone_submissions")
      .select("status")
      .eq("participant_id", participant.id)
      .order("attempt_number", { ascending: false })
      .limit(1)
      .maybeSingle();

    const capstoneDone = submission?.status === "reviewed";

    if (!capstoneDone) {
      redirect("/capstone");
    }

    redirect("/progress");
  }

  if (participant.currentDay === 0) {
    redirect("/waiting");
  }

  const { s } = await searchParams;
  redirect("/lesson/" + String(participant.currentDay) + (s ? "?s=" + s : ""));
}