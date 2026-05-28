'use client';


import Image from 'next/image';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo } from '@/data/personal';
import { FaGithub, FaLinkedin, FaInstagram, FaDownload, FaChevronDown } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { FaHackerrank } from 'react-icons/fa6'; // Assuming fa6 has it or fallback

const iconMap: Record<string, React.ElementType> = {
  FaGithub,
  FaLinkedin,
  SiLeetcode,
  FaHackerrank,
  FaInstagram,
};

export default function HeroSection() {
  // Animation sequence for react-type-animation
  const typingSequence = personalInfo.taglines.flatMap((tagline) => [tagline, 2000]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 animate-float font-code text-5xl text-purple-500">&lt;/&gt;</div>
        <div className="absolute top-1/3 right-1/4 animate-float-slow font-code text-6xl text-cyan-500" style={{ animationDelay: '1s' }}>{'{}'}</div>
        <div className="absolute bottom-1/4 left-1/3 animate-float font-code text-4xl text-purple-400" style={{ animationDelay: '2s' }}>=&gt;</div>
        <div className="absolute bottom-1/3 right-1/3 animate-float-slow font-code text-7xl text-cyan-400 opacity-50" style={{ animationDelay: '0.5s' }}>;</div>
      </div>

      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-6"
          >
            <div className="text-[var(--text-secondary)] text-xl font-medium flex items-center gap-2">
              Hello, I'm <span className="animate-wave text-2xl inline-block origin-bottom-right">👋</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              {personalInfo.name}
            </h1>
            
            <div className="text-2xl md:text-3xl font-code font-medium h-12 gradient-text">
              <TypeAnimation
                sequence={typingSequence}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="inline-block"
              />
            </div>
            
            <p className="text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed">
              I turn curiosity into code and ideas into experiences. Specializing in building impactful digital products.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              {personalInfo.socialLinks.map((link) => {
                const Icon = iconMap[link.icon] || FaGithub;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-[var(--text-secondary)] hover:text-white transition-all duration-300 hover:scale-110"
                    style={{ '--hover-color': link.color } as React.CSSProperties}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = link.color)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
                  >
                    <Icon size={22} />
                  </a>
                );
              })}
            </div>
            
            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href={personalInfo.resumePath}
                download
                className="px-8 py-3 rounded-full gradient-bg text-white font-medium flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-purple-500/25"
              >
                <FaDownload /> Download Resume
              </a>
              <a 
                href="#contact"
                className="px-8 py-3 rounded-full border border-white/20 glass text-white font-medium hover:bg-white/10 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </motion.div>

          {/* Right Side: Profile Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end hero-image-container"
          >
            <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]">
              <div className="absolute inset-0 z-20">
                <Image 
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  fill
                  priority
                  className="object-contain drop-shadow-[0_20px_50px_rgba(6,182,212,0.4)]"
                />
              </div>
            </div>
            
            {/* Gradient backdrop glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-gradient-to-tr from-purple-500/30 to-cyan-500/30 blur-[80px] -z-10 rounded-full animate-pulse-glow" />
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Chevron */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <a href="#school" className="text-white/50 hover:text-white transition-colors cursor-pointer">
          <FaChevronDown size={30} />
        </a>
      </div>
    </section>
  );
}
