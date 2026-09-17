import { getParticipant, N8nError } from "@/lib/n8n";
import { getCohortAccess } from "@/lib/cohort-access";
import { ProgressView } from "./progress-view";
import { redirect } from "next/navigation";
import { needsProfileSetup } from "@/lib/profile-gate";

export const dynamic = "force-dynamic";

export default async function ProgressPage() {
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

  const access = await getCohortAccess(participant.cohortId);

  return (
    <ProgressView
      participant={participant}
      accessLocked={access.locked}
      accessOpensAt={access.opensAt}
      isSaleBatch={access.isSaleBatch}
    />
  );
}