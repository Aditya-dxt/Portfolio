"use client";

import { type ReactNode, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  TiltCard – 3‑D perspective card that follows the cursor           */
/*  with a subtle glare / shine overlay                               */
/* ------------------------------------------------------------------ */

interface TiltCardProps {
  children: ReactNode;
  /** Extra Tailwind classes merged onto the outer wrapper */
  className?: string;
  /** Maximum tilt angle in degrees (default 10) */
  maxTilt?: number;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 10,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── Motion values for smooth spring interpolation ──────────── */
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 20 });

  /* ── Glare position state ──────────────────────────────────── */
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const cardWidth = rect.width;
      const cardHeight = rect.height;

      // Cursor position relative to the card center (−0.5 … +0.5)
      const xRel = (e.clientX - rect.left) / cardWidth - 0.5;
      const yRel = (e.clientY - rect.top) / cardHeight - 0.5;

      // Tilt: negative yRel → rotate forward (positive X), positive xRel → rotate right (positive Y)
      rotateXRaw.set(-yRel * maxTilt * 2);
      rotateYRaw.set(xRel * maxTilt * 2);

      // Glare follows the cursor
      setGlare({
        x: (xRel + 0.5) * 100,
        y: (yRel + 0.5) * 100,
        opacity: 0.15,
      });
    },
    [maxTilt, rotateXRaw, rotateYRaw],
  );

  const handleMouseLeave = useCallback(() => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  }, [rotateXRaw, rotateYRaw]);

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Content ───────────────────────────────────────────── */}
      {children}

      {/* ── Glare overlay ─────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

export default TiltCard;
