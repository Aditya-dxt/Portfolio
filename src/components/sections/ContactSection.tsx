'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { personalInfo } from '@/data/personal';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/effects/FadeIn';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaGithub, FaLinkedin, FaHackerrank, FaInstagram, FaCheckCircle } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your Formspree form ID

const socialIconMap: Record<string, React.ReactNode> = {
  FaGithub: <FaGithub size={18} />,
  FaLinkedin: <FaLinkedin size={18} />,
  SiLeetcode: <SiLeetcode size={18} />,
  FaHackerrank: <FaHackerrank size={18} />,
  FaInstagram: <FaInstagram size={18} />,
};

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClasses =
    'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none';

  return (
    <section id="contact" className="relative">
      <div className="container-custom">
        <SectionHeading title="Get In Touch" subtitle="Let's build something amazing together" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Contact Form */}
          <FadeIn direction="left">
            <GlassCard>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" name="name" placeholder="Your Name" required className={inputClasses} />
                  <input type="email" name="email" placeholder="Your Email" required className={inputClasses} />
                </div>
                <input type="text" name="subject" placeholder="Subject" required className={inputClasses} />
                <textarea name="message" placeholder="Your Message" required rows={5} className={`${inputClasses} resize-none`} />

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl gradient-bg text-white font-semibold hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    'Sending...'
                  ) : status === 'success' ? (
                    <><FaCheckCircle /> Message Sent!</>
                  ) : (
                    <><FaPaperPlane /> Send Message</>
                  )}
                </button>

                {status === 'error' && (
                  <p className="text-red-400 text-sm text-center">Something went wrong. Please try emailing directly.</p>
                )}
              </form>
            </GlassCard>
          </FadeIn>

          {/* Contact Info */}
          <FadeIn direction="right" delay={0.2}>
            <GlassCard className="h-full">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-full overflow-hidden border-2 border-purple-500/30 bg-purple-500/10">
                  <Image 
                    src="/images/contact-profile.png" 
                    alt="Aditya Dixit Profile" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Contact Details</h3>
                  <p className="text-[var(--text-secondary)] text-sm">Feel free to reach out via email or phone!</p>
                </div>
              </div>

              <div className="space-y-5 mb-8">
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-4 group">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Email</p>
                    <p className="text-[var(--text-primary)] font-medium">{personalInfo.email}</p>
                  </div>
                </a>

                <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-4 group">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <FaPhone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Phone</p>
                    <p className="text-[var(--text-primary)] font-medium">{personalInfo.phone}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Location</p>
                    <p className="text-[var(--text-primary)] font-medium">{personalInfo.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-3 font-semibold">Find me on</p>
                <div className="flex gap-3">
                  {personalInfo.socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 border border-white/10 text-[var(--text-secondary)] hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 hover:scale-110 transition-all duration-300"
                      aria-label={link.name}
                    >
                      {socialIconMap[link.icon]}
                    </a>
                  ))}
                </div>
              </div>

              {/* Decorative gradient */}
              <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/5">
                <p className="text-sm text-[var(--text-secondary)] italic text-center">
                  &ldquo;{personalInfo.motto}&rdquo;
                </p>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
