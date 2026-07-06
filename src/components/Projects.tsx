import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import { useAppReady } from '@/context/LenisContext';
import { isTouchDevice } from '@/lib/device';
import { useExpandableList } from '@/hooks/useExpandableList';
import { portfolio } from '@/data/portfolio';
import { LazyImage } from './LazyImage';
import { ExploreMoreCard } from './ExploreMoreCard';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const DESKTOP_INITIAL = 4;

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
  const desktopList = useExpandableList(projects, DESKTOP_INITIAL);

  // When expanded, show all projects; otherwise show initial + 1 explore card
  const desktopPanelCount = desktopList.expanded
    ? projects.length
    : DESKTOP_INITIAL + 1;

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
                Math.floor(self.progress * desktopPanelCount),
                desktopPanelCount - 1,
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
    { scope: sectionRef, dependencies: [projects.length, appReady, touch, desktopPanelCount] },
  );

  // Refresh ScrollTrigger when the track expands after clicking "Explore More"
  useEffect(() => {
    if (!desktopList.expanded || touch || !appReady) return;

    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);

      // Animate the newly revealed project panels
      const revealedPanels = trackRef.current?.querySelectorAll('[data-project-extra]');
      if (revealedPanels?.length) {
        gsap.fromTo(
          revealedPanels,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out', stagger: 0.1 },
        );
      }
    });
  }, [desktopList.expanded, touch, appReady]);

  const hiddenProjects = projects.slice(DESKTOP_INITIAL);

  return (
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

      {/* Desktop: horizontal scroll panels */}
      <div ref={pinRef} className="relative hidden h-screen w-full overflow-hidden md:block">
        <div
          ref={trackRef}
          className="flex h-full flex-nowrap will-change-transform"
          style={{ width: `${desktopPanelCount * 100}vw` }}
        >
          {/* First N (DESKTOP_INITIAL) projects — always visible */}
          {projects.slice(0, DESKTOP_INITIAL).map((project) => (
            <article
              key={project.id}
              className="flex h-full shrink-0 items-center px-6 py-24 md:px-16"
              style={{ width: '100vw' }}
            >
              <ProjectCard project={project} enableTilt />
            </article>
          ))}

          {/* Last panel: either ExploreMoreCard or the remaining projects */}
          {desktopList.expanded ? (
            // Show ALL remaining projects as separate panels
            hiddenProjects.map((project) => (
              <article
                key={project.id}
                data-project-extra
                className="flex h-full shrink-0 items-center px-6 py-24 md:px-16"
                style={{ width: '100vw' }}
              >
                <ProjectCard project={project} enableTilt />
              </article>
            ))
          ) : (
            // Show the ExploreMoreCard as a single panel
            <article
              className="flex h-full shrink-0 items-center px-6 py-24 md:px-16"
              style={{ width: '100vw' }}
            >
              <div className="relative mx-auto w-full max-w-6xl">
                <div className="mx-auto max-w-md px-4">
                  <ExploreMoreCard
                    hiddenCount={desktopList.hiddenCount}
                    onClick={desktopList.expand}
                  />
                </div>
              </div>
            </article>
          )}
        </div>

        <div ref={dotsRef} className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {Array.from({ length: desktopPanelCount }).map((_, i) => (
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
  );
}
