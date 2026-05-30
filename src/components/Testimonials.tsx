import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { useScrollRefresh } from '@/context/LenisContext';
import { portfolio } from '@/data/portfolio';
import { FaQuoteLeft } from 'react-icons/fa';

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollRefresh();

  useGSAP(
    () => {
      if (!sectionRef.current || isReducedMotion()) return;
      gsap.from('[data-testimonial-card]', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    },
    { scope: sectionRef },
  );

  if (!portfolio.testimonials.length) return null;

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center sm:mb-16"
        >
          <h2 className="heading-display text-3xl text-white sm:text-4xl md:text-5xl">
            Testimonials
          </h2>
          <p className="mt-3 font-body text-sm text-gray-400 sm:text-base">
            What people say about me
          </p>
        </motion.div>

        <div className="space-y-8">
          {portfolio.testimonials.map((item) => (
            <div
              key={item.id}
              data-testimonial-card
              className="glass-panel relative overflow-hidden rounded-2xl p-6 text-center sm:p-10 md:p-12"
            >
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-accent/10 sm:mb-8 sm:h-16 sm:w-16">
                <FaQuoteLeft className="text-xl text-accent sm:text-2xl" />
              </div>
              <p className="mx-auto max-w-3xl font-body text-base italic leading-relaxed text-white sm:text-lg md:text-xl">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent/30 bg-gradient-to-br from-accent/20 to-purple/20 font-heading text-lg text-white">
                  {item.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <h4 className="font-heading text-base uppercase tracking-wide text-white sm:text-lg">
                    {item.name}
                  </h4>
                  <p className="font-body text-sm text-gray-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
