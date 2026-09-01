import { useEffect, useRef, useState } from 'react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { portfolio } from '@/data/portfolio';
import { useMagnetic } from '@/components/editorial/useMagnetic';

const bubbles = [
  "Hey, I'm Aditya! 👋",
  "Shipping RAG & LLM pipelines ⚡",
  "MERN + Stripe + RBAC 🚀",
  "Grad-CAM explainability 🔥",
  "Got an idea? Let's build 💡",
];

export function HeroEditorial() {
  const cardRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [bubble, setBubble] = useState(bubbles[0]);
  const idxRef = useRef(0);
  const lastPop = useRef(0);
  const cta1Ref = useMagnetic<HTMLAnchorElement>(18);
  const cta2Ref = useMagnetic<HTMLAnchorElement>(14);

  useEffect(() => {
    const nodes = sectionRef.current?.querySelectorAll<HTMLElement>('a.magnetic:not([data-has-magnetic])');
    if (!nodes || !nodes.length) return;
    const cleanups: (()=>void)[] = [];
    nodes.forEach(el => {
      if (el === cta1Ref.current || el === cta2Ref.current) return;
      el.dataset.hasMagnetic = '1';
      const onMove = (e: MouseEvent) => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width/2, cy = r.top + r.height/2;
        const dx = (e.clientX - cx) / (r.width/2);
        const dy = (e.clientY - cy) / (r.height/2);
        const dist = Math.sqrt(dx*dx+dy*dy);
        if (dist > 1.8) { gsap.to(el, {x:0,y:0,duration:0.5,ease:'power3.out'}); return; }
        gsap.to(el, {x: dx*10, y: dy*6, duration: 0.35, ease:'power3.out'});
      };
      const onLeave = () => gsap.to(el, {x:0,y:0,duration:0.6,ease:'elastic.out(1,0.35)'});
      window.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      cleanups.push(()=>{ window.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); });
    });
    return () => cleanups.forEach(fn=>fn());
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const stage = stageRef.current;
    if (!card || !stage) return;
    const ctx = gsap.context(() => {
      let tiltX = 0, tiltY = 0;
      let raf = 0;
      let angle = 0;
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const nx = dx / (window.innerWidth/2);
        const ny = dy / (window.innerHeight/2);
        tiltX = Math.max(-12, Math.min(12, ny * -14));
        tiltY = Math.max(-16, Math.min(16, nx * 14));
        const now = Date.now();
        if (dist < 260) {
          stage.classList.add('near');
          if (now - lastPop.current > 1800) {
            lastPop.current = now;
            card.classList.remove('pop');
            void card.offsetWidth;
            card.classList.add('pop');
            idxRef.current = (idxRef.current + 1) % bubbles.length;
            setBubble(bubbles[idxRef.current]);
            setTimeout(() => card.classList.remove('pop'), 600);
          }
        } else stage.classList.remove('near');
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      const float = () => {
        angle += 0.015;
        const fy = Math.sin(angle) * 5;
        if (!isReducedMotion() && window.innerWidth >= 1024) {
          gsap.set(card, { y: fy, rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 });
        } else {
          card.style.transform = `translateY(${fy}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        }
        raf = requestAnimationFrame(float);
      };
      float();
      if (!isReducedMotion()) {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 1024px)', () => {
          gsap.to(card, {
            yPercent: -14,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 0.9 }
          });
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              scale: 0.96, autoAlpha: 0.35, y: -20, ease: 'none',
              scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '45% top', scrub: true }
            });
          }
        });
      }
      return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="bg-[#F3E8D0] relative overflow-hidden">
      {/* subtle editorial grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `linear-gradient(to right, #0F1F3D 1px, transparent 1px), linear-gradient(to bottom, #0F1F3D 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />

      <div className="relative max-w-[1450px] mx-auto px-[4vw] pt-[84px] pb-10">
        {/* GIANT PORTFOLIO - award winning massive serif with gold dot */}
        <div className="border-b-[2.5px] border-[#0F1F3D] pb-3 mb-8 reveal">
          <h1 ref={titleRef} className="font-serif text-[clamp(3.8rem,13vw,11rem)] font-[900] tracking-[-0.045em] leading-[0.82] text-[#0F1F3D] will-change-transform flex items-baseline gap-[0.02em]">
            PORTFOLIO<span className="text-[#C89B3C] text-[0.9em] leading-none">.</span>
            <span className="hidden lg:inline-flex ml-auto self-end mb-3 font-mono text-[0.72rem] font-bold tracking-[0.18em] text-[#756F65] border border-[rgba(200,155,60,0.22)] px-3 py-1.5 rounded-full bg-[#FAF7F0]/60 backdrop-blur">2026 EDITION</span>
          </h1>
        </div>

        {/* MAIN GRID - completely new 2-col editorial */}
        <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 lg:gap-10 items-start">
          {/* LEFT - editorial content */}
          <div className="flex flex-col reveal" style={{ transitionDelay: '0.07s' }}>
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1.5px] bg-[#C89B3C]" />
              <p className="text-[0.78rem] font-bold tracking-[0.18em] text-[#7A263A]">HELLO, I’M</p>
            </div>

            <h2 className="font-serif text-[clamp(2.6rem,4.5vw,3.7rem)] font-extrabold leading-[0.92] tracking-[-0.02em] text-[#0F1F3D] mt-3">
              ADITYA<br />
              <span className="relative inline-block">
                DIXIT
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#C89B3C]/70" />
              </span>
            </h2>

            <p className="font-mono text-[0.78rem] font-bold tracking-[0.12em] text-[#7A263A] mt-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A263A]" /> FULL-STACK & AI ENGINEER · KANPUR, INDIA
            </p>

            <p className="text-[0.98rem] leading-7 text-[#756F65] mt-5 max-w-[560px]">{portfolio.bio}</p>

            <div className="font-script text-[2.2rem] text-[#7A263A] -rotate-[2.5deg] mt-4 ml-1">Aditya Dixit</div>

            <div className="flex flex-wrap gap-3.5 mt-6">
              <a ref={cta1Ref} href="#projects" className="magnetic inline-flex items-center gap-2 bg-[#0F1F3D] text-[#FAF7F0] px-7 py-3.5 rounded-full text-[0.82rem] font-bold tracking-[0.08em] shadow-[0_6px_20px_rgba(15,31,61,0.18)] hover:bg-[#7A263A] transition-colors will-change-transform">
                SEE FEATURED WORK <span className="text-[#C89B3C]">→</span>
              </a>
              <a ref={cta2Ref} href={portfolio.resumePath} target="_blank" rel="noopener" className="magnetic inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-[#0F1F3D] text-[0.82rem] font-bold tracking-[0.08em] text-[#0F1F3D] bg-transparent hover:bg-[#0F1F3D] hover:text-[#FAF7F0] transition-colors will-change-transform">
                DOWNLOAD CV ↓
              </a>
            </div>

            <div className="flex flex-wrap gap-2.5 mt-6">
              {portfolio.social.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener" className="magnetic font-mono text-[0.72rem] font-bold tracking-wide border border-[rgba(200,155,60,0.18)] bg-[#FAF7F0] text-[#0F1F3D] px-3.5 py-1.5 rounded-full hover:border-[#7A263A] hover:text-[#7A263A] transition-colors will-change-transform">
                  {s.name} ↗
                </a>
              ))}
            </div>

            <div className="hidden lg:flex gap-3 mt-6">
              <a href={`mailto:${portfolio.email}`} className="font-mono text-[0.72rem] bg-[#FAF7F0] border border-[rgba(200,155,60,0.14)] text-[#756F65] px-3 py-2 rounded-full hover:border-[#C89B3C] transition-colors">✉ {portfolio.email}</a>
              <a href={`tel:${portfolio.phone}`} className="font-mono text-[0.72rem] bg-[#FAF7F0] border border-[rgba(200,155,60,0.14)] text-[#756F65] px-3 py-2 rounded-full hover:border-[#C89B3C] transition-colors">☎ {portfolio.phone}</a>
            </div>
          </div>

          {/* RIGHT - completely redesigned portrait card */}
          <div ref={stageRef} className="relative flex flex-col items-center lg:items-end reveal" style={{ transitionDelay: '0.14s' }}>
            {/* gold offset shadow */}
            <div className="absolute top-4 left-4 lg:left-auto lg:right-4 w-[320px] h-[400px] lg:w-[360px] lg:h-[440px] bg-[#C89B3C]/20 rounded-[28px] hidden lg:block" aria-hidden />
            {/* navy frame */}
            <div ref={cardRef} className="mascot-card relative w-[320px] h-[400px] lg:w-[360px] lg:h-[440px] bg-[#FAF7F0] rounded-[28px] overflow-hidden border-[1.5px] border-[#0F1F3D] shadow-[0_24px_50px_rgba(15,31,61,0.14)] will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
              {/* gold corner brackets */}
              <span className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#C89B3C] rounded-tl-[8px] z-10" />
              <span className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#C89B3C] rounded-tr-[8px] z-10" />
              <span className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#C89B3C] rounded-bl-[8px] z-10" />
              <span className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#C89B3C] rounded-br-[8px] z-10" />

              {/* navy top bar inside card */}
              <div className="absolute top-0 inset-x-0 h-9 bg-[#0F1F3D] flex items-center justify-between px-4 z-10">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C89B3C]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7A263A]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FAF7F0]/70" />
                </span>
                <span className="font-mono text-[0.62rem] tracking-[0.12em] text-[#FAF7F0]/80">ADITYA.DEV — 2026</span>
              </div>

              <img src={portfolio.profileImage} alt="Aditya Dixit — 3D avatar" className="w-full h-full object-cover object-top pt-9" />

              {/* burgundy bottom label */}
              <div className="absolute bottom-0 inset-x-0 bg-[#0F1F3D]/90 backdrop-blur px-4 py-3 flex items-center justify-between">
                <span className="font-mono text-[0.68rem] tracking-[0.12em] text-[#F3E8D0]">FULL-STACK & AI</span>
                <span className="font-mono text-[0.68rem] font-bold text-[#C89B3C]">KANPUR • INDIA</span>
              </div>

              {/* speech bubble */}
              <div id="hero-bubble" className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#0F1F3D] text-[#FAF7F0] font-bold text-[0.8rem] px-4 py-2 rounded-full whitespace-nowrap shadow-[0_8px_24px_rgba(15,31,61,0.22)] opacity-0 pointer-events-none z-20" style={{ transform: 'translateX(-50%) translateY(-90%) scale(0.9)', transition: 'transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.32s' } as any}>{bubble}</div>
              <style>{`.near #hero-bubble{opacity:1 !important; transform: translateX(-50%) translateY(-115%) scale(1) !important;}`}</style>
            </div>

            {/* floating tech pills - completely new positions */}
            <span className="absolute -top-2 -right-2 lg:right-0 bg-[#0F1F3D] text-[#C89B3C] border border-[rgba(200,155,60,0.22)] px-3.5 py-1.5 rounded-full font-mono text-[0.72rem] font-bold shadow-[0_6px_18px_rgba(15,31,61,0.12)] hidden sm:inline-flex animate-[badgeFloat_4s_ease-in-out_infinite]">RAG • LLMs</span>
            <span className="absolute top-[38%] -left-3 lg:-left-4 bg-[#FAF7F0] text-[#7A263A] border border-[rgba(200,155,60,0.18)] px-3.5 py-1.5 rounded-full font-mono text-[0.72rem] font-bold shadow-[0_6px_18px_rgba(15,31,61,0.10)] hidden sm:inline-flex animate-[badgeFloat_5s_ease-in-out_infinite_0.8s]">React / Next.js</span>
            <span className="absolute bottom-[18%] -right-3 lg:-right-4 bg-[#7A263A] text-[#FAF7F0] px-3.5 py-1.5 rounded-full font-mono text-[0.72rem] font-bold shadow-[0_6px_18px_rgba(15,31,61,0.14)] hidden sm:inline-flex animate-[badgeFloat_4.6s_ease-in-out_infinite_1.4s]">LangChain • PyTorch</span>

            {/* rotating stamp - new placement */}
            <div className="absolute -bottom-8 -right-2 lg:-right-6 w-[118px] h-[118px] hidden sm:block pointer-events-none">
              <svg viewBox="0 0 160 160" className="w-full h-full animate-[rotateStamp_22s_linear_infinite]">
                <path id="stampCircleHero2" d="M 80,80 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" fill="none" />
                <text className="fill-[#C89B3C] font-mono text-[9.5px] font-bold tracking-[2.2px]"><textPath href="#stampCircleHero2">AVAILABLE FOR 2026 • FULL-STACK & AI • </textPath></text>
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[0.85rem] font-extrabold bg-[#0F1F3D] text-[#FAF7F0] w-[48px] h-[48px] rounded-full flex items-center justify-center border border-[rgba(200,155,60,0.22)]">2026</div>
            </div>

            <div className="mt-4 bg-[#0F1F3D] text-[#FAF7F0] text-sm font-bold px-4 py-2 rounded-full lg:hidden">{bubble}</div>
          </div>
        </div>

        {/* BOTTOM PILLARS - completely new horizontal editorial strip */}
        <div className="grid md:grid-cols-3 gap-4 mt-10 reveal" style={{ transitionDelay: '0.22s' }}>
          {portfolio.pillars.map((p, i) => (
            <div key={p.title} className="group relative bg-[#FAF7F0] border border-[rgba(200,155,60,0.14)] rounded-2xl p-5 hover:border-[#7A263A] hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(15,31,61,0.08)] transition-all">
              <div className="absolute top-0 left-5 right-5 h-[2px] bg-[#C89B3C] opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#0F1F3D] text-[#C89B3C] flex items-center justify-center font-mono text-[0.7rem] font-bold">0{i+1}</span>
                <span className="w-2 h-2 rounded-full bg-[#7A263A]" />
              </div>
              <h3 className="font-serif text-[0.95rem] font-extrabold tracking-[0.04em] text-[#0F1F3D] mt-3">{p.title}</h3>
              <p className="text-[0.84rem] leading-[1.55] text-[#756F65] mt-1.5">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* micro footer line */}
        <div className="mt-8 flex items-center gap-4 text-[0.68rem] font-mono tracking-[0.12em] text-[#756F65]/70">
          <span className="h-[1px] flex-1 bg-[#0F1F3D]/10" />
          <span>SCROLL TO EXPLORE — CRAFTED WITH PRECISION</span>
          <span className="h-[1px] flex-1 bg-[#0F1F3D]/10" />
        </div>
      </div>
    </section>
  );
}
