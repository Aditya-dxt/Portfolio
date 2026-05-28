"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  SlideIn – scroll‑triggered horizontal slide + fade wrapper        */
/* ------------------------------------------------------------------ */

interface SlideInProps {
  children: ReactNode;
  /** Slide direction – the element enters FROM this side */
  direction?: "left" | "right";
  /** Stagger delay in seconds */
  delay?: number;
  /** Extra Tailwind classes */
  className?: string;
}

export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  className = "",
}: SlideInProps) {
  const xOffset = direction === "left" ? -80 : 80;

  const variants: Variants = {
    hidden: { opacity: 0, x: xOffset },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 20,
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

export default SlideIn;
