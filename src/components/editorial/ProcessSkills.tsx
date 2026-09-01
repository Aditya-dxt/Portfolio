import { useEffect, useRef } from 'react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { portfolio } from '@/data/portfolio';
import { useAppReady } from '@/context/LenisContext';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiThreedotjs,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiGooglegemini,
  SiLangchain, SiPython, SiGithub, SiVercel, SiRender,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { BsStars, BsCpu } from 'react-icons/bs';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  react: SiReact, nextjs: SiNextdotjs, typescript: SiTypescript, tailwind: SiTailwindcss, framer: SiFramer, threejs: SiThreedotjs,
  nodejs: SiNodedotjs, express: SiExpress, mongodb: SiMongodb, postgresql: SiPostgresql, openai: BsStars, gemini: SiGooglegemini,
  langchain: SiLangchain, java: FaJava, python: SiPython, github: SiGithub, llm: BsCpu, antigravity: HiSparkles, vercel: SiVercel, render: SiRender,
};
function SkillIcon({ icon, abbr }: { icon?: string; abbr: string }) {
  const Icon = icon ? iconMap[icon] : undefined;
  if (Icon) return <Icon size={20} />;
  return <span className="font-mono font-bold text-[0.85rem]">{abbr}</span>;
}

export function ProcessSkills() {
  const sectionRef = useRef<HTMLElement>(null);
  const ready = useAppReady();
  useEffect(() => {
    const root = sectionRef.current;
    if (!root || isReducedMotion()) return;
    if (!ready) {
      const t = window.setTimeout(() => {
        root.querySelectorAll<HTMLElement>('.skill-circle-card').forEach(el => gsap.set(el, { clearProps: 'all', autoAlpha: 1 }));
      }, 2500);
      return () => window.clearTimeout(t);
    }
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const skillCards = root.querySelectorAll<HTMLElement>('.skill-circle-card');
        gsap.from(skillCards, {
          scale: 0.8, y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.07, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: root.querySelector('.skills-grid') ?? root, start: 'top 85%' }
        });
        window.setTimeout(() => {
          skillCards.forEach(el => {
            const cs = getComputedStyle(el);
            if (cs.opacity === '0' || cs.visibility === 'hidden') gsap.set(el, { clearProps: 'all', autoAlpha: 1 });
          });
        }, 1200);
      });
      mm.add('(max-width: 767px)', () => {
        const skillCards = root.querySelectorAll<HTMLElement>('.skill-circle-card');
        gsap.from(skillCards, {
          y: 14, autoAlpha: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 90%' }
        });
        window.setTimeout(() => {
          skillCards.forEach(el => {
            const cs = getComputedStyle(el);
            if (cs.opacity === '0') gsap.set(el, { clearProps: 'all', autoAlpha: 1 });
          });
        }, 1200);
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={sectionRef} id="process" className="bg-[#FAF7F0]">
      <div className="max-w-[1400px] mx-auto px-[4vw] py-[100px]">
        <div className="grid lg:grid-cols-2 gap-[60px]">
          <div data-scrub-stagger className="reveal">
            <span className="font-mono text-[0.78rem] tracking-[0.12em] text-[#7A263A] block mb-1.5">02 / WORKFLOW</span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-extrabold text-[#0F1F3D]">MY ENGINEERING PROCESS</h2>
            <p className="text-[0.95rem] text-[#756F65] mt-2 mb-[30px]">A clear process. Thoughtful architecture. High-performance code.</p>
            <div className="flex flex-col gap-5 mb-8">
              {portfolio.process.map(s => (
                <div key={s.num} className="process-step flex gap-5 bg-[#F3E8D0] border border-[rgba(200,155,60,0.14)] rounded-[14px] px-[22px] py-[18px] hover:translate-x-1.5 hover:border-[#7A263A] transition-all will-change-transform">
                  <span className="font-serif text-[1.6rem] font-extrabold text-[#7A263A] leading-none">{s.num}</span>
                  <div>
                    <h4 className="font-serif text-[0.98rem] tracking-[0.04em] text-[#0F1F3D]">{s.title}</h4>
                    <p className="text-[0.86rem] text-[#756F65] mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="font-serif text-[1.05rem] text-[#756F65] border-l-[3px] border-[#C89B3C] pl-4 italic">
              "Engineering is not just what it does; it's how fast, clean, and reliable it runs."
            </div>
            <div className="w-2 h-2 rounded-full bg-[#7A263A] mt-6 opacity-60" aria-hidden />
          </div>

          <div className="reveal" style={{ transitionDelay: '0.12s' }}>
            <span className="font-mono text-[0.78rem] tracking-[0.12em] text-[#7A263A] block mb-1.5">03 / CAPABILITIES</span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-extrabold text-[#0F1F3D]">TOOLS & TECH STACK</h2>
            <p className="text-[0.95rem] text-[#756F65] mt-2 mb-[30px]">Core technologies I use to ship production apps.</p>
            <div className="skills-grid grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(115px,1fr))' }}>
              {portfolio.skills.map(s => (
                <div key={s.name} className="skill-circle-card group bg-[#FAF7F0] border border-[rgba(200,155,60,0.14)] rounded-2xl p-[18px_12px] flex flex-col items-center text-center hover:-translate-y-1 hover:border-[#7A263A] hover:shadow-[0_8px_20px_rgba(15,31,61,0.08)] transition-all will-change-transform">
                  <div className="w-11 h-11 rounded-full bg-[#0F1F3D] text-[#FAF7F0] flex items-center justify-center mb-2.5 shrink-0 group-hover:bg-[#7A263A] transition-colors">
                    <SkillIcon icon={(s as any).icon} abbr={s.abbr} />
                  </div>
                  <span className="text-[0.85rem] font-bold leading-tight text-[#0F1F3D]">{s.name}</span>
                  <span className="font-mono text-[0.68rem] text-[#756F65]">{s.cat}</span>
                </div>
              ))}
            </div>
            <div className="w-2 h-2 rounded-full bg-[#C89B3C] mt-6 opacity-60" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
