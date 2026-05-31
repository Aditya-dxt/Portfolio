import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Tilt } from 'react-tilt';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import { useAppReady } from '@/context/LenisContext';
import { portfolio } from '@/data/portfolio';
import { LazyImage } from './LazyImage';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

function ProjectCard({ project }: { project: (typeof portfolio.projects)[number] }) {
  return (
    <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2">
      <span
        className="pointer-events-none absolute -left-2 top-1/2 hidden -translate-y-1/2 font-heading text-[8rem] font-bold text-white/[0.03] sm:block md:text-[12rem]"
        aria-hidden
      >
        {project.id}
      </span>

      <div className="relative">
        <Tilt
          className="overflow-hidden rounded-2xl glass-panel"
          options={{ max: 8, scale: 1.01, speed: 400 }}
        >
          <div className="group relative">
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
        </Tilt>
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
  const activeIndexRef = useRef(0);
  const projects = portfolio.projects;
  const total = projects.length;
  const appReady = useAppReady();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!section || !pin || !track || !appReady || isReducedMotion()) return;

      ScrollTrigger.matchMedia({
        '(min-width: 768px)': () => {
          const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

          gsap.set(track, { x: 0 });

          const tween = gsap.to(track, {
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
                const idx = Math.min(Math.floor(self.progress * total), total - 1);
                if (idx === activeIndexRef.current) return;
                activeIndexRef.current = idx;
                dotsRef.current?.querySelectorAll('[data-dot]').forEach((dot, i) => {
                  gsap.set(dot, {
                    width: i === idx ? 32 : 8,
                    backgroundColor: i === idx ? '#00D4FF' : '#4B5563',
                  });
                });
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
            tween.scrollTrigger?.kill();
            tween.kill();
            gsap.set(track, { clearProps: 'transform' });
          };
        },
      });

      gsap.from('[data-project-mobile]', {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      });
    },
    { scope: sectionRef, dependencies: [total, appReady] },
  );

  return (
    <section id="work" ref={sectionRef} className="relative bg-void py-16 sm:py-20 md:py-0">
      <div className="px-4 pb-8 pt-4 sm:px-6 md:absolute md:left-12 md:top-8 md:z-20 md:pb-0 md:pt-0">
        <h2 className="heading-display text-2xl text-white sm:text-3xl md:text-4xl">
          Selected <span className="text-gradient">Work</span>
        </h2>
      </div>

      {/* Mobile / tablet: vertical stack */}
      <div className="space-y-16 px-4 sm:space-y-20 sm:px-6 md:hidden">
        {projects.map((project) => (
          <article key={project.id} data-project-mobile className="pt-4">
            <ProjectCard project={project} />
          </article>
        ))}
      </div>

      {/* Desktop: horizontal scroll */}
      <div ref={pinRef} className="relative hidden h-screen w-full overflow-hidden md:block">
        <div
          ref={trackRef}
          className="flex h-full flex-nowrap will-change-transform"
          style={{ width: `${total * 100}vw` }}
        >
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex h-full shrink-0 items-center px-6 py-24 md:px-16"
              style={{ width: '100vw' }}
            >
              <ProjectCard project={project} />
            </article>
          ))}
        </div>

        <div ref={dotsRef} className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {projects.map((_, i) => (
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
