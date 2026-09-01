import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Photo = { src: string; alt: string; title: string };

const photos: Photo[] = [
  { src: '/images/photography/A.jpeg', alt: 'Moon night sky', title: 'A' },
  { src: '/images/photography/B.jpg', alt: 'Street lamp at dusk', title: 'B' },
  { src: '/images/photography/C.jpeg', alt: 'River ghat evening', title: 'C' },
  { src: '/images/photography/D.jpeg', alt: 'Park street lamps at night', title: 'D' },
  { src: '/images/photography/E.jpeg', alt: 'Basketball hoop under sky', title: 'E' },
  { src: '/images/photography/F.jpeg', alt: 'Palm street lamp night', title: 'F' },
  { src: '/images/photography/G.jpg', alt: 'Moon through branches', title: 'G' },
  { src: '/images/photography/H.jpeg', alt: 'City lights reflections', title: 'H' },
  { src: '/images/photography/I.jpeg', alt: 'Evening skyline', title: 'I' },
  { src: '/images/photography/J.jpeg', alt: 'Street perspective', title: 'J' },
  { src: '/images/photography/K.jpeg', alt: 'Night architecture', title: 'K' },
  { src: '/images/photography/L.jpeg', alt: 'Golden hour capture', title: 'L' },
  { src: '/images/photography/M.jpeg', alt: 'Urban frame', title: 'M' },
  { src: '/images/photography/N.jpeg', alt: 'Light trails', title: 'N' },
  { src: '/images/photography/O.jpeg', alt: 'Quiet night', title: 'O' },
  { src: '/images/photography/P.jpeg', alt: 'Through my lens — P', title: 'P' },
];

function getZIndex(arrLen: number, index: number, active: number) {
  return arrLen - Math.abs(index - active);
}

export function PhotographyEditorial() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(50);
  const progressRef = useRef(50);
  const targetRef = useRef(50);
  const rafRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const isDownRef = useRef(false);
  const didDragRef = useRef(false);
  const hoverRef = useRef(false);
  const [selected, setSelected] = useState<number | null>(null);
  const n = photos.length;
  const active = Math.floor((progress / 100) * (n - 1));
  const clamp = (v: number) => Math.max(0, Math.min(100, v));

  useEffect(() => {
    progressRef.current = progress;
    targetRef.current = progress;
  }, []);

  const smoothTo = useCallback(
    (next: number) => {
      if (selected !== null) return;
      targetRef.current = clamp(next);
      if (rafRef.current != null) return;
      const tick = () => {
        const cur = progressRef.current;
        const tgt = targetRef.current;
        const diff = tgt - cur;
        if (Math.abs(diff) < 0.08) {
          progressRef.current = tgt;
          setProgress(tgt);
          rafRef.current = null;
          return;
        }
        const eased = cur + diff * 0.14;
        progressRef.current = eased;
        setProgress(eased);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [selected],
  );

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let wheelAccum = 0;
    const onWheel = (e: WheelEvent) => {
      if (selected !== null) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      wheelAccum += delta * 0.035;
      if (rafRef.current == null) {
        const nextTarget = clamp(targetRef.current + wheelAccum);
        wheelAccum = 0;
        smoothTo(nextTarget);
        setTimeout(() => {
          if (wheelAccum !== 0) {
            targetRef.current = clamp(targetRef.current + wheelAccum);
            wheelAccum = 0;
          }
        }, 16);
      } else {
        targetRef.current = clamp(targetRef.current + delta * 0.035);
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [n, smoothTo, selected]);

  const onDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (selected !== null) return;
      isDownRef.current = true;
      didDragRef.current = false;
      const x = (e as React.MouseEvent).clientX ?? (e as React.TouchEvent).touches?.[0]?.clientX ?? 0;
      startXRef.current = x;
      if (wrapRef.current) wrapRef.current.style.cursor = 'grabbing';
    },
    [selected],
  );

  const onMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDownRef.current || selected !== null) return;
      const x = (e as React.MouseEvent).clientX ?? (e as React.TouchEvent).touches?.[0]?.clientX ?? 0;
      if (Math.abs(x - startXRef.current) > 4) didDragRef.current = true;
      const diff = (x - startXRef.current) * -0.14;
      startXRef.current = x;
      const next = clamp(targetRef.current + diff);
      targetRef.current = next;
      progressRef.current = next;
      setProgress(next);
    },
    [selected],
  );

  const onUp = useCallback(() => {
    isDownRef.current = false;
    if (wrapRef.current) wrapRef.current.style.cursor = 'grab';
    setTimeout(() => {
      didDragRef.current = false;
    }, 0);
  }, []);

  useEffect(() => {
    const h = () => {
      isDownRef.current = false;
      if (wrapRef.current) wrapRef.current.style.cursor = 'grab';
    };
    window.addEventListener('mouseup', h);
    window.addEventListener('touchend', h);
    return () => {
      window.removeEventListener('mouseup', h);
      window.removeEventListener('touchend', h);
    };
  }, []);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const hover = hoverRef.current || selected !== null || document.activeElement === wrapRef.current;
      if (!hover) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (selected !== null) {
          setSelected((s) => {
            if (s == null) return s;
            const nxt = e.key === 'ArrowLeft' ? Math.max(0, s - 1) : Math.min(n - 1, s + 1);
            const t = (nxt / n) * 100 + 10;
            targetRef.current = clamp(t);
            progressRef.current = clamp(t);
            setProgress(clamp(t));
            return nxt;
          });
        } else {
          smoothTo(targetRef.current + (e.key === 'ArrowLeft' ? -100 / n : 100 / n));
        }
      } else if (e.key === 'Escape' && selected !== null) {
        setSelected(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, n, smoothTo]);

  const jumpTo = (i: number) => smoothTo((i / n) * 100 + 10);

  const handlePick = (i: number) => {
    if (didDragRef.current) return;
    if (selected !== null) return;
    jumpTo(i);
    // animate the fan to center, then FLIP to spotlight — no gap jump
    setTimeout(() => setSelected(i), 360);
  };

  return (
    <section id="photography" className="bg-[#FAF7F0] border-t border-[rgba(200,155,60,0.14)]">
      <div className="mx-auto max-w-[1400px] px-[4vw] py-[72px] sm:py-[90px]">
        <div className="text-center mb-8 sm:mb-10">
          <span className="font-mono text-[0.72rem] tracking-[0.14em] text-[#C89B3C]">07 / PHOTOGRAPHY</span>
          <h2 className="mt-2 font-serif text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-none tracking-tight text-[#0F1F3D]">
            THROUGH <span className="text-[#C89B3C]">MY</span> LENS
          </h2>
          <p className="mt-3 font-mono text-[0.78rem] tracking-wide text-[#756F65]">
            Capturing moments, one frame at a time — drag, scroll, arrows or tap to explore
          </p>
          <div className="mx-auto mt-5 h-[2px] w-10 bg-[#C89B3C]/60" />
        </div>

        <div
          ref={wrapRef}
          tabIndex={0}
          aria-label="Photography carousel — use arrow keys, drag or scroll"
          onMouseEnter={() => {
            hoverRef.current = true;
            wrapRef.current?.focus({ preventScroll: true });
          }}
          onMouseLeave={() => {
            hoverRef.current = false;
          }}
          onFocus={() => {
            hoverRef.current = true;
          }}
          onBlur={() => {
            hoverRef.current = false;
          }}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onTouchStart={onDown}
          onTouchMove={onMove}
          onTouchEnd={onUp}
          className="relative select-none overflow-hidden rounded-[20px] border border-[rgba(200,155,60,0.18)] bg-[#0F1F3D] shadow-[0_20px_60px_rgba(15,31,61,0.18)] outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C]/40"
          style={{ height: 'min(72vh, 640px)', minHeight: 460, cursor: selected !== null ? 'default' : 'grab', touchAction: 'pan-y' }}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden sm:flex items-center">
            <div className="ml-6 sm:ml-8 rotate-180 [writing-mode:vertical-lr] font-mono text-[0.62rem] tracking-[0.18em] text-[#F3E8D0]/45">
              CAPTURING MOMENTS — KANPUR · INDIA — THROUGH MY LENS
            </div>
          </div>
          <div className="pointer-events-none absolute left-[72px] top-0 hidden h-full w-px bg-[rgba(243,232,208,0.08)] sm:block" />
          <div className="pointer-events-none absolute right-6 top-6 hidden sm:flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(243,232,208,0.14)] bg-[rgba(243,232,208,0.06)] font-mono text-[0.68rem] text-[#F3E8D0]/70">
            S
          </div>
          <div className="pointer-events-none absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-2 sm:flex" aria-hidden>
            {photos.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${i === active ? 'bg-[#C89B3C] shadow-[0_0_8px_rgba(200,155,60,0.9)] scale-[1.4]' : selected !== null && selected === i ? 'bg-[#C89B3C]/70' : 'bg-[rgba(243,232,208,0.22)]'}`}
              />
            ))}
          </div>

          {/* fanned stack — each card shares layoutId with its spotlight so it morphs */}
          <div className={`absolute inset-0 transition-[filter] duration-500 ${selected !== null ? 'blur-[1.5px] brightness-[0.72]' : ''}`}>
            {photos.map((p, i) => {
              const zIndex = getZIndex(n, i, active);
              const activeOffset = (i - active) / n;
              const x = activeOffset * 800;
              const y = activeOffset * 200;
              const rot = activeOffset * 120;
              const cardOpacity = Math.max(0, Math.min(1, (zIndex / n) * 3 - 2));
              const isPicked = selected === i;

              return (
                <div
                  key={p.src}
                  onClick={() => handlePick(i)}
                  className={`absolute left-1/2 top-1/2 ${isPicked ? 'pointer-events-none' : 'cursor-pointer'}`}
                  style={
                    {
                      width: 'clamp(150px, 28vw, 300px)',
                      height: 'clamp(200px, 38vw, 400px)',
                      marginLeft: 'calc(clamp(150px, 28vw, 300px) * -0.5)',
                      marginTop: 'calc(clamp(200px, 38vw, 400px) * -0.5)',
                      zIndex,
                      transform: `translate(${x}%, ${y}%) rotate(${rot}deg)`,
                      transformOrigin: '0% 100%',
                      transition: isPicked ? 'transform 0.4s ease' : 'transform 0.85s cubic-bezier(0, 0.02, 0, 1)',
                    } as any
                  }
                >
                  {/* vacancy — stays behind the morphing card so gap is visible */}
                  {isPicked && (
                    <div className="absolute inset-0 rounded-xl border-2 border-dashed border-[rgba(200,155,60,0.32)] bg-[rgba(243,232,208,0.06)] flex items-center justify-center">
                      <span className="font-mono text-[0.68rem] tracking-wide text-[#F3E8D0]/35">
                        {String(i + 1).padStart(2, '0')} · {p.title}
                      </span>
                    </div>
                  )}
                  <motion.div
                    layoutId={`photo-${i}`}
                    transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.85 }}
                    className="relative h-full w-full overflow-hidden rounded-xl border shadow-[0_16px_40px_rgba(0,0,0,0.45)] border-[rgba(243,232,208,0.14)] bg-black"
                    style={{ opacity: isPicked ? 0 : cardOpacity, pointerEvents: isPicked ? 'none' : 'auto' }}
                  >
                    <img src={p.src} alt={p.alt} loading="lazy" draggable={false} className="h-full w-full object-cover" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent via-50% to-black/55" />
                    <span className="pointer-events-none absolute left-4 top-2 font-serif text-[clamp(28px,8vw,72px)] leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="pointer-events-none absolute bottom-4 left-4 font-serif text-[clamp(16px,2.5vw,26px)] tracking-wide text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                      {p.title}
                    </span>
                    <span className="pointer-events-none absolute bottom-3 right-3 hidden sm:inline-flex rounded-full border border-white/15 bg-black/30 px-2 py-0.5 font-mono text-[0.60rem] tracking-wide text-white/80 backdrop-blur">
                      {p.alt}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* spotlight — same layoutId as the picked card => true FLIP from its fanned spot */}
          <AnimatePresence>
            {selected !== null && (
              <>
                <motion.button
                  key="spot-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelected(null)}
                  className="absolute inset-0 z-20 bg-[#0F1F3D]/40 backdrop-blur-[1px]"
                  aria-label="Close spotlight — click to return"
                />
                {/* clicking the dimmed blue anywhere closes */}
                <motion.div
                  key={`spot-wrap-${selected}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelected(null)}
                  className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-6 cursor-pointer"
                  aria-hidden
                >
                  <motion.div
                    layoutId={`photo-${selected}`}
                    onClick={(e) => e.stopPropagation()}
                    transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.9 }}
                    className="relative cursor-default overflow-hidden rounded-2xl shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
                    style={{ width: 'min(88vw, 640px)' }}
                  >
                    {/* image is object-contain so full frame always visible — no black border, no thick frame */}
                    <img
                      src={photos[selected].src}
                      alt={photos[selected].alt}
                      className="block h-auto w-full max-h-[68vh] object-contain"
                      draggable={false}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                    <span className="pointer-events-none absolute left-5 top-4 font-serif text-[clamp(32px,9vw,84px)] leading-none text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.7)]">
                      {String(selected + 1).padStart(2, '0')}
                    </span>
                    <span className="pointer-events-none absolute bottom-5 left-5 font-serif text-[clamp(18px,3vw,30px)] tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                      {photos[selected].title}
                    </span>
                    <span className="pointer-events-none absolute bottom-5 right-5 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-mono text-xs tracking-wide text-white/90 backdrop-blur">
                      {photos[selected].alt}
                    </span>
                    <button
                      onClick={() => setSelected(null)}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur hover:bg-white hover:text-black transition-colors"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </motion.div>
                </motion.div>
                <motion.div
                  key={`spot-hint-${selected}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  className="pointer-events-none absolute bottom-4 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-[0.68rem] tracking-wide text-white/75 backdrop-blur"
                >
                  ← → navigate · click outside or ✕ to return
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 sm:hidden">
            {photos.map((_, i) => (
              <span key={i} className={`h-1 rounded-full transition-all ${i === active ? 'w-4 bg-[#C89B3C]' : 'w-1 bg-white/25'}`} />
            ))}
          </div>
          <div className="pointer-events-none absolute bottom-4 left-4 hidden sm:block font-mono text-[0.62rem] tracking-wide text-[#F3E8D0]/50">
            drag · scroll · arrows · tap — {selected !== null ? `${String(selected + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')} · spotlight` : `${String(active + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`}
          </div>
          <div className="pointer-events-none absolute bottom-4 right-4 hidden sm:flex items-center gap-1.5 font-mono text-[0.62rem] tracking-wide text-[#F3E8D0]/40">
            <span className="hidden lg:inline">hover frame then use ← →</span>
            <span className="inline-flex h-5 items-center rounded border border-white/15 px-1.5">←</span>
            <span className="inline-flex h-5 items-center rounded border border-white/15 px-1.5">→</span>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2 sm:hidden">
          <button
            onClick={() => (selected !== null ? setSelected((s) => Math.max(0, (s ?? 0) - 1)) : smoothTo(targetRef.current - 100 / n))}
            className="rounded-full border border-[rgba(200,155,60,0.22)] bg-white px-4 py-2 font-mono text-xs text-[#0F1F3D]"
          >
            ← Prev
          </button>
          <button
            onClick={() => (selected !== null ? setSelected((s) => Math.min(n - 1, (s ?? 0) + 1)) : smoothTo(targetRef.current + 100 / n))}
            className="rounded-full bg-[#0F1F3D] px-4 py-2 font-mono text-xs text-[#FAF7F0]"
          >
            Next →
          </button>
          {selected !== null && (
            <button onClick={() => setSelected(null)} className="rounded-full border border-[#0F1F3D] px-4 py-2 font-mono text-xs">
              Close
            </button>
          )}
        </div>

        <div className="relative mt-10 flex flex-col items-center text-center">
          <span className="font-serif text-[4.5rem] leading-none text-[#C89B3C] opacity-25 select-none">“</span>
          <p className="-mt-6 max-w-[640px] font-serif text-[clamp(1.15rem,2.2vw,1.55rem)] italic leading-[1.5] text-[#0F1F3D]">Photography is not just a hobby — it's how I see the world.</p>
          <span className="mt-3 font-mono text-[0.72rem] tracking-[0.14em] text-[#756F65]">— ADITYA DIXIT</span>
        </div>
      </div>
    </section>
  );
}
