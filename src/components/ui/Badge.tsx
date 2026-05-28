"use client";

import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Badge – small pill‑shaped label for tech / skills                 */
/* ------------------------------------------------------------------ */

interface BadgeProps {
  /** Text displayed inside the badge */
  text: string;
  /** Visual variant */
  variant?: "default" | "outline" | "gradient";
}

/** Map each variant to its Tailwind classes */
const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  outline:
    "bg-transparent text-[#a0a0c0] border border-white/20",
  gradient:
    "bg-gradient-to-r from-[#8b5cf6] to-[#06d6a0] text-white border-none",
};

export function Badge({ text, variant = "default" }: BadgeProps) {
  return (
    <motion.span
      className={[
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        "select-none whitespace-nowrap",
        "transition-shadow duration-300",
        variantStyles[variant],
      ].join(" ")}
      whileHover={{
        scale: 1.08,
        boxShadow:
          variant === "gradient"
            ? "0 0 14px rgba(6,214,160,0.35)"
            : "0 0 14px rgba(139,92,246,0.3)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {text}
    </motion.span>
  );
}

export default Badge;
