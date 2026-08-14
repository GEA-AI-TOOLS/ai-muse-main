import { supabase } from "@/lib/supabase";

export interface CohortAccess {
  locked: boolean;
  opensAt: string | null; // ISO string, null when no restriction
  isSaleBatch: boolean; // true whenever access_opens_at is set at all, locked or not
}

/**
 * Lessons are open unless the cohort has an access_opens_at in the future.
 * NULL access_opens_at (every normal cohort) => always open, not a sale batch.
 * A NON-NULL access_opens_at marks a sale-batch cohort permanently, even after
 * the lock date has passed — used downstream to keep those cohorts on
 * day-by-day unlock instead of the normal all-10-at-once self_paced behavior.
 */
export async function getCohortAccess(cohortId: string): Promise<CohortAccess> {
  const { data, error } = await supabase
    .from("cohorts")
    .select("access_opens_at")
    .eq("cohort_id", cohortId)
    .single();

  if (error || !data || !data.access_opens_at) {
    return { locked: false, opensAt: null, isSaleBatch: false };
  }

  const opensAt = new Date(data.access_opens_at);
  return {
    locked: opensAt.getTime() > Date.now(),
    opensAt: data.access_opens_at as string,
    isSaleBatch: true,
  };
}

export function formatAccessDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}