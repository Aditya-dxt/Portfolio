
import { useEffect } from 'react';
export function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = scrolled + '%';
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener('scroll', onScroll);
  }, []);
  return <div id="scrollProgress" />;
}
