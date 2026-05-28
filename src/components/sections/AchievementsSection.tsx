'use client';

import { achievementsData } from '@/data/achievements';
import SectionHeading from '@/components/ui/SectionHeading';
import Timeline from '@/components/ui/Timeline';
import FadeIn from '@/components/effects/FadeIn';

export default function AchievementsSection() {
  const timelineItems = achievementsData.map((a) => ({
    title: a.title,
    subtitle: a.category === 'sports' ? '🏅 Sports' : a.category === 'college' ? '🎓 College' : '👑 Leadership',
    description: a.description,
    year: String(a.year),
    icon: a.category === 'college' ? '🏆' : a.category === 'leadership' ? '👑' : '🏅',
    highlight: a.title.includes('Finalist') || a.title.includes('Captain'),
  }));

  return (
    <section id="achievements" className="relative">
      <div className="container-custom">
        <SectionHeading title="Achievements" subtitle="Milestones in my journey" />
        <FadeIn direction="up">
          <div className="mt-12">
            <Timeline items={timelineItems} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
