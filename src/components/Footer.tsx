import { motion } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import { useLenisInstance } from '@/context/LenisContext';
import { SocialLinks } from '@/components/SocialLinks';

export function Footer() {
  const lenis = useLenisInstance();

  const scrollTop = () => {
    lenis?.scrollTo(0, { duration: 1.4 });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-white/5 px-6 py-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6">
        <SocialLinks className="justify-center" iconSize={18} showLabels />
        <div className="flex w-full flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="font-body text-xs text-gray-500">
            Built by {portfolio.name} with React + GSAP ❤️
          </p>
          <button
            type="button"
            data-hover
            onClick={scrollTop}
            className="font-body text-xs uppercase tracking-widest text-accent hover:underline"
          >
            Back to top
          </button>
          <p className="font-body text-xs text-gray-500">
            © {new Date().getFullYear()} {portfolio.name}
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
