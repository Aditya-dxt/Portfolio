import { useRef, useState, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { useAppReady } from '@/context/LenisContext';
import { isTouchDevice } from '@/lib/device';
import { useExpandableList } from '@/hooks/useExpandableList';
import { portfolio } from '@/data/portfolio';
import { LazyImage } from './LazyImage';
import { ExploreMoreCard } from './ExploreMoreCard';
import { FaTimes, FaExpand, FaCamera } from 'react-icons/fa';

/** First 7 slots are photos; slot 8 is always "Explore more" when there are more images */
const PHOTO_SLOTS_VISIBLE = 7;

const gridSpans = [
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
];

export function Photography() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { title, subtitle, quote } = portfolio.photography;
  const touch = isTouchDevice();

  const allImages = useMemo(
    () =>
      __PHOTOGRAPHY_IMAGES__.map((src, index) => ({
        id: `photo-${index + 1}`,
        src,
        alt: `Photography ${index + 1}`,
        globalIndex: index,
      })),
    [],
  );

  const photoList = useExpandableList(allImages, PHOTO_SLOTS_VISIBLE);
  const appReady = useAppReady();

  useGSAP(
    () => {
      if (!sectionRef.current || !appReady || isReducedMotion()) return;

      gsap.from('[data-photo-tile]', {
        scale: touch ? 1 : 0.9,
        opacity: 0,
        y: touch ? 16 : 0,
        stagger: touch ? 0.04 : 0.06,
        duration: touch ? 0.45 : 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      if (quoteRef.current) {
        gsap.from(quoteRef.current, {
          y: 20,
          opacity: 0,
          duration: touch ? 0.5 : 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 90%',
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [allImages.length, appReady, touch] },
  );

  useGSAP(
    () => {
      if (!photoList.expanded || isReducedMotion()) return;
      gsap.from('[data-photo-reveal]', {
        opacity: 0,
        scale: 0.92,
        y: 20,
        stagger: 0.05,
        duration: 0.55,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      });
    },
    { scope: sectionRef, dependencies: [photoList.expanded] },
  );

  const showExploreSlot = photoList.hasMore && !photoList.expanded;

  return (
    <section
      id="photography"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/5 py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 20% 30%, rgba(123,47,190,0.12), transparent), radial-gradient(ellipse 40% 50% at 80% 70%, rgba(0,212,255,0.1), transparent)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="heading-display text-center text-3xl text-white sm:text-4xl md:text-5xl">
          {title.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-gradient">{title.split(' ').slice(-1)}</span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center font-body text-sm text-gray-400 sm:text-base">
          {subtitle}
        </p>

        {allImages.length > 0 ? (
          <div className="mt-12 grid auto-rows-[130px] grid-cols-2 gap-2 sm:auto-rows-[180px] sm:gap-3 md:auto-rows-[200px] md:gap-4 md:grid-cols-4">
            {photoList.visibleItems.map((img, index) => (
              <motion.button
                key={img.id}
                type="button"
                data-photo-tile
                data-hover
                className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 ${gridSpans[index] ?? 'col-span-1 row-span-1'}`}
                whileHover={touch ? undefined : { scale: 0.98 }}
                onClick={() => setLightbox(img.globalIndex)}
              >
                <LazyImage
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 md:duration-700 md:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-void/0 md:transition-colors md:group-hover:bg-void/25" />
                <div className="absolute inset-0 hidden items-center justify-center opacity-0 md:flex md:group-hover:opacity-100">
                  <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-body text-sm text-white backdrop-blur-sm">
                    <FaExpand size={12} /> View
                  </span>
                </div>
              </motion.button>
            ))}

            {showExploreSlot && (
              <div data-photo-tile className={gridSpans[PHOTO_SLOTS_VISIBLE]}>
                <ExploreMoreCard
                  hiddenCount={photoList.hiddenCount}
                  onClick={photoList.expand}
                  className="min-h-[130px] sm:min-h-[180px] md:min-h-[200px]"
                />
              </div>
            )}

            <AnimatePresence>
              {photoList.expanded &&
                allImages.slice(PHOTO_SLOTS_VISIBLE).map((img, i) => (
                  <motion.button
                    key={img.id}
                    type="button"
                    data-photo-reveal
                    data-hover
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 ${gridSpans[PHOTO_SLOTS_VISIBLE + 1 + i] ?? 'col-span-1 row-span-1'}`}
                    onClick={() => setLightbox(img.globalIndex)}
                  >
                    <LazyImage
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover"
                    />
                  </motion.button>
                ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="mt-12 flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 text-center">
            <FaCamera className="mb-4 text-4xl text-accent/40" />
            <p className="font-body text-gray-400">
              Add your photos to{' '}
              <code className="text-accent">public/images/photography/</code>
            </p>
            <p className="mt-2 font-mono text-xs text-gray-500">
              Supports .jpg, .png, .webp — then restart the dev server
            </p>
          </div>
        )}

        <blockquote
          ref={quoteRef}
          className="relative mx-auto mt-16 max-w-3xl text-center sm:mt-20"
        >
          <span
            className="pointer-events-none absolute -left-2 -top-4 font-heading text-6xl text-accent/20 sm:-left-6"
            aria-hidden
          >
            &ldquo;
          </span>
          <p className="font-body text-lg italic leading-relaxed text-gray-200 sm:text-xl md:text-2xl">
            {quote.text}
          </p>
          <footer className="mt-4 font-mono text-xs uppercase tracking-widest text-accent">
            — {quote.author}
          </footer>
        </blockquote>
      </div>

      <AnimatePresence>
        {lightbox !== null && allImages[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10001] flex items-center justify-center bg-void/95 p-4 backdrop-blur-xl sm:p-12"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              data-hover
              className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <FaTimes size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl border border-accent/30"
              onClick={(e) => e.stopPropagation()}
            >
              <LazyImage
                src={allImages[lightbox].src}
                alt={allImages[lightbox].alt}
                sharp
                className="max-h-[85vh] w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
