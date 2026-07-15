"use client";

import { useEffect, useState } from "react";
import { SITE_BANNERS } from "@/lib/site-banners";

const DISMISSED_KEY_PREFIX = "banner-dismissed-";

interface Props {
  cohortId: string;
}

export function SiteBannerCarousel({ cohortId }: Props) {
  const [visible, setVisible] = useState<typeof SITE_BANNERS>([]);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const applicable = SITE_BANNERS.filter((b) => {
      if (!b.enabled) return false;
      if (b.cohorts.length > 0 && !b.cohorts.includes(cohortId)) return false;
      if (localStorage.getItem(DISMISSED_KEY_PREFIX + b.id)) return false;
      return true;
    });
    setVisible(applicable);
    setReady(true);
  }, [cohortId]);

  function dismiss(id: string) {
    localStorage.setItem(DISMISSED_KEY_PREFIX + id, "true");
    setVisible((prev) => {
      const next = prev.filter((b) => b.id !== id);
      setIndex((i) => Math.min(i, Math.max(next.length - 1, 0)));
      return next;
    });
  }

  function goPrev() {
    setIndex((i) => (i === 0 ? visible.length - 1 : i - 1));
  }

  function goNext() {
    setIndex((i) => (i === visible.length - 1 ? 0 : i + 1));
  }

  if (!ready || visible.length === 0) return null;

  const current = visible[index];

  return (
    <div className="mt-6 mb-6 rounded-r-md border-l-[3px] border-[#E24B4A] bg-[#F6F5F3] px-4 py-3 dark:bg-[#242424]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {current.message.split("\n").map((line, i) => (
            <p
              key={i}
              className="text-[13.5px] leading-relaxed text-foreground"
            >
              {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
                /^\*\*[^*]+\*\*$/.test(part) ? (
                  <strong key={j} className="font-bold">
                    {part.slice(2, -2)}
                  </strong>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
            </p>
          ))}
          {current.linkText && current.linkHref && (
            <a
              href={current.linkHref}
              target={current.linkHref.startsWith("http") ? "_blank" : undefined}
              rel={current.linkHref.startsWith("http") ? "noreferrer" : undefined}
              className="mt-1 inline-block text-[13.5px] font-medium text-[#A32D2D] hover:underline"
            >
              {current.linkText} →
            </a>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          {visible.length > 1 && (
            <>
              <button
                onClick={goPrev}
                aria-label="Previous message"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                {String(index + 1) + " / " + String(visible.length)}
              </span>
              <button
                onClick={goNext}
                aria-label="Next message"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
          <button
            onClick={() => dismiss(current.id)}
            aria-label="Dismiss"
            className="text-muted-foreground hover:text-foreground"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}