import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import {
  FaAws,
  FaReact,
  FaGoogle,
  FaCertificate,
  FaBriefcase,
  FaBrain,
} from 'react-icons/fa';
import { SiCisco } from 'react-icons/si';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { LazyImage } from './LazyImage';
import type { portfolio } from '@/data/portfolio';

type SchoolCert = (typeof portfolio)['schoolCertificates'][number];
type SkillCert = (typeof portfolio)['skillCertificates'][number];

const categoryIcons = {
  cloud: { Icon: FaAws, color: 'text-sky-400', bg: 'bg-sky-400/10' },
  networking: { Icon: SiCisco, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  webdev: { Icon: FaReact, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  ai: { Icon: FaBrain, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  career: { Icon: FaBriefcase, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  analytics: { Icon: FaGoogle, color: 'text-amber-400', bg: 'bg-amber-400/10' },
} as const;

function getCategoryStyle(category: string) {
  return (
    categoryIcons[category as keyof typeof categoryIcons] ?? {
      Icon: FaCertificate,
      color: 'text-gray-400',
      bg: 'bg-gray-400/10',
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

function SchoolCard({ item, accent }: { item: SchoolCert; accent: 'purple' | 'cyan' }) {
  const borderHover = accent === 'purple' ? 'hover:border-purple/40' : 'hover:border-accent/40';

  return (
    <div
      data-cert-card
      className={`group relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/10 bg-void/80 ${borderHover} transition-colors duration-300`}
    >
      <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-wider text-gray-500 sm:text-[10px]">
            {item.level}
          </p>
          <h4 className="mt-2 font-heading text-sm leading-snug text-white sm:text-base">
            {item.headline}
          </h4>
        </div>
        <p className="font-body text-xs text-accent sm:text-sm">{item.position}</p>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
        <LazyImage
          src={item.image}
          alt={item.headline}
          sharp
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <p className="font-body text-xs text-white sm:text-sm">{item.headline}</p>
          <p className="mt-1 font-mono text-[10px] text-accent">{item.position}</p>
        </div>
      </div>
    </div>
  );
}

function SkillCard({ item }: { item: SkillCert }) {
  const { Icon, color, bg } = getCategoryStyle(item.category);

  return (
    <div
      data-cert-card
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/10 bg-void/80 transition-colors duration-300 hover:border-accent/40"
    >
      <div className="relative z-10 flex h-full flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${color}`}>
            <Icon size={22} />
          </div>
          <span className="font-mono text-[10px] text-gray-500">{item.issued}</span>
        </div>
        <div className="mt-auto pt-4">
          <p className="font-mono text-[9px] uppercase tracking-wider text-accent sm:text-[10px]">
            {item.issuer}
          </p>
          <h4 className="mt-1 font-heading text-sm text-white sm:text-base">{item.topic}</h4>
          <p className="mt-1 font-body text-xs text-gray-400">{item.name}</p>
        </div>
      </div>

      <Icon
        className={`pointer-events-none absolute -bottom-4 -right-4 text-8xl opacity-[0.04] ${color}`}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
        <LazyImage src={item.image} alt={item.name} sharp className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <p className="font-mono text-[10px] text-accent">{item.issuer}</p>
          <p className="font-body text-xs text-white">{item.name}</p>
        </div>
      </div>
    </div>
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const accentText = accent === 'purple' ? 'text-purple' : 'text-accent';
  const items = variant === 'school' ? schoolItems : skillItems;

  useGSAP(
    () => {
      if (!sectionRef.current || isReducedMotion()) return;

      gsap.from('[data-cert-card]', {
        y: 50,
        opacity: 0,
        scale: 0.92,
        stagger: 0.06,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
        },
      });
    },
    { scope: sectionRef, dependencies: [items.length, variant] },
  );

  return (
    <div id={id} ref={sectionRef} className="mb-20 border-t border-white/5 pt-16 sm:mb-28 sm:pt-20">
      <div className="mb-8 text-center sm:mb-10">
        <p className={`font-mono text-[10px] uppercase tracking-widest sm:text-xs ${accentText}`}>
          Credentials
        </p>
        <h3 className="heading-display mt-2 text-2xl text-white sm:text-3xl">{title}</h3>
        <p className="mx-auto mt-2 max-w-lg font-body text-sm text-gray-400">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {variant === 'school'
          ? schoolItems.map((item) => <SchoolCard key={item.id} item={item} accent={accent} />)
          : skillItems.map((item) => <SkillCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}
