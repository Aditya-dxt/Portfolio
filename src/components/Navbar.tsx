import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import { useLenisInstance, useAppReady, scrollToTarget } from '@/context/LenisContext';
import { portfolio } from '@/data/portfolio';
import { AnimatePresence, motion } from 'framer-motion';

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const lenis = useLenisInstance();
  const appReady = useAppReady();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolledRef = useRef(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToTarget(lenis, href);
    setMenuOpen(false);
  };

  useGSAP(
    () => {
      if (!progressRef.current || isReducedMotion() || !appReady) return;

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          gsap.set(progressRef.current, {
            scaleX: self.progress,
            transformOrigin: 'left center',
          });
          const isScrolled = self.scroll() > 60;
          if (isScrolled !== scrolledRef.current && navRef.current) {
            scrolledRef.current = isScrolled;
            navRef.current.classList.toggle('glass-panel', isScrolled);
            navRef.current.classList.toggle('py-3', isScrolled);
            navRef.current.classList.toggle('py-5', !isScrolled);
            navRef.current.classList.toggle('bg-transparent', !isScrolled);
          }
        },
      });
    },
    { scope: navRef, dependencies: [lenis, appReady] },
  );

  const scatterLogo = () => {
    if (!logoRef.current || isReducedMotion()) return;
    const chars = logoRef.current.querySelectorAll('span');
    gsap.to(chars, {
      x: () => gsap.utils.random(-30, 30),
      y: () => gsap.utils.random(-20, 20),
      rotation: () => gsap.utils.random(-20, 20),
      duration: 0.4,
      stagger: 0.02,
      ease: 'power2.out',
    });
  };

  const assembleLogo = () => {
    if (!logoRef.current || isReducedMotion()) return;
    const chars = logoRef.current.querySelectorAll('span');
    gsap.to(chars, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: 'elastic.out(1, 0.6)',
    });
  };

  const initials = portfolio.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <>
      <div
        ref={progressRef}
        className="fixed left-0 top-0 z-[9999] h-[2px] w-full origin-left scale-x-0 bg-accent will-change-transform"
        aria-hidden
      />
      <header
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-[9990] bg-transparent py-5 transition-all duration-500"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a
            ref={logoRef}
            href="#hero"
            data-hover
            onClick={(e) => handleNavClick(e, '#hero')}
            onMouseEnter={scatterLogo}
            onMouseLeave={assembleLogo}
            className="heading-display text-sm text-white md:text-base"
            aria-label={portfolio.name}
          >
            {initials.split('').map((c, i) => (
              <span key={i} className="inline-block will-change-transform">
                {c}
              </span>
            ))}
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {portfolio.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  data-hover
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="group relative font-body text-sm text-gray-300 transition-colors hover:text-accent"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            data-hover
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`h-0.5 w-6 bg-white transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span className={`h-0.5 w-6 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span
              className={`h-0.5 w-6 bg-white transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9980] flex items-center justify-center bg-void/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col items-center gap-8">
              {portfolio.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="heading-display text-3xl text-white hover:text-accent"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
