import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { validateSessionToken } from "@/lib/cookies";
import { PreferencesView } from "./preferences-view";

export const dynamic = "force-dynamic";

export default async function PreferencesPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth")?.value;

  if (!authToken) redirect("/login?reason=new-device");

  const participantId = await validateSessionToken(authToken);
  if (!participantId) redirect("/login?reason=new-device");

  const { data: participant } = await supabase
    .from("participants")
    .select("id, name, email, phone, phone_verified, email_reminders, whatsapp_reminders")
    .eq("id", participantId)
    .single();

  if (!participant) redirect("/login?reason=new-device");

  const { data: sessions } = await supabase
    .from("sessions")
    .select("id, session_token, device_label, last_seen_at, created_at, expires_at")
    .eq("participant_id", participantId)
    .gt("expires_at", new Date().toISOString())
    .order("last_seen_at", { ascending: false });

  return (
    <PreferencesView
      participant={{
        name: participant.name,
        email: participant.email,
        phone: participant.phone ?? "",
        phoneVerified: participant.phone_verified ?? false,
        emailReminders: participant.email_reminders ?? true,
        whatsappReminders: participant.whatsapp_reminders ?? false,
      }}
      sessions={sessions ?? []}
      currentToken={authToken}
    />
  );
}