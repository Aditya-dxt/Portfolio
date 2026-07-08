import { useEffect, useRef, useState } from 'react';

interface CursorPos {
  x: number;
  y: number;
}

/**
 * Returns live cursor { x, y } screen coordinates,
 * throttled to rAF for 60fps performance.
 */
export function useCursorPosition(): CursorPos {
  const [pos, setPos] = useState<CursorPos>({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const latestRef = useRef<CursorPos>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      latestRef.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      setPos(latestRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return pos;
}
