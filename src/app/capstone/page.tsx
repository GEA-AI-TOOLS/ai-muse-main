import { getParticipant } from "@/lib/n8n";
import { CapstoneView } from "./capstone-view";

export const dynamic = "force-dynamic";

export default async function CapstonePage() {
  const { participant } = await getParticipant();
  return <CapstoneView participant={participant} />;
}