import { FaPlus } from 'react-icons/fa';

interface ExploreMoreCardProps {
  hiddenCount: number;
  onClick: () => void;
  accent?: 'purple' | 'cyan';
  className?: string;
}

export function ExploreMoreCard({
  hiddenCount,
  onClick,
  accent = 'cyan',
  className = '',
}: ExploreMoreCardProps) {
  const accentBorder = accent === 'purple' ? 'border-purple/35' : 'border-accent/35';
  const accentBg = accent === 'purple' ? 'from-purple/10' : 'from-accent/10';
  const accentText = accent === 'purple' ? 'text-purple' : 'text-accent';

  return (
    <button
      type="button"
      data-hover
      onClick={onClick}
      className={`group flex min-h-[200px] w-full flex-col items-center justify-center rounded-2xl border border-dashed ${accentBorder} bg-gradient-to-br ${accentBg} to-transparent p-6 text-center transition-all duration-300 hover:scale-[1.02] hover:border-solid hover:shadow-[0_0_30px_rgba(0,212,255,0.12)] active:scale-[0.98] ${className}`}
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110 ${accentText}`}
      >
        <FaPlus size={22} />
      </span>
      <span className="mt-4 font-heading text-sm uppercase tracking-widest text-white sm:text-base">
        Explore More
      </span>
      <span className="mt-1 font-mono text-[10px] text-gray-500">
        +{hiddenCount} {hiddenCount === 1 ? 'item' : 'items'}
      </span>
    </button>
  );
}
