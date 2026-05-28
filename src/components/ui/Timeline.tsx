"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Timeline – vertical timeline with alternating cards               */
/* ------------------------------------------------------------------ */

export interface TimelineItem {
  /** Heading displayed at the top of the card */
  title: string;
  /** Secondary text (e.g. company name, role) */
  subtitle?: string;
  /** Body description */
  description: string;
  /** Year or date label shown on the timeline dot */
  year: string;
  /** Optional icon rendered inside the timeline dot */
  icon?: ReactNode;
  /** When true the card receives a gradient border glow */
  highlight?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative w-full">
      {/* ── Vertical centre line (left on mobile, centre on md+) ── */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#8b5cf6] via-[#06d6a0]/40 to-transparent md:-translate-x-px" />

      <div className="flex flex-col gap-12">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={`${item.year}-${index}`}
              className="relative flex items-start md:items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
                ease: "easeOut",
              }}
            >
              {/* ── Timeline dot ──────────────────────────────────── */}
              <div
                className={[
                  "absolute left-4 md:left-1/2 z-10 flex items-center justify-center",
                  "h-8 w-8 -translate-x-1/2 rounded-full",
                  "border-2 border-[#8b5cf6] bg-[#0a0a1a]",
                  "text-xs font-bold text-[#8b5cf6]",
                ].join(" ")}
              >
                {item.icon ?? (
                  <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#06d6a0]" />
                )}
              </div>

              {/* ── Card ──────────────────────────────────────────── */}
              <div
                className={[
                  // Mobile: always offset from the left line
                  "ml-12 md:ml-0",
                  // Desktop: alternate sides
                  "md:w-[calc(50%-2rem)]",
                  isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8",
                ].join(" ")}
              >
                <div
                  className={[
                    "rounded-2xl p-5 backdrop-blur-xl",
                    "bg-white/5 border",
                    item.highlight
                      ? "border-[#8b5cf6]/50 shadow-[0_0_20px_rgba(139,92,246,0.12)]"
                      : "border-white/10",
                    "transition-colors duration-300",
                  ].join(" ")}
                >
                  {/* Year pill */}
                  <span className="inline-block mb-2 px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-[#8b5cf6]/20 text-[#8b5cf6]">
                    {item.year}
                  </span>

                  <h3 className="text-lg font-semibold text-[#f0f0f0]">
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <p className="mt-0.5 text-sm text-[#06d6a0]">
                      {item.subtitle}
                    </p>
                  )}

                  <p className="mt-2 text-sm leading-relaxed text-[#a0a0c0]">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Timeline;
