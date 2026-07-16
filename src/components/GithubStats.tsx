import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import { portfolio } from '@/data/portfolio';
import { SectionHeader } from './SectionHeader';

const STATS = [
  { key: 'commits', label: 'Total Commits' },
  { key: 'stars', label: 'Stars' },
  { key: 'prs', label: 'Pull Requests' },
  { key: 'repos', label: 'Repositories' },
] as const;

function generateHeatmap(): number[] {
  const cells: number[] = [];
  for (let i = 0; i < 52 * 7; i++) {
    cells.push(Math.floor(Math.random() * 5));
  }
  return cells;
}

const heatmap = generateHeatmap();

export function GithubStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { githubStats } = portfolio;

  useGSAP(
    () => {
      if (!sectionRef.current || isReducedMotion()) return;

      STATS.forEach((stat) => {
        const el = sectionRef.current?.querySelector(`[data-stat="${stat.key}"]`);
        const target = githubStats[stat.key];
        const proxy = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          markers: false,
          onEnter: () => {
            gsap.to(proxy, {
              val: target,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                if (el) el.textContent = String(Math.round(proxy.val));
              },
            });
          },
          once: true,
        });
      });

      const cells = gridRef.current?.querySelectorAll('[data-cell]');
      if (cells) {
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 80%',
          markers: false,
          onEnter: () => {
            gsap.fromTo(
              cells,
              { opacity: 0, scale: 0.5 },
              {
                opacity: 1,
                scale: 1,
                stagger: { amount: 1.2, grid: [7, 52], from: 'start', axis: 'x' },
                duration: 0.3,
                ease: 'power2.out',
              },
            );
          },
          once: true,
        });
      }
    },
    { scope: sectionRef },
  );

  const levelColors = [
    'rgba(255,255,255,0.05)',
    'rgba(0,212,255,0.25)',
    'rgba(0,212,255,0.45)',
    'rgba(0,212,255,0.65)',
    'rgba(0,212,255,0.95)',
  ];

  return (
    <section ref={sectionRef} className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader number="05" title="GITHUB" />

        <div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.key} className="glass-panel rounded-2xl p-6 text-center">
              <span
                data-stat={stat.key}
                className="block font-heading text-4xl text-accent"
              >
                0
              </span>
              <span className="mt-2 block font-body text-sm text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div ref={gridRef} className="glass-panel overflow-x-auto rounded-2xl p-6 lg:col-span-2">
            <p className="mb-4 font-body text-xs uppercase tracking-widest text-gray-500">
              Contribution activity
            </p>
            <div
              className="grid gap-1"
              style={{ gridTemplateColumns: 'repeat(52, minmax(0, 1fr))' }}
            >
              {heatmap.map((level, i) => (
                <div
                  key={i}
                  data-cell
                  className="aspect-square w-full min-w-[8px] rounded-sm will-change-transform"
                  style={{ backgroundColor: levelColors[level] }}
                />
              ))}
            </div>
          </div>

          <div className="glass-panel flex flex-col items-center rounded-2xl p-8 text-center">
            <img
              src={githubStats.avatar}
              alt={githubStats.username}
              className="mb-4 h-24 w-24 rounded-full border-2 border-accent/50"
              loading="lazy"
            />
            <a
              href={portfolio.github}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="font-heading text-xl text-accent hover:underline"
            >
              @{githubStats.username}
            </a>
            <p className="mt-4 font-body text-sm text-gray-400">{githubStats.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
