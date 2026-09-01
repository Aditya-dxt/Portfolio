import { useEffect, useRef } from 'react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { portfolio } from '@/data/portfolio';
import { useAppReady } from '@/context/LenisContext';

export function ProjectsEditorial() {
  const sectionRef = useRef<HTMLElement>(null);
  const ready = useAppReady();
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    // keep featured 3 cards static — no first-load/reload entrance animation
    gsap.set(root.querySelectorAll<HTMLElement>('.proj-card-editorial'), { clearProps: 'all', autoAlpha: 1 });
    gsap.set(root.querySelectorAll<HTMLElement>('.proj-card-editorial .proj-num'), { clearProps: 'all', autoAlpha: 1 });
    if (isReducedMotion()) return;
    if (!ready) {
      const t = window.setTimeout(() => {
        root.querySelectorAll<HTMLElement>('.sec-card').forEach(el => gsap.set(el, { clearProps: 'all', autoAlpha: 1 }));
      }, 800);
      return () => window.clearTimeout(t);
    }
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const secCards = root.querySelectorAll<HTMLElement>('.sec-card');
        if (secCards.length) {
          gsap.from(secCards, {
            y: 24,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: secCards[0]?.closest('.secondary-grid') ?? root,
              start: 'top 88%',
            }
          });
        }
      });
      mm.add('(max-width: 767px)', () => {
        const secCards = root.querySelectorAll<HTMLElement>('.sec-card');
        if (secCards.length) {
          gsap.from(secCards, {
            y: 16, autoAlpha: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: root, start: 'top 92%' }
          });
        }
      });
      window.setTimeout(() => {
        root.querySelectorAll<HTMLElement>('.sec-card').forEach(el => {
          const cs = getComputedStyle(el);
          if (cs.opacity === '0' || cs.visibility === 'hidden') gsap.set(el, { clearProps: 'all', autoAlpha: 1 });
        });
      }, 900);
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={sectionRef} id="projects" className="bg-[#0F1F3D] text-[#FAF7F0]">
      <div className="max-w-[1400px] mx-auto px-[4vw] py-[100px]">
        <div className="flex flex-wrap justify-between items-end gap-4 border-b border-[rgba(200,155,60,0.14)] pb-4 mb-[50px] reveal">
          <div>
            <span className="font-mono text-[0.78rem] tracking-[0.12em] text-[#C89B3C] block mb-1.5">01 / PROJECTS</span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-[0.02em] text-[#FAF7F0]">FEATURED PROJECTS</h2>
          </div>
          <a href={portfolio.github} target="_blank" rel="noopener" className="font-mono text-[0.8rem] font-bold text-[#C89B3C] hover:text-[var(--accent-hover)] hover:translate-x-1 transition-all">VIEW ALL GITHUB REPOS →</a>
        </div>

        {/* Featured — 3 cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {portfolio.projectsFeatured.map((p) => (
            <article key={p.title} className="proj-card-editorial bg-[#162E4D] border border-[rgba(200,155,60,0.14)] rounded-[18px] overflow-hidden hover:-translate-y-2 hover:border-[#7A263A] hover:shadow-[0_20px_45px_rgba(0,0,0,0.5),0_0_25px_rgba(200,155,60,0.10)] transition-all duration-[280ms] will-change-transform flex flex-col" style={{ perspective: "800px" } as any}>
              <div className="bg-[#0F1F3D] h-[180px] p-5 relative flex items-end border-b border-[rgba(200,155,60,0.14)] shrink-0">
                <span className="absolute top-4 right-4 font-mono text-[0.68rem] font-bold tracking-wide bg-[rgba(200,155,60,0.10)] text-[#C89B3C] border border-[rgba(200,155,60,0.22)] px-2.5 py-1 rounded-full">{p.badge}</span>
                <div className="font-mono text-[0.78rem]">
                  <span className="text-[#C89B3C] font-bold block mb-0.5 tracking-wide">{p.lang}</span>
                  <span className="text-[#F3E8D0] opacity-90">{p.snippet}</span>
                </div>
              </div>
              <div className="p-7 relative flex flex-col flex-1">
                <span className="proj-num font-serif text-[3rem] font-extrabold text-[#FAF7F0]/[0.06] absolute top-2.5 right-6 leading-none select-none will-change-transform">{p.id}</span>
                <h3 className="font-serif text-[1.45rem] font-extrabold text-[#FAF7F0]">{p.title}</h3>
                <span className="font-mono text-[0.84rem] text-[#C89B3C] block mt-0.5">{p.subtitle}</span>
                <p className="text-[0.9rem] text-[#F3E8D0] leading-[1.65] mt-3.5 mb-5">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map(t => <span key={t} className="font-mono text-[0.72rem] bg-[#0F1F3D] border border-[rgba(200,155,60,0.14)] text-[#F3E8D0] px-2.5 py-1 rounded-full">{t}</span>)}
                </div>
                <div className="flex gap-3 mt-auto">
                  {p.live && <a href={p.live} target="_blank" rel="noopener" className="text-xs font-bold tracking-wide bg-[var(--accent)] text-[var(--bg-dark)] px-4 py-2 rounded-full hover:bg-[var(--text-light)] hover:text-[var(--bg-dark)] transition-colors">Live →</a>}
                  {p.github && <a href={p.github} target="_blank" rel="noopener" className="text-xs font-bold tracking-wide border border-[rgba(200,155,60,0.14)] text-[#FAF7F0] px-4 py-2 rounded-full hover:border-[#7A263A] hover:text-[#C89B3C] transition-colors">GitHub</a>}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Secondary — 2 cards centered */}
        <div className="secondary-grid grid gap-6 md:grid-cols-2 max-w-[880px] mx-auto">
          {portfolio.projectsSecondary.map(p => (
            <div key={p.title} className="sec-card bg-[#162E4D] border border-[rgba(200,155,60,0.14)] rounded-2xl p-7 flex flex-col hover:border-[#7A263A] hover:-translate-y-1 transition-all duration-200 will-change-transform">
              <div className="font-serif text-[2.2rem] font-extrabold text-[#C89B3C] leading-none mb-3">{p.id}</div>
              <h4 className="font-serif text-[1.25rem] font-bold text-[#FAF7F0]">{p.title}</h4>
              <p className="font-mono text-[0.8rem] text-[#C89B3C] mt-1 mb-3">{p.subtitle}</p>
              <p className="text-[0.88rem] text-[#F3E8D0] leading-[1.6] mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-5">{p.tags.map(t => <span key={t} className="font-mono text-[0.72rem] bg-[#0F1F3D] border border-[rgba(200,155,60,0.14)] text-[#F3E8D0] px-2.5 py-1 rounded-full">{t}</span>)}</div>
              <div className="flex gap-3 mt-auto">
                {p.live && <a href={p.live} target="_blank" rel="noopener" className="text-xs font-bold tracking-wide bg-[var(--accent)] text-[var(--bg-dark)] px-4 py-2 rounded-full hover:bg-[var(--text-light)] hover:text-[var(--bg-dark)] transition-colors">Live →</a>}
                <a href={p.github} target="_blank" rel="noopener" className="text-xs font-bold tracking-wide border border-[rgba(200,155,60,0.14)] text-[#FAF7F0] px-4 py-2 rounded-full hover:border-[#7A263A] hover:text-[#C89B3C] transition-colors">GitHub</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
