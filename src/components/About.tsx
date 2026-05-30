import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import { useScrollRefresh } from '@/context/LenisContext';
import { portfolio } from '@/data/portfolio';
import { LazyImage } from './LazyImage';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollRefresh();

  useGSAP(
    () => {
      if (!sectionRef.current || isReducedMotion()) return;

      const pinDistance = () =>
        window.innerWidth < 768 ? window.innerHeight * 0.8 : window.innerHeight * 1.5;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${pinDistance()}`,
        pin: window.innerWidth >= 768,
        pinSpacing: true,
        scrub: 0.25,
        anticipatePin: 1,
        fastScrollEnd: true,
        onUpdate: (self) => {
          const p = self.progress;

          if (phase1Ref.current) {
            const fadeOut = p > 0.38 ? Math.max(0, 1 - (p - 0.38) / 0.12) : 1;
            const fadeIn = Math.min(p / 0.25, 1);
            gsap.set(phase1Ref.current, {
              opacity: fadeIn * fadeOut,
              y: (1 - fadeIn) * 30,
            });
          }

          if (phase2Ref.current) {
            const inStart = 0.32;
            const inEnd = 0.52;
            const outStart = 0.68;
            const outEnd = 0.82;
            let opacity = 0;
            if (p >= inStart && p < outStart) {
              opacity =
                p < inEnd
                  ? (p - inStart) / (inEnd - inStart)
                  : p > outStart
                    ? 1 - (p - outStart) / (outEnd - outStart)
                    : 1;
            }
            gsap.set(phase2Ref.current, { opacity: Math.max(0, Math.min(1, opacity)) });
          }

          if (phase3Ref.current) {
            const opacity = p > 0.72 ? Math.min((p - 0.72) / 0.2, 1) : 0;
            gsap.set(phase3Ref.current, {
              opacity,
              y: opacity > 0 ? 0 : 20,
            });
          }
        },
      });

      if (bgRef.current) {
        const onMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 30;
          const y = (e.clientY / window.innerHeight - 0.5) * 30;
          gsap.to(bgRef.current, { x, y, duration: 1.2, ease: 'power2.out', overwrite: 'auto' });
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
      }
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      if (!blobRef.current || isReducedMotion()) return;
      gsap.to(blobRef.current, {
        rotation: 360,
        duration: 24,
        repeat: -1,
        ease: 'none',
      });
    },
    { scope: blobRef },
  );

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen bg-void">
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 will-change-transform"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.08), transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-8 px-4 py-16 sm:gap-12 sm:px-6 sm:py-24 lg:flex-row lg:gap-16">
        <div className="relative w-full shrink-0 lg:w-[40%]">
          <div
            ref={blobRef}
            className="absolute -inset-4 bg-accent/20 will-change-transform"
            aria-hidden
          />
          <div
            ref={photoRef}
            className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border-2 border-accent/30"
          >
            <div className="pointer-events-none absolute inset-0 animate-[spin_12s_linear_infinite] rounded-2xl border-2 border-dashed border-accent/40" />
            <LazyImage
              src={portfolio.profileImage}
              alt={portfolio.name}
              className="relative z-10 h-full w-full object-cover"
            />
          </div>
        </div>

        <div ref={contentRef} className="relative w-full min-h-[380px] lg:w-[60%]">
          <div ref={phase1Ref} className="will-change-transform">
            <h2 className="heading-display mb-6 text-3xl text-accent md:text-4xl">About Me</h2>
            <p className="font-body text-base leading-relaxed text-gray-300 md:text-lg">
              {portfolio.bio}
            </p>
          </div>

          <div
            ref={phase2Ref}
            className="pointer-events-none absolute inset-0 flex flex-wrap content-start gap-4 opacity-0 will-change-transform"
          >
            {portfolio.stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-panel flex min-w-[140px] flex-1 flex-col rounded-xl p-6"
              >
                <span className="font-heading text-3xl text-accent">{stat.value}</span>
                <span className="mt-1 font-body text-sm text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>

          <div ref={phase3Ref} className="pointer-events-none absolute inset-0 opacity-0 will-change-transform">
            <blockquote className="border-l-2 border-accent pl-6 font-body text-xl italic text-gray-200">
              &ldquo;{portfolio.philosophy}&rdquo;
            </blockquote>
            <ul className="mt-6 space-y-2 font-body text-sm text-gray-400">
              {portfolio.funFacts.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
