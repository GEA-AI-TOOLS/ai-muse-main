import { getParticipant } from "@/lib/n8n";
import { WelcomeView } from "./welcome-view";

export const dynamic = "force-dynamic";

export default async function WelcomePage() {
  const { participant } = await getParticipant();
  return <WelcomeView participant={participant} />;
}