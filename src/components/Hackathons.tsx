import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { useAppReady } from '@/context/LenisContext';
import { isTouchDevice } from '@/lib/device';
import { useExpandableList } from '@/hooks/useExpandableList';
import { portfolio } from '@/data/portfolio';
import { LazyImage } from './LazyImage';
import { ExploreMoreCard } from './ExploreMoreCard';
import { FaTrophy, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

function HackathonCard({
  hack,
  index,
}: {
  hack: (typeof portfolio.hackathons)[number];
  index: number;
}) {
  return (
    <article
      data-hack-card
      className="glass-panel group grid grid-cols-1 overflow-hidden rounded-2xl border-white/10 transition-colors hover:border-accent/25 md:grid-cols-[minmax(0,280px)_1fr]"
    >
      <div className="relative aspect-video overflow-hidden md:aspect-auto md:min-h-[200px]">
        <LazyImage
          src={hack.image}
          alt={hack.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void/60 to-transparent md:bg-gradient-to-t" />
        {hack.result && (
          <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 font-mono text-[10px] uppercase text-accent">
            <FaTrophy size={10} />
            {hack.result}
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-8">
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] text-gray-500">
          <span className="text-accent">0{index + 1}</span>
          <span>·</span>
          <span>{hack.role}</span>
        </div>
        <h4 className="font-heading text-xl text-white sm:text-2xl">{hack.name}</h4>
        <p className="mt-1 font-body text-sm text-gray-400">{hack.organizer}</p>

        <div className="mt-3 flex flex-wrap gap-4 font-body text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-accent" size={11} />
            {hack.venue}
          </span>
          <span className="flex items-center gap-1.5">
            <FaCalendarAlt className="text-purple" size={11} />
            {hack.date}
          </span>
        </div>

        <p className="mt-4 font-body text-sm leading-relaxed text-gray-300">{hack.description}</p>

        {hack.projectName && (
          <p className="mt-2 font-mono text-xs text-accent">Project: {hack.projectName}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {hack.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-body text-[10px] text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function Hackathons() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const appReady = useAppReady();
  const touch = isTouchDevice();
  const hackathons = portfolio.hackathons;
  const { visibleItems, hasMore, hiddenCount, expand, expanded } = useExpandableList(
    hackathons,
    3,
  );

  useGSAP(
    () => {
      if (!sectionRef.current || !appReady || isReducedMotion()) return;

      gsap.from('[data-hack-card], [data-explore-card]', {
        x: touch ? 0 : -40,
        y: touch ? 20 : 0,
        opacity: 0,
        stagger: touch ? 0.05 : 0.12,
        duration: touch ? 0.45 : 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      });
    },
    { scope: sectionRef, dependencies: [appReady, expanded, touch] },
  );

  return (
    <div id="hackathons" ref={sectionRef}>
      <div className="mb-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-accent sm:text-xs">
          Competitions
        </p>
        <h3 className="heading-display mt-2 text-2xl text-white sm:text-3xl">
          Hackathon <span className="text-gradient">Journey</span>
        </h3>
        <p className="mx-auto mt-2 max-w-xl font-body text-sm text-gray-400">
          Leading teams across national-level hackathons — building under pressure, shipping
          with impact.
        </p>
      </div>

      <div className="space-y-6">
        {visibleItems.map((hack, i) => (
          <HackathonCard key={hack.id} hack={hack} index={i} />
        ))}
        {hasMore && !expanded && (
          <div data-explore-card>
            <ExploreMoreCard hiddenCount={hiddenCount} onClick={expand} accent="cyan" />
          </div>
        )}
      </div>
    </div>
  );
}
