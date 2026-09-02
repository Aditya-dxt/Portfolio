import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

// React Bits Masonry — scroll-triggered + aspect-preserved portrait
type PhotoItem = { id: string; img: string; height: number; alt: string; title: string };

const items: PhotoItem[] = [
  { id: 'A', img: '/images/photography/A.jpeg', height: 520, alt: 'Moon night sky', title: 'A' },
  { id: 'B', img: '/images/photography/B.jpg', height: 680, alt: 'Street lamp at dusk', title: 'B' },
  { id: 'C', img: '/images/photography/C.jpeg', height: 520, alt: 'River ghat evening', title: 'C' },
  { id: 'D', img: '/images/photography/D.jpeg', height: 640, alt: 'Park street lamps at night', title: 'D' },
  { id: 'E', img: '/images/photography/E.jpeg', height: 720, alt: 'Basketball hoop under sky', title: 'E' },
  { id: 'F', img: '/images/photography/F.jpg', height: 620, alt: 'Palm street lamp night', title: 'F' },
  { id: 'G', img: '/images/photography/G.jpeg', height: 680, alt: 'Moon through branches', title: 'G' },
  { id: 'H', img: '/images/photography/H.jpeg', height: 580, alt: 'City lights reflections', title: 'H' },
  { id: 'I', img: '/images/photography/I.jpeg', height: 720, alt: 'Evening skyline', title: 'I' },
  { id: 'J', img: '/images/photography/J.jpeg', height: 620, alt: 'Street perspective', title: 'J' },
  { id: 'K', img: '/images/photography/K.jpeg', height: 700, alt: 'Night architecture', title: 'K' },
  { id: 'L', img: '/images/photography/L.jpeg', height: 640, alt: 'Golden hour capture', title: 'L' },
  { id: 'M', img: '/images/photography/M.jpeg', height: 680, alt: 'Urban frame', title: 'M' },
  { id: 'N', img: '/images/photography/N.jpeg', height: 600, alt: 'Light trails', title: 'N' },
  { id: 'O', img: '/images/photography/O.jpeg', height: 700, alt: 'Quiet night', title: 'O' },
];

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
  };
  const [value, setValue] = useState(get);
  useEffect(() => {
    const handler = () => setValue(get());
    queries.forEach((q) => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach((q) => matchMedia(q).removeEventListener('change', handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);
  return value;
};

const useMeasure = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
};

export function PhotographyEditorial() {
  const columns = useMedia(
    ['(min-width:1280px)', '(min-width:900px)', '(min-width:600px)', '(min-width:400px)'],
    [4, 4, 3, 2],
    1
  );
  const [containerRef, { width }] = useMeasure();
  const sectionRef = useRef<HTMLElement>(null);
  const [imagesReady, setImagesReady] = useState(false);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<PhotoItem | null>(null);

  // preload + capture natural aspect so vertical stays vertical
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      items.map(
        (it) =>
          new Promise<{ id: string; ratio: number }>((resolve) => {
            const img = new Image();
            img.src = it.img;
            const done = () => {
              const r = img.naturalWidth ? img.naturalHeight / img.naturalWidth : it.height / 400;
              resolve({ id: it.id, ratio: r });
            };
            img.onload = done;
            img.onerror = () => resolve({ id: it.id, ratio: it.height / 400 });
          })
      )
    ).then((arr) => {
      if (cancelled) return;
      const map: Record<string, number> = {};
      arr.forEach(({ id, ratio }) => {
        // clamp: never force landscape on a portrait source — keep at least 0.85, cap ultra-tall at 1.6
        map[id] = Math.min(1.65, Math.max(0.85, ratio));
      });
      setRatios(map);
      setImagesReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;
    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      // portrait-preserving height: use real image ratio when available, fallback to height prop
      const ratio = ratios[child.id] ?? child.height / 400;
      const h = columnWidth * ratio;
      const y = colHeights[col];
      colHeights[col] += h + 12;
      return { ...child, x, y, w: columnWidth, h };
    });
  }, [columns, width, ratios]);

  const containerHeight = useMemo(() => {
    if (!grid.length) return 480;
    return Math.max(...grid.map((g) => g.y + g.h));
  }, [grid]);

  // Lenis-aware ScrollTrigger refresh when grid settles
  useEffect(() => {
    if (!grid.length || !imagesReady) return;
    const t = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(t);
  }, [grid, imagesReady]);

  // GSAP: heading + masonry scroll-linked reveal
  useLayoutEffect(() => {
    if (!sectionRef.current || !grid.length || !imagesReady) return;
    const ctx = gsap.context(() => {
      // heading parallax + fade on scroll
      gsap.fromTo(
        '[data-photo-head]',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            end: 'top 62%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(
        '[data-photo-sub]',
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // position wrappers instantly (no tween) — then animate inner cards on scroll
      grid.forEach((item) => {
        gsap.set(`[data-key="${item.id}"]`, { x: item.x, y: item.y, width: item.w, height: item.h });
      });

      // stagger the card inners as you scroll down — each batch reveals when it hits 92% viewport
      // using ScrollTrigger.batch for true "slowly comes as you scroll"
      ScrollTrigger.batch('[data-masonry-card]', {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 48, opacity: 0, filter: 'blur(6px)', scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              scale: 1,
              duration: 0.85,
              ease: 'power3.out',
              stagger: 0.07,
              overwrite: 'auto',
            }
          ),
        onLeaveBack: (batch) =>
          gsap.to(batch, { y: 18, opacity: 0.0, duration: 0.25, overwrite: 'auto' }),
        start: 'top 92%',
        end: 'bottom 10%',
      });

      // initial state for cards not yet batched (below fold) — keep hidden until trigger
      gsap.set('[data-masonry-card]', { y: 48, opacity: 0, filter: 'blur(6px)' });
      // trigger a refresh so batch attaches correctly
      ScrollTrigger.refresh();
    }, sectionRef);
    return () => ctx.revert();
    // grid is dependency for positions; ratios/imagesReady gate the reveal
  }, [grid, imagesReady]);

  // keep layout in sync on resize without re-animating invisibly
  useLayoutEffect(() => {
    if (!grid.length) return;
    grid.forEach((item) => {
      gsap.to(`[data-key="${item.id}"]`, {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    });
  }, [grid]);

  return (
    <section ref={sectionRef} id="photography" className="bg-[#FAF7F0] border-t border-[rgba(200,155,60,0.14)]">
      <div className="mx-auto max-w-[1400px] px-[4vw] py-[72px] sm:py-[90px]">
        <div className="text-center mb-8 sm:mb-10">
          <span data-photo-head className="font-mono text-[0.72rem] tracking-[0.14em] text-[#C89B3C] inline-block">
            07 / PHOTOGRAPHY
          </span>
          <h2 data-photo-head className="mt-2 font-serif text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-none tracking-tight text-[#0F1F3D]">
            THROUGH <span className="text-[#C89B3C]">MY</span> LENS
          </h2>
          <p data-photo-sub className="mt-3 font-mono text-[0.78rem] tracking-wide text-[#756F65]">
            A masonry of moments — each frame finds its place, just like memory
          </p>
          <div className="mx-auto mt-5 h-[2px] w-10 bg-[#C89B3C]/60" />
        </div>

        <div
          ref={containerRef}
          className="relative w-full rounded-[20px] border border-[rgba(200,155,60,0.14)] bg-white/60 shadow-[0_16px_48px_rgba(15,31,61,0.08)] overflow-hidden p-2 sm:p-3"
          style={{ height: containerHeight }}
        >
          {!imagesReady && (
            <div className="absolute inset-0 grid place-items-center font-mono text-xs tracking-wide text-[#756F65]">
              Loading frames…
            </div>
          )}
          {grid.map((item) => (
            <div
              key={item.id}
              data-key={item.id}
              className="absolute top-0 left-0 p-[6px] will-change-transform"
              style={{ width: item.w, height: item.h }}
            >
              <div
                data-masonry-card
                className="group relative h-full w-full overflow-hidden rounded-xl border border-[rgba(200,155,60,0.12)] bg-[#0F1F3D] shadow-[0_8px_24px_rgba(15,31,61,0.12)] cursor-pointer will-change-transform transition-[border-color,box-shadow] duration-300 hover:border-[rgba(200,155,60,0.28)] hover:shadow-[0_14px_36px_rgba(15,31,61,0.18)]"
                onClick={() => setSelected(item)}
                onKeyDown={(e) => e.key === 'Enter' && setSelected(item)}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.title}: ${item.alt}`}
              >
                {/* true <img> with object-cover — preserves portrait, allows slight crop but never landscape-forces portrait source */}
                <img
                  src={item.img}
                  alt={item.alt}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/45 opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="pointer-events-none absolute left-3 top-2 font-serif text-[clamp(18px,3vw,26px)] leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {item.id}
                </span>
                <span className="pointer-events-none absolute bottom-2 left-3 right-3 font-mono text-[0.58rem] tracking-wide text-white/88 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] line-clamp-1">
                  {item.alt}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center font-mono text-[0.68rem] tracking-wide text-[#756F65]/80">
          Scroll slowly — frames rise as they enter view · {items.length} frames A–O
        </p>

        <div className="relative mt-10 flex flex-col items-center text-center">
          <span className="font-serif text-[4.5rem] leading-none text-[#C89B3C] opacity-25 select-none">“</span>
          <p className="-mt-6 max-w-[640px] font-serif text-[clamp(1.15rem,2.2vw,1.55rem)] italic leading-[1.5] text-[#0F1F3D]">
            Photography is not just a hobby — it&apos;s how I see the world.
          </p>
          <span className="mt-3 font-mono text-[0.72rem] tracking-[0.14em] text-[#756F65]">— ADITYA DIXIT</span>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-[#0F1F3D]/70 backdrop-blur-[2px]"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title}: ${selected.alt}`}
        >
          <div
            className="relative max-h-[86vh] w-full max-w-[720px] overflow-hidden rounded-2xl bg-black shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selected.img} alt={selected.alt} className="block h-auto max-h-[72vh] w-full object-contain" draggable={false} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-5 py-4">
              <span className="font-serif text-2xl text-white">{selected.id}</span>
              <span className="ml-3 font-mono text-xs tracking-wide text-white/80">{selected.alt}</span>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur hover:bg-white hover:text-black transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
