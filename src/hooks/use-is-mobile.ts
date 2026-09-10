"use client";

import { useState, useEffect } from "react";

/**
 * Detects touch/mobile devices ONCE on mount via pointer type, not viewport
 * width. Deliberately does not listen to resize/orientationchange — a phone
 * rotating from portrait to landscape must not flip this value, or React
 * unmounts/remounts the mobile vs desktop subtree mid-playback.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsMobile(mq.matches);
    // No listener attached on purpose — see comment above.
  }, []);

  return isMobile;
}