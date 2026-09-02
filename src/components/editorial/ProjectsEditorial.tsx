import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { portfolio } from '@/data/portfolio';

type Proj = {
  id: string;
  badge: string;
  lang: string;
  snippet: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  live?: string;
  github?: string;
  accent: string;
  year: string;
  role: string;
  features: string[];
  code: { lang: string; lines: string[] };
  hero: string;
};

const allProjects: Proj[] = [
  {
    id: '01',
    badge: portfolio.projectsFeatured[0].badge,
    lang: portfolio.projectsFeatured[0].lang,
    snippet: portfolio.projectsFeatured[0].snippet,
    title: portfolio.projectsFeatured[0].title,
    subtitle: portfolio.projectsFeatured[0].subtitle,
    desc: portfolio.projectsFeatured[0].desc,
    tags: portfolio.projectsFeatured[0].tags,
    live: portfolio.projectsFeatured[0].live,
    github: portfolio.projectsFeatured[0].github,
    accent: '#C89B3C',
    year: '2026 · SIH',
    role: 'Lead · AI Research',
    features: ['INSAT-3DR 4-band MOSDAC ingestion', 'Temporal 3D-CNN — 4-class risk grading', 'Grad-CAM explainability overlays', 'FastAPI + React live-inference dashboard'],
    code: { lang: 'python', lines: ['class Temporal3DCNN(nn.Module):', '    def forward(self, x):  # x: [B, 4, T, H, W]', '        feat = self.encoder(x)', '        risk = self.classifier(feat)  # 4 classes', '        return risk, grad_cam(feat)'] },
    hero: '',
  },
  {
    id: '02',
    badge: portfolio.projectsFeatured[1].badge,
    lang: portfolio.projectsFeatured[1].lang,
    snippet: portfolio.projectsFeatured[1].snippet,
    title: portfolio.projectsFeatured[1].title,
    subtitle: portfolio.projectsFeatured[1].subtitle,
    desc: portfolio.projectsFeatured[1].desc,
    tags: portfolio.projectsFeatured[1].tags,
    live: portfolio.projectsFeatured[1].live,
    github: portfolio.projectsFeatured[1].github,
    accent: '#7A263A',
    year: '2026 · National Finalist',
    role: 'Team Lead — Bharat Mandapam',
    features: ['RAG + LLM CivicCopilot chat', 'Semantic complaint classification', 'Geotag + NetworkX knowledge graph', 'Multilingual ingestion pipeline'],
    code: { lang: 'typescript', lines: ['const copilot = await rag.query({', '  query: citizen.text,', '  k: 8, rerank: true', '});', 'await copilot.stream(to: citizen.id)'] },
    hero: '/images/projects/project1.png',
  },
  {
    id: '03',
    badge: portfolio.projectsFeatured[2].badge,
    lang: portfolio.projectsFeatured[2].lang,
    snippet: portfolio.projectsFeatured[2].snippet,
    title: portfolio.projectsFeatured[2].title,
    subtitle: portfolio.projectsFeatured[2].subtitle,
    desc: portfolio.projectsFeatured[2].desc,
    tags: portfolio.projectsFeatured[2].tags,
    live: portfolio.projectsFeatured[2].live,
    github: portfolio.projectsFeatured[2].github,
    accent: '#1B4D3E',
    year: '2025 · Live',
    role: 'Full-Stack Owner',
    features: ['JWT + RBAC + Stripe lifecycle', '~35% latency cut — optimized MongoDB', 'SOLID / MVC, CORS-hardened prod', 'Admin analytics + order tracking'],
    code: { lang: 'typescript', lines: ['app.post("/checkout", auth, rbac("user"),', '  stripe.webhook(async (session) => {', '    await Order.create(session)', '  })', ')'] },
    hero: '/images/projects/project2.png',
  },
  {
    id: '04',
    badge: 'FEATURED',
    lang: 'REACT · OPENAI · GEMINI',
    snippet: 'interview-ai/pipeline/dual_eval.ts',
    title: portfolio.projectsSecondary[0].title,
    subtitle: portfolio.projectsSecondary[0].subtitle,
    desc: portfolio.projectsSecondary[0].desc,
    tags: portfolio.projectsSecondary[0].tags,
    live: portfolio.projectsSecondary[0].live,
    github: portfolio.projectsSecondary[0].github,
    accent: '#2A3A6A',
    year: '2025 · Shipped',
    role: 'AI Product',
    features: ['Dual AI: OpenAI + Gemini question gen', 'Real-time streaming evaluation', 'Voice, code & behavioural scoring', 'Shareable report + retry loop'],
    code: { lang: 'typescript', lines: ['const q = await dual.generate({', '  role, level, stack', '});', 'for await (const tok of evaluate(q, answer)) {', '  stream.send(tok)', '}'] },
    hero: '/images/projects/project3.png',
  },
  {
    id: '05',
    badge: 'FEATURED',
    lang: 'REACT 18 · FRAMER · TAILWIND',
    snippet: 'brew-and-co/app/scroll.tsx',
    title: portfolio.projectsSecondary[1].title,
    subtitle: portfolio.projectsSecondary[1].subtitle,
    desc: portfolio.projectsSecondary[1].desc,
    tags: portfolio.projectsSecondary[1].tags,
    live: portfolio.projectsSecondary[1].live,
    github: portfolio.projectsSecondary[1].github,
    accent: '#8E6A2E',
    year: '2025 · Live',
    role: 'Design + Frontend',
    features: ['Editorial layout —  editorial grid + 3D glass', 'Framer Motion scroll storytelling', 'Vite + Tailwind — 95+ Lighthouse', 'Headless CMS-ready sections'],
    code: { lang: 'tsx', lines: ['<Parallax speed={-0.2}>', '  <GlassCard tilt={8}>', '    <BrewStory />', '  </GlassCard>', '</Parallax>'] },
    hero: '/images/projects/project4.png',
  },
];

export function ProjectsEditorial() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const dragDist = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-proj-head] > *', { y: 22, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragDist.current = 0;
    startX.current = e.clientX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
  };
  const onMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.clientX - startX.current;
    dragDist.current = dx;
    if (Math.abs(dx) > 4) trackRef.current.scrollLeft = scrollStart.current - dx;
  };
  const onUp = () => {
    isDragging.current = false;
    setTimeout(() => (dragDist.current = 0), 120);
  };
  const handleSelect = (i: number) => {
    if (Math.abs(dragDist.current) > 8) return;
    setActive(i);
    document.querySelector(`[data-slab="${i}"]`)?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <section ref={sectionRef} id="projects" className="relative overflow-hidden bg-[#0F1F3D] text-[#FAF7F0]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,155,60,0.09),_transparent_60%)]" />
      <div className="relative max-w-[1400px] mx-auto px-[4vw] pt-[84px] pb-[40px]">
        <div data-proj-head className="flex flex-wrap justify-between items-end gap-4 border-b border-[rgba(200,155,60,0.14)] pb-4 mb-8">
          <div>
            <span className="font-mono text-[0.78rem] tracking-[0.12em] text-[#C89B3C] block mb-1.5">01 / PROJECTS</span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-none tracking-[0.01em] text-[#FAF7F0]">SELECTED <span className="text-[#C89B3C]">WORKS</span><span className="ml-3 align-super font-mono text-[0.62rem] font-normal tracking-[0.18em] text-[#F3E8D0]/50">05 — 2024→2026</span></h2>
          </div>
          <a href={portfolio.github} target="_blank" rel="noopener" className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[0.78rem] font-bold tracking-wide text-[#C89B3C] hover:text-[#F3E8D0] transition-colors">GITHUB REPO INDEX <span aria-hidden>↗</span></a>
        </div>

        <div ref={trackRef} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 -mx-[4vw] px-[4vw] sm:mx-0 sm:px-0" style={{ scrollbarWidth: 'none', cursor: 'grab' } as any}>
          {allProjects.map((p, i) => {
            const isActive = i === active;
            return (
              <div key={p.title} data-slab={i} onClick={() => handleSelect(i)} onKeyDown={(e) => e.key === 'Enter' && handleSelect(i)} tabIndex={0} role="button" aria-label={`${p.title} expand`} className={`group relative shrink-0 snap-center overflow-hidden rounded-[18px] border transition-[flex-basis,border-color,box-shadow] duration-[560ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[flex-basis] ${isActive ? 'basis-[88vw] sm:basis-[62%] shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_32px_rgba(200,155,60,0.12)] border-[rgba(200,155,60,0.42)]' : 'basis-[92px] sm:basis-[110px] border-[rgba(200,155,60,0.14)] hover:border-[rgba(200,155,60,0.28)]'}`} style={{ height: 540, background: isActive ? '#162E4D' : '#0F1F3D' } as any}>
                {/* collapsed */}
                <div className={`absolute inset-0 flex flex-col items-center justify-between py-6 px-3 transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} style={{ writingMode: 'vertical-rl' as any }}>
                  <span className="font-mono text-[0.62rem] tracking-[0.18em] text-[#C89B3C] rotate-180" style={{ writingMode: 'vertical-rl' } as any}>{p.badge}</span>
                  <span className="font-serif text-[1.7rem] font-extrabold tracking-tight text-[#FAF7F0] rotate-180 whitespace-nowrap" style={{ writingMode: 'vertical-rl' } as any}>{p.title.toUpperCase()}</span>
                  <span className="font-serif text-[2.2rem] font-extrabold leading-none text-[#FAF7F0]/[0.08]">{p.id}</span>
                </div>

                {/* expanded */}
                <div className={`absolute inset-0 flex transition-opacity duration-[420ms] ${isActive ? 'opacity-100 delay-[100ms]' : 'opacity-0 pointer-events-none'}`}>
                  {/* left hero — desktop : image + interesting visual */}
                  <div className="hidden lg:flex w-[42%] flex-col border-r border-[rgba(200,155,60,0.12)] bg-[#0F1F3D] p-5 relative overflow-hidden">
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-[0.08]" style={{ background: p.accent }} />
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[0.64rem] tracking-[0.14em] text-[#C89B3C]">{p.id} — {p.badge}</span>
                      <span className="font-mono text-[0.62rem] tracking-wide text-[#F3E8D0]/45">{p.year}</span>
                    </div>
                    {/* HERO IMAGE — replace code with visual */}
                    <div className="mt-3 relative overflow-hidden rounded-xl border border-[rgba(200,155,60,0.16)] bg-[#0B1224] shadow-[0_12px_30px_rgba(0,0,0,0.35)] group/hero">
                      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[rgba(200,155,60,0.10)] bg-[#0F1F3D]">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" /><span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" /><span className="h-2.5 w-2.5 rounded-full bg-[#27CA3F]" />
                        <span className="ml-auto font-mono text-[0.60rem] tracking-wide text-[#F3E8D0]/40 truncate max-w-[150px]">{p.snippet}</span>
                      </div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#0B1224]">
                        <img src={p.hero} alt={`${p.title} hero`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-[700ms] group-hover/hero:scale-[1.03]" style={{ display: p.hero ? undefined : 'none' }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
                        {/* live pulse */}
                        <span className="absolute top-2 left-2 inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur px-2.5 py-1 font-mono text-[0.60rem] tracking-wide text-white border border-white/10">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />{p.badge}
                        </span>
                        <span className="absolute bottom-2 right-2 rounded-full bg-[#0F1F3D]/80 backdrop-blur border border-white/10 px-2 py-1 font-mono text-[0.60rem] text-[#F3E8D0]/80">{p.title}</span>
                        {/* fallback when image missing */}
                        <div className="absolute inset-0 -z-0 grid place-items-center bg-[radial-gradient(ellipse_at_center,rgba(200,155,60,0.14),transparent_70%)] text-[#F3E8D0]/20 font-serif text-3xl font-bold">{p.title.slice(0,2).toUpperCase()}</div>
                      </div>
                    </div>
                    <div className="mt-auto flex gap-2 pt-4">
                      {p.live && <a href={p.live} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="text-xs font-bold bg-[#C89B3C] text-[#0F1F3D] px-4 py-2 rounded-full hover:bg-[#F3E8D0] transition-colors">Live →</a>}
                      {p.github && <a href={p.github} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="text-xs font-bold border border-[rgba(200,155,60,0.22)] text-[#FAF7F0] px-4 py-2 rounded-full hover:border-[#C89B3C] transition-colors">Code</a>}
                    </div>
                    <span className="pointer-events-none absolute bottom-3 right-4 font-serif text-[4rem] font-extrabold leading-none text-[#FAF7F0]/[0.06] select-none">{p.id}</span>
                  </div>

                  {/* right editorial — always visible */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col min-w-0 overflow-y-auto scrollbar-none">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className="font-mono text-[0.66rem] tracking-[0.14em] text-[#C89B3C]">{p.lang}</span>
                        <h3 className="font-serif text-[1.55rem] sm:text-[1.75rem] font-extrabold leading-none text-[#FAF7F0] mt-1 truncate">{p.title}</h3>
                        <span className="font-serif italic text-[0.86rem] text-[#C89B3C] mt-1 block">{p.subtitle}</span>
                      </div>
                      <span className="hidden sm:inline-flex font-mono text-[0.64rem] tracking-wide bg-[rgba(200,155,60,0.12)] text-[#C89B3C] border border-[rgba(200,155,60,0.22)] px-2.5 py-1 rounded-full shrink-0">{p.badge}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-[0.68rem]">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0F1F3D] border border-[rgba(200,155,60,0.14)] px-2.5 py-1 font-mono text-[#F3E8D0]/80"><span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />{p.year}</span>
                      <span className="inline-flex items-center rounded-full bg-[#0F1F3D] border border-white/10 px-2.5 py-1 font-mono text-[#F3E8D0]/70">{p.role}</span>
                    </div>
                    <p className="text-[0.88rem] leading-[1.65] text-[#F3E8D0]/90 mt-3">{p.desc}</p>
                    <div className="mt-4 pt-4 border-t border-[rgba(200,155,60,0.12)]">
                      <span className="font-mono text-[0.62rem] tracking-[0.14em] text-[#F3E8D0]/50">HIGHLIGHTS</span>
                      <ul className="mt-2 space-y-1.5">
                        {p.features.map((f) => (
                          <li key={f} className="flex gap-2 text-[0.82rem] leading-[1.5] text-[#F3E8D0]/85"><span className="mt-[7px] h-1 w-1 rounded-full bg-[#C89B3C] shrink-0" />{f}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {p.tags.map((t) => (
                        <span key={t} className="font-mono text-[0.64rem] bg-[#0F1F3D] border border-[rgba(200,155,60,0.14)] text-[#F3E8D0]/85 px-2.5 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-auto pt-4 lg:hidden">
                      {p.live && <a href={p.live} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="text-xs font-bold bg-[#C89B3C] text-[#0F1F3D] px-4 py-2 rounded-full">Live →</a>}
                      {p.github && <a href={p.github} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="text-xs font-bold border border-white/20 text-white px-4 py-2 rounded-full">GitHub</a>}
                    </div>
                  </div>
                </div>
                <div className={`pointer-events-none absolute left-0 top-0 bottom-0 w-[3px] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} style={{ background: p.accent }} />
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.68rem] tracking-[0.14em] text-[#F3E8D0]/50">{String(active + 1).padStart(2, '0')} / {String(allProjects.length).padStart(2, '0')}</span>
            <div className="h-px w-16 bg-[rgba(200,155,60,0.18)] hidden sm:block" />
            <span className="font-mono text-[0.68rem] tracking-wide text-[#F3E8D0]/50 hidden sm:inline">{allProjects[active].subtitle}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex gap-1.5 mr-2">
              {allProjects.map((_, i) => (
                <button key={i} onClick={() => { setActive(i); document.querySelector(`[data-slab="${i}"]`)?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); }} aria-label={`Go to ${i + 1}`} className={`h-1 rounded-full transition-all ${i === active ? 'w-8 bg-[#C89B3C]' : 'w-5 bg-white/20 hover:bg-white/35'}`} />
              ))}
            </div>
            <button onClick={() => setActive((v) => (v - 1 + allProjects.length) % allProjects.length)} className="h-9 w-9 grid place-items-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-white hover:text-[#0F1F3D] transition-colors">‹</button>
            <button onClick={() => setActive((v) => (v + 1) % allProjects.length)} className="h-9 w-9 grid place-items-center rounded-full bg-[#C89B3C] text-[#0F1F3D] hover:bg-[#F3E8D0] transition-colors">›</button>
          </div>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full bg-[#C89B3C] transition-all duration-500 ease-out" style={{ width: `${((active + 1) / allProjects.length) * 100}%` }} /></div>
      </div>
    </section>
  );
}
