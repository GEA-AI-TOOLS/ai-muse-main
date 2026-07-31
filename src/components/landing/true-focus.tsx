"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "motion/react";

export interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function TrueFocus({
  sentence = "True Focus",
  separator = " ",
  manualMode = false,
  blurAmount = 5,
  borderColor = "#E24B4A",
  glowColor = "rgba(226,75,74,0.55)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = "",
}: TrueFocusProps) {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);
      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;
    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();
    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  function handleMouseEnter(index: number) {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  }

  function handleMouseLeave() {
    if (manualMode && lastActiveIndex !== null) {
      setCurrentIndex(lastActiveIndex);
    }
  }

  return (
    <div
      className={"relative flex flex-wrap items-center gap-x-3 gap-y-1 " + className}
      ref={containerRef}
      style={{ outline: "none", userSelect: "none" }}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className="relative cursor-default"
            style={{
              filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
              transition: `filter ${animationDuration}s ease`,
              outline: "none",
              userSelect: "none",
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="pointer-events-none absolute left-0 top-0 box-border border-0"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
        style={{ "--tf-border": borderColor, "--tf-glow": glowColor } as CSSProperties}
      >
        <span className="absolute -left-2 -top-2 h-3 w-3 rounded-[3px] border-2 border-r-0 border-b-0" style={{ borderColor: "var(--tf-border)", filter: "drop-shadow(0 0 4px var(--tf-border))" }} />
        <span className="absolute -right-2 -top-2 h-3 w-3 rounded-[3px] border-2 border-l-0 border-b-0" style={{ borderColor: "var(--tf-border)", filter: "drop-shadow(0 0 4px var(--tf-border))" }} />
        <span className="absolute -left-2 -bottom-2 h-3 w-3 rounded-[3px] border-2 border-r-0 border-t-0" style={{ borderColor: "var(--tf-border)", filter: "drop-shadow(0 0 4px var(--tf-border))" }} />
        <span className="absolute -right-2 -bottom-2 h-3 w-3 rounded-[3px] border-2 border-l-0 border-t-0" style={{ borderColor: "var(--tf-border)", filter: "drop-shadow(0 0 4px var(--tf-border))" }} />
      </motion.div>
    </div>
  );
}