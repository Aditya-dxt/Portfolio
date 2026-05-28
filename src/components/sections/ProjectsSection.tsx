'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '@/data/projects';
import { Project } from '@/types';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectFilter from '@/components/ui/ProjectFilter';
import FadeIn from '@/components/effects/FadeIn';
import Badge from '@/components/ui/Badge';
import { FaGithub, FaTimes, FaExternalLinkAlt, FaFolderOpen } from 'react-icons/fa';

const categories = ['All', 'Full Stack', 'AI/ML', 'Frontend', 'Cybersecurity'];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projectsData 
    : projectsData.filter(p => {
        if (activeCategory === 'Full Stack' && p.category === 'fullstack') return true;
        if (activeCategory === 'AI/ML' && p.category === 'ai-ml') return true;
        if (activeCategory === 'Frontend' && p.category === 'frontend') return true;
        if (activeCategory === 'Cybersecurity' && p.category === 'cybersecurity') return true;
        return false;
      });

  return (
    <section id="projects" className="relative py-24 bg-gradient-to-t from-transparent to-black/20">
      <div className="container-custom">
        <FadeIn direction="up">
          <SectionHeading title="Featured Projects" subtitle="Things I've built" align="center" />
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <ProjectFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            onFilter={setActiveCategory} 
          />
        </FadeIn>

        <motion.div 
          layout
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <div 
                  className={`h-full rounded-2xl glass overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-2 ${project.featured ? 'border-purple-500/50 shadow-[0_0_30px_rgba(139,92,246,0.15)]' : 'border-white/10 hover:border-white/20'}`}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-black/40 border-b border-white/10">
                    {project.image ? (
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex flex-col items-center justify-center text-white/50 group-hover:scale-110 transition-transform duration-500">
                        <FaFolderOpen className="text-5xl mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <span className="font-bold tracking-widest uppercase opacity-30">{project.id.split('-')[0]}</span>
                      </div>
                    )}
                    {project.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge text="Featured" variant="gradient" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent opacity-90 z-0 pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">{project.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">{project.description}</p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.slice(0, 4).map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-400">
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                      <span className="text-sm font-medium text-purple-400 group-hover:text-cyan-400 transition-colors">
                        View Details &rarr;
                      </span>
                      <div className="flex gap-3">
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub />
                        </a>
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-500/20 transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaExternalLinkAlt size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 modal-overlay cursor-pointer"
              onClick={() => setSelectedProject(null)}
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl border border-purple-500/30 shadow-2xl z-10 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <FaTimes />
              </button>

              {/* Modal Header */}
              <div className="relative shrink-0 flex flex-col p-8 bg-[#0a0a1a]/80 border-b border-white/10">
                <div className="relative z-10">
                  <div className="flex gap-2 mb-3">
                    <Badge text={selectedProject.category.toUpperCase()} variant="gradient" />
                    {selectedProject.featured && <Badge text="Featured" variant="outline" />}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{selectedProject.title}</h2>
                </div>
              </div>

              {/* Project Image */}
              {selectedProject.image && (
                <div className="relative w-full aspect-video bg-black/60 border-b border-white/10">
                  <Image 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    fill 
                    className="object-contain p-2"
                  />
                </div>
              )}

              {/* Modal Body */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Main Content (Left, 2 cols) */}
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Overview</h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                      {selectedProject.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {(selectedProject.highlights || []).map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)]">
                          <span className="text-cyan-400 mt-1">▹</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sidebar (Right, 1 col) */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-200 text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-2">Links</h3>
                    <a 
                      href={selectedProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium flex items-center justify-center gap-3 transition-colors border border-white/10"
                    >
                      <FaGithub size={20} /> View Source Code
                    </a>
                    
                    {selectedProject.liveUrl && (
                      <a 
                        href={selectedProject.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full px-4 py-3 rounded-xl gradient-bg text-white font-medium flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-cyan-500/20"
                      >
                        <FaExternalLinkAlt size={16} /> Live Demonstration
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
