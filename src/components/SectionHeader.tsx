import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { useAppReady } from '@/context/LenisContext';

interface SectionHeaderProps {
  /** Two-digit number, e.g. "01" */
  number: string;
  /** Section title, e.g. "ABOUT" */
  title: string;
  /** Optional: gradient text for the title */
  gradient?: boolean;
  className?: string;
}

/**
 * Numbered section header with parallax ghost text.
 *
 * Renders:
 *   Foreground: "01 / ABOUT"
 *   Background: "ABOUT" at huge scale, low opacity, parallax-scrolls
 */
export function SectionHeader({
  number,
  title,
  gradient = false,
  className = '',
}: SectionHeaderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const appReady = useAppReady();

  useGSAP(
    () => {
      if (!wrapRef.current || !ghostRef.current || !appReady || isReducedMotion()) return;

      gsap.fromTo(
        ghostRef.current,
        { y: 40 },
        {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.3,
          },
        },
      );
    },
    { scope: wrapRef, dependencies: [appReady] },
  );

  return (
    <div ref={wrapRef} className={`relative mb-10 lg:mb-14 ${className}`}>
      {/* Ghost background text — desktop only */}
      <span
        ref={ghostRef}
        className="pointer-events-none absolute -top-[0.3em] left-0 hidden select-none font-heading text-[8vw] font-bold uppercase leading-none tracking-wider will-change-transform lg:block"
        style={{
          WebkitTextStroke: '1px rgba(255,255,255,0.03)',
          color: 'transparent',
        }}
        aria-hidden
      >
        {title}
      </span>

      {/* Foreground numbered heading */}
      <h2 className="heading-display relative z-10 text-2xl sm:text-3xl md:text-4xl">
        <span className="text-accent">{number}</span>
        <span className="mx-2 text-gray-600">/</span>
        {gradient ? (
          <span className="text-gradient">{title}</span>
        ) : (
          <span className="text-white">{title}</span>
        )}
      </h2>
    </div>
  );
}
