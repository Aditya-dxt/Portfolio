export const portfolio = {
  name: 'Aditya Dixit',
  role: 'Full Stack Developer & UI Engineer',
  tagline: 'I craft digital experiences that feel alive',
  rolesCycle: [
    'Full Stack Developer',
    'Open Source Contributor',
    'AI/ML Enthusiast',
    'Software Developer',
    'Hackathon Finalist',
  ],
  email: 'adityadxt1910@gmail.com',
  phone: '+91 7525952244',
  location: 'Kanpur, Uttar Pradesh, India',
  github: 'https://github.com/Aditya-dxt',
  linkedin: 'https://www.linkedin.com/in/aditya-dixit-085862333/',
  leetcode: 'https://leetcode.com/u/DEVELOPER-404/',
  hackerrank: 'https://www.hackerrank.com/profile/aditya_dxt',
  instagram: 'https://www.instagram.com/indeedaditya/',
  resumePath: '/resume/SDE-Resume.pdf',
  profileImage: '/images/aditya-portrait.png',
  bio: `I'm a passionate developer and tech enthusiast who thrives on building impactful digital experiences through code and creativity. From architecting full-stack applications to competing in national-level hackathons, I'm constantly pushing boundaries and exploring emerging technologies. I specialize in turning complex ideas into elegant, functional products — whether it's an AI-powered platform, a production-grade e-commerce system, or an innovative civic-tech solution.`,
  motto: 'I turn curiosity into code and ideas into experiences.',
  philosophy:
    'Great software is invisible — it feels inevitable, like it was always meant to exist.',
  funFacts: [
    'India Innovates 2026 Finalist at Bharat Mandapam',
    'Led teams across 4 national hackathons',
    'Sports Captain & House Captain at school',
  ],
  stats: [
    { label: 'Years Experience', value: '2+' },
    { label: 'Projects Built', value: '15+' },
    { label: 'Hackathons', value: '4+' },
  ],
  testimonials: [
    {
      id: 'vaibhav',
      name: 'Vaibhav Tripathi',
      role: 'Student at PSIT',
      quote:
        'Aditya is a highly motivated developer with strong problem-solving skills and a passion for learning new technologies. His dedication to building impactful projects and leading teams in hackathons is truly inspiring.',
    },
  ],
  githubStats: {
    username: 'Aditya-dxt',
    commits: 1240,
    stars: 48,
    prs: 32,
    repos: 10,
    avatar: 'https://github.com/Aditya-dxt.png',
    bio: 'Building impactful digital experiences · B.Tech CSE · Hackathon Finalist',
  },
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ],
  social: [
    { name: 'GitHub', url: 'https://github.com/Aditya-dxt', icon: 'github' },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/aditya-dixit-085862333/',
      icon: 'linkedin',
    },
    { name: 'LeetCode', url: 'https://leetcode.com/u/DEVELOPER-404/', icon: 'leetcode' },
    { name: 'Instagram', url: 'https://www.instagram.com/indeedaditya/', icon: 'instagram' },
    {
      name: 'HackerRank',
      url: 'https://www.hackerrank.com/profile/aditya_dxt',
      icon: 'hackerrank',
    },
  ],
  education: {
    school: {
      name: 'St. Thomas School',
      location: 'Kanpur, Uttar Pradesh',
      image: '/images/school.jpg',
      milestones: [
        {
          title: 'UKG',
          period: '2011 – 2012',
          description: 'The beginning of the journey — early education and foundation years.',
        },
        {
          title: 'Primary to Middle School',
          period: '2012 – 2021',
          description:
            'Formative years of learning, sports, and discovering interests in science and technology.',
        },
        {
          title: 'Class 10 (ICSE)',
          period: '2021 – 2022',
          grade: '91.2%',
          description: 'Strong academic foundation in sciences and mathematics.',
        },
        {
          title: 'Class 11 & House Captain',
          period: '2022 – 2023',
          description:
            'Appointed House Captain — developed leadership and team management skills.',
          badge: 'House Captain 👑',
        },
        {
          title: 'Class 12 (ISC) & Sports Captain',
          period: '2023 – 2024',
          grade: '78.4%',
          description: 'Graduated with Physics, Chemistry, and Mathematics.',
          badge: 'Sports Captain 🏅',
        },
      ],
    },
    college: {
      name: 'PSIT',
      fullName: 'Pranveer Singh Institute of Technology',
      degree: 'B.Tech Computer Science & Engineering',
      location: 'Kanpur, Uttar Pradesh',
      image: '/images/college.jpg',
      cgpa: '7.3',
      milestones: [
        {
          title: '1st Year',
          period: '2024 – 2025',
          description:
            'Started B.Tech CSE. Built foundations in programming, data structures, and algorithms.',
        },
        {
          title: '2nd Year',
          period: '2025 – 2026',
          description:
            'Deep dive into full-stack development, AI/ML, and national-level hackathons.',
        },
        {
          title: '3rd Year (Sem 5)',
          period: '2026 – Present',
          description:
            'Advanced system design, open-source contributions, and production-ready apps.',
          current: true,
        },
        {
          title: '4th Year',
          period: '2027 – 2028',
          description: 'Upcoming graduation and future endeavors.',
          upcoming: true,
        },
      ],
    },
  },
  projects: [
    {
      id: '01',
      name: 'CivicSentinel AI',
      stack: ['Python', 'ML', 'NLP', 'JavaScript'],
      description:
        'AI-powered civic complaint platform that classifies, prioritizes, and routes citizen grievances to the right departments.',
      image: '/images/projects/project1.png',
      live: '#',
      github: 'https://github.com/Aditya-dxt/civicsentinel-ai',
    },
    {
      id: '02',
      name: 'SneakerVault',
      stack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
      description:
        'Premium MERN e-commerce for sneakers with JWT auth, Stripe payments, admin dashboard, and 3D product animations.',
      image: '/images/projects/project2.png',
      live: '#',
      github: 'https://github.com/Aditya-dxt/mern-ecommerce-india',
    },
    {
      id: '03',
      name: 'Interview AI',
      stack: ['React', 'Node.js', 'OpenAI', 'Gemini'],
      description:
        'Mock interview platform that generates questions, evaluates responses, and delivers real-time feedback.',
      image: '/images/projects/project3.png',
      live: '#',
      github: 'https://github.com/Aditya-dxt/interview-ai',
    },
    {
      id: '04',
      name: 'Waterfall Login UI',
      stack: ['React', 'CSS3', 'Animations'],
      description:
        'Stunning animated login UI with cascading waterfall effects, glassmorphism, and micro-interactions.',
      image: '/images/projects/project4.png',
      live: '#',
      github: 'https://github.com/Aditya-dxt/waterfall-login-UI',
    },
    {
      id: '05',
      name: 'Smart Packet Analyzer',
      stack: ['Java', 'Networking', 'Cybersecurity'],
      description:
        'Real-time network packet capture, inspection, and visualization for protocol analysis and threat detection.',
      image: '/images/projects/project5.png',
      live: '#',
      github: 'https://github.com/Aditya-dxt/smart-packet-analyzer',
    },
  ],
  skillCategories: [
    {
      id: 'frontend',
      label: 'Frontend',
      skills: [
        { name: 'React', icon: '⚛️' },
        { name: 'Next.js', icon: '▲' },
        { name: 'TypeScript', icon: 'TS' },
        { name: 'Tailwind', icon: '🎨' },
        { name: 'Framer Motion', icon: '✨' },
        { name: 'HTML5', icon: '🌐' },
        { name: 'CSS3', icon: '💅' },
      ],
    },
    {
      id: 'backend',
      label: 'Backend',
      skills: [
        { name: 'Node.js', icon: '🟢' },
        { name: 'Express', icon: '🚀' },
        { name: 'REST APIs', icon: '🔌' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'Auth/JWT', icon: '🔐' },
        { name: 'Python', icon: '🐍' },
      ],
    },
    {
      id: 'tools',
      label: 'Tools',
      skills: [
        { name: 'Git', icon: '📦' },
        { name: 'GitHub', icon: '🐙' },
        { name: 'GSAP', icon: '⚡' },
        { name: 'Figma', icon: '🎯' },
        { name: 'Vercel', icon: '▲' },
        { name: 'Postman', icon: '📮' },
      ],
    },
    {
      id: 'design',
      label: 'Design',
      skills: [
        { name: 'UI/UX', icon: '✏️' },
        { name: 'Glassmorphism', icon: '💎' },
        { name: 'Three.js', icon: '🎲' },
        { name: 'Responsive', icon: '📱' },
        { name: 'Motion Design', icon: '🎬' },
      ],
    },
  ],
  marqueeSkills: [
    'React',
    'TypeScript',
    'Node.js',
    'GSAP',
    'Three.js',
    'MongoDB',
    'Python',
    'Next.js',
    'Tailwind',
    'Figma',
  ],
  timeline: [
    {
      id: 'edu-college',
      type: 'education' as const,
      title: 'B.Tech Computer Science & Engineering',
      org: 'Pranveer Singh Institute of Technology',
      period: '2024 – 2028',
      description: 'CGPA 7.3 · DSA, DBMS, OS, Networks, AI/ML, Full Stack',
      tags: ['CSE', 'B.Tech', 'Kanpur'],
    },
    {
      id: 'exp-hackathon',
      type: 'work' as const,
      title: 'Team Leader — National Hackathons',
      org: 'India Innovates, IIT Hyderabad, IIT BHU & more',
      period: 'Jan 2026 – Present',
      description:
        'Led teams across 4 national hackathons. Finalist at India Innovates 2026, Bharat Mandapam, New Delhi.',
      tags: ['Leadership', 'AI/ML', 'Civic Tech'],
      current: true,
    },
    {
      id: 'edu-12',
      type: 'education' as const,
      title: 'ISC Class XII — PCM',
      org: 'St. Thomas School',
      period: '2022 – 2024',
      description: '78.4% · Physics, Chemistry, Mathematics',
      tags: ['ISC', 'PCM'],
    },
    {
      id: 'exp-captain',
      type: 'work' as const,
      title: 'Sports Captain',
      org: 'St. Thomas School',
      period: '2023 – 2024',
      description:
        'Led inter-house and inter-school sports events; represented school in competitions.',
      tags: ['Leadership', 'Sports'],
    },
    {
      id: 'edu-10',
      type: 'education' as const,
      title: 'ICSE Class X',
      org: 'St. Thomas School',
      period: '2020 – 2022',
      description: '91.2% · Strong foundation in sciences and mathematics',
      tags: ['ICSE'],
    },
  ],
};

export type Portfolio = typeof portfolio;
