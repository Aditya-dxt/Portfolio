import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import { isTouchDevice } from '@/lib/device';
import { useAppReady } from '@/context/LenisContext';
import { portfolio } from '@/data/portfolio';
import { SectionHeader } from './SectionHeader';

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(portfolio.skillCategories[0].id);
  const appReady = useAppReady();

  const activeCategory = portfolio.skillCategories.find((c) => c.id === activeId)!;

  // Marquee animation
  useGSAP(
    () => {
      if (!marqueeRef.current || isReducedMotion() || isTouchDevice()) return;
      const track = marqueeRef.current.querySelector('[data-marquee-track]');
      if (!track) return;
      gsap.to(track, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    },
    { scope: marqueeRef },
  );

  // Skill pills scatter-in animation
  useGSAP(
    () => {
      if (!gridRef.current || isReducedMotion()) return;
      const pills = gridRef.current.querySelectorAll('[data-skill-pill]');
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            pills,
            {
              opacity: 0,
              x: () => gsap.utils.random(-80, 80),
              y: () => gsap.utils.random(-80, 80),
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              stagger: 0.04,
              duration: 0.6,
              ease: 'power3.out',
            },
          );
        },
        once: true,
      });
    },
    { scope: gridRef, dependencies: [activeId] },
  );

  // Toolkit strip stagger-in animation
  useGSAP(
    () => {
      if (!stripRef.current || !appReady || isReducedMotion()) return;
      const items = stripRef.current.querySelectorAll('[data-strip-item]');
      gsap.from(items, {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stripRef.current,
          start: 'top 85%',
        },
      });
    },
    { scope: stripRef, dependencies: [appReady] },
  );

  const marqueeText = [...portfolio.marqueeSkills, ...portfolio.marqueeSkills].join(' · ');

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden py-32 pb-20 sm:pb-28">
      <div ref={marqueeRef} className="pointer-events-none absolute inset-0 flex items-center opacity-[0.05]">
        <div data-marquee-track className="whitespace-nowrap font-heading text-6xl uppercase will-change-transform">
          {marqueeText}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader number="03" title="SKILLS" />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 lg:flex-col">
            {portfolio.skillCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                data-hover
                onClick={() => setActiveId(cat.id)}
                className={`relative rounded-full px-6 py-3 font-body text-sm transition-colors ${
                  activeId === cat.id ? 'text-void' : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeId === cat.id && (
                  <motion.span
                    layoutId="skill-tab-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Skill pills grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              ref={gridRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {activeCategory.skills.map((skill) => (
                <div
                  key={skill.name}
                  data-skill-pill
                  className="glass-panel group flex items-center gap-3 rounded-xl px-4 py-3 transition-transform duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] will-change-transform"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-xs font-bold text-accent">
                    {skill.icon}
                  </span>
                  <span className="font-body text-sm text-gray-200">{skill.name}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Toolkit strip — horizontal icon+label row */}
        <div className="mt-14">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-gray-600">
            ── toolkit
          </p>
          <div
            ref={stripRef}
            className="flex flex-wrap gap-3"
          >
            {portfolio.marqueeSkills.map((name) => (
              <div
                key={name}
                data-strip-item
                className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-accent/50" />
                <span className="font-mono text-xs text-gray-400">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
