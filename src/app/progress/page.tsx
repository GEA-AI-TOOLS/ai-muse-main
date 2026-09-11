import { getParticipant } from "@/lib/n8n";
import { getCohortAccess } from "@/lib/cohort-access";
import { ProgressView } from "./progress-view";
import { redirect } from "next/navigation";
import { needsProfileSetup } from "@/lib/profile-gate";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ProgressPage() {
  const { participant } = await getParticipant();
  const access = await getCohortAccess(participant.cohortId);

    if (await needsProfileSetup(participant.id)) {
    redirect("/enroll/complete");
  }

  const allDone = (participant.daysComplete ?? []).length === 10;
  if (allDone) {
    const { data: completionCert } = await supabase
      .from("certificates")
      .select("id")
      .eq("participant_id", participant.id)
      .eq("type", "completion")
      .maybeSingle();

    if (!completionCert) {
      redirect("/capstone");
    }
  }

  return (
    <ProgressView
      participant={participant}
      accessLocked={access.locked}
      accessOpensAt={access.opensAt}
      isSaleBatch={access.isSaleBatch}
    />
  );
}