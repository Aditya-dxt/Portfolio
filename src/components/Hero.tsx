import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { portfolio } from '@/data/portfolio';
import { useMagnet } from '@/hooks/useMagnet';
import { useLenisInstance, scrollToTarget } from '@/context/LenisContext';
import { ParticleField } from './ParticleField';
import { SocialLinks } from './SocialLinks';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const lenis = useLenisInstance();
  const workMagnet = useMagnet(80);
  const cvMagnet = useMagnet(80);
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (isReducedMotion()) return;
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % portfolio.rolesCycle.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      if (isReducedMotion() || !sectionRef.current) return;
      [line1Ref.current, line3Ref.current].forEach((wrap, i) => {
        const inner = wrap?.querySelector('.line-inner');
        if (!inner) return;
        gsap.set(inner, { y: 100, opacity: 0, filter: 'blur(8px)' });
        gsap.to(inner, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          delay: 0.5 + i * 0.15,
          ease: 'power3.out',
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-24 sm:px-6"
    >
      <ParticleField />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-4 font-body text-sm text-accent"
        >
          Hello, World 👋
        </motion.p>

        <div className="heading-display w-full space-y-1 md:space-y-2">
          <div ref={line1Ref} className="overflow-hidden">
            <div className="line-inner will-change-transform whitespace-nowrap text-[clamp(1.75rem,7vw,4.5rem)] leading-none text-white">
              I&apos;m {portfolio.name}
            </div>
          </div>

          <div
            className="relative mx-auto w-full overflow-hidden"
            style={{ height: 'clamp(2rem, 7vw, 4.5rem)' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={portfolio.rolesCycle[roleIndex]}
                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -40, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-0 whitespace-nowrap text-[clamp(1.75rem,7vw,4.5rem)] leading-none text-gradient"
              >
                {portfolio.rolesCycle[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <div ref={line3Ref} className="overflow-hidden pt-2">
            <div className="line-inner will-change-transform whitespace-nowrap text-[clamp(0.875rem,2.8vw,1.35rem)] font-body font-light normal-case tracking-normal text-gray-400">
              {portfolio.tagline}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            ref={workMagnet.ref as React.RefObject<HTMLAnchorElement>}
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget(lenis, '#work');
            }}
            data-hover
            onMouseMove={workMagnet.onMove}
            onMouseLeave={workMagnet.onLeave}
            className="rounded-full bg-accent px-8 py-3 font-body text-sm font-medium text-void will-change-transform"
          >
            View My Work
          </a>
          <a
            ref={cvMagnet.ref as React.RefObject<HTMLAnchorElement>}
            href={portfolio.resumePath}
            download
            data-hover
            onMouseMove={cvMagnet.onMove}
            onMouseLeave={cvMagnet.onLeave}
            className="rounded-full border border-accent/60 px-8 py-3 font-body text-sm text-accent will-change-transform hover:bg-accent/10"
          >
            Download CV
          </a>
        </div>

        <SocialLinks className="mt-8 justify-center" iconSize={20} />

        <div className="mt-12 flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-gray-500">scroll to explore</span>
          <div className="h-12 w-px origin-top scale-y-100 animate-pulseLine bg-accent/60" />
        </div>
      </div>

      <div className="absolute bottom-8 left-6 z-10 hidden gap-4 md:left-12 lg:flex">
        <SocialLinks iconSize={22} />
      </div>

      <div className="absolute bottom-8 right-6 z-10 font-mono text-xs text-gray-500 md:right-12">
        {time}
      </div>
    </section>
  );
}
