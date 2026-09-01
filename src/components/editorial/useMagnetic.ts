import { useEffect, useRef } from 'react';
import { gsap, isReducedMotion } from '@/lib/gsap';

export function useMagnetic<T extends HTMLElement>(strength = 16) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || isReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist > 1.6) {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
        return;
      }
      gsap.to(el, { x: dx * strength, y: dy * strength * 0.6, duration: 0.4, ease: 'power3.out' });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.35)' });
    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);
  return ref;
}
