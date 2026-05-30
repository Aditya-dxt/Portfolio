import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';

const LenisContext = createContext<Lenis | null>(null);

export function useLenisInstance() {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  enabled: boolean;
  children: ReactNode;
}

function debounce(fn: () => void, ms: number) {
  let id: number | undefined;
  return () => {
    if (id) window.clearTimeout(id);
    id = window.setTimeout(fn, ms);
  };
}

export function LenisProvider({ enabled, children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    if (!enabled || isReducedMotion()) return;

    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      autoResize: true,
    });
    lenisRef.current = lenis;
    setLenisInstance(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: 'transform',
    });

    ScrollTrigger.defaults({ markers: false });

    const refresh = () => {
      lenis.resize();
      ScrollTrigger.refresh(true);
    };

    const debouncedRefresh = debounce(refresh, 250);

    refresh();
    const t1 = window.setTimeout(refresh, 600);
    window.addEventListener('load', debouncedRefresh);
    window.addEventListener('resize', debouncedRefresh);

    return () => {
      window.clearTimeout(t1);
      gsap.ticker.remove(tickerFn);
      window.removeEventListener('load', debouncedRefresh);
      window.removeEventListener('resize', debouncedRefresh);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
    };
  }, [enabled]);

  return <LenisContext.Provider value={lenisInstance}>{children}</LenisContext.Provider>;
}

/** One-time refresh after a section mounts — avoids mid-scroll recalc */
export function useScrollRefresh() {
  const didRefresh = useRef(false);
  useEffect(() => {
    if (isReducedMotion() || didRefresh.current) return;
    didRefresh.current = true;
    const id = window.setTimeout(() => ScrollTrigger.refresh(true), 100);
    return () => window.clearTimeout(id);
  }, []);
}

export function scrollToTarget(lenis: Lenis | null, target: string, offset = -80) {
  if (isReducedMotion()) {
    document.querySelector(target)?.scrollIntoView({ behavior: 'auto' });
    return;
  }
  lenis?.scrollTo(target, {
    offset,
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
}
