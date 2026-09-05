import { useEffect, useRef } from 'react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { portfolio } from '@/data/portfolio';
import { useAppReady } from '@/context/LenisContext';

export function ExperienceEditorial() {
  const ref = useRef<HTMLElement>(null);
  const ready = useAppReady();

  useEffect(() => {
    const root = ref.current;
    if (!root || isReducedMotion()) return;
    if (!ready) {
      const t = window.setTimeout(() => {
        root.querySelectorAll<HTMLElement>('.exp-ticket').forEach(el => gsap.set(el, { autoAlpha: 1 }));
      }, 2200);
      return () => window.clearTimeout(t);
    }
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        gsap.from(root.querySelectorAll<HTMLElement>('.exp-ticket'), {
          y: 28, autoAlpha: 0, duration: 0.6, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: root.querySelector('.exp-wrap') ?? root, start: 'top 86%' }
        });
        window.setTimeout(() => {
          root.querySelectorAll<HTMLElement>('.exp-ticket').forEach(el => {
            const cs = getComputedStyle(el);
            if (cs.opacity === '0') gsap.set(el, { clearProps: 'all', autoAlpha: 1 });
          });
        }, 1400);
      });
      mm.add('(max-width: 767px)', () => {
        gsap.from(root.querySelectorAll<HTMLElement>('.exp-ticket'), {
          y: 14, autoAlpha: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 88%' }
        });
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={ref} id="experience" className="bg-[#FAF7F0] text-[#0F1F3D]">
      <div className="max-w-[1400px] mx-auto px-[4vw] py-[72px] sm:py-[88px]">
        <div className="flex flex-wrap justify-between items-end gap-4 border-b-2 border-[#0F1F3D] pb-4 mb-10 reveal">
          <div>
            <span className="font-mono text-[0.78rem] tracking-[0.12em] text-[#C89B3C] block mb-1.5">05 / BACKGROUND</span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-extrabold tracking-[-0.02em] leading-none">EXPERIENCE</h2>
            <p className="font-mono text-[0.72rem] tracking-wide text-[#756F65] mt-2">Shipping production code & leading teams — two internships, real deploys.</p>
          </div>
          <span className="hidden sm:inline-flex font-mono text-[0.72rem] tracking-[0.08em] text-[#0F1F3D] border border-[#C89B3C]/20 bg-white px-3.5 py-1.5 rounded-full">02 ROLES · 2026</span>
        </div>

        <div className="exp-wrap flex flex-col gap-5">
          {portfolio.experience.map((r, idx) => (
            <article key={r.title} className="exp-ticket group relative flex flex-col md:flex-row overflow-hidden rounded-[18px] border border-[#C89B3C]/15 bg-[#FAF7F0] hover:border-[#C89B3C]/30 hover:shadow-[0_14px_36px_rgba(15,31,61,0.08)] transition-all">
              <div className="relative flex md:flex-col items-center justify-between md:justify-center gap-3 md:w-[200px] shrink-0 bg-[#0F1F3D] text-[#FAF7F0] px-5 py-4 md:py-6">
                <div className="text-left md:text-center">
                  <span className="font-mono text-[0.68rem] tracking-[0.12em] text-[#C89B3C] block">{r.period}</span>
                  <span className="mt-1 inline-flex font-mono text-[0.66rem] font-bold tracking-[0.08em] bg-[#C89B3C] text-[#0F1F3D] px-2.5 py-1 rounded-full">{r.badge}</span>
                </div>
                <span className="font-serif text-[2.2rem] md:text-[2.6rem] font-black leading-none text-white/10 select-none">0{idx + 1}</span>
                <span aria-hidden className="hidden md:block absolute right-[-1px] top-3 bottom-3 w-px border-r border-dashed border-white/20" />
                <span aria-hidden className="hidden md:block absolute right-[-6px] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#FAF7F0] border border-[#C89B3C]/15" />
                <span aria-hidden className="md:hidden absolute left-3 right-3 bottom-[-1px] h-px border-b border-dashed border-white/20" />
              </div>
              <div className="flex-1 p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-serif text-[1.22rem] sm:text-[1.35rem] font-extrabold leading-tight">{r.title} <span className="font-sans text-[0.86rem] font-semibold text-[#C89B3C]">— {r.role}</span></h3>
                  <span className="hidden sm:inline-flex font-mono text-[0.66rem] tracking-wide text-[#756F65] border border-[#C89B3C]/15 bg-white px-2.5 py-1 rounded-full">↗ {r.title.split(' ')[0]}</span>
                </div>
                <p className="mt-2 text-[0.90rem] leading-relaxed text-[#3a3a3a]/80 max-w-[720px]">{r.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {r.tags.map(t => (
                    <span key={t} className="font-mono text-[0.70rem] tracking-wide bg-white border border-[#C89B3C]/15 px-2.5 py-1 rounded-full text-[#0F1F3D]">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
