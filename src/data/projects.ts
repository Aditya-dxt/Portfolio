import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'civicsentinel-ai',
    title: 'CivicSentinel AI',
    description: 'AI-powered civic complaint management platform that uses machine learning to classify, prioritize, and route citizen complaints to the appropriate government departments.',
    longDescription: 'CivicSentinel AI is an innovative civic-tech solution designed to streamline the public grievance redressal process. The platform leverages artificial intelligence and natural language processing to automatically classify citizen complaints, detect urgency levels, and route them to the correct government departments. Built with a modern full-stack architecture, it features real-time dashboards for officials, sentiment analysis on complaint text, and a citizen-friendly interface for submitting and tracking complaints. This project was developed as part of the India Innovates 2026 hackathon, where it reached the finals at Bharat Mandapam, New Delhi.',
    category: 'AI/ML + Full Stack',
    tags: ['AI/ML', 'Full Stack', 'Civic Tech', 'NLP', 'Hackathon'],
    techStack: ['Python', 'Machine Learning', 'NLP', 'HTML5', 'CSS3', 'JavaScript'],
    image: '/images/projects/project1.png',
    github: 'https://github.com/Aditya-dxt/civicsentinel-ai',
    featured: true,
    highlights: [
      'AI-powered complaint classification and routing',
      'Natural language processing for sentiment analysis',
      'Real-time dashboard for government officials',
      'Citizen complaint tracking system',
      'India Innovates 2026 Finalist project'
    ],
  },
  {
    id: 'sneakervault',
    title: 'SneakerVault',
    description: 'Premium MERN-stack e-commerce platform for sneakers with full product catalog, JWT authentication, Stripe payments, admin dashboard, and immersive 3D animations.',
    longDescription: 'SneakerVault is a production-grade, full-featured e-commerce platform built for the Indian sneaker market. It features a complete product catalog with advanced filtering, secure JWT-based authentication, dual payment integration (Stripe + Cash on Delivery), and a comprehensive admin dashboard for inventory and order management. The frontend delivers a premium shopping experience with dark/light theme toggling, 3D product animations, skeleton loading states, wishlist functionality, and a robust review system. Built with the latest technologies including Next.js 16, React 19, and Tailwind CSS v4.',
    category: 'Full Stack',
    tags: ['E-commerce', 'MERN', 'Full Stack', 'Payments', 'Admin Dashboard'],
    techStack: ['Next.js', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Stripe', 'Framer Motion', 'Tailwind CSS'],
    image: '/images/projects/project2.png',
    github: 'https://github.com/Aditya-dxt/mern-ecommerce-india',
    featured: true,
    highlights: [
      'Full product catalog with advanced filtering and search',
      'JWT authentication with role-based access control',
      'Stripe + Cash on Delivery payment integration',
      'Comprehensive admin dashboard for inventory management',
      'Wishlist and review system',
      'Dark/Light theme with 3D product animations',
      'Skeleton loading states for premium UX'
    ],
  },
  {
    id: 'interview-ai',
    title: 'Interview AI',
    description: 'AI-powered mock interview platform that generates intelligent questions, evaluates responses, and provides real-time feedback to help users ace technical interviews.',
    longDescription: 'Interview AI is an intelligent mock interview platform that leverages artificial intelligence to simulate realistic technical interviews. The platform generates context-aware questions based on the user selected domain, evaluates responses using NLP techniques, and provides detailed feedback with improvement suggestions. It supports multiple interview categories including DSA, system design, and behavioral questions, helping aspiring developers prepare effectively for technical interviews at top companies.',
    category: 'AI/ML',
    tags: ['AI/ML', 'NLP', 'Interview Prep', 'EdTech'],
    techStack: ['React.js', 'Node.js', 'OpenAI API', 'Gemini API', 'SCSS', 'JavaScript'],
    image: '/images/projects/project3.png',
    github: 'https://github.com/Aditya-dxt/interview-ai',
    featured: false,
    highlights: [
      'AI-generated interview questions by domain',
      'Real-time response evaluation and scoring',
      'Detailed feedback with improvement suggestions',
      'Multiple interview categories (DSA, System Design, Behavioral)',
      'Progress tracking and performance analytics'
    ],
  },
  {
    id: 'waterfall-login',
    title: 'Waterfall Login UI',
    description: 'A visually stunning animated login interface featuring a cascading waterfall effect, glassmorphism design, and smooth micro-interactions built with modern CSS and JavaScript.',
    longDescription: 'Waterfall Login UI is a creative frontend project that showcases advanced CSS animations and modern UI design principles. The interface features a mesmerizing cascading waterfall animation as the backdrop, combined with glassmorphism effects for the login card. Every interaction is enhanced with smooth micro-animations including input focus effects, button hover states, and form validation feedback. This project demonstrates expertise in CSS3 animations, responsive design, and attention to visual detail.',
    category: 'Frontend',
    tags: ['Frontend', 'CSS Animations', 'UI/UX', 'Glassmorphism'],
    techStack: ['React.js', 'CSS3', 'HTML5', 'JavaScript', 'Web Animations'],
    image: '/images/projects/project4.png',
    github: 'https://github.com/Aditya-dxt/waterfall-login-UI',
    featured: false,
    highlights: [
      'Cascading waterfall animation effect',
      'Glassmorphism design with backdrop blur',
      'Smooth micro-interactions and transitions',
      'Fully responsive across all devices',
      'Modern CSS3 animation techniques'
    ],
  },
  {
    id: 'smart-packet-analyzer',
    title: 'Smart Packet Analyzer',
    description: 'Network traffic analysis tool that captures, inspects, and visualizes network packets in real-time for cybersecurity monitoring and protocol analysis.',
    longDescription: 'Smart Packet Analyzer is a cybersecurity tool designed for real-time network traffic monitoring and analysis. It captures network packets, performs deep packet inspection, and visualizes traffic patterns to help identify security threats, protocol anomalies, and network performance issues. The tool supports multiple protocol analysis including TCP, UDP, HTTP, and DNS, with filtering capabilities for targeted investigation. It is an essential utility for network administrators and cybersecurity enthusiasts looking to understand and secure their network infrastructure.',
    category: 'Cybersecurity',
    tags: ['Cybersecurity', 'Networking', 'Packet Analysis', 'Monitoring'],
    techStack: ['Java', 'Socket Programming', 'Networking', 'Packet Analysis'],
    image: '/images/projects/project5.png',
    github: 'https://github.com/Aditya-dxt/smart-packet-analyzer',
    featured: false,
    highlights: [
      'Real-time network packet capture and inspection',
      'Multi-protocol analysis (TCP, UDP, HTTP, DNS)',
      'Traffic pattern visualization',
      'Advanced filtering for targeted analysis',
      'Security threat identification'
    ],
  },
];

/** Get all unique project categories for filtering */
export const projectCategories: string[] = [
  'All',
  ...Array.from(new Set(projectsData.map((p) => p.category))),
];
