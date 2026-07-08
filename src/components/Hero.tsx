import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { portfolio } from '@/data/portfolio';
import { useMagnet } from '@/hooks/useMagnet';
import { useLiveClock } from '@/hooks/useLiveClock';
import { useLenisInstance, useAppReady, scrollToTarget } from '@/context/LenisContext';
import { ParticleField } from './ParticleField';
import { SocialLinks } from './SocialLinks';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
const DECODE_LINES = [
  { prefix: '> ', target: portfolio.name.toUpperCase() },
  { prefix: '> ', target: portfolio.role.toUpperCase() },
];
const DECODE_DURATION = 1.2; // seconds per line
const DECODE_STAGGER = 0.4; // delay between lines

function scrambleText(target: string, progress: number): string {
  let out = '';
  for (let i = 0; i < target.length; i++) {
    if (target[i] === ' ') {
      out += ' ';
    } else if (i / target.length < progress) {
      out += target[i];
    } else {
      out += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
  }
  return out;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const decodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [decodeComplete, setDecodeComplete] = useState(isReducedMotion());
  const lenis = useLenisInstance();
  const appReady = useAppReady();
  const workMagnet = useMagnet(80);
  const cvMagnet = useMagnet(80);
  const time = useLiveClock();

  // Terminal decode animation on first load
  useEffect(() => {
    if (!appReady || isReducedMotion()) {
      setDecodeComplete(true);
      return;
    }

    const tweens: gsap.core.Tween[] = [];

    DECODE_LINES.forEach((line, i) => {
      const el = decodeRefs.current[i];
      if (!el) return;

      el.textContent = line.prefix + scrambleText(line.target, 0);

      const proxy = { progress: 0 };
      const tween = gsap.to(proxy, {
        progress: 1,
        duration: DECODE_DURATION,
        delay: 0.3 + i * DECODE_STAGGER,
        ease: 'power2.inOut',
        onUpdate: () => {
          el.textContent = line.prefix + scrambleText(line.target, proxy.progress);
        },
        onComplete: () => {
          el.textContent = line.prefix + line.target;
        },
      });
      tweens.push(tween);
    });

    // After all decode lines finish, reveal main content
    const totalDuration = 0.3 + (DECODE_LINES.length - 1) * DECODE_STAGGER + DECODE_DURATION;
    const finishTimer = window.setTimeout(() => setDecodeComplete(true), totalDuration * 1000 + 200);

    return () => {
      tweens.forEach((t) => t.kill());
      window.clearTimeout(finishTimer);
    };
  }, [appReady]);

  // Role cycling
  useEffect(() => {
    if (isReducedMotion()) return;
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % portfolio.rolesCycle.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  // Main heading reveal animation
  useGSAP(
    () => {
      if (isReducedMotion() || !sectionRef.current || !appReady || !decodeComplete) return;

      const animateLines = () => {
        [line1Ref.current, line3Ref.current].forEach((wrap, i) => {
          const inner = wrap?.querySelector('.line-inner');
          if (!inner) return;
          gsap.fromTo(
            inner,
            { y: 80, opacity: 0, filter: 'blur(8px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1,
              delay: 0.15 + i * 0.12,
              ease: 'power3.out',
            },
          );
        });
      };

      animateLines();
    },
    { scope: sectionRef, dependencies: [appReady, decodeComplete] },
  );

  // Ghost name parallax
  useGSAP(
    () => {
      if (!ghostRef.current || !sectionRef.current || !appReady || isReducedMotion()) return;

      gsap.fromTo(
        ghostRef.current,
        { y: 0 },
        {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.4,
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [appReady] },
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-24 sm:px-6"
    >
      <ParticleField />

      {/* Ghost name — large, low-opacity, parallax background (desktop only) */}
      <span
        ref={ghostRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] hidden -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-heading text-[14vw] font-bold uppercase leading-none tracking-wider text-white/[0.025] will-change-transform lg:block"
        aria-hidden
      >
        {portfolio.name}
      </span>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        {/* Terminal decode preloader */}
        <AnimatePresence>
          {!decodeComplete && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute inset-x-0 top-0 flex flex-col items-center gap-1 font-mono text-sm text-accent/80 sm:text-base"
            >
              {DECODE_LINES.map((_, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    decodeRefs.current[i] = el;
                  }}
                  className="block"
                >
                  &gt; {'_'.repeat(20)}
                </span>
              ))}
              <span className="mt-2 animate-pulse text-xs text-gray-600">
                ▋ initializing...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content — visible after decode completes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: decodeComplete ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex w-full flex-col items-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: decodeComplete ? 1 : 0, y: decodeComplete ? 0 : 20 }}
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
        </motion.div>
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
