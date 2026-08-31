"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a numeric value from 0 to `target` once the element scrolls
 * into view. Respects prefers-reduced-motion by jumping straight to the
 * target instead of animating.
 */
export function useCountUp(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;

        if (prefersReducedMotion) {
          setValue(target);
          return;
        }

        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - start) / durationMs);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
          setValue(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, durationMs]);

  return { value, ref };
}
