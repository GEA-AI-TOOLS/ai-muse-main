import { getParticipant } from "@/lib/n8n";
import { CapstoneView } from "./capstone-view";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CapstonePage() {
  const { participant } = await getParticipant();

  // Lock capstone until all 10 days are marked done
  if ((participant.daysComplete ?? []).length < 10) {
    redirect("/progress");
  }

  return <CapstoneView participant={participant} />;
}