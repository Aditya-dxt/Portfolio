'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/effects/FadeIn';
import { 
  FaCode, 
  FaDatabase, 
  FaNetworkWired, 
  FaLaptopCode, 
  FaBrain, 
  FaServer, 
  FaGlobe, 
  FaProjectDiagram, 
  FaMicrochip,
  FaTerminal
} from 'react-icons/fa';

const subjects = [
  { name: 'Data Structures & Algorithms', icon: FaCode, color: 'text-purple-400' },
  { name: 'Object-Oriented Programming', icon: FaTerminal, color: 'text-cyan-400' },
  { name: 'Database Management Systems', icon: FaDatabase, color: 'text-amber-400' },
  { name: 'Operating Systems', icon: FaMicrochip, color: 'text-red-400' },
  { name: 'Computer Networks', icon: FaNetworkWired, color: 'text-blue-400' },
  { name: 'Software Engineering', icon: FaProjectDiagram, color: 'text-pink-400' },
  { name: 'Web Development', icon: FaGlobe, color: 'text-teal-400' },
  { name: 'Theory of Computation', icon: FaServer, color: 'text-orange-400' },
  { name: 'AI & Machine Learning', icon: FaBrain, color: 'text-fuchsia-400' },
  { name: 'Full Stack Development', icon: FaLaptopCode, color: 'text-emerald-400' },
];

export default function SubjectsSection() {
  return (
    <section id="subjects" className="relative pb-24">
      <div className="container-custom">
        <FadeIn direction="up">
          <SectionHeading title="Core Subjects" subtitle="Theoretical foundation and practical knowledge" align="center" />
        </FadeIn>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="h-full"
              >
                <GlassCard className="subject-card h-full flex flex-col items-center justify-center text-center p-6 gap-4 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${subject.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} />
                  </div>
                  <h4 className="text-white font-medium text-sm md:text-base">{subject.name}</h4>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
