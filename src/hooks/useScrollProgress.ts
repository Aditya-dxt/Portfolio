import { useEffect, useState } from 'react';

/**
 * Returns scroll progress as a 0–100 integer.
 * Uses native scroll events (works with Lenis since Lenis
 * dispatches native scroll events on the document).
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.round((scrollTop / docHeight) * 100));
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return progress;
}
