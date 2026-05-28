'use client';

import { personalInfo } from '@/data/personal';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/effects/FadeIn';
import { FaDownload, FaFileAlt } from 'react-icons/fa';

export default function ResumeSection() {
  return (
    <section id="resume" className="relative">
      <div className="container-custom">
        <FadeIn direction="up">
          <div className="max-w-2xl mx-auto">
            <GlassCard className="text-center py-12 relative overflow-hidden">
              {/* Decorative gradient blobs */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px]" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-[60px]" />

              <div className="relative z-10">
                <div className="animate-float mb-6">
                  <FaFileAlt className="text-6xl gradient-text mx-auto" style={{ WebkitTextFillColor: 'unset', color: '#8b5cf6' }} />
                </div>
                <h2 className="text-3xl font-bold gradient-text mb-3">My Resume</h2>
                <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                  Want to know more about my experience, skills, and achievements? Download my resume below.
                </p>
                <a
                  href={personalInfo.resumePath}
                  download
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl gradient-bg text-white font-semibold text-lg hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <FaDownload /> Download Resume
                </a>
              </div>
            </GlassCard>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
