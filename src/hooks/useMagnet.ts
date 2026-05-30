import { useRef, useCallback } from 'react';
import { gsap, isReducedMotion } from '@/lib/gsap';

export function useMagnet(radius = 80) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (isReducedMotion() || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        const pull = (radius - dist) / radius;
        gsap.to(ref.current, {
          x: dx * pull * 0.35,
          y: dy * pull * 0.35,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      }
    },
    [radius],
  );

  const onLeave = useCallback(() => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  }, []);

  return { ref, onMove, onLeave };
}
