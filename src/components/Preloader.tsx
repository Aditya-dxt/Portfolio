import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, splitToChars, isReducedMotion } from '@/lib/gsap';
import { portfolio } from '@/data/portfolio';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const reduced = isReducedMotion();

      if (reduced) {
        onComplete();
        setVisible(false);
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setVisible(false);
          onComplete();
        },
      });

      const counter = containerRef.current.querySelector('[data-counter]');
      const nameEl = containerRef.current.querySelector('[data-name]') as HTMLElement;
      const topPanel = containerRef.current.querySelector('[data-panel-top]');
      const bottomPanel = containerRef.current.querySelector('[data-panel-bottom]');

      const counterProxy = { val: 0 };
      tl.to(counterProxy, {
        val: 100,
        duration: 2,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (counter) counter.textContent = `${Math.round(counterProxy.val)}%`;
        },
      });

      if (nameEl) {
        const chars = splitToChars(nameEl);
        gsap.set(chars, { opacity: 0, y: 40 });
        tl.to(
          chars,
          { opacity: 1, y: 0, stagger: 0.04, duration: 0.6, ease: 'power3.out' },
          '-=0.8',
        );
      }

      tl.to(
        [topPanel, bottomPanel],
        {
          yPercent: (i) => (i === 0 ? -100 : 100),
          duration: 1,
          ease: 'power4.inOut',
        },
        '+=0.3',
      );

      tl.to(
        containerRef.current,
        { opacity: 0, duration: 0.4, pointerEvents: 'none' },
        '-=0.2',
      );
    },
    { scope: containerRef },
  );

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-void"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="relative z-10 flex flex-col items-center gap-6">
        <span
          data-counter
          className="font-heading text-6xl font-bold tracking-widest text-accent md:text-8xl"
        >
          0%
        </span>
        <h1
          data-name
          className="heading-display text-2xl text-white md:text-4xl"
        >
          {portfolio.name}
        </h1>
      </div>
      <div
        data-panel-top
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-void will-change-transform"
      />
      <div
        data-panel-bottom
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-void will-change-transform"
      />
    </div>
  );
}
