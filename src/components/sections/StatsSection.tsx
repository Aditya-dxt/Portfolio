'use client';

import { statsData } from '@/data/stats';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/effects/FadeIn';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { FaCode, FaLaptopCode, FaCertificate, FaGithub, FaUsers, FaClock } from 'react-icons/fa';

const iconMap: Record<string, React.ElementType> = {
  FaCode,
  FaLaptopCode,
  FaCertificate,
  FaGithub,
  FaUsers,
  FaClock,
};

export default function StatsSection() {
  return (
    <section className="relative py-12">
      <div className="container-custom">
        <GlassCard className="p-8 border-cyan-500/30">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {statsData.map((stat, index) => {
              const Icon = iconMap[stat.icon] || FaCode;
              
              return (
                <FadeIn key={stat.id} direction="up" delay={index * 0.1}>
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform group-hover:bg-cyan-500/20 group-hover:text-white">
                      <Icon size={20} />
                    </div>
                    <div className="text-3xl font-bold gradient-text mb-2">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm font-medium text-[var(--text-secondary)]">{stat.label}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
