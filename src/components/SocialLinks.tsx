import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaHackerrank,
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { portfolio } from '@/data/portfolio';

export const socialIconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  leetcode: SiLeetcode,
  instagram: FaInstagram,
  hackerrank: FaHackerrank,
} as const;

export type SocialIconKey = keyof typeof socialIconMap;

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
}

export function SocialLinks({
  className = '',
  iconSize = 22,
  showLabels = false,
}: SocialLinksProps) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {portfolio.social.map((link) => {
        const Icon = socialIconMap[link.icon as SocialIconKey] ?? FaGithub;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            aria-label={link.name}
            className="group flex items-center gap-2 text-gray-400 transition-colors hover:text-accent"
          >
            <Icon size={iconSize} />
            {showLabels && (
              <span className="font-body text-xs uppercase tracking-wider">{link.name}</span>
            )}
          </a>
        );
      })}
    </div>
  );
}
