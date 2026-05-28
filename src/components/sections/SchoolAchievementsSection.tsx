'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/effects/FadeIn';

export default function SchoolAchievementsSection() {
  const sportsCertificates = Array.from({ length: 9 }, (_, i) => `/images/sports/${i + 1}.jpg`);
  
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section id="school-achievements" className="relative pb-24" onMouseMove={handleMouseMove}>
      <div className="container-custom">
        
        <FadeIn direction="up">
          <SectionHeading title="School Achievements" subtitle="Academic and extracurricular excellence" align="center" />
        </FadeIn>

        {/* Academic Records */}
        <div className="mt-12 mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn direction="right">
            <GlassCard hover className="h-full flex flex-col items-center text-center p-8 border-purple-500/30">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Class 10 (ICSE)</h3>
              <p className="text-[var(--text-secondary)] mb-4">St. Thomas School • 2022</p>
              <div className="mt-auto inline-block px-6 py-3 rounded-xl gradient-bg shadow-lg shadow-purple-500/25">
                <span className="text-3xl font-black text-white">91.2%</span>
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn direction="left">
            <GlassCard hover className="h-full flex flex-col items-center text-center p-8 border-cyan-500/30">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Class 12 (ISC)</h3>
              <p className="text-[var(--text-secondary)] mb-4">Physics, Chemistry, Mathematics • 2024</p>
              <div className="mt-auto inline-block px-6 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
                <span className="text-3xl font-black gradient-text">78.4%</span>
              </div>
            </GlassCard>
          </FadeIn>
        </div>

        {/* Leadership Roles */}
        <div className="mb-16">
          <FadeIn direction="up">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Leadership Roles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              
              <GlassCard hover className="flex items-center gap-6 p-6">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <span className="text-3xl">👑</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">House Captain</h4>
                  <p className="text-purple-400 font-code text-sm mt-1">Class 11 • 2023</p>
                  <p className="text-[var(--text-secondary)] text-sm mt-2">Led the school house in various inter-house competitions and managed house activities.</p>
                </div>
              </GlassCard>
              
              <GlassCard hover className="flex items-center gap-6 p-6">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <span className="text-3xl">🏅</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Sports Captain</h4>
                  <p className="text-purple-400 font-code text-sm mt-1">Class 12 • 2024</p>
                  <p className="text-[var(--text-secondary)] text-sm mt-2">Organized sports events, led the school teams, and promoted physical fitness among students.</p>
                </div>
              </GlassCard>
              
            </div>
          </FadeIn>
        </div>

        {/* Sports Certificates */}
        <div>
          <FadeIn direction="up">
            <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
              <span>🏆</span> Sports Excellence
            </h3>
            <p className="text-center text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
              A collection of 9 certificates earned through dedication, teamwork, and excellence in various school sports competitions.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {sportsCertificates.map((certPath, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  onMouseEnter={() => setHoveredCert(certPath)}
                  onMouseLeave={() => setHoveredCert(null)}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 group bg-white/5 cursor-pointer"
                >
                  {/* We use an img tag with fallback styling since images aren't there yet */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30 group-hover:text-white/50 transition-colors z-0">
                    <span className="text-4xl mb-2">⚽</span>
                    <span className="text-xs font-code">Cert {index + 1}</span>
                  </div>
                  
                  {/* The actual image */}
                  <Image 
                    src={certPath} 
                    alt={`Sports Certificate ${index + 1}`}
                    fill
                    className="absolute inset-0 w-full h-full object-cover z-10 opacity-100 transition-opacity duration-300"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end p-4">
                    <span className="text-white text-sm font-medium">View Certificate</span>
                  </div>
                </motion.div>
              ))}
              
              {/* Add one final decorative block for the 10th spot in the 5-col grid */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="relative aspect-[3/4] rounded-xl overflow-hidden border border-purple-500/30 bg-purple-500/10 flex flex-col items-center justify-center p-4 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
                  <span className="text-xl text-purple-400">+</span>
                </div>
                <h4 className="text-white font-bold text-sm">More to come</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Always striving for excellence</p>
              </motion.div>
            </div>
          </FadeIn>
        </div>

      </div>

      {/* Floating Hover Preview */}
      <AnimatePresence>
        {hoveredCert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed z-50 w-80 h-auto aspect-video rounded-xl overflow-hidden cert-preview border-2 border-purple-500/50 bg-black/80 backdrop-blur-xl shadow-2xl pointer-events-none"
            style={{
              left: mousePos.x + 20,
              top: mousePos.y - 100,
            }}
          >
            <Image 
              src={hoveredCert} 
              alt="Certificate Preview" 
              fill 
              className="object-contain relative z-10" 
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent z-20">
              <p className="text-xs font-bold text-white text-center drop-shadow-md">Certificate Preview</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
