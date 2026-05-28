'use client';

import { codingProfiles } from '@/data/codingProfiles';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/effects/FadeIn';
import { FaGithub, FaLinkedin, FaInstagram, FaExternalLinkAlt } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { FaHackerrank } from 'react-icons/fa6';

const iconMap: Record<string, React.ElementType> = {
  FaGithub,
  FaLinkedin,
  SiLeetcode,
  FaHackerrank,
  FaInstagram,
};

export default function CodingProfilesSection() {
  return (
    <section id="coding-profiles" className="relative py-24">
      <div className="container-custom">
        <FadeIn direction="up">
          <SectionHeading title="Coding Profiles" subtitle="Where I practice and contribute" align="center" />
        </FadeIn>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {codingProfiles.map((profile, index) => {
            const Icon = iconMap[profile.icon] || FaGithub;
            
            return (
              <FadeIn key={profile.name} direction="up" delay={index * 0.1} className="h-full">
                <a 
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full group"
                  style={{ '--hover-color': profile.color } as React.CSSProperties}
                >
                  <GlassCard 
                    className="h-full flex flex-col items-center justify-center text-center p-6 gap-4 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Hover Glow Effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                      style={{ backgroundColor: profile.color }}
                    />
                    
                    <div 
                      className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 shadow-lg"
                      style={{ color: profile.color }}
                    >
                      <Icon size={32} />
                    </div>
                    
                    <div>
                      <h4 className="text-white font-bold mb-1">{profile.name}</h4>
                      <p className="text-xs text-[var(--text-secondary)] font-code">@{profile.username}</p>
                    </div>

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 group-hover:text-white">
                      <FaExternalLinkAlt size={12} />
                    </div>
                  </GlassCard>
                </a>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
