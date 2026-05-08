import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { validateSessionToken } from "@/lib/cookies";
import { DevicesView } from "./devices-view";

export const dynamic = "force-dynamic";

export default async function DevicesPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth")?.value;

  if (!authToken) redirect("/login?reason=new-device");

  const participantId = await validateSessionToken(authToken);
  if (!participantId) redirect("/login?reason=new-device");

  const { data: sessions } = await supabase
    .from("sessions")
    .select("id, session_token, device_label, last_seen_at, created_at, expires_at")
    .eq("participant_id", participantId)
    .gt("expires_at", new Date().toISOString())
    .order("last_seen_at", { ascending: false });

  return (
    <DevicesView
      sessions={sessions ?? []}
      currentToken={authToken}
    />
  );
}