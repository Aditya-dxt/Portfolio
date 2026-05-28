'use client';

import { hackathonsData } from '@/data/hackathons';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/effects/FadeIn';
import Badge from '@/components/ui/Badge';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaTrophy, FaExternalLinkAlt, FaLeaf, FaBrain, FaRocket, FaCode } from 'react-icons/fa';

const iconMap: Record<string, React.ReactNode> = {
  'FaTrophy': <FaTrophy />,
  'FaLeaf': <FaLeaf />,
  'FaBrain': <FaBrain />,
  'FaRocket': <FaRocket />,
};

export default function HackathonsSection() {
  return (
    <section id="hackathons" className="relative py-24 bg-gradient-to-b from-black/20 to-transparent">
      <div className="container-custom">
        <FadeIn direction="up">
          <SectionHeading title="Hackathons & Events" subtitle="Competing and innovating" align="center" />
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {hackathonsData.map((hackathon, index) => (
            <FadeIn key={hackathon.id} direction="up" delay={index * 0.1} className="h-full">
              <GlassCard 
                hover 
                className={`h-full p-8 flex flex-col ${hackathon.isFinalist ? 'border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.15)] bg-gradient-to-br from-white/5 to-amber-500/5' : 'border-white/10'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-lg ${hackathon.isFinalist ? 'bg-amber-500/20 shadow-amber-500/20' : 'bg-purple-500/20 shadow-purple-500/20'}`}>
                    {iconMap[hackathon.icon || ''] || <FaCode />}
                  </div>
                  {hackathon.isFinalist && (
                    <div className="animate-pulse">
                      <Badge text="🏆 FINALIST" variant="gradient" />
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{hackathon.name}</h3>
                <p className="text-purple-400 font-medium mb-4">{hackathon.organizer}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <FaMapMarkerAlt className="text-cyan-400" />
                    <span>{hackathon.venue}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <FaCalendarAlt className="text-cyan-400" />
                    <span>{hackathon.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <FaUsers className="text-cyan-400" />
                    <span className="font-medium text-white">{hackathon.role}</span>
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] text-sm mb-6 flex-grow">{hackathon.description}</p>

                <div className="mt-auto pt-4 border-t border-white/10 flex flex-wrap gap-2 justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {hackathon.themes?.map((theme, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded border border-white/10 text-gray-400 bg-white/5">
                        {theme}
                      </span>
                    ))}
                  </div>
                  {hackathon.url && (
                    <a 
                      href={hackathon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
                      title="View Event"
                    >
                      <FaExternalLinkAlt size={14} />
                    </a>
                  )}
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
