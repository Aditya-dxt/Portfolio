'use client';

import { personalInfo } from '@/data/personal';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/effects/FadeIn';
import { FaGraduationCap, FaLaptopCode, FaTrophy, FaCertificate } from 'react-icons/fa';

const quickFacts = [
  { icon: <FaGraduationCap />, label: 'B.Tech CSE' },
  { icon: <FaLaptopCode />, label: '5+ Projects' },
  { icon: <FaTrophy />, label: 'Hackathon Finalist' },
  { icon: <FaCertificate />, label: '15+ Certifications' },
];

const profileJson = `{
  "name": "Aditya Dixit",
  "role": "Full Stack Developer",
  "location": "Kanpur, India",
  "education": "B.Tech CSE @ PSIT",
  "interests": [
    "Web Development",
    "AI/ML",
    "Open Source",
    "Hackathons"
  ],
  "available": true
}`;

export default function AboutSection() {
  return (
    <section id="about" className="relative">
      <div className="container-custom">
        <SectionHeading title="About Me" subtitle="Get to know me better" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
          {/* Left — Bio */}
          <FadeIn direction="left">
            <div className="space-y-5">
              <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                {personalInfo.bio}
              </p>
              <div className="pt-2">
                <p className="text-[var(--text-secondary)] italic text-lg border-l-4 border-purple-500 pl-4">
                  &ldquo;{personalInfo.motto}&rdquo;
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right — Terminal Mockup */}
          <FadeIn direction="right" delay={0.2}>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117]">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 text-xs text-gray-500 font-code">profile.json</span>
              </div>
              {/* Code Content */}
              <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-code">
                  {profileJson.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-gray-600 select-none w-8 text-right mr-4 text-xs leading-6">{i + 1}</span>
                      <span className="leading-6">
                        {line.includes('"name"') || line.includes('"role"') || line.includes('"location"') || line.includes('"education"') || line.includes('"interests"') || line.includes('"available"')
                          ? <><span className="text-purple-400">{line.split(':')[0]}</span><span className="text-gray-400">:</span><span className="text-green-400">{line.split(':').slice(1).join(':')}</span></>
                          : <span className={line.includes('"') ? 'text-green-400' : 'text-gray-400'}>{line}</span>
                        }
                      </span>
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {quickFacts.map((fact, i) => (
            <FadeIn key={i} direction="up" delay={i * 0.1}>
              <GlassCard hover className="text-center">
                <div className="text-3xl gradient-text mb-2 flex justify-center">{fact.icon}</div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{fact.label}</p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
