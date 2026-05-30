import { useEffect, useRef } from 'react';
import { gsap, isReducedMotion } from '@/lib/gsap';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

export function useScramble(text: string, duration = 1.5, trigger = true) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!trigger || !ref.current || isReducedMotion()) {
      if (ref.current) ref.current.textContent = text;
      return;
    }

    const el = ref.current;
    const len = text.length;
    const proxy = { progress: 0 };

    gsap.to(proxy, {
      progress: 1,
      duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        const p = proxy.progress;
        let out = '';
        for (let i = 0; i < len; i++) {
          if (text[i] === ' ') {
            out += ' ';
          } else if (i / len < p) {
            out += text[i];
          } else {
            out += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        el.textContent = out;
      },
      onComplete: () => {
        el.textContent = text;
      },
    });
  }, [text, duration, trigger]);

  return ref;
}
