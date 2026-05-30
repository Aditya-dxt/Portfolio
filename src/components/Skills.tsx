import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import { portfolio } from '@/data/portfolio';

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(portfolio.skillCategories[0].id);

  const activeCategory = portfolio.skillCategories.find((c) => c.id === activeId)!;

  useGSAP(
    () => {
      if (!marqueeRef.current || isReducedMotion()) return;
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

  const marqueeText = [...portfolio.marqueeSkills, ...portfolio.marqueeSkills].join(' · ');

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden py-32">
      <div ref={marqueeRef} className="pointer-events-none absolute inset-0 flex items-center opacity-[0.05]">
        <div data-marquee-track className="whitespace-nowrap font-heading text-6xl uppercase will-change-transform">
          {marqueeText}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <h2 className="heading-display mb-16 text-center text-4xl text-white md:text-5xl">
          Skills & <span className="text-gradient">Tools</span>
        </h2>

        <div className="grid gap-12 lg:grid-cols-2">
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

        <div className="mt-16 glass-panel rounded-2xl p-6">
          <p className="mb-4 font-body text-xs uppercase tracking-widest text-gray-500">
            Tech heat map
          </p>
          <div className="flex flex-wrap gap-2">
            {portfolio.marqueeSkills.map((name, i) => (
              <span
                key={name}
                className="rounded-md px-2 py-1 text-xs font-medium"
                style={{
                  background: `rgba(0, 212, 255, ${0.1 + (i % 5) * 0.08})`,
                  color: `rgba(0, 212, 255, ${0.6 + (i % 3) * 0.15})`,
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
