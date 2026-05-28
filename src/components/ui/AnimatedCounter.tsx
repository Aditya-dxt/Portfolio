"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

/* ------------------------------------------------------------------ */
/*  AnimatedCounter – counts from 0 to `target` with easing           */
/*  Triggers once when the element scrolls into view.                 */
/* ------------------------------------------------------------------ */

interface AnimatedCounterProps {
  /** The target number to animate towards */
  target: number;
  /** Optional suffix displayed after the number (e.g. "+" or "%") */
  suffix?: string;
  /** Optional prefix displayed before the number (e.g. "$") */
  prefix?: string;
  /** Duration of the counting animation in milliseconds */
  duration?: number;
}

/**
 * Ease‑out cubic: decelerates towards the end so the counter
 * slows down naturally as it approaches the target number.
 */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  /* react‑intersection‑observer provides a ref + inView boolean */
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return (
    <span
      ref={ref}
      className="inline-block text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#06d6a0] bg-clip-text text-transparent tabular-nums"
    >
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default AnimatedCounter;
