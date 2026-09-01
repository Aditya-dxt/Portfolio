import { useEffect, useRef } from 'react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { portfolio } from '@/data/portfolio';
import { useAppReady } from '@/context/LenisContext';
import { HiOutlineMapPin, HiOutlineCalendarDays } from 'react-icons/hi2';

export function HackathonsEditorial() {
  const ref = useRef<HTMLElement>(null);
  const ready = useAppReady();
  useEffect(() => {
    const root = ref.current;
    if (!root || isReducedMotion()) return;
    if (!ready) {
      const t = window.setTimeout(() => root.querySelectorAll<HTMLElement>('.hack-card').forEach(el => gsap.set(el, { autoAlpha: 1 })), 2500);
      return () => window.clearTimeout(t);
    }
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const cards = root.querySelectorAll<HTMLElement>('.hack-card');
        gsap.from(cards, { y: 28, autoAlpha: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 82%' } });
        window.setTimeout(()=>{cards.forEach(el=>{const cs=getComputedStyle(el); if(cs.opacity==='0') gsap.set(el,{clearProps:'all',autoAlpha:1});});},1200);
      });
      mm.add('(max-width: 767px)', () => {
        const cards = root.querySelectorAll<HTMLElement>('.hack-card');
        gsap.from(cards, { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.09, ease: 'power2.out', scrollTrigger: { trigger: root, start: 'top 88%' } });
        window.setTimeout(()=>{cards.forEach(el=>{const cs=getComputedStyle(el); if(cs.opacity==='0') gsap.set(el,{clearProps:'all',autoAlpha:1});});},1200);
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={ref} id="hackathons" className="bg-[#162E4D] text-[var(--text-light)] border-t border-[rgba(200,155,60,0.14)]">
      <div className="max-w-[1400px] mx-auto px-[4vw] py-[90px]">
        <div className="flex flex-wrap justify-between items-end gap-4 border-b border-[rgba(200,155,60,0.14)] pb-5 mb-10 reveal">
          <div>
            <span className="font-mono text-[0.78rem] tracking-[0.12em] text-[#C89B3C] block mb-1.5">06 / HACKATHONS</span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-[0.02em]">HACKATHONS LED</h2>
            <p className="text-[0.92rem] text-[var(--text-light-muted)] mt-1">Four national stages — team lead, ship fast, learn faster.</p>
          </div>
          <span className="font-mono text-[0.72rem] tracking-[0.08em] text-[var(--text-light-muted)] border border-[rgba(200,155,60,0.14)] px-3.5 py-1.5 rounded-full hidden md:inline-flex">4 × NATIONAL · TEAM LEADER</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {portfolio.hackathons.map((h, i) => (
            <article
              key={h.name}
              className="hack-card group bg-[#162E4D]/70 backdrop-blur border border-[rgba(200,155,60,0.14)] rounded-[18px] overflow-hidden flex flex-col md:flex-row hover:border-[#C89B3C] hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition-all duration-300 will-change-transform min-h-[340px]"
            >
              {/* Left — Poster image, exactly as in screenshot: full cover, badge + index */}
              <div className="relative w-full md:w-[42%] shrink-0 bg-[#0F1F3D] overflow-hidden flex">
                <img
                  src={(h as any).image}
                  alt={`${h.name} poster`}
                  loading="lazy"
                  className="w-full h-[260px] md:h-auto md:min-h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                />
                {(h as any).badge && (
                  <span className="absolute top-3 left-3 font-mono text-[0.64rem] font-bold tracking-[0.1em] bg-[var(--accent)] text-[var(--bg-dark)] px-2.5 py-1 rounded-full shadow-lg">◆ {(h as any).badge}</span>
                )}
                <span className="absolute bottom-3 left-3 font-mono text-[0.64rem] font-bold tracking-wide bg-black/60 backdrop-blur text-[var(--text-light)]/90 border border-white/15 px-2.5 py-1 rounded-full">
                  0{i+1} · {h.role.split('—')[0].trim()}
                </span>
              </div>

              {/* Right — Details, formatted to match theme */}
              <div className="flex-1 p-6 flex flex-col bg-[#162E4D]">
                <span className="font-mono text-[0.68rem] tracking-[0.10em] text-[#C89B3C]">0{i+1} · {h.role}</span>
                <h3 className="font-serif text-[1.25rem] font-extrabold leading-tight text-[var(--text-light)] mt-1.5">{h.name}</h3>
                <p className="font-mono text-[0.72rem] text-[var(--text-light-muted)] mt-1 leading-snug">{h.org}</p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.67rem] text-[var(--text-light-muted)] bg-[#0F1F3D] border border-[rgba(200,155,60,0.14)] px-2.5 py-1 rounded-full">
                    <HiOutlineMapPin size={12} className="text-[#C89B3C] shrink-0" /> {h.venue}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.67rem] text-[var(--text-light-muted)] bg-[#0F1F3D] border border-[rgba(200,155,60,0.14)] px-2.5 py-1 rounded-full">
                    <HiOutlineCalendarDays size={12} className="text-[#C89B3C] shrink-0" /> {h.date}
                  </span>
                </div>

                <p className="text-[0.84rem] leading-[1.6] text-[var(--text-light-muted)] mt-3.5 line-clamp-3">{(h as any).desc}</p>

                {h.project && <p className="font-mono text-[0.72rem] font-bold text-[#C89B3C] mt-2">Project: {h.project}</p>}

                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-[rgba(200,155,60,0.14)]">
                  {((h as any).tags ?? []).map((t: string) => (
                    <span key={t} className="font-mono text-[0.65rem] bg-[#0F1F3D] border border-[rgba(200,155,60,0.14)] text-[var(--text-light-muted)] px-2.5 py-1 rounded-full">{t}</span>
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
