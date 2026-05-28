// =============================================================================
// Utility Functions
// Shared helper functions used across the portfolio application.
// =============================================================================

/**
 * Conditionally join CSS class names together, filtering out falsy values.
 * A lightweight alternative to the `clsx` / `classnames` packages.
 *
 * @example
 * cn('base-class', isActive && 'active', undefined, 'always')
 * // => "base-class active always"
 */
export function cn(
  ...classes: (string | undefined | null | boolean)[]
): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Smoothly scroll to a DOM element by its id (without the leading "#").
 * Falls back gracefully if the element is not found.
 *
 * @param elementId - The id of the target element (e.g., "about")
 * @param offset    - Optional pixel offset from the top (default 80 for navbar)
 */
export function scrollToElement(elementId: string, offset: number = 80): void {
  const element = document.getElementById(elementId);
  if (!element) return;

  const top =
    element.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * Format a number with locale-aware thousand separators.
 *
 * @example formatNumber(12500) // => "12,500"
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Truncate a string to `maxLength` characters, appending an ellipsis when
 * the original string exceeds that length. Avoids cutting words in half.
 *
 * @param str       - The input string
 * @param maxLength - Maximum character count (default 150)
 */
export function truncateText(str: string, maxLength: number = 150): string {
  if (str.length <= maxLength) return str;

  // Find the last space within the allowed range to avoid mid-word cuts
  const trimmed = str.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(' ');

  return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed) + '…';
}

/**
 * Generate a slug from a title string (lowercase, hyphens, no special chars).
 *
 * @example slugify("My Cool Project!") // => "my-cool-project"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Debounce a function call. Returns a new function that delays invoking
 * `func` until after `waitMs` milliseconds have elapsed since the last
 * time the returned function was called.
 *
 * @param func   - The function to debounce
 * @param waitMs - Delay in milliseconds (default 300)
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  waitMs: number = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), waitMs);
  };
}

/**
 * Create a range array from `start` to `end` (inclusive).
 *
 * @example range(1, 5) // => [1, 2, 3, 4, 5]
 */
export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Clamp a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Return a random item from an array.
 */
export function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Check if the code is running in a browser environment.
 * Useful for guarding against SSR issues in Next.js.
 */
export const isBrowser: boolean = typeof window !== 'undefined';

/**
 * Wait for a specified number of milliseconds.
 * Useful for staggering animations or simulating delays.
 *
 * @param ms - Milliseconds to wait
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Convert a hex color string to an rgba string with optional opacity.
 *
 * @example hexToRgba("#8b5cf6", 0.2) // => "rgba(139, 92, 246, 0.2)"
 */
export function hexToRgba(hex: string, alpha: number = 1): string {
  const sanitized = hex.replace('#', '');
  const r = parseInt(sanitized.substring(0, 2), 16);
  const g = parseInt(sanitized.substring(2, 4), 16);
  const b = parseInt(sanitized.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}
