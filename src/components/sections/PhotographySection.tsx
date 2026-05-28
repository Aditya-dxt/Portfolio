'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/effects/FadeIn';
import { FaCamera, FaTimes, FaExpand } from 'react-icons/fa';

// Placeholder gradients for the photography grid
const placeholderGradients = [
  'from-purple-500/20 to-cyan-500/20',
  'from-blue-500/20 to-teal-500/20',
  'from-pink-500/20 to-orange-500/20',
  'from-emerald-500/20 to-cyan-500/20',
  'from-amber-500/20 to-red-500/20',
  'from-indigo-500/20 to-purple-500/20',
];

export default function PhotographySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Define strict grid spans to avoid content overflow
  const getSpanClasses = (index: number) => {
    if (index === 0) return 'col-span-2 row-span-2';
    if (index === 3) return 'col-span-2 row-span-1';
    return 'col-span-1 row-span-1';
  };

  return (
    <section id="photography" className="relative py-24">
      <div className="container-custom">
        <FadeIn direction="up">
          <SectionHeading title="Through My Lens" subtitle="Capturing moments, one frame at a time" align="center" />
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {placeholderGradients.map((gradient, index) => (
              <motion.div
                key={index}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group bg-gradient-to-br ${gradient} border border-white/10 ${getSpanClasses(index)}`}
                whileHover={{ scale: 0.98 }}
                onClick={() => setSelectedImage(index)}
              >
                {/* Decorative background pattern */}
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40 group-hover:text-white transition-colors duration-300">
                  <FaCamera className="text-4xl mb-3 opacity-50 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium text-sm tracking-wider uppercase">Photo {index + 1}</span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 text-white font-medium">
                    <FaExpand /> View
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-xl text-[var(--text-secondary)] italic font-medium">
              "Photography is not just a hobby — it's how I see the world. 📷"
            </p>
            <p className="mt-4 text-sm text-gray-500">
              * Actual photographs will be updated soon.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-pointer"
              onClick={() => setSelectedImage(null)}
            />
            
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <FaTimes size={20} />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-gradient-to-br ${placeholderGradients[selectedImage]} border border-white/20 flex flex-col items-center justify-center shadow-2xl z-10`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />
              <FaCamera className="text-8xl text-white/30 mb-6" />
              <h3 className="text-3xl font-bold text-white mb-2">Photograph {selectedImage + 1}</h3>
              <p className="text-gray-400">Captured by Aditya Dixit</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
