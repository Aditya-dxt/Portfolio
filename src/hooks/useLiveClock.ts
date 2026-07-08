import { useEffect, useState } from 'react';

/**
 * Returns a live HH:MM:SS string updated every second.
 * Shared by HudBar and Hero.
 */
export function useLiveClock() {
  const [time, setTime] = useState(() => formatTime());

  useEffect(() => {
    const tick = () => setTime(formatTime());
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function formatTime(): string {
  return new Date().toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
