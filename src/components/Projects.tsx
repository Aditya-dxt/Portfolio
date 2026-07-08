import { useRef, useState, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import { useAppReady, useLenisInstance } from '@/context/LenisContext';
import { isTouchDevice } from '@/lib/device';
import { useExpandableList } from '@/hooks/useExpandableList';
import { portfolio } from '@/data/portfolio';
import { LazyImage } from './LazyImage';
import { ExploreMoreCard } from './ExploreMoreCard';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

const DESKTOP_INITIAL = 4;
const PANEL_COUNT = 5;

function ProjectCard({
  project,
  enableTilt,
}: {
  project: (typeof portfolio.projects)[number];
  enableTilt: boolean;
}) {
  const imageBlock = (
    <div className="group relative overflow-hidden rounded-2xl glass-panel">
      <LazyImage
        src={project.image}
        alt={project.name}
        className="aspect-video w-full object-cover"
      />
      <a
        href={project.live}
        data-hover
        className="absolute inset-0 flex items-center justify-center bg-accent/0 opacity-0 transition-all group-hover:bg-accent/20 group-hover:opacity-100"
      >
        <span className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-void">
          View Project
        </span>
      </a>
    </div>
  );

  return (
    <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2">
      <span
        className="pointer-events-none absolute -left-2 top-1/2 hidden -translate-y-1/2 font-heading text-[8rem] font-bold text-white/[0.03] sm:block md:text-[12rem]"
        aria-hidden
      >
        {project.id}
      </span>

      <div className="relative">
        {enableTilt ? (
          <Tilt
            className="overflow-hidden rounded-2xl"
            options={{ max: 8, scale: 1.01, speed: 400 }}
          >
            {imageBlock}
          </Tilt>
        ) : (
          imageBlock
        )}
      </div>

      <div>
        <div className="mb-3 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="glass-panel rounded-full px-2.5 py-0.5 font-body text-[10px] text-gray-300 sm:px-3 sm:py-1 sm:text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
        <h3 className="heading-display mb-3 text-2xl text-white sm:mb-4 sm:text-3xl md:text-4xl">
          {project.name}
        </h3>
        <p className="mb-6 font-body text-sm text-gray-400 sm:mb-8 sm:text-base">
          {project.description}
        </p>
        <div className="flex gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="flex items-center gap-2 text-gray-300 transition-colors hover:text-accent"
          >
            <FaGithub size={18} />
            <span className="text-sm">Source</span>
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="flex items-center gap-2 text-gray-300 transition-colors hover:text-accent"
          >
            <FaExternalLinkAlt size={14} />
            <span className="text-sm">Live</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Grid card for the overlay view ─── */
function ProjectGridCard({ project }: { project: (typeof portfolio.projects)[number] }) {
  return (
    <div className="group glass-panel overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,212,255,0.12)]">
      <div className="relative overflow-hidden">
        <LazyImage
          src={project.image}
          alt={project.name}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-accent/10 px-2.5 py-0.5 font-body text-[10px] text-accent"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="rounded-full bg-white/5 px-2.5 py-0.5 font-body text-[10px] text-gray-500">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
        <h3 className="font-heading text-lg font-semibold text-white">{project.name}</h3>
        <p className="mt-2 line-clamp-2 font-body text-xs leading-relaxed text-gray-400">
          {project.description}
        </p>
        <div className="mt-4 flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="flex items-center gap-1.5 text-xs text-gray-400 transition-colors hover:text-accent"
          >
            <FaGithub size={14} />
            Source
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="flex items-center gap-1.5 text-xs text-gray-400 transition-colors hover:text-accent"
          >
            <FaExternalLinkAlt size={12} />
            Live
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Full-screen projects overlay ─── */
function ProjectsOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const projects = portfolio.projects;
  const lenis = useLenisInstance();

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Stop Lenis + lock body scroll when overlay is open so native scroll works
  useEffect(() => {
    if (!isOpen) return;
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = '';
    };
  }, [isOpen, lenis]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col overflow-y-auto bg-void/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between bg-void/80 px-6 py-5 backdrop-blur-sm sm:px-10">
            <h2 className="heading-display text-xl text-white sm:text-2xl">
              All <span className="text-gradient">Projects</span>
            </h2>
            <button
              type="button"
              onClick={onClose}
              data-hover
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-accent/40 hover:text-accent"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* Grid */}
          <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-4 sm:px-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ProjectGridCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const activeIndexRef = useRef(0);
  const projects = portfolio.projects;
  const appReady = useAppReady();
  const touch = isTouchDevice();

  const mobileList = useExpandableList(projects, DESKTOP_INITIAL);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const openOverlay = useCallback(() => setOverlayOpen(true), []);
  const closeOverlay = useCallback(() => setOverlayOpen(false), []);

  const updateDots = (idx: number) => {
    if (idx === activeIndexRef.current) return;
    activeIndexRef.current = idx;
    dotsRef.current?.querySelectorAll('[data-dot]').forEach((dot, i) => {
      gsap.set(dot, {
        width: i === idx ? 32 : 8,
        backgroundColor: i === idx ? '#00D4FF' : '#4B5563',
      });
    });
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!section || !appReady || isReducedMotion()) return;

      if (!touch && pin && track) {
        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        gsap.set(track, { x: 0 });

        scrollTweenRef.current = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${getDistance() || window.innerWidth}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.25,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                Math.floor(self.progress * PANEL_COUNT),
                PANEL_COUNT - 1,
              );
              updateDots(idx);
            },
          },
        });

        const refresh = () => ScrollTrigger.refresh(true);
        const t1 = window.setTimeout(refresh, 200);
        track.querySelectorAll('img').forEach((img) => {
          if (!img.complete) img.addEventListener('load', refresh, { once: true });
        });

        return () => {
          window.clearTimeout(t1);
          scrollTweenRef.current?.scrollTrigger?.kill();
          scrollTweenRef.current?.kill();
          scrollTweenRef.current = null;
          gsap.set(track, { clearProps: 'transform' });
        };
      }

      gsap.from('[data-project-item]', {
        y: touch ? 20 : 40,
        opacity: 0,
        stagger: touch ? 0.06 : 0.12,
        duration: touch ? 0.5 : 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 85%' },
      });
    },
    { scope: sectionRef, dependencies: [projects.length, appReady, touch] },
  );

  return (
    <>
      <section id="work" ref={sectionRef} className="relative bg-void py-16 sm:py-20 md:py-0">
        <div className="px-4 pb-8 pt-4 sm:px-6 md:absolute md:left-12 md:top-8 md:z-20 md:pb-0 md:pt-0">
          <h2 className="heading-display text-2xl text-white sm:text-3xl md:text-4xl">
            Selected <span className="text-gradient">Work</span>
          </h2>
        </div>

        {/* Mobile */}
        <div className="space-y-12 px-4 sm:space-y-16 sm:px-6 md:hidden">
          {projects.map((project, index) => {
            if (index >= DESKTOP_INITIAL && !mobileList.expanded) return null;
            const isReveal = index >= DESKTOP_INITIAL && mobileList.expanded;
            return (
              <motion.article
                key={project.id}
                data-project-item
                initial={isReveal ? { opacity: 0, y: 28 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="pt-2"
              >
                <ProjectCard project={project} enableTilt={false} />
              </motion.article>
            );
          })}
          {mobileList.hasMore && !mobileList.expanded && (
            <div data-project-item>
              <ExploreMoreCard
                hiddenCount={mobileList.hiddenCount}
                onClick={mobileList.expand}
              />
            </div>
          )}
        </div>

        {/* Desktop: fixed 5 panels — 5th is always the ExploreMoreCard */}
        <div ref={pinRef} className="relative hidden h-screen w-full overflow-hidden md:block">
          <div
            ref={trackRef}
            className="flex h-full flex-nowrap will-change-transform"
            style={{ width: `${PANEL_COUNT * 100}vw` }}
          >
            {projects.slice(0, DESKTOP_INITIAL).map((project) => (
              <article
                key={project.id}
                className="flex h-full shrink-0 items-center px-6 py-24 md:px-16"
                style={{ width: '100vw' }}
              >
                <ProjectCard project={project} enableTilt />
              </article>
            ))}

            {/* 5th panel: Explore More card → opens overlay */}
            <article
              className="flex h-full shrink-0 items-center px-6 py-24 md:px-16"
              style={{ width: '100vw' }}
            >
              <div className="relative mx-auto w-full max-w-6xl">
                <div className="mx-auto max-w-md px-4">
                  <ExploreMoreCard
                    hiddenCount={projects.length - DESKTOP_INITIAL}
                    onClick={openOverlay}
                  />
                </div>
              </div>
            </article>
          </div>

          <div ref={dotsRef} className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {Array.from({ length: PANEL_COUNT }).map((_, i) => (
              <span
                key={i}
                data-dot
                aria-hidden
                className="block h-2 rounded-full will-change-transform"
                style={{
                  width: i === 0 ? 32 : 8,
                  backgroundColor: i === 0 ? '#00D4FF' : '#4B5563',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Full-screen overlay with all projects in a grid */}
      <ProjectsOverlay isOpen={overlayOpen} onClose={closeOverlay} />
    </>
  );
}
