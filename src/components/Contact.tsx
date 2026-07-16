import { useRef, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { useScramble } from '@/hooks/useScramble';
import { useMagnet } from '@/hooks/useMagnet';
import { portfolio } from '@/data/portfolio';
import { socialIconMap, type SocialIconKey } from '@/components/SocialLinks';
import { FaFileDownload } from 'react-icons/fa';
import { SectionHeader } from './SectionHeader';

const fieldConfig = {
  name: { label: 'Name', placeholder: 'Your Name', type: 'text' as const },
  email: { label: 'Email', placeholder: 'Your Email', type: 'email' as const },
  message: {
    label: 'Message',
    placeholder: 'Hello Aditya, I would like to discuss...',
    type: 'textarea' as const,
  },
};

function ContactSocialCard({
  href,
  label,
  icon: Icon,
  download,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  download?: boolean;
}) {
  const magnet = useMagnet(60);
  return (
    <a
      ref={magnet.ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      target={download ? undefined : '_blank'}
      rel="noopener noreferrer"
      download={download}
      data-hover
      onMouseMove={magnet.onMove}
      onMouseLeave={magnet.onLeave}
      className="glass-panel flex flex-col items-center gap-2 rounded-xl py-4 will-change-transform hover:border-accent/30 sm:py-5"
    >
      <Icon size={22} className="text-accent" />
      <span className="font-body text-[10px] text-gray-400">{label}</span>
    </a>
  );
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const headlineRef = useScramble("LET'S BUILD SOMETHING GREAT", 1.5, true);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      if (!emailRef.current || isReducedMotion()) return;
      const chars = emailRef.current.querySelectorAll('[data-char]');

      const onEnter = () => {
        gsap.to(chars, {
          y: () => gsap.utils.random(-8, 8),
          stagger: 0.02,
          duration: 0.3,
          ease: 'power2.out',
        });
      };
      const onLeave = () => {
        gsap.to(chars, { y: 0, stagger: 0.02, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
      };

      emailRef.current.addEventListener('mouseenter', onEnter);
      emailRef.current.addEventListener('mouseleave', onLeave);
      return () => {
        emailRef.current?.removeEventListener('mouseenter', onEnter);
        emailRef.current?.removeEventListener('mouseleave', onLeave);
      };
    },
    { scope: sectionRef },
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 py-20 sm:px-6 sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(0,212,255,0.15), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(123,47,190,0.2), transparent 50%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <SectionHeader number="07" title="CONTACT" />
        
        <div className="mb-8 text-center sm:mb-12">
          <h3
            ref={headlineRef}
            className="heading-display mb-3 text-xl text-white sm:text-2xl md:text-3xl"
          />
          <p className="font-body text-sm text-gray-400 sm:text-base">
            Open to freelance, full-time, and collaboration
          </p>
        </div>

        <div className="text-center">
          <a
            ref={emailRef}
            href={`mailto:${portfolio.email}`}
            data-hover
            className="group relative mb-10 inline-block max-w-full break-all font-heading text-lg text-accent sm:mb-16 sm:text-2xl md:text-4xl"
          >
            {portfolio.email.split('').map((char, i) => (
              <span key={i} data-char className="inline-block will-change-transform">
                {char}
              </span>
            ))}
            <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-5 text-left sm:space-y-6">
          {(Object.keys(fieldConfig) as Array<keyof typeof fieldConfig>).map((field) => {
            const cfg = fieldConfig[field];
            return (
              <div key={field}>
                <label htmlFor={field} className="mb-2 block font-body text-sm text-gray-400">
                  {cfg.label}
                </label>
                {cfg.type === 'textarea' ? (
                  <textarea
                    id={field}
                    name={field}
                    rows={4}
                    required
                    placeholder={cfg.placeholder}
                    className="beam-border w-full resize-none rounded-xl bg-void/80 px-4 py-3 font-body text-white placeholder:text-gray-500 outline-none"
                  />
                ) : (
                  <input
                    id={field}
                    name={field}
                    type={cfg.type}
                    required
                    placeholder={cfg.placeholder}
                    className="beam-border w-full rounded-xl bg-void/80 px-4 py-3 font-body text-white placeholder:text-gray-500 outline-none"
                  />
                )}
              </div>
            );
          })}

          <button
            type="submit"
            data-hover
            className="w-full rounded-xl bg-gradient-to-r from-accent to-purple py-3.5 font-body font-medium text-void transition-opacity hover:opacity-90 sm:py-4"
          >
            Send Message
          </button>

          <AnimatePresence>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm text-accent"
              >
                Thanks! Your message has been received. (Demo — connect a backend for production.)
              </motion.p>
            )}
          </AnimatePresence>
        </form>

        <div className="mt-12 grid grid-cols-2 gap-2 sm:mt-16 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {portfolio.social.map((link) => {
            const Icon = socialIconMap[link.icon as SocialIconKey];
            return (
              <ContactSocialCard
                key={link.name}
                href={link.url}
                label={link.name}
                icon={Icon}
              />
            );
          })}
          <ContactSocialCard
            href={portfolio.resumePath}
            label="Resume"
            icon={FaFileDownload}
            download
          />
        </div>
      </div>
    </section>
  );
}
