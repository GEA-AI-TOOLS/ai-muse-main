"use client";

import { useCallback, useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { AUDIT_PERSONA } from "@/lib/audit-config";

const DAY1_KEY = "audit_progress:day1_done";

function readDay1(): boolean {
  try {
    return window.localStorage.getItem(DAY1_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Visitor's own audit progress. Only Day 1 can be completed.
 * Server render and first client render both use the fresh-visitor state,
 * then the stored value loads after mount, so there is no hydration mismatch.
 */
export function useAuditProgress() {
  const [day1Done, setDay1Done] = useState(false);

  useEffect(() => {
    setDay1Done(readDay1());
    function onStorage(e: StorageEvent) {
      if (e.key === DAY1_KEY) setDay1Done(e.newValue === "1");
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const markDay1Done = useCallback(() => {
    if (readDay1()) return;
    try {
      window.localStorage.setItem(DAY1_KEY, "1");
    } catch {
      // ignore, state below still updates for this page view
    }
    setDay1Done(true);
    track("audit_day1_completed");
  }, []);

  return {
    day1Done,
    currentDay: day1Done ? 2 : AUDIT_PERSONA.currentDay,
    daysComplete: day1Done ? [1] : AUDIT_PERSONA.daysComplete,
    markDay1Done,
  };
}