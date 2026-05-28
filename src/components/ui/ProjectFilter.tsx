"use client";

import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  ProjectFilter – horizontal scrollable category tabs               */
/* ------------------------------------------------------------------ */

interface ProjectFilterProps {
  /** List of category labels */
  categories: string[];
  /** Currently selected category */
  activeCategory: string;
  /** Callback fired when a tab is clicked */
  onFilter: (category: string) => void;
}

export function ProjectFilter({
  categories,
  activeCategory,
  onFilter,
}: ProjectFilterProps) {
  return (
    <div className="relative w-full overflow-x-auto scrollbar-hide py-2">
      <div className="flex gap-3 min-w-max px-1">
        {categories.map((cat) => {
          const isActive = cat === activeCategory;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onFilter(cat)}
              className={[
                "relative rounded-full px-5 py-2 text-sm font-medium",
                "transition-colors duration-300 outline-none",
                "focus-visible:ring-2 focus-visible:ring-[#8b5cf6]/60",
                isActive
                  ? "text-white"
                  : "text-[#a0a0c0] border border-white/10 hover:text-[#f0f0f0] hover:border-white/25",
              ].join(" ")}
            >
              {/* Animated gradient background pill behind the active tab */}
              {isActive && (
                <motion.span
                  layoutId="project-filter-active"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#06d6a0]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}

              {/* Label (needs z‑10 to sit above the animated bg) */}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectFilter;
