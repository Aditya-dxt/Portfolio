import { lazy, Suspense, useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '@/lib/gsap';
import { LenisProvider, useScrollRefresh } from '@/context/LenisContext';
import { useCursor } from '@/hooks/useCursor';
import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import { GrainOverlay } from '@/components/GrainOverlay';

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
const Contact = lazy(() =>
  import('@/components/Contact').then((m) => ({ default: m.Contact })),
);
const Footer = lazy(() => import('@/components/Footer').then((m) => ({ default: m.Footer })));

function SectionFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  );
}

function AppContent() {
  const mainRef = useRef<HTMLDivElement>(null);
  useScrollRefresh();

  useGSAP(
    () => {
      if (!mainRef.current || isReducedMotion()) return;
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      );
    },
    { scope: mainRef },
  );

  return (
    <div ref={mainRef}>
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
  const [loaded, setLoaded] = useState(isReducedMotion());
  useCursor();

  return (
    <>
      <CustomCursor />
      <GrainOverlay />
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <LenisProvider enabled={loaded}>
        <div className={loaded ? 'opacity-100' : 'pointer-events-none opacity-0'}>
          {loaded && <AppContent />}
        </div>
      </LenisProvider>
    </>
  );
}
