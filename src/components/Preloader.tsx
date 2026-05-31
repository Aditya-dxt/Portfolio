import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '@/lib/gsap';
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

      if (isReducedMotion()) {
        onComplete();
        setVisible(false);
        return;
      }

      const counter = containerRef.current.querySelector('[data-counter]');
      const content = containerRef.current.querySelector('[data-preloader-content]');

      const counterProxy = { val: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          setVisible(false);
          onComplete();
        },
      });

      tl.to(counterProxy, {
        val: 100,
        duration: 2.4,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counter) counter.textContent = `${Math.round(counterProxy.val)}%`;
        },
      });

      tl.fromTo(
        '[data-name]',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=1.6',
      );

      tl.to({}, { duration: 0.35 });

      if (content) {
        tl.to(content, {
          scale: 28,
          opacity: 0,
          duration: 1.1,
          ease: 'power4.in',
          transformOrigin: '50% 50%',
        });
      }

      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
        },
        '-=0.15',
      );
    },
    { scope: containerRef },
  );

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-void"
      aria-busy="true"
      aria-label="Loading"
    >
      <div
        data-preloader-content
        className="relative z-10 flex flex-col items-center gap-5 will-change-transform"
      >
        <span
          data-counter
          className="font-heading text-6xl font-bold tabular-nums tracking-widest text-accent md:text-8xl"
        >
          0%
        </span>
        <h1
          data-name
          className="heading-display text-2xl text-white opacity-0 md:text-4xl"
        >
          {portfolio.name}
        </h1>
      </div>
    </div>
  );
}
