'use client';

import { personalInfo, navItems } from '@/data/personal';
import { FaGithub, FaLinkedin, FaInstagram, FaHeart, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { FaHackerrank } from 'react-icons/fa6';
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiFramer } from 'react-icons/si';

const iconMap: Record<string, React.ElementType> = {
  FaGithub,
  FaLinkedin,
  SiLeetcode,
  FaHackerrank,
  FaInstagram,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--bg-secondary)] pt-16 pb-8 border-t border-white/10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full footer-gradient-border" />
      
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="text-3xl font-bold font-code bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              &lt;AD /&gt;
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {personalInfo.motto}
            </p>
            <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm pt-2">
              <FaMapMarkerAlt className="text-purple-400" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
              <FaEnvelope className="text-cyan-400" />
              <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors">
                {personalInfo.email}
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a 
                    href={`#${item.href}`}
                    className="text-[var(--text-secondary)] hover:text-white hover:pl-1 transition-all text-sm block py-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {personalInfo.socialLinks.map((link) => {
                const Icon = iconMap[link.icon] || FaGithub;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center text-[var(--text-secondary)] transition-all hover:-translate-y-1"
                    style={{ '--hover-color': link.color } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = link.color;
                      e.currentTarget.style.borderColor = link.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '';
                      e.currentTarget.style.borderColor = '';
                    }}
                    title={link.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 4: Tech Stack */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-4">Built With</h3>
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                <SiNextdotjs size={14} /> Next.js
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-cyan-400">
                <SiReact size={14} /> React
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-blue-400">
                <SiTypescript size={14} /> TypeScript
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-teal-400">
                <SiTailwindcss size={14} /> Tailwind
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-pink-400">
                <SiFramer size={14} /> Motion
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-secondary)]">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1.5">
            Made with <FaHeart className="text-red-500 animate-pulse" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
