import { Education } from '@/types';

export const educationData: Education[] = [
  {
    id: 'school-10',
    institution: 'St. Thomas School',
    degree: 'ICSE (Class X)',
    board: 'ICSE',
    grade: '91.2%',
    gradeType: 'Percentage',
    startYear: 2020,
    endYear: 2022,
  },
  {
    id: 'school-12',
    institution: 'St. Thomas School',
    degree: 'ISC (Class XII) -- PCM',
    board: 'ICSE',
    field: 'Physics, Chemistry, Mathematics',
    grade: '78.4%',
    gradeType: 'Percentage',
    startYear: 2022,
    endYear: 2024,
  },
  {
    id: 'college',
    institution: 'Pranveer Singh Institute of Technology',
    degree: 'B.Tech -- Computer Science & Engineering',
    field: 'Computer Science & Engineering',
    grade: '7.3',
    gradeType: 'CGPA',
    startYear: 2024,
    endYear: 2028,
    coursework: [
      'Data Structures & Algorithms',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
      'OOP',
      'Web Development',
      'Software Engineering',
      'Theory of Computation',
      'AI/ML',
      'Full Stack Development'
    ],
  }
];
