import { redirect } from "next/navigation";
import { getParticipant, N8nError } from "@/lib/n8n";
import { supabase } from "@/lib/supabase";

export default async function TodayPage() {
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

  if ((participant.daysComplete ?? []).length === 10) {
    // Check if mastery cert already issued — if so go to progress
    const { data: masteryCert } = await supabase
      .from("certificates")
      .select("id")
      .eq("participant_id", participant.id)
      .eq("type", "mastery")
      .maybeSingle();

    if (masteryCert) {
      redirect("/progress");
    } else {
      redirect("/capstone");
    }
  }

  if (participant.currentDay === 0) {
    redirect("/waiting");
  }

  redirect("/lesson/" + String(participant.currentDay));
}