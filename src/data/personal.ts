import { NavItem } from '@/types';

export const personalInfo = {
  name: 'Aditya Dixit',
  taglines: [
    'Full Stack Developer',
    'Open Source Contributor',
    'Software Developer',
    'AI/ML Enthusiast',
    'Hackathon Finalist'
  ],
  bio: `I'm a passionate developer and tech enthusiast who thrives on building impactful digital experiences through code and creativity. From architecting full-stack applications to competing in national-level hackathons, I'm constantly pushing boundaries and exploring emerging technologies. I specialize in turning complex ideas into elegant, functional products — whether it's an AI-powered platform, a production-grade e-commerce system, or an innovative civic-tech solution. My mission is to grow as a software engineer while crafting solutions that create real-world impact.`,
  email: 'adityadxt1910@gmail.com',
  phone: '+91 7525952244',
  location: 'Kanpur, Uttar Pradesh, India',
  motto: 'I turn curiosity into code and ideas into experiences.',
  resumePath: '/resume/SDE-Resume.pdf',
  profileImage: '/images/aditya-portrait.png',
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/Aditya-dxt', icon: 'FaGithub', color: '#ffffff' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aditya-dixit-085862333/', icon: 'FaLinkedin', color: '#0077B5' },
    { name: 'LeetCode', url: 'https://leetcode.com/u/DEVELOPER-404/', icon: 'SiLeetcode', color: '#FFA116' },
    { name: 'HackerRank', url: 'https://www.hackerrank.com/profile/aditya_dxt', icon: 'FaHackerrank', color: '#00EA64' },
    { name: 'Instagram', url: 'https://www.instagram.com/indeedaditya/', icon: 'FaInstagram', color: '#E4405F' }
  ]
};

export const navItems: NavItem[] = [
  { label: 'Home', href: 'hero' },
  { label: 'School', href: 'school' },
  { label: 'College', href: 'college' },
  { label: 'Skills', href: 'skills' },
  { label: 'Projects', href: 'projects' },
  { label: 'Hackathons', href: 'hackathons' },
  { label: 'Certifications', href: 'certifications' },
  { label: 'Contact', href: 'contact' }
];
