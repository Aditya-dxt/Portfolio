'use client';

import { educationData } from '@/data/education';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import FadeIn from '@/components/effects/FadeIn';
import { FaGraduationCap, FaSchool } from 'react-icons/fa';

export default function EducationSection() {
  return (
    <section id="education" className="relative">
      <div className="container-custom">
        <SectionHeading title="Education" subtitle="My academic journey" />

        <div className="relative mt-12">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-cyan-500 hidden md:block" />

          <div className="space-y-8">
            {educationData.map((edu, i) => (
              <FadeIn key={edu.id} direction="up" delay={i * 0.15}>
                <div className="relative md:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 rounded-full gradient-bg border-4 border-[var(--bg-primary)] z-10 hidden md:block" />

                  <GlassCard hover className={edu.id === 'college' ? 'border-purple-500/30 glow-purple' : ''}>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-shrink-0 p-3 rounded-xl bg-purple-500/10">
                        {edu.id === 'college' ? (
                          <FaGraduationCap className="text-purple-400" size={24} />
                        ) : (
                          <FaSchool className="text-cyan-400" size={24} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h3 className="text-xl font-bold text-[var(--text-primary)]">{edu.institution}</h3>
                          <span className="text-sm font-code text-[var(--text-secondary)]">
                            {edu.startYear} – {edu.endYear}
                          </span>
                        </div>
                        <p className="text-purple-400 font-medium mb-1">{edu.degree}</p>
                        {edu.field && (
                          <p className="text-sm text-[var(--text-secondary)] mb-2">{edu.field}</p>
                        )}
                        <p className="text-2xl font-bold gradient-text mb-3">
                          {edu.grade} <span className="text-sm font-normal text-[var(--text-secondary)]">{edu.gradeType}</span>
                        </p>
                        {edu.coursework && (
                          <div>
                            <p className="text-xs text-[var(--text-secondary)] mb-2 uppercase tracking-wider font-semibold">Relevant Coursework</p>
                            <div className="flex flex-wrap gap-1.5">
                              {edu.coursework.map((course) => (
                                <Badge key={course} text={course} variant="outline" />
                              ))}
                            </div>
                          </div>
                        )}
                        {edu.id === 'college' && (
                          <Badge text="Currently Pursuing" variant="gradient" />
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
