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
      const t = window.setTimeout(() => root.querySelectorAll<HTMLElement>('.timeline-row, .extra-card').forEach(el => gsap.set(el, { autoAlpha: 1 })), 2500);
      return () => window.clearTimeout(t);
    }
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const rows = root.querySelectorAll<HTMLElement>('.timeline-row');
        gsap.from(rows, {
          y: 32, autoAlpha: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: rows[0]?.closest('.timeline-wrap') ?? root, start: 'top 85%' }
        });
        const extras = root.querySelectorAll<HTMLElement>('.extra-card');
        gsap.from(extras, { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.10, ease: 'power3.out',
          scrollTrigger: { trigger: root.querySelector('.extras') ?? root, start: 'top 85%' }
        });
        window.setTimeout(()=>{[...rows, ...extras].forEach(el=>{const cs=getComputedStyle(el); if(cs.opacity==='0') gsap.set(el,{clearProps:'all',autoAlpha:1});});},1200);
      });
      mm.add('(max-width: 767px)', () => {
        const rows = root.querySelectorAll<HTMLElement>('.timeline-row');
        gsap.from(rows, { y: 16, autoAlpha: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: root, start: 'top 88%' } });
        window.setTimeout(()=>{rows.forEach(el=>{const cs=getComputedStyle(el); if(cs.opacity==='0') gsap.set(el,{clearProps:'all',autoAlpha:1});});},1200);
        }
      );
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={ref} id="experience" className="bg-[#F3E8D0] text-[#0F1F3D]">
      <div className="max-w-[1400px] mx-auto px-[4vw] py-[80px]">
        <div className="flex flex-wrap justify-between items-end gap-4 border-b-2 border-[#0F1F3D] pb-4 mb-[50px] reveal">
          <div>
            <span className="font-mono text-[0.78rem] tracking-[0.12em] text-[var(--accent)] block mb-1.5">05 / BACKGROUND</span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-extrabold text-[#0F1F3D]">EXPERIENCE</h2>
          </div>
          <span className="font-mono text-[0.8rem] text-[#756F65]">SHIPPING PRODUCTION CODE & LEADING TEAMS</span>
        </div>
        <div className="timeline-wrap flex flex-col gap-5">
          {portfolio.experience.map((r) => (
            <div key={r.title} className="timeline-row grid md:grid-cols-[220px_1fr] gap-[30px] bg-[#FAF7F0] border border-[#C89B3C]/15 rounded-2xl p-7 hover:translate-x-1.5 hover:border-[var(--accent)] transition-all will-change-transform">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[0.8rem] text-[#756F65]">{r.period}</span>
                <span className="font-mono text-[0.7rem] bg-[rgba(200,155,60,0.10)] text-[var(--accent)] px-2.5 py-1 rounded-full w-fit border border-[rgba(200,155,60,0.14)]">{r.badge}</span>
              </div>
              <div>
                <h3 className="font-serif text-[1.2rem] text-[#0F1F3D]">{r.title} <span className="font-sans text-[0.88rem] text-[var(--accent)] font-semibold">— {r.role}</span></h3>
                <p className="text-[0.92rem] text-[#756F65] mt-1.5 mb-3">{r.desc}</p>
                <div className="flex flex-wrap gap-2">{r.tags.map(t => <span key={t} className="font-mono text-[0.73rem] bg-[#FAF7F0] border border-[#C89B3C]/15 px-2.5 py-1 rounded-full text-[#0F1F3D]">{t}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="extras grid lg:grid-cols-2 gap-6 mt-10">
          <div className="extra-card bg-[#FAF7F0] border border-[#C89B3C]/15 rounded-2xl p-7 will-change-transform">
            <h3 className="font-serif text-lg font-extrabold text-[#0F1F3D]">CERTIFICATIONS</h3>
            <ul className="mt-4 space-y-2.5">{portfolio.certifications.map(c => (<li key={c.name} className="flex justify-between gap-4 text-sm border-b border-[#C89B3C]/10 pb-2 last:border-0"><span className="font-medium text-[#0F1F3D]">{c.name}</span><span className="font-mono text-xs text-[#756F65] shrink-0">{c.issuer}</span></li>))}</ul>
          </div>
          <div className="extra-card bg-[#FAF7F0] border border-[#C89B3C]/15 rounded-2xl p-7 will-change-transform">
            <h3 className="font-serif text-lg font-extrabold text-[#0F1F3D]">ACHIEVEMENTS</h3>
            <ul className="mt-4 space-y-2">{portfolio.achievements.map(a => <li key={a} className="text-sm text-[#756F65] leading-6">• {a}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
