import { useEffect, useRef, useState } from 'react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { portfolio } from '@/data/portfolio';
import { useAppReady } from '@/context/LenisContext';

export function SportsCertificatesEditorial() {
  const ref = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const ready = useAppReady();
  const [active, setActive] = useState<string | null>(null);

  const certs = (portfolio as any).sportsCertificates as { name: string; image: string; label: string }[];
  const achievements = (portfolio as any).sportsAchievements as any[];

  useEffect(() => {
    const root = ref.current;
    if (!root || isReducedMotion() || !ready) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>('.sports-frame'), {
        y: 32, autoAlpha: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: root.querySelector('.sports-grid') ?? root, start: 'top 84%' }
      });
      gsap.from(root.querySelectorAll<HTMLElement>('.sports-hero'), {
        y: 18, autoAlpha: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 88%' }
      });
      // subtle parallax on frames
      gsap.to(root.querySelectorAll<HTMLElement>('.sports-frame'), {
        yPercent: -2, ease: 'none', stagger: 0.03,
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
      });
      // float trophy
      gsap.to(root.querySelector('.sports-trophy'), {
        y: -6, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  // drag for rail on mobile
  const drag = useRef({ down: false, start: 0, left: 0 });
  const onDown = (e: React.PointerEvent) => {
    const el = railRef.current;
    if (!el) return;
    drag.current.down = true;
    drag.current.start = e.clientX;
    drag.current.left = el.scrollLeft;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const el = railRef.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.left - (e.clientX - drag.current.start);
  };
  const onUp = () => { drag.current.down = false; };

  return (
    <section ref={ref} id="sports-certificates" className="relative overflow-hidden bg-[#7A263A] text-[#FAF7F0] border-t border-[rgba(200,155,60,0.18)]">
      {/* court texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div className="pointer-events-none absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(200,155,60,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(15,31,61,0.35),transparent_70%)]" />
      {/* court lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `linear-gradient(rgba(250,247,240,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(250,247,240,0.5) 1px, transparent 1px)`, backgroundSize: '72px 72px' }} />
      <div className="pointer-events-none absolute left-1/2 top-[46%] hidden h-[72%] w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-[rgba(250,247,240,0.14)] lg:block" />
      <div className="pointer-events-none absolute left-1/2 top-[46%] hidden h-[2px] w-[94%] -translate-x-1/2 bg-[rgba(250,247,240,0.12)] lg:block" />
      <div className="pointer-events-none absolute left-1/2 top-[46%] hidden h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(250,247,240,0.12)] lg:block" />

      <div className="relative mx-auto max-w-[1400px] px-[4vw] py-[64px] sm:py-[84px]">
        {/* header — stadium */}
        <div className="sports-hero flex flex-wrap items-end justify-between gap-4 border-b border-[rgba(250,247,240,0.14)] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="sports-trophy grid h-8 w-8 place-items-center rounded-full bg-[#C89B3C] text-[#0F1F3D] text-[0.9rem] shadow-[0_6px_16px_rgba(0,0,0,0.25)]">🏆</span>
              <span className="font-mono text-[0.70rem] font-bold tracking-[0.18em] text-[#C89B3C]">05B / FIELD HONORS</span>
              <span className="hidden sm:inline-flex rounded-full bg-white/10 px-2.5 py-1 font-mono text-[0.62rem] tracking-wide text-white/80 border border-white/10">ST. THOMAS · 2018-24 · 09 FRAMED</span>
            </div>
            <h2 className="mt-2 font-serif text-[clamp(2rem,4.2vw,3.2rem)] font-extrabold leading-none tracking-tight">SPORTS <span className="italic font-normal text-[#F3E8D0]">— Certificates</span></h2>
            <p className="mt-2 max-w-[52rem] font-mono text-[0.72rem] tracking-wide text-[#F3E8D0]/70">Nine framed proofs — courts, podiums & captaincy. Tap any frame to view full size. Separate from tech vault.</p>
          </div>
          <span className="hidden lg:inline-flex items-center gap-2 rounded-full border border-[rgba(200,155,60,0.22)] bg-[#FAF7F0] px-4 py-2 font-mono text-[0.70rem] font-bold tracking-wide text-[#7A263A] shadow-[0_8px_20px_rgba(0,0,0,0.18)]">STATE REP · BASKETBALL <span className="h-1.5 w-1.5 rounded-full bg-[#7A263A]" /></span>
        </div>

        {/* marquee */}
        <div className="relative mt-5 overflow-hidden rounded-full border border-white/10 bg-white/[0.06] backdrop-blur">
          <div className="flex animate-[marquee_16s_linear_infinite] whitespace-nowrap py-2 will-change-transform">
            <span className="mx-6 font-mono text-[0.68rem] tracking-[0.14em] text-[#F3E8D0]">STATE · DISTRICT · ZONAL · THOMASIANS · BASKETBALL · ATHLETICS · HOUSE CAPTAIN · SPORTS CAPTAIN ·</span>
            <span className="mx-6 font-mono text-[0.68rem] tracking-[0.14em] text-[#C89B3C]">2018 — 2024 · 09 CERTIFICATES · FRAMED ·</span>
            <span className="mx-6 font-mono text-[0.68rem] tracking-[0.14em] text-[#F3E8D0]">STATE · DISTRICT · ZONAL · THOMASIANS · BASKETBALL · ATHLETICS · HOUSE CAPTAIN · SPORTS CAPTAIN ·</span>
            <span className="mx-6 font-mono text-[0.68rem] tracking-[0.14em] text-[#C89B3C]">2018 — 2024 · 09 CERTIFICATES · FRAMED ·</span>
          </div>
          <style>{`@keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
        </div>

        {/* achievement pills */}
        <div className="mt-5 flex flex-wrap gap-2">
          {achievements.slice(0, 4).map((a: any) => (
            <span key={a.title} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1.5 font-mono text-[0.66rem] tracking-wide text-[#FAF7F0] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C89B3C]" /> {a.badge} · {a.title}
            </span>
          ))}
        </div>

        {/* mobile rail + desktop grid */}
        <div
          ref={railRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          className="sports-grid mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr sm:overflow-visible overflow-x-auto sm:overflow-x-visible flex sm:grid flex-nowrap sm:flex-wrap snap-x snap-mandatory sm:snap-none pb-2 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none"
        >
          {certs.map((c, i) => (
            <button
              key={c.image}
              onClick={() => setActive(c.image)}
              className="sports-frame group relative flex flex-col text-left shrink-0 w-[78vw] sm:w-auto snap-center overflow-hidden rounded-[18px] bg-[#FAF7F0] border border-[rgba(200,155,60,0.18)] shadow-[0_16px_32px_rgba(0,0,0,0.22),0_0_0_1px_rgba(200,155,60,0.10)] hover:shadow-[0_20px_44px_rgba(0,0,0,0.28)] transition-all"
              style={{ transform: `rotate(${[ -0.9, 0.7, -0.4, 0.5, -0.6, 0.4, -0.3, 0.6, -0.5][i % 9]}deg)` }}
            >
              {/* mat */}
              <div className="p-2 sm:p-2.5">
                <div className="relative overflow-hidden rounded-[12px] bg-white border border-[rgba(15,31,61,0.08)] aspect-[4/3]">
                  <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700" />
                  {/* gold corner tape */}
                  <span className="pointer-events-none absolute -top-1 -left-1 h-8 w-8 opacity-60" style={{ background: `linear-gradient(135deg, #C89B3C 0 2px, transparent 2px)` }} />
                  <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-[#0F1F3D] px-2 py-1 font-mono text-[0.58rem] font-bold tracking-wide text-[#C89B3C] border border-white/10">{c.label}</span>
                  <span className="pointer-events-none absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-white border border-[rgba(200,155,60,0.18)] text-[#7A263A] text-[0.68rem] shadow-sm">↗</span>
                  {/* hover overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F1F3D]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="px-4 pb-3 pt-1 flex items-center justify-between gap-2">
                <div>
                  <h4 className="font-mono text-[0.70rem] font-bold tracking-wide text-[#0F1F3D]">{c.name.replace('Sports Certificate — ', 'Certificate ')}</h4>
                  <p className="font-mono text-[0.64rem] tracking-wide text-[#756F65]">Tap to enlarge · /images/sports</p>
                </div>
                <span className="hidden sm:grid h-7 w-7 place-items-center rounded-full bg-[#7A263A] text-white text-[0.72rem] group-hover:bg-[#0F1F3D] transition-colors">⤢</span>
              </div>
              {/* bottom gold rule */}
              <div className="h-[3px] w-full bg-gradient-to-r from-[#7A263A] via-[#C89B3C] to-[#7A263A] opacity-80" />
            </button>
          ))}
        </div>

        <p className="mt-4 text-center font-mono text-[0.66rem] tracking-wide text-[#F3E8D0]/60">Drag horizontally on mobile · hover to level the frame · click to open full certificate</p>

        {/* lightbox */}
        {active && (
          <div className="fixed inset-0 z-[80] grid place-items-center bg-[#0F1F3D]/80 backdrop-blur-[6px] p-4 sm:p-6" onClick={() => setActive(null)}>
            <div className="relative max-h-[92vh] max-w-[96vw] overflow-hidden rounded-[18px] bg-[#FAF7F0] p-2 sm:p-3 shadow-[0_24px_64px_rgba(0,0,0,0.45)]" onClick={e => e.stopPropagation()}>
              <img src={active} alt="Sports certificate" className="max-h-[84vh] max-w-[92vw] object-contain rounded-[10px] bg-white" />
              <button onClick={() => setActive(null)} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-[#0F1F3D] text-white hover:bg-[#7A263A] transition-colors">✕</button>
              <div className="flex items-center justify-between gap-3 px-1 pt-2">
                <span className="font-mono text-[0.68rem] tracking-wide text-[#756F65]">/images/sports · click outside to close</span>
                <a href={active} target="_blank" rel="noopener" className="rounded-full bg-[#C89B3C] px-4 py-1.5 font-mono text-[0.70rem] font-bold tracking-wide text-[#0F1F3D] hover:bg-[#D4A84A] transition-colors">Open original ↗</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
