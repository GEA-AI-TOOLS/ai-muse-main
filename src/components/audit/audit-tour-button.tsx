"use client";

import { TOUR_START_EVENT } from "@/lib/audit-tour";
import { AUDIT_COPY } from "@/lib/audit-config";

function CompassIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
    </svg>
  );
}

export function AuditTourButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(TOUR_START_EVENT))}
      className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-[#1D4ED8] hover:bg-[#DBEAFE] dark:text-[#BFDBFE] dark:hover:bg-[#1e3a6e]"
    >
      <CompassIcon />
      {AUDIT_COPY.barTour}
    </button>
  );
}