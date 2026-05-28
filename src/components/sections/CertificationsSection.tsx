'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { certifications } from '@/data/certifications';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/effects/FadeIn';
import Badge from '@/components/ui/Badge';
import { 
  FaAws, FaReact, FaPython, FaGoogle, FaHtml5, 
  FaCss3Alt, FaJsSquare, FaCertificate, FaBriefcase, FaBrain 
} from 'react-icons/fa';
import { SiCisco } from 'react-icons/si';

const getCategoryDetails = (category: string) => {
  switch (category) {
    case 'cloud': return { icon: FaAws, color: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/20' };
    case 'networking': return { icon: SiCisco, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' };
    case 'webdev': return { icon: FaReact, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' };
    case 'ai': return { icon: FaBrain, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' };
    case 'career': return { icon: FaBriefcase, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' };
    case 'analytics': return { icon: FaGoogle, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' };
    default: return { icon: FaCertificate, color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20' };
  }
};

export default function CertificationsSection() {
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      id="certifications" 
      className="relative py-24"
      onMouseMove={handleMouseMove}
    >
      <div className="container-custom relative">
        <FadeIn direction="up">
          <SectionHeading title="Certifications" subtitle="Continuous learning and growth" align="center" />
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="flex justify-center mb-12">
            <div className="px-6 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-medium flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
              18+ Certifications Earned
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => {
            const { icon: Icon, color, bg, border } = getCategoryDetails(cert.category);
            
            return (
              <FadeIn key={cert.id} direction="up" delay={index * 0.05}>
                <div 
                  onMouseEnter={() => cert.image && setHoveredCert(cert.id)}
                  onMouseLeave={() => setHoveredCert(null)}
                  className="h-full"
                >
                  <GlassCard 
                    hover 
                    className={`h-full p-6 flex flex-col ${border} transition-colors duration-300 relative group overflow-hidden`}
                  >
                    {/* Background Icon Watermark */}
                    <Icon className="absolute -bottom-6 -right-6 text-9xl opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500" />
                    
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center`}>
                        <Icon size={24} />
                      </div>
                      <Badge 
                        text={cert.category.toUpperCase()} 
                        variant="outline" 
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-colors">
                      {cert.name}
                    </h3>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5 relative z-10">
                      <p className="text-[var(--text-secondary)] font-medium text-sm">{cert.issuer}</p>
                      {cert.image && (
                        <span className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          Hover to view
                        </span>
                      )}
                    </div>
                  </GlassCard>
                </div>
              </FadeIn>
            );
          })}
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
            <div className="absolute inset-0 flex items-center justify-center text-white/30">
              <FaCertificate className="text-6xl" />
            </div>
            
            {/* Render Actual Image */}
            {certifications.find(c => c.id === hoveredCert)?.image && (
              <Image 
                src={certifications.find(c => c.id === hoveredCert)!.image!} 
                alt="Certificate" 
                fill 
                className="object-contain relative z-10" 
              />
            )}

            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent z-20">
              <p className="text-xs font-bold text-white text-center drop-shadow-md">Certificate Preview</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
