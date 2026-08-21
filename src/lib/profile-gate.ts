import { supabase } from "@/lib/supabase";

/**
 * True when this participant still needs to finish the post-payment setup
 * step (email verification, timezone, phone). Pages that require a usable
 * account should redirect to /enroll/complete when this returns true.
 */
export async function needsProfileSetup(participantId: string): Promise<boolean> {
  const { data } = await supabase
    .from("participants")
    .select("profile_completed_at")
    .eq("id", participantId)
    .single();

  return !!data && data.profile_completed_at === null;
}