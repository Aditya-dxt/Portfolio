'use client';

import { experiences } from '@/data/experience';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import FadeIn from '@/components/effects/FadeIn';
import { FaCrown, FaUsers, FaBriefcase } from 'react-icons/fa';

const typeIcons: Record<string, React.ReactNode> = {
  leadership: <FaCrown className="text-yellow-400" />,
  club: <FaUsers className="text-cyan-400" />,
  internship: <FaBriefcase className="text-purple-400" />,
  volunteer: <FaUsers className="text-green-400" />,
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative">
      <div className="container-custom">
        <SectionHeading title="Experience & Leadership" subtitle="Roles and responsibilities" />

        {/* Open to opportunities badge */}
        <FadeIn direction="up">
          <div className="flex justify-center mt-8 mb-10">
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-green-500/30">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-green-400">Open to Opportunities</span>
            </div>
          </div>
        </FadeIn>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <FadeIn key={exp.id} direction="up" delay={i * 0.1}>
              <GlassCard hover>
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-white/5 border border-white/10">
                    {typeIcons[exp.type] || <FaBriefcase className="text-purple-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-[var(--text-primary)]">{exp.role}</h3>
                      {exp.current && <Badge text="Current" variant="gradient" />}
                    </div>
                    <p className="text-purple-400 font-medium text-sm mb-1">{exp.organization}</p>
                    <p className="text-xs text-[var(--text-secondary)] mb-3">{exp.duration}</p>
                    <ul className="space-y-1.5">
                      {exp.description.map((desc, j) => (
                        <li key={j} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                          <span className="text-purple-400 mt-1">▹</span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
