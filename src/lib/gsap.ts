import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export const isReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const scrollMarkers = false;

export function splitToChars(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent ?? '';
  el.textContent = '';
  el.setAttribute('aria-label', text);
  const chars: HTMLSpanElement[] = [];
  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.className = 'inline-block will-change-transform';
    span.setAttribute('aria-hidden', 'true');
    el.appendChild(span);
    chars.push(span);
  });
  return chars;
}

export function splitToLines(el: HTMLElement): HTMLDivElement[] {
  const lines = (el.dataset.lines ?? el.textContent ?? '').split('|');
  el.textContent = '';
  const wrappers: HTMLDivElement[] = [];
  lines.forEach((line) => {
    const wrap = document.createElement('div');
    wrap.className = 'overflow-hidden';
    const inner = document.createElement('div');
    inner.className = 'line-inner will-change-transform';
    inner.textContent = line.trim();
    wrap.appendChild(inner);
    el.appendChild(wrap);
    wrappers.push(inner);
  });
  return wrappers;
}

export { gsap, ScrollTrigger, TextPlugin };
