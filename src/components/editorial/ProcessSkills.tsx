import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from '@/lib/gsap';
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
  const I = icon ? iconMap[icon] : undefined;
  return I ? <I size={18} /> : <span className="font-mono font-bold text-[0.78rem]">{abbr}</span>;
}

const stepSkillHints: Record<number, string[]> = {
  0: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
  1: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Java'],
  2: ['OpenAI API', 'Gemini API', 'RAG / LangChain', 'LLM', 'Python'],
  3: ['Framer Motion', 'Three.js', 'React', 'Tailwind'],
  4: ['Vercel', 'Render', 'Git / GitHub', 'Antigravity'],
};

const CATS = ['All', 'Frontend', 'Backend', 'Database', 'AI', 'Ship'] as const;
function catOf(s: any) {
  if (s.cat === 'Frontend' || s.cat === 'Styling' || s.cat === 'Animation' || s.cat === '3D') return 'Frontend';
  if (s.cat === 'Backend') return 'Backend';
  if (s.cat === 'Database') return 'Database';
  if (s.cat.includes('AI') || s.cat === 'AI Tool' || s.name === 'Python' || s.name === 'LLM') return 'AI';
  if (s.cat === 'Deployment' || s.cat === 'Tools') return 'Ship';
  if (s.cat === 'Language') return s.name === 'Java' || s.name === 'Python' ? 'AI' : 'Frontend';
  return 'Frontend';
}

export function ProcessSkills() {
  const sectionRef = useRef<HTMLElement>(null);
  const ready = useAppReady();
  const [active, setActive] = useState(2);
  const [filter, setFilter] = useState<string>('All');

  const filteredSkills = useMemo(() => {
    if (filter === 'All') return portfolio.skills;
    return portfolio.skills.filter(s => catOf(s) === filter);
  }, [filter]);

  const highlighted = useMemo(() => new Set(stepSkillHints[active] ?? []), [active]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || !ready) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-ps-head] > *', { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 82%' } });
      const rows = root.querySelectorAll<HTMLElement>('.ps-row');
      gsap.set(rows, { autoAlpha: 1 });
      gsap.from(rows, { x: -14, autoAlpha: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: root.querySelector('.ps-blueprint') ?? root, start: 'top 88%' } });
      window.setTimeout(() => rows.forEach(el => { const cs = getComputedStyle(el); if (cs.opacity === '0' || cs.visibility === 'hidden') gsap.set(el, { autoAlpha: 1, x: 0 }); }), 1100);
    }, root);
    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.skill-dot');
    if (!els?.length) return;
    gsap.fromTo(els, { scale: 0.96, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.28, stagger: 0.02, ease: 'power2.out', overwrite: 'auto' });
  }, [filteredSkills, active]);

  return (
    <section ref={sectionRef} id="process" className="relative overflow-hidden bg-[#FAF7F0]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.022]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[rgba(200,155,60,0.12)]" />
      <div className="relative max-w-[1400px] mx-auto px-[4vw] pt-[72px] pb-[48px]">
        <div data-ps-head className="flex flex-wrap items-end justify-between gap-4 border-b border-[rgba(15,31,61,0.08)] pb-5 mb-7">
          <div>
            <span className="font-mono text-[0.72rem] tracking-[0.16em] text-[#7A263A]">02 — 03 / PROCESS × STACK</span>
            <h2 className="font-serif text-[clamp(1.9rem,4.4vw,3.1rem)] font-extrabold leading-none tracking-[-0.02em] text-[#0F1F3D] mt-2">Blueprint <span className="text-[#7A263A]">to</span> <span className="text-[#C89B3C]">ship</span> — one instrument</h2>
          </div>
          <span className="hidden sm:inline-flex font-mono text-[0.68rem] tracking-wide bg-white border border-[rgba(15,31,61,0.10)] px-3 py-1.5 rounded-full text-[#0F1F3D]">0{active + 1} / 05 · {portfolio.process[active].title}</span>
        </div>

        <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-5 lg:gap-6 items-start">
          {/* LEFT — VERTICAL BLUEPRINT (new, not a slab carousel) */}
          <div className="ps-blueprint relative rounded-[20px] bg-white border border-[rgba(200,155,60,0.14)] shadow-[0_12px_40px_rgba(15,31,61,0.06)] p-4 sm:p-5 overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.70rem] tracking-[0.14em] text-[#7A263A]">BLUEPRINT — 05 STATIONS</span>
              <span className="font-mono text-[0.66rem] text-[#756F65]">click to unfold · {active + 1} active</span>
            </div>
            {/* subtle grid paper */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(15,31,61,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(15,31,61,0.14) 1px, transparent 1px)`, backgroundSize: '18px 18px', maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 85%)' } as any} />
            <div className="relative mt-5">
              {/* vertical rail */}
              <div className="pointer-events-none absolute left-[11px] top-2 bottom-2 w-px bg-[rgba(15,31,61,0.09)] hidden sm:block" />
              <div className="pointer-events-none absolute left-[11px] top-2 w-px bg-[#C89B3C] transition-[height] duration-500 hidden sm:block" style={{ height: `calc(${(active / 4) * 100}% - 6px)` }} />
              <div className="flex flex-col gap-3">
                {portfolio.process.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={s.num}
                      onClick={() => setActive(i)}
                      className={`ps-row group text-left relative rounded-[14px] border transition-all duration-300 ${isActive ? 'bg-[#0F1F3D] border-[#0F1F3D] shadow-[0_10px_28px_rgba(15,31,61,0.18)]' : 'bg-[#FAF7F0] border-[rgba(200,155,60,0.14)] hover:bg-white hover:border-[rgba(15,31,61,0.14)] hover:shadow-[0_6px_16px_rgba(15,31,61,0.06)]'}`}
                    >
                      {/* dot on rail */}
                      <span className={`hidden sm:grid absolute left-[5px] top-[18px] h-[13px] w-[13px] place-items-center rounded-full border-2 bg-white transition-colors ${isActive ? 'border-[#C89B3C]' : 'border-[rgba(15,31,61,0.18)] group-hover:border-[#C89B3C]/50'}`}><span className={`h-[5px] w-[5px] rounded-full transition-colors ${isActive ? 'bg-[#C89B3C]' : 'bg-transparent'}`} /></span>
                      <div className={`flex gap-4 px-4 py-4 sm:pl-9 ${isActive ? 'pb-5' : ''}`}>
                        <span className={`font-serif text-[2.0rem] sm:text-[2.2rem] font-extrabold leading-none shrink-0 ${isActive ? 'text-[#F3E8D0]/35' : 'text-[#0F1F3D]/10'} select-none`}>{s.num}</span>
                        <span className="min-w-0 flex-1">
                          <span className={`font-serif text-[0.95rem] sm:text-[1.02rem] font-extrabold tracking-[0.02em] leading-tight block ${isActive ? 'text-[#FAF7F0]' : 'text-[#0F1F3D]'}`}>{s.title}</span>
                          {/* collapsed: single line */}
                          <span className={`block text-[0.84rem] leading-[1.5] mt-1 ${isActive ? 'text-[#F3E8D0]/85 max-h-[200px] opacity-100' : 'text-[#756F65] max-h-[1.45rem] overflow-hidden whitespace-nowrap text-ellipsis opacity-90 sm:whitespace-nowrap'}`}>{s.desc}</span>
                          {isActive && (
                            <span className="mt-3 flex flex-wrap gap-1.5">
                              {(stepSkillHints[i] ?? []).map(n => (
                                <span key={n} className="font-mono text-[0.62rem] font-bold bg-white text-[#0F1F3D] px-2.5 py-1 rounded-full border border-white">{n}</span>
                              ))}
                              <span className="font-mono text-[0.62rem] tracking-wide bg-white/10 border border-white/20 text-[#F3E8D0]/80 px-2.5 py-1 rounded-full">{stepSkillHints[i]?.length ?? 0} tools lit →</span>
                            </span>
                          )}
                        </span>
                        <span className={`hidden sm:inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.8rem] leading-none transition-colors ${isActive ? 'bg-[#C89B3C] border-[#C89B3C] text-[#0F1F3D]' : 'bg-white border-[rgba(15,31,61,0.12)] text-[#0F1F3D] group-hover:border-[#C89B3C]'}`}>{isActive ? '—' : '+'}</span>
                      </div>
                      {isActive && <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[14px] bg-[#C89B3C]" />}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-mono text-[0.66rem] tracking-wide text-[#756F65]">Active station drives the constellation →</span>
              <span className="flex gap-1.5"><button onClick={() => setActive(v => (v - 1 + 5) % 5)} aria-label="prev" className="h-8 w-8 grid place-items-center rounded-full border border-[rgba(15,31,61,0.12)] bg-white">‹</button><button onClick={() => setActive(v => (v + 1) % 5)} aria-label="next" className="h-8 w-8 grid place-items-center rounded-full bg-[#0F1F3D] text-white">›</button></span>
            </div>
          </div>

          {/* RIGHT — stack constellation (untouched except subtext removed) */}
          <div className="relative rounded-[20px] bg-[#0F1F3D] text-[#FAF7F0] border border-[rgba(200,155,60,0.14)] shadow-[0_18px_50px_rgba(15,31,61,0.2)] p-4 sm:p-5 overflow-hidden">
            <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(200,155,60,0.14),transparent_70%)]" />
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="font-mono text-[0.70rem] tracking-[0.14em] text-[#C89B3C]">STACK CONSTELLATION</span>
                <h3 className="font-serif text-[1.3rem] font-extrabold leading-none mt-1">20 tools, one gravity</h3>
              </div>
              <span className="font-mono text-[0.68rem] tracking-wide bg-white/10 border border-white/10 px-2.5 py-1 rounded-full">{filteredSkills.length} shown</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {CATS.map(c => (
                <button key={c} onClick={() => setFilter(c)} className={`rounded-full px-3 py-1.5 font-mono text-[0.68rem] font-bold tracking-wide border transition-colors ${filter === c ? 'bg-[#C89B3C] text-[#0F1F3D] border-[#C89B3C]' : 'bg-white/5 text-[#F3E8D0]/80 border-white/10 hover:bg-white hover:text-[#0F1F3D]'}`}>{c.toUpperCase()}</button>
              ))}
            </div>
            <div className="mt-5 grid gap-2.5" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(124px,1fr))' }}>
              {filteredSkills.map(s => {
                const lit = highlighted.has(s.name);
                return (
                  <div key={s.name} className={`skill-dot group relative overflow-hidden rounded-2xl border p-[12px_10px] flex flex-col items-center text-center transition-all ${lit ? 'bg-[#F3E8D0] border-[#C89B3C] shadow-[0_8px_20px_rgba(200,155,60,0.22)] -translate-y-0.5' : 'bg-[#FAF7F0] border-[rgba(200,155,60,0.12)] hover:border-[#C89B3C]/40'}`}>
                    {lit && <span className="absolute inset-x-0 top-0 h-0.5 bg-[#C89B3C]" />}
                    {lit && <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#C89B3C] shadow-[0_0_8px_rgba(200,155,60,0.9)] animate-pulse" />}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 shrink-0 transition-colors ${lit ? 'bg-[#0F1F3D] text-[#F3E8D0]' : 'bg-[#0F1F3D] text-[#FAF7F0] group-hover:bg-[#7A263A]'}`}>
                      <SkillIcon icon={(s as any).icon} abbr={s.abbr} />
                    </div>
                    <span className="text-[0.82rem] font-bold leading-tight text-[#0F1F3D]">{s.name}</span>
                    <span className="font-mono text-[0.62rem] tracking-wide text-[#756F65]">{s.cat}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[0.70rem] font-mono">
              <span className="tracking-wide text-[#F3E8D0]/50">{filter} · {filteredSkills.length} / {portfolio.skills.length} · station 0{active + 1} lit {highlighted.size}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
