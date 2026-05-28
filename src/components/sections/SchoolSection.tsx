'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/effects/FadeIn';

export default function SchoolSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const rotX = isHovering && containerRef.current ? (mousePos.y / containerRef.current.offsetHeight - 0.5) * -8 : 0;
  const rotY = isHovering && containerRef.current ? (mousePos.x / containerRef.current.offsetWidth - 0.5) * 8 : 0;

  return (
    <section id="school" className="relative pb-10 overflow-hidden">
      <div className="container-custom">
        <SectionHeading title="My School Journey" subtitle="Where the foundation was laid" />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: 3D Building */}
          <FadeIn direction="right">
            <div className="flex flex-col space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">St. Thomas School</h3>
                <p className="text-purple-400 font-medium">Kanpur, Uttar Pradesh</p>
              </div>
              
              <div 
                ref={containerRef}
                className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl building-3d group cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div 
                  className="w-full h-full rounded-2xl overflow-hidden border border-white/10 building-3d-inner relative shadow-2xl group-hover:glow-purple"
                  style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }}
                >
                  <Image
                    src="/images/school.jpg"
                    alt="St. Thomas School"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent opacity-80" />
                  
                  {/* Subtle glare effect */}
                  {isHovering && (
                    <div 
                      className="absolute inset-0 pointer-events-none rounded-2xl mix-blend-overlay"
                      style={{
                        background: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.4), transparent)`
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Timeline */}
          <FadeIn direction="left" delay={0.2}>
            <div className="relative pl-8 md:pl-12 py-4" ref={timelineRef}>
              {/* Timeline Line Base */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 rounded-full" />
              {/* Animated Timeline Line */}
              <motion.div 
                className="absolute left-0 top-0 w-1 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full origin-top"
                style={{ height: lineHeight }}
              />
              
              <div className="space-y-12">
                {/* UKG Item */}
                <div className="relative">
                  <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-[var(--bg-secondary)] border-2 border-purple-500 timeline-dot" />
                  <h4 className="text-xl font-bold text-white">UKG</h4>
                  <p className="text-sm text-cyan-400 font-code mb-2">2011 - 2012</p>
                  <p className="text-[var(--text-secondary)]">The beginning of the journey. Early education and foundation years.</p>
                </div>
                
                {/* Middle Item */}
                <div className="relative">
                  <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-[var(--bg-secondary)] border-2 border-purple-500 timeline-dot" />
                  <h4 className="text-xl font-bold text-white">Primary to Middle School</h4>
                  <p className="text-sm text-cyan-400 font-code mb-2">2012 - 2021</p>
                  <p className="text-[var(--text-secondary)]">Formative years of learning, sports, and discovering interests in science and technology.</p>
                </div>

                {/* Class 10 */}
                <div className="relative">
                  <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-[var(--bg-secondary)] border-2 border-purple-500 timeline-dot" />
                  <h4 className="text-xl font-bold text-white">Class 10 (ICSE)</h4>
                  <p className="text-sm text-cyan-400 font-code mb-2">2021 - 2022</p>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 inline-block mt-1">
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 text-lg">91.2%</span>
                  </div>
                </div>

                {/* Class 11 */}
                <div className="relative">
                  <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-[var(--bg-secondary)] border-2 border-purple-500 timeline-dot" />
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    Class 11 & Leadership <span className="text-2xl">👑</span>
                  </h4>
                  <p className="text-sm text-cyan-400 font-code mb-2">2022 - 2023</p>
                  <p className="text-[var(--text-secondary)]">Appointed as House Captain, developing crucial leadership and team management skills.</p>
                </div>

                {/* Class 12 */}
                <div className="relative">
                  <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-purple-500 border-2 border-cyan-400 timeline-dot-active" />
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    Class 12 (ISC) & Graduation <span className="text-2xl">🏅</span>
                  </h4>
                  <p className="text-sm text-cyan-400 font-code mb-2">2023 - 2024</p>
                  <p className="text-[var(--text-secondary)] mb-3">Graduated high school with Physics, Chemistry, and Mathematics.</p>
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2 px-3">
                      <span className="font-bold text-white text-sm">78.4% Score</span>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-lg p-2 px-3">
                      <span className="font-bold text-purple-300 text-sm">Sports Captain</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </FadeIn>
          
        </div>
      </div>
    </section>
  );
}
