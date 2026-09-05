import { Suspense, useState, useEffect } from 'react';
import { LenisProvider } from '@/context/LenisContext';
import { useCursor } from '@/hooks/useCursor';
import { CustomCursor } from '@/components/CustomCursor';
import { GrainOverlay } from '@/components/GrainOverlay';
import { NavbarEditorial } from '@/components/editorial/NavbarEditorial';
import { ScrollProgress } from '@/components/editorial/ScrollProgress';
import { HeroEditorial } from '@/components/editorial/HeroEditorial';
import { ProjectsEditorial } from '@/components/editorial/ProjectsEditorial';
import { ProcessSkills } from '@/components/editorial/ProcessSkills';
import { EducationEditorial } from '@/components/editorial/EducationEditorial';
import { ExperienceEditorial } from '@/components/editorial/ExperienceEditorial';
import { SportsCertificatesEditorial } from '@/components/editorial/SportsCertificatesEditorial';
import { CertificationsEditorial } from '@/components/editorial/CertificationsEditorial';
import { HackathonsEditorial } from '@/components/editorial/HackathonsEditorial';
import { PhotographyEditorial } from '@/components/editorial/PhotographyEditorial';
import { ContactEditorial } from '@/components/editorial/ContactEditorial';
import { useReveal } from '@/components/editorial/Reveal';

function SectionFallback() {
  return (
    <div className="flex min-h-[30vh] items-center justify-center bg-[var(--bg-light)]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
    </div>
  );
}

function EditorialShell() {
  const revealRef = useReveal();
  return (
    <div ref={revealRef} className="min-h-screen bg-[var(--bg-light)]">
      <NavbarEditorial />
      <main>
        <Suspense fallback={<SectionFallback />}><HeroEditorial /></Suspense>
        <Suspense fallback={<SectionFallback />}><ProjectsEditorial /></Suspense>
        <Suspense fallback={<SectionFallback />}><ProcessSkills /></Suspense>
        <Suspense fallback={<SectionFallback />}><EducationEditorial /></Suspense>
        <Suspense fallback={<SectionFallback />}><ExperienceEditorial /></Suspense>
        <Suspense fallback={<SectionFallback />}><SportsCertificatesEditorial /></Suspense>
        <Suspense fallback={<SectionFallback />}><CertificationsEditorial /></Suspense>
        <Suspense fallback={<SectionFallback />}><HackathonsEditorial /></Suspense>
        <Suspense fallback={<SectionFallback />}><PhotographyEditorial /></Suspense>
        <Suspense fallback={<SectionFallback />}><ContactEditorial /></Suspense>
      </main>
    </div>
  );
}

export default function App() {
  const [visible, setVisible] = useState(true);
  useCursor();

  useEffect(() => {
    if (typeof history !== 'undefined') history.scrollRestoration = 'manual';
  }, []);

  return (
    <>
      <CustomCursor />
      <GrainOverlay />
      <ScrollProgress />
      <LenisProvider enabled onReady={() => setVisible(true)}>
          <div className={visible ? 'opacity-100 transition-opacity duration-300' : 'pointer-events-none opacity-0'} aria-hidden={!visible}>
            <EditorialShell />
          </div>
        </LenisProvider>
    </>
  );
}
