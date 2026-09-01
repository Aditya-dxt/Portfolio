import { useEffect, useRef, useState } from 'react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import { useAppReady } from '@/context/LenisContext';

function BuildingImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };
  const rotX = hover && ref.current ? (mouse.y / ref.current.offsetHeight - 0.5) * -7 : 0;
  const rotY = hover && ref.current ? (mouse.x / ref.current.offsetWidth - 0.5) * 7 : 0;
  return (
    <div
      ref={ref}
      className="group relative w-full cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[rgba(200,155,60,0.18)] bg-[#0F1F3D] will-change-transform md:group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.35),0_0_32px_rgba(200,155,60,0.18)] transition-shadow duration-500"
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transition: hover ? 'transform 0.12s ease-out' : 'transform 0.6s ease-out',
        }}
      >
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F3D]/85 via-[#0F1F3D]/10 to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(220px circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.18), transparent 65%)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(200,155,60,0.55)] to-transparent" />
      </div>
    </div>
  );
}

function MilestoneRail({
  milestones,
  lineRef,
  gold = true,
}: {
  milestones: any[];
  lineRef: React.RefObject<HTMLDivElement>;
  gold?: boolean;
}) {
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 75%', 'end 45%'] });
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const gFrom = gold ? '#C89B3C' : '#7A263A';
  const gTo = gold ? '#E8DCC8' : '#C89B3C';
  return (
    <div ref={lineRef} className="relative pl-6 sm:pl-8 md:pl-10">
      <div className="absolute bottom-0 left-0 top-0 w-px rounded-full bg-[rgba(200,155,60,0.14)]" />
      <motion.div className="absolute left-0 top-0 w-px origin-top rounded-full" style={{ height: h, background: `linear-gradient(to bottom, ${gFrom}, ${gTo})` }} />
      <div className="space-y-7 sm:space-y-8">
        {milestones.map((m: any, i: number) => (
          <motion.div
            key={m.title + i}
            initial={{ opacity: 0, x: gold ? -14 : 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: i * 0.05, duration: 0.45 }}
            className="relative"
          >
            <span
              className={`absolute -left-[1.58rem] top-[0.42rem] h-3 w-3 rounded-full border-2 sm:-left-[2.18rem] sm:top-[0.45rem] ${
                m.current
                  ? 'border-[#FAF7F0] bg-[#C89B3C] shadow-[0_0_14px_rgba(200,155,60,0.9)]'
                  : m.upcoming
                    ? 'border-dashed border-[rgba(200,155,60,0.35)] bg-transparent'
                    : gold
                      ? 'border-[#C89B3C] bg-[#0F1F3D]'
                      : 'border-[#7A263A] bg-[#0F1F3D]'
              }`}
            />
            <h4 className="font-serif text-[0.95rem] font-bold uppercase tracking-wide text-[#FAF7F0] sm:text-[1.05rem]">{m.title}</h4>
            <p className="mt-0.5 font-mono text-[0.72rem] tracking-wide text-[#C89B3C] sm:text-xs">{m.period}</p>
            {(m.grade || m.badge) && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {m.grade && (
                  <span className="inline-flex items-center rounded-full border border-[rgba(200,155,60,0.22)] bg-[rgba(200,155,60,0.12)] px-2.5 py-1 font-mono text-[0.68rem] font-bold tracking-wide text-[#C89B3C]">{m.grade}</span>
                )}
                {m.badge && (
                  <span className="inline-flex items-center rounded-full border border-[rgba(122,38,58,0.32)] bg-[rgba(122,38,58,0.14)] px-2.5 py-1 font-mono text-[0.68rem] text-[#F3E8D0]">{m.badge}</span>
                )}
              </div>
            )}
            <p className="mt-2 max-w-[42ch] font-sans text-[0.82rem] leading-relaxed text-[#F3E8D0]/85 sm:text-[0.86rem]">{m.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function EduHeader({ label, name, sub, badge }: { label: string; name: string; sub: string; badge?: string }) {
  return (
    <div className="mb-4 sm:mb-5">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#C89B3C]">{label}</p>
      <h3 className="mt-1.5 font-serif text-[1.35rem] font-extrabold leading-none text-[#FAF7F0] sm:text-[1.65rem]">{name}</h3>
      <p className="mt-1.5 font-sans text-[0.82rem] text-[#F3E8D0]/80">{sub}</p>
      {badge && (
        <span className="mt-3 inline-flex rounded-full border border-[rgba(200,155,60,0.22)] bg-[rgba(200,155,60,0.10)] px-3 py-1 font-mono text-[0.68rem] tracking-wide text-[#C89B3C]">{badge}</span>
      )}
    </div>
  );
}

export function EducationEditorial() {
  const ref = useRef<HTMLElement>(null);
  const schoolLineRef = useRef<HTMLDivElement>(null) as any;
  const collegeLineRef = useRef<HTMLDivElement>(null) as any;
  const ready = useAppReady();
  const e: any = portfolio.education;

  useEffect(() => {
    const root = ref.current;
    if (!root || isReducedMotion()) return;
    if (!ready) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-edu-block]', {
        y: 28,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 78%' },
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={ref} id="education" className="relative bg-[#0F1F3D] text-[#FAF7F0] border-t border-[rgba(200,155,60,0.14)]">
      <div className="mx-auto max-w-[1400px] px-[4vw] py-[72px] sm:py-[96px]">
        {/* Header — matches screenshot */}
        <div className="reveal flex flex-wrap items-end justify-between gap-4 border-b border-[rgba(200,155,60,0.14)] pb-5 mb-10 sm:mb-14">
          <div>
            <span className="font-mono text-[0.72rem] font-bold tracking-[0.18em] text-[#C89B3C]">04 / EDUCATION</span>
            <h2 className="mt-1 font-serif text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-none tracking-tight text-[#FAF7F0]">EDUCATION</h2>
            <p className="mt-3 hidden font-sans text-[0.85rem] leading-relaxed text-[#F3E8D0]/75 sm:block max-w-[38rem]">From school foundations to engineering — where curiosity became craft.</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <span className="font-mono text-[0.72rem] tracking-wide text-[#C89B3C]/90">KANPUR, INDIA · 2011 — 2028</span>
            <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(200,155,60,0.22)]">
              <span className="h-2 w-2 rounded-full bg-[#C89B3C] shadow-[0_0_10px_rgba(200,155,60,0.9)]" />
            </div>
          </div>
        </div>
        <p className="mb-10 text-center font-sans text-sm leading-relaxed text-[#F3E8D0]/70 sm:hidden">From school foundations to engineering — where curiosity became craft.</p>

        {/* School */}
        <div data-edu-block className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-16">
          <div className="min-w-0">
            <EduHeader label="School Journey" name={e.school.short || e.school.name} sub={`${e.school.name} · ${e.school.period}`} />
            <BuildingImage src={e.school.image} alt={e.school.name} />
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-[rgba(200,155,60,0.14)] bg-[#162E4D] px-3 py-1.5 font-mono text-[0.70rem] text-[#F3E8D0]/80">ICSE 91.2% · ISC 83.4%</span>
              <span className="rounded-full border border-[rgba(122,38,58,0.22)] bg-[rgba(122,38,58,0.12)] px-3 py-1.5 font-mono text-[0.70rem] text-[#F3E8D0]">Leadership · House & Sports Captain</span>
            </div>
          </div>
          <div className="min-w-0 pt-1">
            <MilestoneRail milestones={e.school.milestones} lineRef={schoolLineRef} gold />
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-[rgba(200,155,60,0.18)] to-transparent sm:my-16" />

        {/* College */}
        <div data-edu-block className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-16">
          <div className="min-w-0">
            <EduHeader label="College Journey" name={e.college.fullName || e.college.name} sub={`${e.college.degree} · ${e.college.location}`} badge={`${e.college.degree} · ${e.college.period}`} />
            <BuildingImage src={e.college.image} alt={e.college.fullName || e.college.name} />
          </div>
          <div className="min-w-0 pt-1">
            <MilestoneRail milestones={e.college.milestones} lineRef={collegeLineRef} gold={false} />
            <div className="mt-7 inline-flex items-stretch gap-4 rounded-2xl border border-[rgba(200,155,60,0.18)] bg-[#162E4D] px-5 py-4 sm:px-6">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#C89B3C]">Current CGPA</p>
                <p className="mt-1 font-serif text-[1.9rem] font-extrabold leading-none text-[#FAF7F0] sm:text-[2.1rem]">{e.college.cgpa}</p>
              </div>
              <div className="w-px self-stretch bg-[rgba(200,155,60,0.14)]" />
              <div className="flex flex-col justify-center">
                <p className="font-mono text-[0.70rem] text-[#F3E8D0]/80">{e.college.detail}</p>
                <p className="mt-1 font-mono text-[0.68rem] text-[#C89B3C]">{e.college.short} · Sem 5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
