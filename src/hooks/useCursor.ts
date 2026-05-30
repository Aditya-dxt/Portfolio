import { useEffect } from 'react';
import { gsap, isReducedMotion } from '@/lib/gsap';

export function useCursor() {
  useEffect(() => {
    if (isReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return;

    const dot = document.querySelector<HTMLElement>('[data-cursor-dot]');
    const ring = document.querySelector<HTMLElement>('[data-cursor-ring]');
    if (!dot || !ring) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: pos.x, y: pos.y };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.15;
      ringPos.y += (pos.y - ringPos.y) * 0.15;
      gsap.set(dot, { x: pos.x, y: pos.y, xPercent: -50, yPercent: -50 });
      gsap.set(ring, { x: ringPos.x, y: ringPos.y, xPercent: -50, yPercent: -50 });
    };

    const onEnter = () => {
      gsap.to(dot, { scale: 2, duration: 0.3 });
      gsap.to(ring, { scale: 1.6, opacity: 0.5, duration: 0.3 });
    };
    const onLeave = () => {
      gsap.to(dot, { scale: 1, duration: 0.3 });
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMove);
    gsap.ticker.add(tick);

    const hoverables = document.querySelectorAll('a, button, [data-hover]');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(tick);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);
}
