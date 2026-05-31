import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaAws,
  FaReact,
  FaGoogle,
  FaCertificate,
  FaBriefcase,
  FaBrain,
  FaTrophy,
} from 'react-icons/fa';
import { SiCisco } from 'react-icons/si';
import { isReducedMotion } from '@/lib/gsap';
import { useLightExperience } from '@/lib/device';
import { useExpandableList } from '@/hooks/useExpandableList';
import { LazyImage } from './LazyImage';
import { ExploreMoreCard } from './ExploreMoreCard';
import type { portfolio } from '@/data/portfolio';

type SchoolCert = (typeof portfolio)['schoolCertificates'][number];
type SkillCert = (typeof portfolio)['skillCertificates'][number];

type PreviewState = { image: string; title: string; subtitle?: string } | null;

const INITIAL_VISIBLE = 5;

const categoryIcons = {
  cloud: { Icon: FaAws, color: 'text-sky-400', bg: 'bg-sky-400/15', ring: 'ring-sky-400/20' },
  networking: {
    Icon: SiCisco,
    color: 'text-orange-400',
    bg: 'bg-orange-400/15',
    ring: 'ring-orange-400/20',
  },
  webdev: { Icon: FaReact, color: 'text-blue-400', bg: 'bg-blue-400/15', ring: 'ring-blue-400/20' },
  ai: { Icon: FaBrain, color: 'text-purple-400', bg: 'bg-purple-400/15', ring: 'ring-purple-400/20' },
  career: {
    Icon: FaBriefcase,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/15',
    ring: 'ring-emerald-400/20',
  },
  analytics: {
    Icon: FaGoogle,
    color: 'text-amber-400',
    bg: 'bg-amber-400/15',
    ring: 'ring-amber-400/20',
  },
} as const;

function getCategoryStyle(category: string) {
  return (
    categoryIcons[category as keyof typeof categoryIcons] ?? {
      Icon: FaCertificate,
      color: 'text-gray-400',
      bg: 'bg-gray-400/15',
      ring: 'ring-gray-400/20',
    }
  );
}

interface CertificateGalleryProps {
  id: string;
  title: string;
  subtitle: string;
  variant: 'school' | 'skill';
  schoolItems?: SchoolCert[];
  skillItems?: SkillCert[];
  accent?: 'purple' | 'cyan';
}

function CertPreview({ preview }: { preview: PreviewState }) {
  return (
    <AnimatePresence>
      {preview && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed bottom-6 right-4 z-[9990] w-[min(88vw,20rem)] overflow-hidden rounded-xl border border-accent/30 bg-void/95 shadow-2xl shadow-accent/10 backdrop-blur-md sm:bottom-8 sm:right-8 sm:w-80"
        >
          <LazyImage
            src={preview.image}
            alt=""
            sharp
            className="aspect-[4/3] w-full object-contain bg-black/40"
          />
          <div className="border-t border-white/10 p-3">
            <p className="font-body text-xs leading-snug text-white">{preview.title}</p>
            {preview.subtitle && (
              <p className="mt-1 font-mono text-[10px] text-accent">{preview.subtitle}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SchoolCard({
  item,
  accent,
  onHover,
  onLeave,
}: {
  item: SchoolCert;
  accent: 'purple' | 'cyan';
  onHover: () => void;
  onLeave: () => void;
}) {
  const ring = accent === 'purple' ? 'hover:ring-purple/30' : 'hover:ring-accent/30';
  const badgeBg = accent === 'purple' ? 'bg-purple/15 text-purple' : 'bg-accent/15 text-accent';

  return (
    <article
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className={`glass-panel group relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-2xl p-5 ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 ${ring} hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]`}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/5 blur-2xl transition-opacity group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider ${badgeBg}`}
          >
            <FaTrophy size={9} />
            {item.level}
          </span>
          <span className="font-mono text-[10px] text-gray-600">CERT</span>
        </div>
        <h4 className="mt-4 font-heading text-base leading-snug text-white sm:text-lg">
          {item.headline}
        </h4>
      </div>
      <p className="relative z-10 mt-4 border-t border-white/10 pt-3 font-body text-sm text-gray-300">
        <span className={accent === 'purple' ? 'text-purple' : 'text-accent'}>Position · </span>
        {item.position}
      </p>
    </article>
  );
}

function SkillCard({
  item,
  onHover,
  onLeave,
}: {
  item: SkillCert;
  onHover: () => void;
  onLeave: () => void;
}) {
  const { Icon, color, bg, ring } = getCategoryStyle(item.category);

  return (
    <article
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className={`glass-panel group relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl p-5 ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:ring-2 ${ring} hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]`}
    >
      <Icon
        className={`pointer-events-none absolute -bottom-6 -right-6 text-7xl opacity-[0.06] ${color}`}
        aria-hidden
      />
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${bg} ${color} ${ring}`}>
          <Icon size={24} />
        </div>
        <span className="rounded-md bg-white/5 px-2 py-1 font-mono text-[10px] text-gray-400">
          {item.issued}
        </span>
      </div>
      <div className="relative z-10 mt-auto pt-5">
        <p className={`font-mono text-[9px] uppercase tracking-widest ${color}`}>{item.issuer}</p>
        <h4 className="mt-2 font-heading text-base text-white sm:text-lg">{item.topic}</h4>
        <p className="mt-1 font-body text-xs text-gray-400">{item.name}</p>
      </div>
    </article>
  );
}

export function CertificateGallery({
  id,
  title,
  subtitle,
  variant,
  schoolItems = [],
  skillItems = [],
  accent = 'cyan',
}: CertificateGalleryProps) {
  const light = useLightExperience();
  const reduced = isReducedMotion();
  const [preview, setPreview] = useState<PreviewState>(null);

  const schoolList = useExpandableList(schoolItems, INITIAL_VISIBLE);
  const skillList = useExpandableList(skillItems, INITIAL_VISIBLE);
  const list = variant === 'school' ? schoolList : skillList;
  const items = variant === 'school' ? schoolItems : skillItems;

  const accentText = accent === 'purple' ? 'text-purple' : 'text-accent';

  const setSchoolPreview = (item: SchoolCert) =>
    setPreview({ image: item.image, title: item.headline, subtitle: item.position });

  const setSkillPreview = (item: SkillCert) =>
    setPreview({ image: item.image, title: item.name, subtitle: item.issuer });

  return (
    <div id={id} className="mb-20 border-t border-white/5 pt-16 sm:mb-28 sm:pt-20">
      <div className="mb-8 text-center sm:mb-10">
        <p className={`font-mono text-[10px] uppercase tracking-widest sm:text-xs ${accentText}`}>
          Credentials
        </p>
        <h3 className="heading-display mt-2 text-2xl text-white sm:text-3xl">{title}</h3>
        <p className="mx-auto mt-2 max-w-lg font-body text-sm text-gray-400">{subtitle}</p>
        <p className="mt-2 font-mono text-[10px] text-gray-600">
          {items.length} total · hover a card to preview
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {variant === 'school'
          ? (list.visibleItems as SchoolCert[]).map((item, i) => {
              const isReveal = list.expanded && i >= INITIAL_VISIBLE;
              return (
              <motion.div
                key={item.id}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                {...(isReveal
                  ? { animate: { opacity: 1, y: 0 } }
                  : {
                      whileInView: reduced ? undefined : { opacity: 1, y: 0 },
                      viewport: { once: true, margin: '-40px' },
                    })}
                transition={{
                  duration: 0.5,
                  delay: reduced ? 0 : isReveal ? (i - INITIAL_VISIBLE) * 0.05 : i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <SchoolCard
                  item={item}
                  accent={accent}
                  onHover={() => !light && setSchoolPreview(item)}
                  onLeave={() => setPreview(null)}
                />
              </motion.div>
            );
            })
          : (list.visibleItems as SkillCert[]).map((item, i) => {
              const isReveal = list.expanded && i >= INITIAL_VISIBLE;
              return (
              <motion.div
                key={item.id}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                {...(isReveal
                  ? { animate: { opacity: 1, y: 0 } }
                  : {
                      whileInView: reduced ? undefined : { opacity: 1, y: 0 },
                      viewport: { once: true, margin: '-40px' },
                    })}
                transition={{
                  duration: 0.5,
                  delay: reduced ? 0 : isReveal ? (i - INITIAL_VISIBLE) * 0.05 : i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <SkillCard
                  item={item}
                  onHover={() => !light && setSkillPreview(item)}
                  onLeave={() => setPreview(null)}
                />
              </motion.div>
            );
            })}

        {list.hasMore && !list.expanded && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ExploreMoreCard
              hiddenCount={list.hiddenCount}
              onClick={list.expand}
              accent={accent}
            />
          </motion.div>
        )}
      </div>

      {!light && <CertPreview preview={preview} />}
    </div>
  );
}
