import { getParticipant } from "@/lib/n8n";
import { ProgressView } from "./progress-view";

export const dynamic = "force-dynamic";

export default async function ProgressPage() {
  const { participant } = await getParticipant();
  return <ProgressView participant={participant} />;
}