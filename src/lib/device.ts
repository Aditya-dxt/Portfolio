import { isReducedMotion } from '@/lib/gsap';

export function isTouchDevice(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches
  );
}

export function isMobileViewport(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

/** Lighter animations & no Lenis / Three.js on phones */
export function useLightExperience(): boolean {
  return isReducedMotion() || isTouchDevice();
}
