// =============================================================================
// Portfolio Type Definitions
// Comprehensive TypeScript interfaces for all data structures used across
// the portfolio website. These types enforce consistency between data files
// and component props throughout the application.
// =============================================================================

// -----------------------------------------------------------------------------
// Navigation
// -----------------------------------------------------------------------------

/** Represents a single navigation menu item */
export interface NavItem {
  /** Display label shown in the navbar */
  label: string;
  /** Anchor href (e.g., "#about", "#projects") */
  href: string;
}

// -----------------------------------------------------------------------------
// Personal / Hero Section
// -----------------------------------------------------------------------------

/** Social media or professional profile link */
export interface SocialLink {
  /** Platform name (e.g., "GitHub", "LinkedIn") */
  name: string;
  /** Full URL to the profile */
  url: string;
  /** react-icons identifier string (e.g., "FaGithub") */
  icon: string;
  /** Brand hex color for hover/accent styling */
  color: string;
}

/** Core personal information displayed in the Hero and About sections */
export interface PersonalInfo {
  /** Full name */
  name: string;
  /** Array of taglines cycled through via typing animation */
  taglines: string[];
  /** Short biography paragraph */
  bio: string;
  /** Contact email address */
  email: string;
  /** Contact phone number */
  phone: string;
  /** City / region string */
  location: string;
  /** Personal motto or guiding philosophy */
  motto: string;
  /** Path to downloadable resume PDF (relative to /public) */
  resumePath: string;
  /** Path to profile/avatar image (relative to /public) */
  profileImage: string;
  /** List of social / professional links */
  socialLinks: SocialLink[];
}

// -----------------------------------------------------------------------------
// Education
// -----------------------------------------------------------------------------

/** A single education entry (school, college, university) */
export interface Education {
  /** Unique identifier */
  id: string;
  /** Name of the institution */
  institution: string;
  /** Degree or level (e.g., "B.Tech", "Class XII") */
  degree: string;
  /** Examination board, if applicable (e.g., "CBSE") */
  board?: string;
  /** Field of study or specialization */
  field?: string;
  /** Grade achieved (numeric string, e.g., "9.2" or "95.4") */
  grade: string;
  /** Whether the grade is a CGPA or percentage */
  gradeType: 'CGPA' | 'Percentage';
  /** Year of enrollment */
  startYear: number;
  /** Year of graduation — string allowed for "Present" */
  endYear: number | string;
  /** Notable coursework or subjects */
  coursework?: string[];
  /** Path to institution logo image */
  logo?: string;
}

// -----------------------------------------------------------------------------
// Skills
// -----------------------------------------------------------------------------

/** An individual skill with a proficiency level */
export interface Skill {
  /** Skill name (e.g., "React", "Python") */
  name: string;
  /** react-icons identifier or image path for the skill icon */
  icon: string;
  /** Proficiency level from 0–100, used for progress bar rendering */
  level: number;
}

/** A logical grouping of related skills */
export interface SkillCategory {
  /** Unique identifier */
  id: string;
  /** Category title (e.g., "Frontend", "DevOps") */
  title: string;
  /** Icon representing the category */
  icon: string;
  /** Color for the category */
  color?: string;
  /** Skills belonging to this category */
  skills: Skill[];
}

// -----------------------------------------------------------------------------
// Projects
// -----------------------------------------------------------------------------

/** Allowed project category filter values */
export type ProjectCategory =
  | 'fullstack'
  | 'ai-ml'
  | 'frontend'
  | 'cybersecurity'
  | 'all';

/** A portfolio project entry */
export interface Project {
  /** Unique identifier */
  id: string;
  /** Project title */
  title: string;
  /** Short one-liner */
  description: string;
  /** Detailed description */
  longDescription?: string;
  /** Technologies used */
  techStack: string[];
  /** Category for filtering */
  category: string;
  /** GitHub repository URL */
  github: string;
  /** Live demo URL (optional) */
  liveUrl?: string;
  /** Path to project screenshot / thumbnail */
  image: string;
  /** Whether to highlight this project */
  featured?: boolean;
  /** Tags for the project */
  tags?: string[];
  /** Key highlights / bullet points */
  highlights?: string[];
}

// -----------------------------------------------------------------------------
// Achievements
// -----------------------------------------------------------------------------

/** Type of achievement context */
export type AchievementType = 'school' | 'college' | 'leadership';

/** A notable achievement or award */
export interface Achievement {
  /** Unique identifier */
  id: string;
  /** Achievement title */
  title: string;
  /** Brief description of the achievement */
  description: string;
  /** Year earned — string allowed for ranges like "2023-24" */
  year: number | string;
  /** Organization or context */
  organization?: string;
  /** Category of achievement */
  category?: string;
  /** Context in which the achievement was earned */
  type?: AchievementType;
  /** react-icons identifier for display */
  icon: string;
}

// -----------------------------------------------------------------------------
// Hackathons
// -----------------------------------------------------------------------------

/** A hackathon participation entry */
export interface Hackathon {
  /** Unique identifier */
  id: string;
  /** Hackathon name */
  name: string;
  /** Organizing body or company */
  organizer: string;
  /** Event venue or "Virtual" */
  venue: string;
  /** Date or date range string */
  date: string;
  /** Description of participation / project built */
  description: string;
  /** Role in the team */
  role: string;
  /** Placement or result */
  result?: string;
  /** Whether the team reached the finals */
  isFinalist?: boolean;
  /** URL to hackathon page */
  url?: string;
  /** Hackathon themes or tracks */
  themes?: string[];
  /** Tags */
  tags?: string[];
  /** Team size */
  teamSize?: number;
  /** Project name */
  projectName?: string;
  /** Icon identifier */
  icon?: string;
}

// -----------------------------------------------------------------------------
// Experience
// -----------------------------------------------------------------------------

/** Type of experience / role */
export type ExperienceType = 'leadership' | 'club' | 'volunteer' | 'internship';

/** A professional or extracurricular experience entry */
export interface Experience {
  /** Unique identifier */
  id: string;
  /** Role or position title */
  role: string;
  /** Organization or company name */
  organization: string;
  /** Duration string (e.g., "Jan 2024 – Present") */
  duration: string;
  /** Category of the experience */
  type: ExperienceType;
  /** Bullet-point descriptions of responsibilities and accomplishments */
  description: string[];
  /** Whether this is a currently held position */
  current?: boolean;
}

// -----------------------------------------------------------------------------
// Certifications
// -----------------------------------------------------------------------------

/** Certification domain category */
export type CertificationCategory =
  | 'cloud'
  | 'networking'
  | 'webdev'
  | 'ai'
  | 'career'
  | 'analytics';

/** A professional certification */
export interface Certification {
  /** Unique identifier */
  id: string;
  /** Certification name */
  name: string;
  /** Issuing organization (e.g., "AWS", "Cisco") */
  issuer: string;
  /** Domain category for filtering / grouping */
  category: CertificationCategory;
  /** Path to certification badge or issuer logo */
  image?: string;
}

// -----------------------------------------------------------------------------
// Coding Profiles
// -----------------------------------------------------------------------------

/** A competitive-coding or developer-platform profile */
export interface CodingProfile {
  /** Platform name (e.g., "LeetCode", "Codeforces") */
  name: string;
  /** Username on the platform */
  username: string;
  /** Profile URL */
  url: string;
  /** react-icons identifier */
  icon: string;
  /** Brand hex color */
  color: string;
  /** Optional stats (e.g., { rating: 1800, solved: 350 }) */
  stats?: Record<string, string | number>;
}

// -----------------------------------------------------------------------------
// Testimonials
// -----------------------------------------------------------------------------

/** A testimonial or endorsement quote */
export interface Testimonial {
  /** Unique identifier */
  id: string;
  /** Name of the person giving the testimonial */
  name: string;
  /** Their role / title */
  role: string;
  /** The quote text */
  quote: string;
  /** Optional avatar image path */
  image?: string;
}

// -----------------------------------------------------------------------------
// Stats (About / Hero section counters)
// -----------------------------------------------------------------------------

/** A single stat counter displayed in the stats bar */
export interface Stat {
  /** Unique identifier */
  id: string;
  /** Label beneath the number (e.g., "Projects") */
  label: string;
  /** Numeric value to count up to */
  value: number;
  /** Suffix appended after the number (e.g., "+", "%") */
  suffix: string;
  /** react-icons identifier */
  icon: string;
}

// -----------------------------------------------------------------------------
// Section metadata (optional, for dynamic section rendering)
// -----------------------------------------------------------------------------

/** Metadata describing a page section for dynamic rendering or SEO */
export interface SectionMeta {
  /** Section HTML id attribute */
  id: string;
  /** Display title */
  title: string;
  /** Subtitle or short description */
  subtitle: string;
}
