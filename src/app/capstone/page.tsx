import { getParticipant, N8nError } from "@/lib/n8n";
import { supabase } from "@/lib/supabase";
import { CapstoneView } from "./capstone-view";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CapstonePage() {
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

  // Lock capstone until all 10 days are marked done
  if ((participant.daysComplete ?? []).length < 10) {
    redirect("/progress");
  }

  const { data: submission } = await supabase
    .from("capstone_submissions")
    .select("status")
    .eq("participant_id", participant.id)
    .order("attempt_number", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (submission?.status === "reviewed") {
    redirect("/progress");
  }

  return <CapstoneView participant={participant} />;
}