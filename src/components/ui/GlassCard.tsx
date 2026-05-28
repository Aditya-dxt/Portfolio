"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  GlassCard – glassmorphism card with optional hover glow           */
/* ------------------------------------------------------------------ */

interface GlassCardProps {
  children: ReactNode;
  /** Extra Tailwind classes merged onto the card container */
  className?: string;
  /** Enable hover effects: subtle scale‑up + purple border glow */
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hover = false,
}: GlassCardProps) {
  return (
    <motion.div
      className={[
        // Base card styles
        "rounded-2xl p-6",
        "bg-white/70 dark:bg-white/5",
        "backdrop-blur-xl",
        "border border-white/10",
        // Transition for border color changes
        "transition-colors duration-300",
        // Optional hover styles applied via group / CSS
        hover
          ? "hover:border-[#8b5cf6]/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      /* Framer Motion hover scale – only when `hover` is true */
      whileHover={hover ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;
