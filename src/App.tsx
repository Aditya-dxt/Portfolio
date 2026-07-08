import { lazy, Suspense, useState, useEffect } from 'react';
import { isReducedMotion } from '@/lib/gsap';
import { LenisProvider } from '@/context/LenisContext';
import { useCursor } from '@/hooks/useCursor';
import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import { GrainOverlay } from '@/components/GrainOverlay';
import { HudBar } from '@/components/HudBar';

const Hero = lazy(() => import('@/components/Hero').then((m) => ({ default: m.Hero })));
const About = lazy(() => import('@/components/About').then((m) => ({ default: m.About })));
const Skills = lazy(() => import('@/components/Skills').then((m) => ({ default: m.Skills })));
const Projects = lazy(() =>
  import('@/components/Projects').then((m) => ({ default: m.Projects })),
);
const Timeline = lazy(() =>
  import('@/components/Timeline').then((m) => ({ default: m.Timeline })),
);
const Education = lazy(() =>
  import('@/components/Education').then((m) => ({ default: m.Education })),
);
const GithubStats = lazy(() =>
  import('@/components/GithubStats').then((m) => ({ default: m.GithubStats })),
);
const Testimonials = lazy(() =>
  import('@/components/Testimonials').then((m) => ({ default: m.Testimonials })),
);
const Photography = lazy(() =>
  import('@/components/Photography').then((m) => ({ default: m.Photography })),
);
const Contact = lazy(() =>
  import('@/components/Contact').then((m) => ({ default: m.Contact })),
);
const Footer = lazy(() => import('@/components/Footer').then((m) => ({ default: m.Footer })));

function SectionFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-void">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <main>
        <Suspense fallback={<SectionFallback />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Education />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Timeline />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <GithubStats />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Photography />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default function App() {
  const [booted, setBooted] = useState(isReducedMotion());
  const [visible, setVisible] = useState(isReducedMotion());
  useCursor();

  useEffect(() => {
    if (typeof history !== 'undefined') {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (!booted) {
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.documentElement.style.overflow = '';
      };
    }
    document.documentElement.style.overflow = '';
  }, [booted]);

  const handlePreloaderComplete = () => {
    window.scrollTo(0, 0);
    setBooted(true);
  };

  return (
    <>
      <CustomCursor />
      <GrainOverlay />
      {!booted && <Preloader onComplete={handlePreloaderComplete} />}
      {booted && (
        <LenisProvider enabled onReady={() => setVisible(true)}>
          <div
            className={
              visible
                ? 'opacity-100 transition-opacity duration-300'
                : 'pointer-events-none opacity-0'
            }
            aria-hidden={!visible}
          >
            <HudBar />
            <AppContent />
          </div>
        </LenisProvider>
      )}
    </>
  );
}
