import { redirect } from "next/navigation";
import { getParticipant, N8nError } from "@/lib/n8n";

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

  if (participant.status === "completed") {
    redirect("/capstone");
  }

  if (participant.currentDay === 0) {
    redirect("/waiting");
  }

  redirect("/lesson/" + String(participant.currentDay));
}