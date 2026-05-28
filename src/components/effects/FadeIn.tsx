"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  FadeIn – scroll‑triggered fade + translate wrapper                */
/* ------------------------------------------------------------------ */

interface FadeInProps {
  children: ReactNode;
  /** Direction the element fades in FROM (default "up") */
  direction?: "up" | "down" | "left" | "right";
  /** Stagger delay in seconds */
  delay?: number;
  /** Extra Tailwind classes */
  className?: string;
}

/** Translate offsets per direction */
const offsets: Record<NonNullable<FadeInProps["direction"]>, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: FadeInProps) {
  const offset = offsets[direction];

  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
        delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
