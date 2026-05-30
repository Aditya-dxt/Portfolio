import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { useScrollRefresh } from '@/context/LenisContext';
import { portfolio } from '@/data/portfolio';
import { FaBriefcase, FaGraduationCap, FaTrophy, FaCode } from 'react-icons/fa';

const iconMap: Record<string, typeof FaGraduationCap> = {
  education: FaGraduationCap,
  work: FaBriefcase,
  hackathon: FaTrophy,
  leadership: FaCode,
};

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLUListElement>(null);

  useScrollRefresh();

  useGSAP(
    () => {
      if (!sectionRef.current || !lineRef.current || isReducedMotion()) return;

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 30%',
            scrub: 0.25,
          },
        },
      );

      const cards = itemsRef.current?.querySelectorAll('[data-timeline-card]');
      cards?.forEach((card, i) => {
        const fromX = i % 2 === 0 ? -80 : 80;
        gsap.fromTo(
          card,
          { opacity: 0, x: fromX, rotateY: i % 2 === 0 ? -8 : 8 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(0,212,255,0.12), transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(123,47,190,0.12), transparent 50%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center sm:mb-20"
        >
          <h2 className="heading-display text-3xl text-white sm:text-4xl md:text-5xl">
            Experience & <span className="text-gradient">Milestones</span>
          </h2>
          <p className="mt-3 font-body text-sm text-gray-400 sm:mt-4 sm:text-base">
            Hackathons, leadership, and the path that shaped me.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2" />
          <div
            ref={lineRef}
            className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-purple to-accent will-change-transform sm:left-1/2 sm:-translate-x-1/2"
          />

          <ul ref={itemsRef} className="space-y-8 sm:space-y-14">
            {portfolio.timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              const Icon = iconMap[item.type] ?? FaBriefcase;
              return (
                <li
                  key={item.id}
                  className={`relative flex pl-10 sm:pl-0 ${
                    isLeft
                      ? 'sm:justify-start sm:pr-[52%]'
                      : 'sm:justify-end sm:pl-[52%]'
                  }`}
                >
                  <motion.div
                    className="absolute left-4 top-6 z-10 -translate-x-1/2 sm:left-1/2"
                    whileInView={{ scale: [0.5, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <span
                      className={`relative flex h-11 w-11 items-center justify-center rounded-full ${
                        item.current
                          ? 'bg-accent text-void shadow-[0_0_20px_rgba(0,212,255,0.5)]'
                          : 'glass-panel text-accent'
                      }`}
                    >
                      <Icon size={18} />
                      {item.current && (
                        <span className="absolute inset-0 animate-ping rounded-full border border-accent/60" />
                      )}
                    </span>
                  </motion.div>

                  <div
                    data-timeline-card
                    className="glass-panel group w-full max-w-none rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-1 hover:border-accent/30 will-change-transform sm:max-w-md sm:p-6"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-accent">{item.period}</span>
                      {item.current && (
                        <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-heading text-base uppercase tracking-wide text-white md:text-lg">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-gray-400">{item.org}</p>
                    <p className="mt-3 font-body text-sm leading-relaxed text-gray-300">
                      {item.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-gray-400 transition-colors group-hover:border-accent/30 group-hover:text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
