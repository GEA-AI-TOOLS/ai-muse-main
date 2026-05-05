import { redirect } from "next/navigation";
import { getParticipant } from "@/lib/n8n";

export default async function TodayPage() {
  let participantRes;

  try {
    participantRes = await getParticipant();
  } catch {
    redirect("/login?reason=new-device");
  }

  const { participant } = participantRes;

  if (participant.status === "completed") {
    redirect("/progress");
  }

  if (participant.currentDay < 1) {
    redirect("/progress");
  }

  redirect("/lesson/" + String(participant.currentDay));
}