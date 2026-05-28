'use client';

import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import ProgressBar from '@/components/ui/ProgressBar';
import FadeIn from '@/components/effects/FadeIn';
import { FaCode, FaPalette, FaServer, FaDatabase, FaBrain, FaTools } from 'react-icons/fa';

const categoryIconMap: Record<string, React.ReactNode> = {
  'FaCode': <FaCode />,
  'FaPalette': <FaPalette />,
  'FaServer': <FaServer />,
  'FaDatabase': <FaDatabase />,
  'FaBrain': <FaBrain />,
  'FaTools': <FaTools />,
};

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 bg-gradient-to-b from-transparent to-black/20">
      <div className="container-custom">
        <FadeIn direction="up">
          <SectionHeading title="Skills & Technologies" subtitle="What I work with" align="center" />
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <FadeIn key={category.id} direction="up" delay={index * 0.1}>
              <GlassCard className="h-full p-8 border-purple-500/20 hover:border-purple-500/50 transition-colors">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-4xl text-purple-400">
                    {categoryIconMap[category.icon] || <FaCode />}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>
                
                <div className="space-y-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-cyan-400 font-code text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
