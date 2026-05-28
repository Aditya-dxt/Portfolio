"use client";

import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  SectionHeading – reusable section title with gradient text,       */
/*  muted subtitle, animated underline, and scroll‑triggered fade‑in  */
/* ------------------------------------------------------------------ */

interface SectionHeadingProps {
  /** Main heading text rendered with a purple → cyan gradient */
  title: string;
  /** Optional description shown below the title in muted color */
  subtitle?: string;
  /** Horizontal alignment – defaults to "center" */
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <motion.div
      className={`flex flex-col gap-3 mb-12 ${alignClass}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* ── Gradient title ─────────────────────────────────────────── */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
        <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06d6a0] bg-clip-text text-transparent">
          {title}
        </span>
      </h2>

      {/* ── Animated underline bar ─────────────────────────────────── */}
      <motion.span
        className="block h-1 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#06d6a0]"
        initial={{ width: 0 }}
        whileInView={{ width: align === "center" ? 80 : 64 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      />

      {/* ── Subtitle ───────────────────────────────────────────────── */}
      {subtitle && (
        <motion.p
          className="max-w-2xl text-base sm:text-lg text-[#a0a0c0]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
