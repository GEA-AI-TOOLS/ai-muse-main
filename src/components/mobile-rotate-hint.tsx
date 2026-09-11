"use client";

import { useIsMobile } from "@/hooks/use-is-mobile";

export function MobileRotateHint() {
  const isMobile = useIsMobile();
  if (!isMobile) return null;

  return (
    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="2" transform="rotate(90 12 12)" />
      </svg>
      Rotate your screen for more video controls
    </p>
  );
}