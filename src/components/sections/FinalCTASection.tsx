'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personal';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/effects/FadeIn';
import { FaPaperPlane, FaCheckCircle, FaDownload } from 'react-icons/fa';

export default function FinalCTASection() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative pb-24 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2 -z-10" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />

      <div className="container-custom">
        <SectionHeading title="Let's Connect" subtitle="Ready to build something amazing together?" align="center" />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Photo & Quote */}
          <FadeIn direction="right">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
              
              {/* Profile Photo */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full p-2 gradient-bg animate-pulse-glow">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[var(--bg-primary)] relative">
                  <Image 
                    src="/images/contact-profile.png"
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Quote */}
              <div className="space-y-4 max-w-md">
                <h3 className="text-3xl font-bold text-white">
                  "The only way to do great work is to love what you do."
                </h3>
                <p className="text-[var(--text-secondary)] font-medium text-lg">— Steve Jobs</p>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <a 
                  href={personalInfo.resumePath}
                  download
                  className="px-8 py-4 rounded-full gradient-bg text-white font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-lg shadow-purple-500/25 text-lg"
                >
                  <FaDownload /> Download Resume
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Right Side: Contact Form */}
          <FadeIn direction="left" delay={0.2}>
            <GlassCard className="p-8 md:p-10 relative overflow-hidden">
              <h3 className="text-2xl font-bold text-white mb-6">Send me a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Your Email</label>
                    <input 
                      type="email" 
                      id="email"
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                  <textarea 
                    id="message"
                    required
                    rows={4}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none resize-none"
                    placeholder="Hello Aditya, I would like to discuss..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                  className="w-full py-4 rounded-lg gradient-bg text-white font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === 'idle' && (
                    <><FaPaperPlane /> Send Message</>
                  )}
                  {formStatus === 'submitting' && (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  )}
                  {formStatus === 'success' && (
                    <><FaCheckCircle /> Message Sent Successfully!</>
                  )}
                </button>
              </form>

              {/* Success Overlay Glow */}
              {formStatus === 'success' && (
                <div className="absolute inset-0 bg-green-500/10 pointer-events-none mix-blend-screen" />
              )}
            </GlassCard>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
