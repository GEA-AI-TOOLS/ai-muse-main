import { AUDIT_COPY, AUDIT_ENROLL_HREF } from "@/lib/audit-config";

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/**
 * Always the first element on any audit page. Sticky from top:0 with a
 * fixed height, so lesson pages can offset their own sticky nav by that
 * exact height and stack cleanly underneath.
 */
export function AuditBar() {
  return (
    <div className="sticky top-0 z-40 flex h-10 items-center border-b border-[#BFDBFE] bg-[#EFF6FF] dark:border-[#1D4ED8] dark:bg-[#132a4d]">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-2 px-8">
        <p className="flex items-center gap-1.5 text-xs text-[#1D4ED8] dark:text-[#BFDBFE]">
          <EyeIcon />
          <span className="font-medium">{AUDIT_COPY.barLabel}</span>
          <span className="hidden sm:inline">{" " + AUDIT_COPY.barText}</span>
        </p>
        <a
          href={AUDIT_ENROLL_HREF}
          className="shrink-0 rounded bg-[#E24B4A] px-3 py-1 text-xs font-medium text-white hover:bg-[#c73f3e]"
        >
          {AUDIT_COPY.barCta}
        </a>
      </div>
    </div>
  );
}

/** Not sticky. Same visual weight as the real header, placeholder identity instead of a name dropdown. */
export function AuditHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-8 py-4">
        <a href="/audit" className="flex items-center gap-2 hover:opacity-80">
          <img src="/assets/site-icon.png" alt="AI Muse" className="h-7 w-7 rounded object-contain" />
          <span className="text-base font-medium">Make AI Your Muse</span>
        </a>
        <span className="text-sm text-muted-foreground">{AUDIT_COPY.headerName}</span>
      </div>
    </header>
  );
}