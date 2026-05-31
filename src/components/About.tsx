import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import { useAppReady } from '@/context/LenisContext';
import { portfolio } from '@/data/portfolio';
import { LazyImage } from './LazyImage';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const desktopContentRef = useRef<HTMLDivElement>(null);
  const appReady = useAppReady();

  useGSAP(
    () => {
      if (!sectionRef.current || !appReady || isReducedMotion()) return;

      gsap.from('[data-about-reveal]', {
        y: 36,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': () => {
          if (!desktopContentRef.current) return;

          const pinDistance = () => window.innerHeight * 1.5;

          const applyPhases = (p: number) => {
            if (phase1Ref.current) {
              const fadeOut = p > 0.38 ? Math.max(0, 1 - (p - 0.38) / 0.12) : 1;
              const fadeIn = p < 0.02 ? 1 : Math.min(p / 0.25, 1);
              gsap.set(phase1Ref.current, {
                opacity: fadeIn * fadeOut,
                y: p < 0.02 ? 0 : (1 - fadeIn) * 30,
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
          };

          const st = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${pinDistance()}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.25,
            anticipatePin: 1,
            onUpdate: (self) => applyPhases(self.progress),
            onRefresh: (self) => applyPhases(self.progress),
          });

          applyPhases(0);

          return () => st.kill();
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
    { scope: sectionRef, dependencies: [appReady] },
  );

  useGSAP(
    () => {
      if (!blobRef.current || !appReady || isReducedMotion()) return;
      gsap.to(blobRef.current, {
        rotation: 360,
        duration: 24,
        repeat: -1,
        ease: 'none',
      });
    },
    { scope: blobRef, dependencies: [appReady] },
  );

  return (
    <section id="about" ref={sectionRef} className="relative bg-void py-16 sm:py-24 lg:min-h-screen lg:py-0">
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 will-change-transform"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.08), transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Mobile / tablet: stacked — always visible, no scroll pin */}
        <div className="flex flex-col items-center gap-10 lg:hidden">
          <div data-about-reveal className="relative w-full max-w-sm">
            <div
              ref={blobRef}
              className="absolute -inset-4 bg-accent/20 will-change-transform"
              aria-hidden
            />
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-accent/30 bg-void">
              <LazyImage
                src={portfolio.profileImage}
                alt={portfolio.name}
                sharp
                eager
                className="h-full w-full scale-[0.92] object-cover object-[center_18%] contrast-[1.05] saturate-[1.05]"
              />
            </div>
          </div>

          <div data-about-reveal className="w-full">
            <h2 className="heading-display mb-4 text-2xl text-accent sm:text-3xl">About Me</h2>
            <p className="font-body text-sm leading-relaxed text-gray-300 sm:text-base">
              {portfolio.bio}
            </p>
          </div>

          <div data-about-reveal className="grid w-full grid-cols-1 gap-3 min-[400px]:grid-cols-3 sm:gap-4">
            {portfolio.stats.map((stat) => (
              <div key={stat.label} className="glass-panel rounded-xl p-4 sm:p-5">
                <span className="font-heading text-2xl text-accent sm:text-3xl">{stat.value}</span>
                <span className="mt-1 block font-body text-xs text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>

          <div data-about-reveal className="w-full">
            <blockquote className="border-l-2 border-accent pl-4 font-body text-base italic text-gray-200 sm:pl-6 sm:text-lg">
              &ldquo;{portfolio.philosophy}&rdquo;
            </blockquote>
            <ul className="mt-4 space-y-2 font-body text-sm text-gray-400">
              {portfolio.funFacts.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop: pinned phases */}
        <div className="hidden min-h-screen items-center gap-16 lg:flex">
          <div className="relative w-[40%] shrink-0">
            <div
              className="absolute -inset-4 bg-accent/20 will-change-transform"
              aria-hidden
            />
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-accent/30 bg-void">
              <div className="pointer-events-none absolute inset-0 animate-[spin_12s_linear_infinite] rounded-2xl border-2 border-dashed border-accent/40" />
              <LazyImage
                src={portfolio.profileImage}
                alt={portfolio.name}
                sharp
                eager
                className="relative z-10 h-full w-full scale-[0.92] object-cover object-[center_18%] contrast-[1.05] saturate-[1.05]"
              />
            </div>
          </div>

          <div ref={desktopContentRef} className="relative min-h-[380px] w-[60%]">
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

            <div
              ref={phase3Ref}
              className="pointer-events-none absolute inset-0 opacity-0 will-change-transform"
            >
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
      </div>
    </section>
  );
}
