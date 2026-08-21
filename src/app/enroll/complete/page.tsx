import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { validateSessionToken } from "@/lib/cookies";
import { CompleteForm } from "./complete-form";

export const dynamic = "force-dynamic";

export default async function CompleteProfilePage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth")?.value;

  if (!authToken) {
    redirect("/login");
  }

  const participantId = await validateSessionToken(authToken);

  if (!participantId) {
    redirect("/login");
  }

  const { data: participant } = await supabase
    .from("participants")
    .select("id, name, email, phone, email_verified, phone_verified, profile_completed_at")
    .eq("id", participantId)
    .single();

  if (!participant) {
    redirect("/login");
  }

  // One-time page. Once completed, all further edits live in preferences.
  if (participant.profile_completed_at) {
    redirect("/progress");
  }

  return (
    <CompleteForm
      initialName={participant.name}
      initialEmail={participant.email}
      initialEmailVerified={participant.email_verified ?? false}
      initialPhone={participant.phone ?? ""}
      initialPhoneVerified={participant.phone_verified ?? false}
    />
  );
}