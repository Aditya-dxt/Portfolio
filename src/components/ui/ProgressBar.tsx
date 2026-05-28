"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/* ------------------------------------------------------------------ */
/*  ProgressBar – animated skill bar with glassmorphism track         */
/* ------------------------------------------------------------------ */

interface ProgressBarProps {
  /** Skill / category label */
  label: string;
  /** Fill percentage (0–100) */
  percentage: number;
  /** Optional custom Tailwind gradient or solid color class for the fill bar.
   *  Defaults to a purple → cyan gradient. */
  color?: string;
}

export function ProgressBar({
  label,
  percentage,
  color,
}: ProgressBarProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  const fillClass =
    color ?? "bg-gradient-to-r from-[#8b5cf6] to-[#06d6a0]";

  return (
    <div ref={ref} className="w-full space-y-2">
      {/* ── Label row ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-[#f0f0f0]">{label}</span>
        <span className="font-mono text-[#a0a0c0]">{percentage}%</span>
      </div>

      {/* ── Track (glassmorphism) ──────────────────────────────── */}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/5 backdrop-blur-md border border-white/10">
        {/* ── Fill ─────────────────────────────────────────────── */}
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${fillClass}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
