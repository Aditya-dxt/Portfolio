import { useEffect, useRef, useState } from 'react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { portfolio } from '@/data/portfolio';
import { useAppReady } from '@/context/LenisContext';

const ACH_MAIN = 5;
const CERT_MAIN = 5;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function ExperienceEditorial() {
  const ref = useRef<HTMLElement>(null);
  const ready = useAppReady();
  const [showAch, setShowAch] = useState(false);
  const [showCert, setShowCert] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root || isReducedMotion()) return;
    if (!ready) {
      const t = window.setTimeout(() => {
        root.querySelectorAll<HTMLElement>('.exp-ticket, .ach-card, .cert-card, .section-head').forEach(el => gsap.set(el, { autoAlpha: 1 }));
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
        gsap.from(root.querySelectorAll<HTMLElement>('.ach-card'), {
          y: 22, autoAlpha: 0, duration: 0.55, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: root.querySelector('#achievements') ?? root, start: 'top 84%' }
        });
        gsap.from(root.querySelectorAll<HTMLElement>('.cert-card'), {
          y: 22, autoAlpha: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: root.querySelector('#certifications') ?? root, start: 'top 84%' }
        });
        window.setTimeout(() => {
          root.querySelectorAll<HTMLElement>('.exp-ticket, .ach-card, .cert-card').forEach(el => {
            const cs = getComputedStyle(el);
            if (cs.opacity === '0') gsap.set(el, { clearProps: 'all', autoAlpha: 1 });
          });
        }, 1400);
      });
      mm.add('(max-width: 767px)', () => {
        gsap.from(root.querySelectorAll<HTMLElement>('.exp-ticket, .ach-card, .cert-card'), {
          y: 14, autoAlpha: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 88%' }
        });
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  const achievements = portfolio.achievements;
  const certs = portfolio.certifications as any[];
  const achPreview = achievements.slice(0, ACH_MAIN);
  const certPreview = certs.slice(0, CERT_MAIN);

  return (
    <section ref={ref} id="experience" className="bg-[#FAF7F0] text-[#0F1F3D]">
      <div className="max-w-[1400px] mx-auto px-[4vw] py-[72px] sm:py-[88px]">
        {/* ---------- HEADER ---------- */}
        <div className="section-head flex flex-wrap justify-between items-end gap-4 border-b-2 border-[#0F1F3D] pb-4 mb-10 reveal">
          <div>
            <span className="font-mono text-[0.78rem] tracking-[0.12em] text-[#C89B3C] block mb-1.5">05 / BACKGROUND</span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-extrabold tracking-[-0.02em] leading-none">EXPERIENCE</h2>
            <p className="font-mono text-[0.72rem] tracking-wide text-[#756F65] mt-2">Shipping production code & leading teams — two internships, real deploys.</p>
          </div>
          <span className="hidden sm:inline-flex font-mono text-[0.72rem] tracking-[0.08em] text-[#0F1F3D] border border-[#C89B3C]/20 bg-white px-3.5 py-1.5 rounded-full">02 ROLES · 2026</span>
        </div>

        {/* ---------- EXPERIENCE — TRANSIT TICKETS (out of box, not timeline) ---------- */}
        <div className="exp-wrap flex flex-col gap-5">
          {portfolio.experience.map((r, idx) => (
            <article key={r.title} className="exp-ticket group relative flex flex-col md:flex-row overflow-hidden rounded-[18px] border border-[#C89B3C]/15 bg-[#FAF7F0] hover:border-[#C89B3C]/30 hover:shadow-[0_14px_36px_rgba(15,31,61,0.08)] transition-all">
              {/* stub */}
              <div className="relative flex md:flex-col items-center justify-between md:justify-center gap-3 md:w-[200px] shrink-0 bg-[#0F1F3D] text-[#FAF7F0] px-5 py-4 md:py-6">
                <div className="text-left md:text-center">
                  <span className="font-mono text-[0.68rem] tracking-[0.12em] text-[#C89B3C] block">{r.period}</span>
                  <span className="mt-1 inline-flex font-mono text-[0.66rem] font-bold tracking-[0.08em] bg-[#C89B3C] text-[#0F1F3D] px-2.5 py-1 rounded-full">{r.badge}</span>
                </div>
                <span className="font-serif text-[2.2rem] md:text-[2.6rem] font-black leading-none text-white/10 select-none">0{idx + 1}</span>
                {/* perforation — dashed line */}
                <span aria-hidden className="hidden md:block absolute right-[-1px] top-3 bottom-3 w-px border-r border-dashed border-white/20" />
                {/* punch holes */}
                <span aria-hidden className="hidden md:block absolute right-[-6px] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#FAF7F0] border border-[#C89B3C]/15" />
                <span aria-hidden className="md:hidden absolute left-3 right-3 bottom-[-1px] h-px border-b border-dashed border-white/20" />
              </div>
              {/* main */}
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

        {/* ---------- ACHIEVEMENTS — TROPHY RIBBON (distinct from tickets) ---------- */}
        <div id="achievements" className="mt-14 scroll-mt-20">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#C89B3C]/20 pb-3 mb-6">
            <div>
              <span className="font-mono text-[0.70rem] tracking-[0.14em] text-[#C89B3C]">TROPHY CASE</span>
              <h3 className="font-serif text-[1.7rem] sm:text-[2rem] font-extrabold tracking-[-0.015em] leading-none mt-1">ACHIEVEMENTS <span className="font-normal italic text-[#7A263A]">— 8 signals</span></h3>
              <p className="font-mono text-[0.70rem] text-[#756F65] mt-1.5">National finals, DSA grind, courts & cohorts.</p>
            </div>
            <button onClick={() => { setShowAch(v => !v); if (!showAch) setTimeout(() => scrollToId('achievements-archive'), 120); }} className="font-mono text-[0.72rem] font-bold tracking-wide bg-[#0F1F3D] text-[#FAF7F0] px-4 py-2 rounded-full hover:bg-[#162E4D] transition-colors">
              {showAch ? 'Hide full list ↑' : 'View all 8 →'}
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achPreview.map((a, i) => (
              <div key={a} className="ach-card group relative overflow-hidden rounded-[18px] border border-[#C89B3C]/15 bg-white p-5 hover:border-[#C89B3C]/30 hover:shadow-[0_12px_28px_rgba(15,31,61,0.07)] transition-all">
                <span className="absolute -right-2 -top-1 font-serif text-[3.6rem] font-black leading-none text-[#0F1F3D]/[0.06] select-none">0{i + 1}</span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF7F0] border border-[#C89B3C]/15 text-[#C89B3C] text-[0.92rem]">★</span>
                <p className="relative mt-3 font-sans text-[0.92rem] leading-relaxed font-medium text-[#0F1F3D]">{a}</p>
                <span className="mt-3 inline-flex font-mono text-[0.66rem] tracking-wide text-[#C89B3C] border border-[#C89B3C]/15 bg-[#FAF7F0] px-2.5 py-1 rounded-full">Verified · 2024-26</span>
              </div>
            ))}
            {/* 6th — explore */}
            <button
              type="button"
              onClick={() => { setShowAch(true); setTimeout(() => scrollToId('achievements-archive'), 120); }}
              className="ach-card group relative overflow-hidden rounded-[18px] border border-[#C89B3C]/20 bg-[#0F1F3D] p-6 text-left hover:bg-[#162E4D] hover:border-[#C89B3C]/30 transition-all flex flex-col justify-between min-h-[148px]"
            >
              <div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#C89B3C] text-[#0F1F3D] font-bold">↗</span>
                <h4 className="mt-3 font-serif text-[1.15rem] font-extrabold leading-tight text-[#FAF7F0]">Explore all achievements</h4>
                <p className="mt-1 font-mono text-[0.72rem] text-[#F3E8D0]/70">{achievements.length} total · courts, hackathons, ships</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-2 font-mono text-[0.72rem] font-bold tracking-wide text-[#C89B3C]">Open archive <span className="transition-transform group-hover:translate-x-1">→</span></span>
              <span aria-hidden className="pointer-events-none absolute -right-6 -bottom-6 h-28 w-28 rounded-full border border-[#C89B3C]/15" />
            </button>
          </div>

          {/* archive */}
          <div id="achievements-archive" className={`${showAch ? 'block' : 'hidden'} mt-6 rounded-[18px] border border-[#C89B3C]/15 bg-white p-5 sm:p-6`}>
            <div className="flex items-center justify-between gap-3 mb-4">
              <h4 className="font-serif text-[1.05rem] font-extrabold">All achievements</h4>
              <button onClick={() => setShowAch(false)} className="font-mono text-[0.70rem] text-[#756F65] border border-[#C89B3C]/15 bg-[#FAF7F0] px-3 py-1.5 rounded-full hover:text-[#0F1F3D]">Close ✕</button>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {achievements.map((a, i) => (
                <li key={a} className="flex gap-3 rounded-xl border border-[#C89B3C]/10 bg-[#FAF7F0] px-4 py-3">
                  <span className="font-mono text-[0.70rem] font-bold text-[#C89B3C] mt-0.5">0{i + 1}</span>
                  <span className="font-sans text-[0.88rem] leading-relaxed text-[#0F1F3D]">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- CERTIFICATIONS — VAULT GRID (third distinct language) ---------- */}
        <div id="certifications" className="mt-12 scroll-mt-20">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#C89B3C]/20 pb-3 mb-6">
            <div>
              <span className="font-mono text-[0.70rem] tracking-[0.14em] text-[#C89B3C]">VAULT</span>
              <h3 className="font-serif text-[1.7rem] sm:text-[2rem] font-extrabold tracking-[-0.015em] leading-none mt-1">CERTIFICATIONS <span className="font-normal italic text-[#7A263A]">— 9 credentials</span></h3>
              <p className="font-mono text-[0.70rem] text-[#756F65] mt-1.5">Tap a card to preview · verified issuers</p>
            </div>
            <button onClick={() => { setShowCert(v => !v); if (!showCert) setTimeout(() => scrollToId('certifications-archive'), 120); }} className="font-mono text-[0.72rem] font-bold tracking-wide bg-white border border-[#C89B3C]/15 text-[#0F1F3D] px-4 py-2 rounded-full hover:border-[#C89B3C]/30 transition-colors">
              {showCert ? 'Hide vault ↑' : 'View all 9 →'}
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certPreview.map((c: any) => (
              <a key={c.name} href={c.image || '#'} target={c.image ? '_blank' : undefined} rel="noopener" className="cert-card group overflow-hidden rounded-[18px] border border-[#C89B3C]/15 bg-white hover:border-[#C89B3C]/30 hover:shadow-[0_12px_28px_rgba(15,31,61,0.07)] transition-all flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF7F0] border-b border-[#C89B3C]/10">
                  {c.image ? (
                    <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500" />
                  ) : (
                    <div className="flex h-full items-center justify-center font-serif text-[1.6rem] font-black text-[#0F1F3D]/10">{c.name.slice(0, 2).toUpperCase()}</div>
                  )}
                  <span className="absolute left-3 top-3 font-mono text-[0.64rem] font-bold tracking-[0.08em] bg-[#0F1F3D] text-[#FAF7F0] px-2.5 py-1 rounded-full">{c.year || '2025'}</span>
                  <span className="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#C89B3C]/15 text-[#1d9a5a] text-[0.72rem]">✓</span>
                </div>
                <div className="p-4 flex flex-1 flex-col">
                  <h4 className="font-sans text-[0.92rem] font-bold leading-tight text-[#0F1F3D] line-clamp-2">{c.name}</h4>
                  <p className="mt-1 font-mono text-[0.70rem] tracking-wide text-[#756F65]">{c.issuer}</p>
                  <span className="mt-3 inline-flex w-fit font-mono text-[0.66rem] tracking-wide text-[#C89B3C] border border-[#C89B3C]/15 bg-[#FAF7F0] px-2.5 py-1 rounded-full">View certificate ↗</span>
                </div>
              </a>
            ))}
            {/* 6th — explore */}
            <button
              type="button"
              onClick={() => { setShowCert(true); setTimeout(() => scrollToId('certifications-archive'), 120); }}
              className="cert-card group relative overflow-hidden rounded-[18px] border border-[#C89B3C]/20 bg-[#0F1F3D] p-6 text-left hover:bg-[#162E4D] transition-colors flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#C89B3C] text-[#0F1F3D] font-bold">◈</span>
                <h4 className="mt-3 font-serif text-[1.18rem] font-extrabold leading-tight text-[#FAF7F0]">Explore complete vault</h4>
                <p className="mt-1 font-mono text-[0.72rem] leading-relaxed text-[#F3E8D0]/70">{certs.length} credentials · Oracle, AWS, JP Morgan, Microsoft & more</p>
              </div>
              <div className="mt-4">
                <div className="flex -space-x-2">
                  {certs.slice(0, 4).map((c: any) => (
                    <span key={c.name} className="h-8 w-8 rounded-full border-2 border-[#0F1F3D] bg-[#FAF7F0] grid place-items-center font-mono text-[0.58rem] font-bold text-[#0F1F3D]">{c.issuer.slice(0, 2).toUpperCase()}</span>
                  ))}
                  <span className="h-8 w-8 rounded-full border-2 border-[#0F1F3D] bg-[#C89B3C] grid place-items-center font-mono text-[0.62rem] font-bold text-[#0F1F3D]">+{certs.length - 4}</span>
                </div>
                <span className="mt-3 inline-flex items-center gap-2 font-mono text-[0.72rem] font-bold tracking-wide text-[#C89B3C]">Open vault <span className="transition-transform group-hover:translate-x-1">→</span></span>
              </div>
            </button>
          </div>

          {/* archive */}
          <div id="certifications-archive" className={`${showCert ? 'block' : 'hidden'} mt-6 rounded-[18px] border border-[#C89B3C]/15 bg-[#0F1F3D] p-5 sm:p-6`}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <h4 className="font-serif text-[1.05rem] font-extrabold text-[#FAF7F0]">Complete vault — {certs.length} certificates</h4>
              <div className="flex gap-2">
                <a href="/images/certifications" target="_blank" rel="noopener" className="hidden sm:inline-flex font-mono text-[0.70rem] text-[#F3E8D0]/70 border border-[rgba(200,155,60,0.18)] px-3 py-1.5 rounded-full hover:text-[#C89B3C]">Browse folder ↗</a>
                <button onClick={() => setShowCert(false)} className="font-mono text-[0.70rem] text-[#FAF7F0] border border-[rgba(200,155,60,0.18)] bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/10">Close ✕</button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certs.map((c: any) => (
                <a key={c.name + c.issuer} href={c.image || '#'} target={c.image ? '_blank' : undefined} rel="noopener" className="group overflow-hidden rounded-[16px] border border-[rgba(200,155,60,0.14)] bg-[#162E4D] hover:border-[#C89B3C]/30 transition-colors flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden bg-[#FAF7F0]">
                    {c.image ? <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500" /> : <div className="grid h-full place-items-center font-serif text-xl font-black text-[#0F1F3D]/10">{c.name.slice(0, 2)}</div>}
                  </div>
                  <div className="p-4">
                    <h5 className="font-sans text-[0.88rem] font-bold leading-tight text-[#FAF7F0]">{c.name}</h5>
                    <p className="mt-1 font-mono text-[0.68rem] text-[#F3E8D0]/70">{c.issuer} · {c.year || ''}</p>
                  </div>
                </a>
              ))}
            </div>
            <p className="mt-4 text-center font-mono text-[0.68rem] text-[#F3E8D0]/50">Tip: click any card to open full certificate image · stored in /public/images/certifications</p>
          </div>
        </div>
      </div>
    </section>
  );
}
