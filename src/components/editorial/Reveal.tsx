import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import { useAppReady } from '@/context/LenisContext';

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const ready = useAppReady();
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (isReducedMotion()) {
      root.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
        el.classList.add('visible');
        gsap.set(el, { clearProps: 'all' });
      });
      return;
    }
    if (!ready) {
      // Before Lenis ready, don't hide reveals — keep them visible so sections
      // aren't blank for 2-3s while preloader + fonts settle. GSAP will take over on ready.
      root.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
        el.classList.add('visible');
        gsap.set(el, { clearProps: 'all', autoAlpha: 1 });
      });
      return;
    }
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      // Desktop: staggered GSAP, Mobile: simple fade
      mm.add('(min-width: 768px)', () => {
        // Generic reveals not handled by section-specific timelines
        const generic = root.querySelectorAll<HTMLElement>('.reveal:not([data-stagger-group])');
        ScrollTrigger.batch(generic, {
          onEnter: (batch) => {
            gsap.fromTo(batch,
              { y: 28, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08, overwrite: true }
            );
            batch.forEach(el => el.classList.add('visible'));
          },
          start: 'top 88%',
          
        });

        // Scrub-tied process steps: parallax scrub instead of one-shot
        const scrubSection = root.querySelector<HTMLElement>('[data-scrub-stagger]');
        if (scrubSection) {
          const items = scrubSection.querySelectorAll<HTMLElement>('.process-step');
          gsap.fromTo(items,
            { y: 40, autoAlpha: 0 },
            {
              y: 0, autoAlpha: 1, duration: 1, ease: 'none', stagger: 0.12,
              scrollTrigger: {
                trigger: scrubSection,
                start: 'top 85%',
                end: 'top 30%',
                scrub: true,
              }
            }
          );
        }
      });

      mm.add('(max-width: 767px)', () => {
        const els = root.querySelectorAll<HTMLElement>('.reveal');
        ScrollTrigger.batch(els, {
          onEnter: (batch) => {
            gsap.fromTo(batch,
              { y: 16, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out', stagger: 0.06, overwrite: true }
            );
            batch.forEach(el => el.classList.add('visible'));
          },
          start: 'top 92%',
          
        });
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);
  return ref;
}
