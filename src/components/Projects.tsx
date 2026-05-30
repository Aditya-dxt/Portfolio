import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Tilt } from 'react-tilt';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { useScrollRefresh } from '@/context/LenisContext';
import { portfolio } from '@/data/portfolio';
import { LazyImage } from './LazyImage';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const projects = portfolio.projects;

  useScrollRefresh();

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current || isReducedMotion()) return;

      const total = projects.length;
      const track = trackRef.current;
      const scrollDistance = Math.max(
        track.scrollWidth - window.innerWidth,
        window.innerWidth * (total - 1),
      );

      const updateDots = (idx: number) => {
        if (idx === activeIndexRef.current) return;
        activeIndexRef.current = idx;
        const dots = dotsRef.current?.querySelectorAll('[data-dot]');
        dots?.forEach((dot, i) => {
          gsap.set(dot, {
            width: i === idx ? 32 : 8,
            backgroundColor: i === idx ? '#00D4FF' : '#4B5563',
          });
        });
      };

      gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 0.25,
          anticipatePin: 1,
          fastScrollEnd: true,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          onUpdate: (self) => {
            const idx = Math.min(Math.floor(self.progress * total), total - 1);
            updateDots(idx);
          },
        },
      });

      const onResize = () => {
        const dist = track.scrollWidth - window.innerWidth;
        gsap.set(track, { x: -dist * (activeIndexRef.current / (total - 1 || 1)) });
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    },
    { scope: sectionRef, dependencies: [projects.length] },
  );

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden bg-void">
      <div className="absolute left-6 top-8 z-20 md:left-12">
        <h2 className="heading-display text-3xl text-white md:text-4xl">
          Selected <span className="text-gradient">Work</span>
        </h2>
      </div>

      <div ref={trackRef} className="flex h-screen will-change-transform">
        {projects.map((project) => (
          <div
            key={project.id}
            data-panel
            className="flex h-screen w-screen shrink-0 items-center px-6 py-24 md:px-16"
          >
            <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <span
                className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 font-heading text-[12rem] font-bold text-white/[0.03] md:text-[16rem]"
                aria-hidden
              >
                {project.id}
              </span>

              <div data-panel-img className="relative will-change-transform">
                <Tilt
                  className="overflow-hidden rounded-2xl glass-panel"
                  options={{ max: 12, scale: 1.02, speed: 400 }}
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
                      <span className="rounded-full bg-accent px-6 py-2 text-sm font-medium text-void">
                        View Project
                      </span>
                    </a>
                  </div>
                </Tilt>
              </div>

              <div data-panel-text className="will-change-transform">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="glass-panel rounded-full px-3 py-1 font-body text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="heading-display mb-4 text-3xl text-white md:text-4xl">
                  {project.name}
                </h3>
                <p className="mb-8 font-body text-gray-400">{project.description}</p>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hover
                    className="flex items-center gap-2 text-gray-300 transition-colors hover:text-accent"
                  >
                    <FaGithub size={20} />
                    <span className="text-sm">Source</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hover
                    className="flex items-center gap-2 text-gray-300 transition-colors hover:text-accent"
                  >
                    <FaExternalLinkAlt size={16} />
                    <span className="text-sm">Live</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
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
    </section>
  );
}
