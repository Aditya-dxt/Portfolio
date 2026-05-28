'use client';

import { testimonials } from '@/data/testimonials';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/effects/FadeIn';
import { FaQuoteLeft } from 'react-icons/fa';

export default function TestimonialsSection() {
  // If there are no testimonials, don't render the section
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="relative py-24 bg-gradient-to-t from-black/20 to-transparent">
      <div className="container-custom">
        <FadeIn direction="up">
          <SectionHeading title="Testimonials" subtitle="What people say about me" align="center" />
        </FadeIn>

        <div className="mt-16 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.id} direction="up" delay={index * 0.1}>
              <GlassCard className="p-8 md:p-12 relative overflow-hidden border-cyan-500/20 flex flex-col items-center text-center">
                {/* Centered decorative quote icon */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center mb-8 border border-white/5 shadow-inner">
                  <FaQuoteLeft className="text-2xl text-cyan-400/80" />
                </div>
                
                <div className="relative z-10 w-full flex flex-col items-center">
                  <p className="text-xl md:text-2xl text-white italic font-medium leading-relaxed mb-10 max-w-3xl">
                    {testimonial.quote}
                  </p>
                  
                  <div className="flex flex-col items-center justify-center gap-4 mt-auto">
                    <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center shadow-lg shadow-purple-500/20 text-white font-bold text-xl border-2 border-white/10">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-[var(--text-secondary)] text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
