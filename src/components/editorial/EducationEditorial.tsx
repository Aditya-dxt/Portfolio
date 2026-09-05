import { useEffect, useRef, useState } from 'react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { portfolio } from '@/data/portfolio';
import { useAppReady } from '@/context/LenisContext';

function CountTo({ to, duration = 1.1, suffix = '' }: { to: number; duration?: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (isReducedMotion()) { setV(to); return; }
    const o = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(o, {
        n: to,
        duration,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        onUpdate: () => setV(o.n),
      });
    });
    return () => ctx.revert();
  }, [to, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {v.toFixed(1)}
      {suffix}
    </span>
  );
}

export function EducationEditorial() {
  const ref = useRef<HTMLElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const ready = useAppReady();
  const e: any = portfolio.education;

  // school leadership mini carousel
  const [lead, setLead] = useState(0);
  const leaders = [
    { k: '01', role: 'House Captain', period: '2022 — 23', body: 'Led house events, parades & inter-house championships. First elected mandate — people before scoreboard.', accent: 'bg-[#7A263A]' },
    { k: '02', role: 'Sports Captain', period: '2023 — 24', body: 'Owned the field — inter-house, inter-school, discipline & delivery when the whistle blew.', accent: 'bg-[#0F1F3D]' },
  ];

  // college reel drag
  const drag = useRef({ down: false, start: 0, left: 0, moved: 0 });
  const onDown = (ev: React.PointerEvent) => {
    const el = reelRef.current;
    if (!el) return;
    drag.current.down = true;
    drag.current.moved = 0;
    drag.current.start = ev.clientX;
    drag.current.left = el.scrollLeft;
    (ev.target as HTMLElement).setPointerCapture?.(ev.pointerId);
  };
  const onMove = (ev: React.PointerEvent) => {
    const el = reelRef.current;
    if (!el || !drag.current.down) return;
    const dx = ev.clientX - drag.current.start;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    el.scrollLeft = drag.current.left - dx;
  };
  const onUp = () => { drag.current.down = false; };

  // auto-rotate leadership every 4s
  useEffect(() => {
    const id = setInterval(() => setLead((p) => (p + 1) % leaders.length), 4200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root || isReducedMotion() || !ready) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-edu-hero] > *', { y: 14, autoAlpha: 0, duration: 0.55, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 82%' } });
      gsap.from('[data-edu-card]', { y: 22, autoAlpha: 0, duration: 0.7, stagger: 0.16, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 70%' } });
      // subtle parallax on faded years
      gsap.to('[data-parallax]', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={ref} id="education" className="relative overflow-hidden bg-[#0F1F3D] text-[#FAF7F0] border-t border-[rgba(200,155,60,0.14)]">
      {/* ambient — navy depth */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.045]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div className="pointer-events-none absolute -top-24 -right-24 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(200,155,60,0.07),transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(122,38,58,0.09),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1400px] px-[4vw] py-[56px] sm:py-[72px]">
        {/* header — navy editorial */}
        <div data-edu-hero className="flex flex-wrap items-end justify-between gap-4 border-b border-[rgba(200,155,60,0.14)] pb-6 mb-8">
          <div>
            <span className="font-mono text-[0.70rem] font-bold tracking-[0.18em] text-[#C89B3C]">04 / EDUCATION</span>
            <h2 className="mt-1 font-serif text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-none tracking-tight text-[#FAF7F0]">Education</h2>
            <p className="mt-2 hidden max-w-[46rem] font-sans text-[0.90rem] leading-relaxed text-[#F3E8D0]/70 sm:block">A seventeen-year chronology — no campus photos, just the record. Scroll the instruments — the numbers move, the tape rolls.</p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[rgba(200,155,60,0.18)] bg-white/5 px-3.5 py-1.5 font-mono text-[0.70rem] tracking-wide text-[#F3E8D0]">KANPUR · 2011 — 2028 <span className="h-1 w-1 rounded-full bg-[#C89B3C] shadow-[0_0_6px_rgba(200,155,60,0.9)]" /></span>
        </div>
        <p className="mb-6 text-center font-sans text-sm leading-relaxed text-[#F3E8D0]/60 sm:hidden">Seventeen years — the numbers move, the tape rolls.</p>

        {/* MARQUEE — navy theme */}
        <div className="relative mb-8 overflow-hidden rounded-full border border-[rgba(200,155,60,0.16)] bg-white/[0.06] backdrop-blur-sm">
          <div className="flex animate-[marquee_18s_linear_infinite] whitespace-nowrap py-2.5 will-change-transform">
            <span className="mx-6 font-mono text-[0.70rem] tracking-[0.14em] text-[#F3E8D0]">ST. THOMAS · 2011 — 2024 · 91.2% · 83.4% · HOUSE CAPTAIN · SPORTS CAPTAIN ·</span>
            <span className="mx-6 font-mono text-[0.70rem] tracking-[0.14em] text-[#C89B3C]">PSIT KANPUR · 2024 — 2028 · B.TECH CSE · CGPA {e.college.cgpa} · SEM 5 ·</span>
            <span className="mx-6 font-mono text-[0.70rem] tracking-[0.14em] text-[#F3E8D0]/80">SYSTEM DESIGN · OPEN SOURCE · PRODUCTION AI ·</span>
            <span className="mx-6 font-mono text-[0.70rem] tracking-[0.14em] text-[#F3E8D0]">ST. THOMAS · 2011 — 2024 · 91.2% · 83.4% · HOUSE CAPTAIN · SPORTS CAPTAIN ·</span>
            <span className="mx-6 font-mono text-[0.70rem] tracking-[0.14em] text-[#C89B3C]">PSIT KANPUR · 2024 — 2028 · B.TECH CSE · CGPA {e.college.cgpa} · SEM 5 ·</span>
          </div>
          <style>{`@keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
        </div>

        <div className="flex flex-col gap-8">
          {/* SCHOOL — instrument panel */}
          <div data-edu-card className="relative overflow-hidden rounded-[24px] border border-[rgba(200,155,60,0.14)] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.22),0_0_0_1px_rgba(200,155,60,0.06)]">
            {/* faded backdrop year — on white card better*/}
            <span data-parallax className="pointer-events-none absolute -top-6 right-6 hidden select-none font-serif text-[7.5rem] font-extrabold leading-none tracking-tight text-[#0F1F3D]/[0.04] lg:block">2011—24</span>
            {/* gold top rule animated via scrollTrigger width in CSS */}
            <div className="h-[3px] w-full bg-gradient-to-r from-[#C89B3C] via-[#7A263A] to-transparent opacity-90" />
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-0">
              {/* left — stats */}
              <div className="p-6 sm:p-7 lg:p-8">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#7A263A] shadow-[0_0_8px_rgba(122,38,58,0.35)]" />
                  <span className="font-mono text-[0.66rem] tracking-[0.16em] text-[#7A263A]">SCHOOL</span>
                  <span className="ml-auto hidden sm:inline-flex rounded-full bg-[#0F1F3D] px-2.5 py-1 font-mono text-[0.62rem] tracking-wide text-white">2011 — 2024 · KANPUR</span>
                </div>
                <h3 className="mt-3 font-serif text-[1.85rem] sm:text-[2.05rem] font-extrabold leading-none tracking-tight text-[#0F1F3D]">St. Thomas School, Kanpur</h3>
                <p className="mt-1 font-mono text-[0.72rem] tracking-wide text-[#6B6B6B]">ICSE / ISC · PCM · Kanpur, Uttar Pradesh</p>

                {/* two dials */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="group relative overflow-hidden rounded-2xl border border-[rgba(15,31,61,0.08)] bg-[#FAF7F0] p-5 hover:border-[rgba(200,155,60,0.18)] transition-colors">
                    <span className="font-mono text-[0.60rem] tracking-[0.14em] text-[#7A263A]">ICSE · CLASS 10</span>
                    <span className="mt-2 flex items-baseline gap-0.5 font-serif text-[2.35rem] font-extrabold leading-none tracking-tight text-[#0F1F3D]"><CountTo to={91.2} /><span className="text-[1.05rem] font-bold text-[#7A263A]">%</span></span>
                    <span className="mt-1 block font-mono text-[0.66rem] tracking-wide text-[#6B6B6B]">2021 — 22 · Sciences & Maths</span>
                    <div className="pointer-events-none absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(122,38,58,0.08),transparent_70%)]" />
                  </div>
                  <div className="group relative overflow-hidden rounded-2xl border border-[rgba(15,31,61,0.08)] bg-[#FAF7F0] p-5 hover:border-[rgba(200,155,60,0.18)] transition-colors">
                    <span className="font-mono text-[0.60rem] tracking-[0.14em] text-[#7A263A]">ISC · CLASS 12 PCM</span>
                    <span className="mt-2 flex items-baseline gap-0.5 font-serif text-[2.35rem] font-extrabold leading-none tracking-tight text-[#0F1F3D]"><CountTo to={83.4} /><span className="text-[1.05rem] font-bold text-[#7A263A]">%</span></span>
                    <span className="mt-1 block font-mono text-[0.66rem] tracking-wide text-[#6B6B6B]">2023 — 24 · Graduated PCM</span>
                    <div className="pointer-events-none absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(200,155,60,0.10),transparent_70%)]" />
                  </div>
                </div>

                <p className="mt-4 max-w-[48ch] text-[0.86rem] leading-relaxed text-[#4A4A4A]">Thirteen years, UKG to XII — the full arc where discipline, academics and stage leadership converged. Consistent scores, elected twice.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[rgba(15,31,61,0.08)] bg-white px-3 py-1.5 font-mono text-[0.66rem] text-[#0F1F3D]">13-year foundation</span>
                  <span className="rounded-full bg-[#FAF7F0] border border-[rgba(15,31,61,0.06)] px-3 py-1.5 font-mono text-[0.66rem] text-[#5A5A5A]">PCM · Sciences</span>
                </div>
              </div>

              {/* right — leadership carousel + vault */}
              <div className="relative flex flex-col border-t lg:border-t-0 lg:border-l border-[rgba(15,31,61,0.08)] bg-[#0F1F3D] text-[#FAF7F0] p-6 sm:p-7 lg:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.64rem] tracking-[0.14em] text-[#C89B3C]">LEADERSHIP · ELECTED</span>
                  <span className="font-mono text-[0.64rem] tracking-wide text-white/50">{String(lead + 1).padStart(2, '0')} / 02</span>
                </div>

                {/* carousel viewport */}
                <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                  <div className="relative flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ transform: `translateX(-${lead * 100}%)` }}>
                    {leaders.map((l) => (
                      <div key={l.k} className="w-full shrink-0 p-5 sm:p-6">
                        <div className="flex items-start gap-4">
                          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${l.accent} font-mono text-[0.72rem] font-bold text-white shadow-[0_6px_16px_rgba(0,0,0,0.25)]`}>{l.k}</span>
                          <div className="min-w-0">
                            <h4 className="font-serif text-[1.15rem] font-extrabold leading-tight">{l.role}</h4>
                            <p className="font-mono text-[0.70rem] tracking-wide text-[#C89B3C]">{l.period}</p>
                            <p className="mt-2 max-w-[32ch] text-[0.84rem] leading-relaxed text-white/75">{l.body}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* progress */}
                  <div className="h-px w-full bg-white/10">
                    <div className="h-px bg-[#C89B3C] transition-all duration-500" style={{ width: `${((lead + 1) / leaders.length) * 100}%` }} />
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  {leaders.map((_, i) => (
                    <button key={i} onClick={() => setLead(i)} aria-label={`Go to ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === lead ? 'w-6 bg-[#C89B3C]' : 'w-1.5 bg-white/25 hover:bg-white/40'} `} />
                  ))}
                  <span className="ml-auto flex gap-1">
                    <button onClick={() => setLead((p) => (p - 1 + leaders.length) % leaders.length)} className="grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10">‹</button>
                    <button onClick={() => setLead((p) => (p + 1) % leaders.length)} className="grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10">›</button>
                  </span>
                </div>

                {/* vault */}
                <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#C89B3C] text-[#0F1F3D] font-bold">🔒</span>
                    <div className="min-w-0">
                      <h5 className="font-serif text-[0.96rem] font-extrabold leading-tight">Classified Archive — Thomasians only</h5>
                      <p className="mt-1 text-[0.80rem] leading-relaxed text-white/70">Full journey — photos, stories, milestones — behind 2 school-only questions.</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href="/school-journey" onClick={(ev) => { ev.preventDefault(); window.dispatchEvent(new CustomEvent('toast', { detail: 'Vault next — 2 Thomas-only questions → full archival page' })); }} className="inline-flex items-center gap-2 rounded-full bg-[#C89B3C] px-4 py-2 font-mono text-[0.72rem] font-bold tracking-wide text-[#0F1F3D] hover:bg-[#D4A84A] transition-colors">UNLOCK VAULT <span>→</span></a>
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 font-mono text-[0.66rem] text-white/60">🔐 2 questions at gate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SPORTS ACHIEVEMENTS — field record (right after School) */}
          <div data-edu-card className="relative overflow-hidden rounded-[24px] border border-[rgba(200,155,60,0.16)] bg-[#FAF7F0] shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
            <div className="h-[3px] w-full bg-gradient-to-r from-[#7A263A] via-[#C89B3C] to-[#0F1F3D] opacity-90" />
            <div className="px-6 sm:px-7 lg:px-8 py-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#7A263A] text-white text-[0.75rem]">🏀</span>
                    <span className="font-mono text-[0.66rem] tracking-[0.16em] text-[#7A263A]">FIELD RECORD · SPORTS & LEADERSHIP</span>
                  </div>
                  <h3 className="mt-2 font-serif text-[1.45rem] sm:text-[1.75rem] font-extrabold leading-none tracking-tight text-[#0F1F3D]">Sports Achievements <span className="font-normal italic text-[#7A263A] text-[1.1rem]">— 2018-24</span></h3>
                  <p className="mt-1.5 font-mono text-[0.70rem] tracking-wide text-[#6B6B6B]">Courts, cohorts & captaincy — no DSA, just field.</p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#0F1F3D] px-3 py-1.5 font-mono text-[0.66rem] tracking-wide text-[#C89B3C]">ST. THOMAS <span className="h-1 w-1 rounded-full bg-[#C89B3C]" /> STATE REP</span>
              </div>

              {/* field lines decoration */}
              <div className="pointer-events-none absolute left-1/2 top-[68px] hidden h-px w-[92%] -translate-x-1/2 bg-[repeating-linear-gradient(90deg,rgba(122,38,58,0.18)_0_8px,transparent_8px_16px)] lg:block" />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {(portfolio as any).sportsAchievements.map((s: any, i: number) => (
                  <div key={s.title + i} className="group relative overflow-hidden rounded-2xl border border-[rgba(15,31,61,0.08)] bg-white p-4 sm:p-5 hover:border-[#C89B3C]/25 hover:shadow-[0_10px_24px_rgba(15,31,61,0.06)] transition-all">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex h-7 min-w-[56px] items-center justify-center rounded-full px-2.5 font-mono text-[0.60rem] font-bold tracking-[0.08em] ${i === 0 ? 'bg-[#0F1F3D] text-[#C89B3C]' : i === 1 ? 'bg-[#7A263A] text-white' : 'bg-[#FAF7F0] border border-[rgba(15,31,61,0.08)] text-[#0F1F3D]'}`}>{s.badge}</span>
                      <span className="font-mono text-[0.64rem] tracking-wide text-[#7A263A]">{s.period}</span>
                      <span className="ml-auto font-serif text-[1.9rem] font-black leading-none text-[#0F1F3D]/[0.06] select-none">0{i + 1}</span>
                    </div>
                    <h4 className="mt-2 font-serif text-[0.98rem] font-extrabold leading-tight text-[#0F1F3D]">{s.title}</h4>
                    <p className="font-mono text-[0.68rem] tracking-wide text-[#756F65]">{s.org}</p>
                    <p className="mt-2 text-[0.82rem] leading-relaxed text-[#4A4A4A]">{s.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 font-mono text-[0.64rem] tracking-wide text-[#8A8A8A]">Elected twice · State representation · 13-year Thomasians arc — separate from tech achievements.</p>
            </div>
          </div>

          {/* COLLEGE — tape deck */}
          <div data-edu-card className="relative overflow-hidden rounded-[24px] border border-[rgba(200,155,60,0.14)] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.22),0_0_0_1px_rgba(200,155,60,0.06)]">
            <span data-parallax className="pointer-events-none absolute -top-6 right-6 hidden select-none font-serif text-[7.5rem] font-extrabold leading-none tracking-tight text-[#0F1F3D]/[0.04] lg:block">2024—28</span>
            <div className="h-[3px] w-full bg-gradient-to-r from-[#0F1F3D] via-[#C89B3C] to-transparent opacity-90" />
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-0">
              {/* left — CGPA */}
              <div className="p-6 sm:p-7 lg:p-8 lg:border-r border-b lg:border-b-0 border-[rgba(15,31,61,0.08)] bg-[#FAF7F0]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#0F1F3D]" />
                  <span className="font-mono text-[0.66rem] tracking-[0.16em] text-[#0F1F3D]">COLLEGE</span>
                  <span className="ml-auto hidden sm:inline-flex rounded-full border border-[rgba(15,31,61,0.10)] bg-white px-2.5 py-1 font-mono text-[0.62rem] text-[#0F1F3D]">{e.college.period}</span>
                </div>
                <h3 className="mt-3 font-serif text-[1.65rem] sm:text-[1.85rem] font-extrabold leading-none tracking-tight text-[#0F1F3D]">Pranveer Singh Institute of Technology</h3>
                <p className="mt-1 font-mono text-[0.72rem] tracking-wide text-[#6B6B6B]">{e.college.degree} · {e.college.location}</p>

                <div className="mt-6 grid grid-cols-[124px_1fr] gap-3">
                  <div className="flex flex-col items-center justify-center rounded-2xl bg-[#0F1F3D] px-4 py-5 text-white shadow-[0_8px_20px_rgba(15,31,61,0.18)]">
                    <span className="font-mono text-[0.60rem] tracking-[0.14em] text-[#C89B3C]">CGPA</span>
                    <span className="font-serif text-[2.2rem] font-extrabold leading-none mt-1 flex items-baseline gap-1"><CountTo to={Number(e.college.cgpa) || 7.27} /><span className="text-[1rem] text-white/60" /></span>
                  </div>
                  <div className="rounded-2xl border border-[rgba(15,31,61,0.08)] bg-white p-4 flex flex-col justify-center">
                    <span className="inline-flex w-fit rounded-full bg-[#FAF7F0] border border-[rgba(15,31,61,0.08)] px-2.5 py-1 font-mono text-[0.66rem] text-[#5A5A5A]">Currently 3rd year / Sem 5</span>
                    <p className="mt-2 text-[0.82rem] leading-relaxed text-[#4A4A4A]">Engineering built to ship — system design, open-source and production AI. Year-by-year on the tape →</p>
                    <span className="mt-1 font-mono text-[0.62rem] tracking-wide text-[#7A263A]">{e.college.short} · Kanpur · Currently active</span>
                  </div>
                </div>
              </div>

              {/* right — horizontal tape */}
              <div className="relative p-6 sm:p-7 lg:p-8 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.66rem] tracking-[0.14em] text-[#7A263A]">FOUR-YEAR TAPE</span>
                </div>

                <div
                  ref={reelRef}
                  onPointerDown={onDown}
                  onPointerMove={onMove}
                  onPointerUp={onUp}
                  onPointerLeave={onUp}
                  className="mt-4 flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none"
                >
                  {e.college.milestones.map((m: any, i: number) => (
                    <div
                      key={m.title + i}
                      className={`snap-center shrink-0 w-[260px] sm:w-[280px] rounded-2xl border p-4 flex flex-col gap-2 transition-colors ${m.current ? 'bg-[#0F1F3D] text-white border-[#0F1F3D] shadow-[0_10px_24px_rgba(15,31,61,0.18)]' : m.upcoming ? 'bg-white border-dashed border-[rgba(15,31,61,0.16)]' : 'bg-[#FAF7F0] border-[rgba(15,31,61,0.08)]'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${m.current ? 'bg-[#C89B3C] shadow-[0_0_8px_rgba(200,155,60,0.9)]' : m.upcoming ? 'border border-dashed border-[rgba(15,31,61,0.2)] bg-transparent h-[9px] w-[9px]' : 'bg-[#0F1F3D]/20'}`} />
                        <span className={`font-mono text-[0.64rem] tracking-wide ${m.current ? 'text-[#C89B3C]' : 'text-[#7A263A]'}`}>{m.period}</span>
                        {m.current && <span className="ml-auto rounded-full bg-[#C89B3C] px-2 py-0.5 font-mono text-[0.60rem] font-bold tracking-wide text-[#0F1F3D]">NOW</span>}
                        {m.upcoming && <span className="ml-auto rounded-full border border-[rgba(15,31,61,0.12)] bg-white px-2 py-0.5 font-mono text-[0.60rem] text-[#6B6B6B]">NEXT</span>}
                      </div>
                      <h4 className={`font-serif text-[0.98rem] font-extrabold leading-tight ${m.current ? 'text-white' : 'text-[#0F1F3D]'}`}>{m.title}</h4>
                      {(m.grade || m.badge) && (
                        <div className="flex flex-wrap gap-1.5">
                          {m.grade && <span className={`rounded-full px-2.5 py-1 font-mono text-[0.66rem] font-bold ${m.current ? 'bg-white text-[#0F1F3D]' : 'bg-[#0F1F3D] text-white'}`}>{m.grade}</span>}
                          {m.badge && <span className="rounded-full border border-[rgba(15,31,61,0.10)] bg-white px-2.5 py-1 font-mono text-[0.66rem] text-[#0F1F3D]">{m.badge}</span>}
                        </div>
                      )}
                      <p className={`text-[0.80rem] leading-relaxed line-clamp-3 ${m.current ? 'text-white/75' : 'text-[#4A4A4A]'}`}>{m.description}</p>
                      <span className={`mt-auto font-mono text-[0.62rem] tracking-wide ${m.current ? 'text-white/40' : 'text-[#8A8A8A]'}`}>0{(i + 1)} / 0{e.college.milestones.length}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-1 font-mono text-[0.64rem] tracking-wide text-[#8A8A8A] lg:hidden">Swipe the tape →</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
