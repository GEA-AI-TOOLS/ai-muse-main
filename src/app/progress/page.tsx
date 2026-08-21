import { getParticipant } from "@/lib/n8n";
import { getCohortAccess } from "@/lib/cohort-access";
import { ProgressView } from "./progress-view";
import { redirect } from "next/navigation";
import { needsProfileSetup } from "@/lib/profile-gate";

export const dynamic = "force-dynamic";

export default async function ProgressPage() {
  const { participant } = await getParticipant();
  const access = await getCohortAccess(participant.cohortId);

    if (await needsProfileSetup(participant.id)) {
    redirect("/enroll/complete");
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