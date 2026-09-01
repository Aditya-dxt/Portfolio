import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import { portfolio } from '@/data/portfolio';

export function NavbarEditorial() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('#hero');
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || isReducedMotion()) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'bottom top+=80',
        end: 'bottom top',
        onEnter: () => {
          gsap.to(header, { backgroundColor: 'rgba(250,247,240,0.96)', boxShadow: '0 8px 32px rgba(15,31,61,0.08)', backdropFilter: 'blur(16px)', duration: 0.4, ease: 'power2.out' });
        },
        onLeaveBack: () => {
          gsap.to(header, { backgroundColor: 'rgba(250,247,240,0.88)', boxShadow: '0 0 0 rgba(0,0,0,0)', backdropFilter: 'blur(12px)', duration: 0.4, ease: 'power2.out' });
        },
      });
      ScrollTrigger.create({
        start: 0, end: 400,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          header.style.borderBottomColor = `rgba(200,155,60,${0.0 + p * 1})`;
        }
      });
      const ids = ['#hero','#projects','#process','#education','#experience','#contact'];
      ids.forEach((id) => {
        const el = document.querySelector(id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el as Element,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => setActive(id),
          onEnterBack: () => setActive(id),
        });
      });
    }, header);
    return () => ctx.revert();
  }, []);

  const linkCls = (href: string) => `text-[0.78rem] font-bold tracking-[0.08em] transition-colors ${active===href ? 'text-[#7A263A]' : 'text-[#756F65] hover:text-[#0F1F3D]'}`;

  return (
    <header ref={headerRef} className="fixed top-0 inset-x-0 z-[900] border-b border-transparent backdrop-blur-[12px]" style={{ background: 'rgba(250,247,240,0.88)' }}>
      <div className="mx-auto max-w-[1400px] flex items-center justify-between px-[4vw] py-4">
        <div className="flex items-center gap-2 text-[0.75rem] font-bold tracking-[0.1em] text-[#756F65]">
          <span className="text-[#C89B3C] text-[0.7rem] animate-[blink_1.8s_infinite]">●</span>
          FULL-STACK & AI ENGINEER
        </div>
        <a href="#hero" className="font-serif text-[1.3rem] font-extrabold tracking-[0.12em] text-[#0F1F3D]">ADITYA DIXIT</a>
        <div className="flex items-center gap-5">
          <nav className="hidden lg:flex items-center gap-5">
            {portfolio.nav.map(l => (
              <a key={l.href} href={l.href} className={linkCls(l.href)}>{l.label.toUpperCase()}</a>
            ))}
          </nav>
          <span className="hidden md:inline-flex font-mono text-[0.72rem] bg-[#F3E8D0] border border-[#C89B3C] px-3.5 py-1.5 rounded-full text-[#0F1F3D]">AVAILABLE 2026</span>
          <a href={portfolio.resumePath} target="_blank" rel="noopener" className="hidden sm:inline-flex text-[0.78rem] font-bold tracking-[0.08em] bg-[#0F1F3D] text-[#FAF7F0] px-[18px] py-2 rounded-full hover:bg-[#7A263A] hover:text-[#FAF7F0] hover:-translate-y-0.5 transition-all">RESUME ↓</a>
          <button aria-label="Toggle Navigation" aria-expanded={open} onClick={() => setOpen(v=>!v)} className="flex lg:hidden flex-col gap-[5px] p-1 bg-transparent border-0">
            <span className="block w-[22px] h-0.5 bg-[#0F1F3D]" />
            <span className="block w-[22px] h-0.5 bg-[#0F1F3D]" />
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex lg:hidden flex-col gap-4 bg-[#FAF7F0] border-t border-[rgba(200,155,60,0.14)] px-[4vw] py-5 font-serif text-lg">
          {portfolio.nav.map(l => (
            <a key={l.href} href={l.href} onClick={()=>setOpen(false)} className={active===l.href ? 'text-[#7A263A]' : 'text-[#0F1F3D]'}>{l.label.toUpperCase()}</a>
          ))}
        </nav>
      )}
    </header>
  );
}
