import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import SchoolSection from '@/components/sections/SchoolSection';
import SchoolAchievementsSection from '@/components/sections/SchoolAchievementsSection';
import CollegeSection from '@/components/sections/CollegeSection';
import SubjectsSection from '@/components/sections/SubjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import StatsSection from '@/components/sections/StatsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import HackathonsSection from '@/components/sections/HackathonsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import CodingProfilesSection from '@/components/sections/CodingProfilesSection';
import PhotographySection from '@/components/sections/PhotographySection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FinalCTASection from '@/components/sections/FinalCTASection';
import BackToTop from '@/components/ui/BackToTop';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero with hacker hover-reveal */}
        <HeroSection />

        {/* School journey */}
        <SchoolSection />
        <SchoolAchievementsSection />

        {/* College journey */}
        <CollegeSection />
        <SubjectsSection />

        {/* Skills & Stats */}
        <SkillsSection />
        <StatsSection />

        {/* Projects (clickable with modals) */}
        <ProjectsSection />

        {/* Hackathons */}
        <HackathonsSection />

        {/* Certifications (hover to preview) */}
        <CertificationsSection />

        {/* Coding Profiles */}
        <CodingProfilesSection />

        {/* Photography */}
        <PhotographySection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Final CTA: Photo, Quote, Resume, Contact */}
        <FinalCTASection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
