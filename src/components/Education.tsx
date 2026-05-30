import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { useScrollRefresh } from '@/context/LenisContext';
import { portfolio } from '@/data/portfolio';
import { LazyImage } from './LazyImage';

interface BuildingImageProps {
  src: string;
  alt: string;
  accent?: 'cyan' | 'purple';
}

function BuildingImage({ src, alt, accent = 'cyan' }: BuildingImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const rotX =
    hover && containerRef.current
      ? (mouse.y / containerRef.current.offsetHeight - 0.5) * -8
      : 0;
  const rotY =
    hover && containerRef.current
      ? (mouse.x / containerRef.current.offsetWidth - 0.5) * 8
      : 0;

  const glow =
    accent === 'cyan'
      ? 'md:group-hover:shadow-[0_0_40px_rgba(0,212,255,0.25)]'
      : 'md:group-hover:shadow-[0_0_40px_rgba(123,47,190,0.25)]';

  return (
    <div
      ref={containerRef}
      className={`group relative aspect-[4/3] w-full cursor-pointer ${glow} transition-shadow duration-500`}
      style={{ perspective: '1000px' }}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 will-change-transform sm:rounded-2xl"
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transition: hover ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
      >
        <LazyImage
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent opacity-80" />
        {hover && (
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle 180px at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.35), transparent)`,
            }}
          />
        )}
      </div>
    </div>
  );
}

interface MilestoneListProps {
  milestones: typeof portfolio.education.school.milestones;
  lineRef: React.RefObject<HTMLDivElement>;
  accent: 'purple' | 'cyan';
}

function MilestoneList({ milestones, lineRef, accent }: MilestoneListProps) {
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 70%', 'end 40%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const from = accent === 'purple' ? '#7B2FBE' : '#00D4FF';
  const to = accent === 'purple' ? '#00D4FF' : '#7B2FBE';

  return (
    <div ref={lineRef} className="relative pl-5 sm:pl-10 md:pl-14">
      <div className="absolute bottom-0 left-0 top-0 w-px rounded-full bg-white/10" />
      <motion.div
        className="absolute left-0 top-0 w-px origin-top rounded-full"
        style={{
          height: lineHeight,
          background: `linear-gradient(to bottom, ${from}, ${to})`,
        }}
      />
      <div className="space-y-6 sm:space-y-10">
        {milestones.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: accent === 'purple' ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="relative"
          >
            <span
              className={`absolute -left-[1.35rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 sm:-left-[2.65rem] sm:top-2 sm:h-3 sm:w-3 md:-left-[3.65rem] ${
                'current' in item && item.current
                  ? 'border-white bg-accent shadow-[0_0_12px_#00D4FF]'
                  : 'upcoming' in item && item.upcoming
                    ? 'border-dashed border-gray-600 bg-transparent'
                    : accent === 'purple'
                      ? 'border-purple bg-void'
                      : 'border-accent bg-void'
              }`}
            />
            <h4 className="font-heading text-xs uppercase tracking-wide text-white sm:text-base md:text-lg">
              {item.title}
            </h4>
            <p className="mt-0.5 font-mono text-[10px] text-accent sm:text-xs">{item.period}</p>
            {'grade' in item && item.grade && (
              <span className="mt-1 inline-block rounded-md glass-panel px-2 py-0.5 font-heading text-xs text-gradient sm:mt-2 sm:rounded-lg sm:px-3 sm:py-1 sm:text-sm">
                {item.grade}
              </span>
            )}
            {'badge' in item && item.badge && (
              <span className="ml-1 mt-1 inline-block rounded-md border border-purple/40 bg-purple/10 px-2 py-0.5 text-[10px] text-purple-200 sm:ml-2 sm:mt-2 sm:text-xs">
                {item.badge}
              </span>
            )}
            <p className="mt-1 font-body text-[11px] leading-relaxed text-gray-400 sm:mt-2 sm:text-sm">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function EduHeader({
  label,
  name,
  sub,
  badge,
  accent,
}: {
  label: string;
  name: string;
  sub: string;
  badge?: string;
  accent: 'purple' | 'cyan';
}) {
  return (
    <div className="mb-3 sm:mb-6">
      <p
        className={`font-mono text-[10px] uppercase tracking-widest sm:text-xs ${accent === 'purple' ? 'text-purple' : 'text-accent'}`}
      >
        {label}
      </p>
      <h3 className="mt-1 font-heading text-base uppercase text-white sm:mt-2 sm:text-2xl md:text-3xl">
        {name}
      </h3>
      <p className="mt-0.5 font-body text-[11px] text-gray-400 sm:mt-1 sm:text-sm">{sub}</p>
      {badge && (
        <span className="mt-2 inline-block rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[9px] text-accent sm:mt-3 sm:px-4 sm:py-1 sm:text-xs">
          {badge}
        </span>
      )}
    </div>
  );
}

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const schoolLineRef = useRef<HTMLDivElement>(null);
  const collegeLineRef = useRef<HTMLDivElement>(null);
  const { school, college } = portfolio.education;

  useScrollRefresh();

  useGSAP(
    () => {
      if (!sectionRef.current || isReducedMotion()) return;
      gsap.from('[data-edu-block]', {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="education" ref={sectionRef} className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="heading-display mb-3 text-center text-3xl text-white sm:mb-4 sm:text-4xl md:text-5xl">
          My <span className="text-gradient">Education</span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center font-body text-sm text-gray-400 sm:mb-20 sm:text-base">
          From school foundations to engineering — where curiosity became craft.
        </p>

        {/* School: image + name LEFT, timeline RIGHT (all breakpoints) */}
        <div
          data-edu-block
          className="mb-16 grid grid-cols-2 items-start gap-3 sm:mb-28 sm:gap-8 lg:gap-16"
        >
          <div className="min-w-0">
            <EduHeader
              label="School Journey"
              name={school.name}
              sub={school.location}
              accent="purple"
            />
            <BuildingImage src={school.image} alt={school.name} accent="purple" />
          </div>
          <div className="min-w-0">
            <MilestoneList milestones={school.milestones} lineRef={schoolLineRef} accent="purple" />
          </div>
        </div>

        {/* College: same layout — PSIT + image LEFT, timeline RIGHT */}
        <div
          data-edu-block
          className="grid grid-cols-2 items-start gap-3 sm:gap-8 lg:gap-16"
        >
          <div className="min-w-0">
            <EduHeader
              label="College Journey"
              name={college.name}
              sub={college.fullName}
              badge={college.degree}
              accent="cyan"
            />
            <BuildingImage src={college.image} alt={college.fullName} accent="cyan" />
          </div>
          <div className="min-w-0">
            <MilestoneList
              milestones={college.milestones}
              lineRef={collegeLineRef}
              accent="cyan"
            />
            <div className="mt-4 glass-panel inline-block rounded-lg px-3 py-2 sm:mt-8 sm:rounded-xl sm:px-6 sm:py-4">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 sm:text-xs">
                Current CGPA
              </p>
              <p className="font-heading text-2xl text-gradient sm:text-4xl">{college.cgpa}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
