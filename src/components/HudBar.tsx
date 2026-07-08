import { useLiveClock } from '@/hooks/useLiveClock';
import { useCursorPosition } from '@/hooks/useCursorPosition';
import { useScrollProgress } from '@/hooks/useScrollProgress';

/**
 * Developer-diagnostic HUD bar pinned at the top of the viewport.
 * Desktop only — hidden on mobile for performance/clutter.
 * Monospace, low-opacity, non-interactive.
 */
export function HudBar() {
  const time = useLiveClock();
  const cursor = useCursorPosition();
  const scroll = useScrollProgress();

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 hidden h-7 items-center justify-between border-b border-white/[0.04] bg-void/40 px-5 font-mono text-[10px] tracking-wider text-gray-600 backdrop-blur-sm lg:flex"
      aria-hidden
    >
      {/* Left cluster */}
      <div className="flex items-center gap-5">
        <span>
          SCROLL{' '}
          <span className="text-accent/60">
            {String(scroll).padStart(3, '0')}%
          </span>
        </span>
        <span className="text-white/10">│</span>
        <span>
          CURSOR{' '}
          <span className="text-accent/60">
            X:{String(cursor.x).padStart(4, '0')} Y:
            {String(cursor.y).padStart(4, '0')}
          </span>
        </span>
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-5">
        <span>
          <span className="text-accent/60">{time}</span>
        </span>
        <span className="text-white/10">│</span>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-sm bg-accent/50" />
          <span className="text-gray-700">ACCENT</span>
        </div>
      </div>
    </div>
  );
}
