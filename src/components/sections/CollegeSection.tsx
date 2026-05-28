'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/effects/FadeIn';
import { FaLaptopCode, FaTrophy, FaGraduationCap } from 'react-icons/fa';
import { FaCodePullRequest } from 'react-icons/fa6';

export default function CollegeSection() {
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
    <section id="college" className="relative py-24 bg-gradient-to-b from-transparent to-black/20">
      <div className="container-custom">
        <SectionHeading title="College Journey" subtitle="Higher education and specialization" align="center" />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Timeline */}
          <FadeIn direction="right">
            <div className="relative pl-8 md:pl-12 py-4 order-2 lg:order-1" ref={timelineRef}>
              {/* Timeline Line Base */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 rounded-full" />
              {/* Animated Timeline Line */}
              <motion.div 
                className="absolute left-0 top-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent rounded-full origin-top"
                style={{ height: lineHeight }}
              />
              
              <div className="space-y-12">
                {/* 1st Year */}
                <div className="relative">
                  <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-[var(--bg-secondary)] border-2 border-cyan-500 timeline-dot" />
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    1st Year <FaLaptopCode className="text-cyan-400" />
                  </h4>
                  <p className="text-sm text-purple-400 font-code mb-2">2024 - 2025</p>
                  <p className="text-[var(--text-secondary)]">Started B.Tech CSE. Built foundations in programming, data structures, and algorithms.</p>
                </div>
                
                {/* 2nd Year */}
                <div className="relative">
                  <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-[var(--bg-secondary)] border-2 border-cyan-500 timeline-dot" />
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    2nd Year <FaTrophy className="text-amber-400" />
                  </h4>
                  <p className="text-sm text-purple-400 font-code mb-2">2025 - 2026</p>
                  <p className="text-[var(--text-secondary)]">Deep dive into full-stack development, AI/ML, and competing in national level hackathons.</p>
                </div>

                {/* 3rd Year (Current) */}
                <div className="relative">
                  <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-cyan-500 border-2 border-white timeline-dot-active" />
                  <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center gap-2">
                    3rd Year (Sem 5) <FaCodePullRequest className="text-white" />
                  </h4>
                  <p className="text-sm text-white font-code mb-2 px-2 py-0.5 bg-white/10 rounded inline-block mt-1">Currently in progress</p>
                  <p className="text-[var(--text-secondary)] mb-3">Focusing on advanced system design, open-source contributions, and building production-ready apps.</p>
                  
                  {/* Current CGPA */}
                  <div className="bg-black/40 border border-white/10 rounded-xl p-4 inline-block mt-2 backdrop-blur-md">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-bold">Current CGPA</p>
                    <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-3xl">7.3</span>
                  </div>
                </div>

                {/* 4th Year */}
                <div className="relative opacity-50">
                  <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full bg-transparent border-2 border-gray-600 border-dashed" />
                  <h4 className="text-xl font-bold text-gray-300 flex items-center gap-2">
                    4th Year <FaGraduationCap className="text-gray-400" />
                  </h4>
                  <p className="text-sm text-gray-500 font-code mb-2">2027 - 2028</p>
                  <p className="text-gray-500">Upcoming graduation and future endeavors.</p>
                </div>

              </div>
            </div>
          </FadeIn>

          {/* Right: 3D Building */}
          <FadeIn direction="left" delay={0.2} className="order-1 lg:order-2">
            <div className="flex flex-col space-y-6 lg:items-end lg:text-right">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">PSIT</h3>
                <p className="text-[var(--text-secondary)] font-medium">Pranveer Singh Institute of Technology</p>
                <p className="text-cyan-400 font-code mt-1 text-sm bg-cyan-400/10 inline-block px-3 py-1 rounded-full border border-cyan-400/20">B.Tech Computer Science & Engineering</p>
              </div>
              
              <div 
                ref={containerRef}
                className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl building-3d group cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div 
                  className="w-full h-full rounded-2xl overflow-hidden border border-white/10 building-3d-inner relative shadow-2xl group-hover:glow-cyan"
                  style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }}
                >
                  <Image
                    src="/images/college.jpg"
                    alt="PSIT College"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/40 to-transparent opacity-80" />
                  
                  {/* Subtle glare effect */}
                  {isHovering && (
                    <div 
                      className="absolute inset-0 pointer-events-none rounded-2xl mix-blend-overlay transition-opacity duration-200"
                      style={{
                        background: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.3), transparent)`
                      }}
                    />
                  )}
                  
                  <div className="absolute bottom-6 right-6 p-3 rounded-xl glass-strong flex items-center justify-center">
                    <Image src="/images/psit-logo.png" alt="PSIT Logo" width={40} height={40} className="object-contain" 
                      onError={(e) => {
                        // Fallback if logo doesn't exist
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<span class="font-bold text-white">PSIT</span>';
                      }}
                    />
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
