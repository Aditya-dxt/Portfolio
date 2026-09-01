import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import { isTouchDevice } from '@/lib/device';

const LenisContext = createContext<Lenis | null>(null);
const AppReadyContext = createContext(false);

export function useLenisInstance() {
  return useContext(LenisContext);
}

export function useAppReady() {
  return useContext(AppReadyContext);
}

interface LenisProviderProps {
  enabled: boolean;
  onReady?: () => void;
  children: ReactNode;
}

function debounce(fn: () => void, ms: number) {
  let id: number | undefined;
  return () => {
    if (id) window.clearTimeout(id);
    id = window.setTimeout(fn, ms);
  };
}

export function LenisProvider({ enabled, onReady, children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [appReady, setAppReady] = useState(isReducedMotion());
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    if (!enabled) return;

    if (isReducedMotion() || isTouchDevice()) {
      const finishNative = () => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh(true);
        requestAnimationFrame(() => {
          setAppReady(true);
          onReadyRef.current?.();
          window.dispatchEvent(new CustomEvent('app-ready'));
        });
      };
      finishNative();
      const t = window.setTimeout(() => ScrollTrigger.refresh(true), 400);
      return () => window.clearTimeout(t);
    }

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

    const refresh = () => {
      lenis.resize();
      ScrollTrigger.refresh(true);
    };

    const debouncedRefresh = debounce(refresh, 250);

    // ROOT FIX: child ScrollTriggers mount synchronously before parent effect
    // runs → positions calc against stale window scroll. Force refreshes
    // after proxy is installed, after fonts settle, and after DOM paints.
    const handleFontsReady = () => {
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          lenis.resize();
          ScrollTrigger.refresh(true);
          requestAnimationFrame(() => ScrollTrigger.refresh(true));
        });
      }
    };
    handleFontsReady();

    const finishBoot = () => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
      refresh();
      requestAnimationFrame(() => {
        refresh();
        // One more tick after fonts + layout settle
        window.setTimeout(() => ScrollTrigger.refresh(true), 100);
        setAppReady(true);
        onReadyRef.current?.();
        window.dispatchEvent(new CustomEvent('app-ready'));
      });
    };

    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });
    refresh();

    // Extra rAF refresh to catch child triggers that mounted before proxy was set
    requestAnimationFrame(() => ScrollTrigger.refresh(true));
    handleFontsReady();

    const t1 = window.setTimeout(finishBoot, 350);
    window.addEventListener('load', () => {
      handleFontsReady();
      debouncedRefresh();
    });
    // Also re-refresh when fonts actually load late (serif/script)
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        window.setTimeout(() => ScrollTrigger.refresh(true), 80);
      });
    }
    window.addEventListener('resize', debouncedRefresh);

    return () => {
      window.clearTimeout(t1);
      gsap.ticker.remove(tickerFn);
      window.removeEventListener('load', debouncedRefresh);
      window.removeEventListener('resize', debouncedRefresh);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      setAppReady(false);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
    };
  }, [enabled]);

  return (
    <LenisContext.Provider value={lenisInstance}>
      <AppReadyContext.Provider value={appReady}>{children}</AppReadyContext.Provider>
    </LenisContext.Provider>
  );
}

/** Refresh scroll measurements after lazy sections mount */
export function useScrollRefresh(deps: unknown[] = []) {
  useEffect(() => {
    if (isReducedMotion()) return;
    const refresh = () => ScrollTrigger.refresh(true);
    const id = window.setTimeout(refresh, 200);
    return () => window.clearTimeout(id);
  }, deps);
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
