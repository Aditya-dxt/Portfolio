import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import { useAppReady } from '@/context/LenisContext';
import { portfolio } from '@/data/portfolio';
import { LazyImage } from './LazyImage';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const appReady = useAppReady();

  useGSAP(
    () => {
      if (!sectionRef.current || !appReady || isReducedMotion()) return;

      // Each element fades in + slides up independently as it scrolls into view
      const reveals = gsap.utils.toArray<HTMLElement>('[data-about-reveal]');
      reveals.forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
          },
        });
      });

      // Subtle background parallax on mouse move
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

  return (
    <section id="about" ref={sectionRef} className="relative bg-void py-16 sm:py-24">
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
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16">
          {/* Profile Image — sticky on desktop so it stays visible while scrolling content */}
          <div data-about-reveal className="relative w-full max-w-sm lg:sticky lg:top-24 lg:w-[40%] lg:max-w-none lg:shrink-0">
            <div className="profile-frame aspect-[3/4] overflow-hidden bg-void">
              <LazyImage
                src={portfolio.profileImage}
                alt={portfolio.name}
                sharp
                eager
                className="relative z-10 h-full w-full object-cover object-[center_18%] contrast-[1.05] saturate-[1.05]"
              />
            </div>
          </div>

          {/* Content — all sections visible, each animates in on scroll */}
          <div className="w-full lg:w-[60%]">
            <div data-about-reveal>
              <h2 className="heading-display mb-4 text-2xl text-accent sm:text-3xl lg:mb-6 lg:text-4xl">
                About Me
              </h2>
              <p className="font-body text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg">
                {portfolio.bio}
              </p>
            </div>

            <div
              data-about-reveal
              className="mt-8 grid grid-cols-1 gap-3 min-[400px]:grid-cols-3 sm:gap-4 lg:mt-10"
            >
              {portfolio.stats.map((stat) => (
                <div key={stat.label} className="glass-panel rounded-xl p-4 sm:p-5 lg:p-6">
                  <span className="font-heading text-2xl text-accent sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block font-body text-xs text-gray-400 sm:text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div data-about-reveal className="mt-8 lg:mt-10">
              <blockquote className="border-l-2 border-accent pl-4 font-body text-base italic text-gray-200 sm:pl-6 sm:text-lg lg:text-xl">
                &ldquo;{portfolio.philosophy}&rdquo;
              </blockquote>
              <ul className="mt-4 space-y-2 font-body text-sm text-gray-400 lg:mt-6">
                {portfolio.funFacts.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
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
