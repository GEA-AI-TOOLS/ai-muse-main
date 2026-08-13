import { getParticipant } from "@/lib/n8n";
import { getCohortAccess } from "@/lib/cohort-access";
import { ProgressView } from "./progress-view";

export const dynamic = "force-dynamic";

export default async function ProgressPage() {
  const { participant } = await getParticipant();
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