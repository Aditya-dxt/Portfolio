import { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: 'FaCode',
    color: '#8b5cf6',
    skills: [
      { name: 'JavaScript', level: 90, icon: 'SiJavascript' },
      { name: 'Java', level: 85, icon: 'FaJava' },
      { name: 'Python', level: 80, icon: 'SiPython' },
      { name: 'C++', level: 75, icon: 'SiCplusplus' },
      { name: 'C', level: 70, icon: 'SiC' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: 'FaPalette',
    color: '#06d6a0',
    skills: [
      { name: 'HTML5', level: 95, icon: 'SiHtml5' },
      { name: 'React.js', level: 90, icon: 'SiReact' },
      { name: 'CSS3', level: 90, icon: 'SiCss3' },
      { name: 'Tailwind CSS', level: 88, icon: 'SiTailwindcss' },
      { name: 'Framer Motion', level: 75, icon: 'SiFramer' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: 'FaServer',
    color: '#f59e0b',
    skills: [
      { name: 'REST APIs', level: 88, icon: 'FaPlug' },
      { name: 'Node.js', level: 85, icon: 'SiNodedotjs' },
      { name: 'Express.js', level: 85, icon: 'SiExpress' },
      { name: 'Authentication', level: 80, icon: 'FaShieldAlt' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    icon: 'FaDatabase',
    color: '#ef4444',
    skills: [
      { name: 'MongoDB', level: 85, icon: 'SiMongodb' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning',
    icon: 'FaBrain',
    color: '#ec4899',
    skills: [
      { name: 'Python for AI/ML', level: 70, icon: 'SiPython' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: 'FaTools',
    color: '#14b8a6',
    skills: [
      { name: 'VS Code', level: 95, icon: 'SiVisualstudiocode' },
      { name: 'GitHub', level: 92, icon: 'SiGithub' },
      { name: 'Git', level: 90, icon: 'SiGit' },
      { name: 'Vercel', level: 85, icon: 'SiVercel' },
      { name: 'Postman', level: 80, icon: 'SiPostman' },
      { name: 'Render', level: 75, icon: 'SiRender' },
    ],
  },
];
