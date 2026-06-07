export const resumeData = {
  personal: {
    name: 'Rachit Garg',
    title: 'Frontend Developer',
    tagline: 'Building scalable, performant web experiences',
    email: 'rachitgarg56@gmail.com',
    phone: '+91-95572-45973',
    linkedin: 'linkedin.com/in/rachitgarg56',
    github: 'github.com/Rachitgarg56',
    linkedinUrl: 'https://linkedin.com/in/rachitgarg56',
    githubUrl: 'https://github.com/Rachitgarg56',
    summary:
      'Passionate Frontend Developer with hands-on experience in building dynamic and responsive web applications. Proficient in JavaScript, React.js, Next.js, Tailwind CSS, and Firebase, with a solid grasp of backend technologies like Node.js and Express.js.',
  },

  skills: {
    languages: ['JavaScript', 'TypeScript'],
    frontend: [
      'React.js',
      'Next.js',
      'Tailwind CSS',
      'Bootstrap',
      'Alpine.js',
      'Redux',
      'React Router',
      'Material-UI',
      'fabric.js',
    ],
    backend: ['Node.js', 'Express.js', 'MongoDB', 'Firebase'],
    devTools: ['Git', 'GitHub', 'VS Code', 'AWS', 'Jekyll', 'Liquid', 'Mixpanel', 'Poptin'],
    soft: ['Effective Communication', 'Team Leadership', 'Problem Solving'],
  },

  experience: [
    {
      id: 'leviosa',
      company: 'Leviosa Consulting Pvt Ltd',
      role: 'Junior Software Developer',
      location: 'Bangalore',
      duration: 'Jan 2025 – Present',
      current: true,
      highlights: [
        'Developed and maintained sringeri.net, a high-traffic, performance-optimized production website',
        'Integrated Firebase for authentication and content management, enabling secure admin-driven updates',
        'Contributed to an internal Asset Management System, supporting procurement workflows and asset tracking',
      ],
      stack: ['Next.js', 'Tailwind CSS', 'SQL', 'Node.js', 'Firebase', 'HTML', 'CSS', 'JavaScript'],
    },
    {
      id: 'intentive',
      company: 'Intentive Technologies Pvt Ltd',
      role: 'SDE Intern',
      location: 'Bangalore',
      duration: 'Aug 2024 – Jan 2025',
      current: false,
      highlights: [
        'Contributed to the Kommunicate website\'s frontend and backend to enhance UX and performance',
        'Used Jekyll and Liquid to build responsive, modular components for efficient content management',
        'Deployed updates via AWS, improving website scalability and uptime',
        'Wrote optimized code ensuring maintainability and performance of web applications',
      ],
      stack: ['Jekyll', 'Liquid', 'AWS', 'HTML', 'CSS', 'JavaScript', 'Mixpanel', 'Poptin', 'React.js', 'Node.js'],
    },
  ],

  projects: [
    {
      id: 'ams',
      title: 'Asset Management System',
      duration: 'Nov 2025 – Jan 2026',
      description:
        'Scalable Asset Management System with structured workflows, approvals, and audit-ready asset tracking.',
      metrics: [
        { label: 'Manual tracking errors reduced', value: '30%' },
        { label: 'Request processing time cut', value: '25%' },
        { label: 'Post-approval edits blocked', value: '100%' },
        { label: 'Data consistency improved', value: '40%' },
      ],
      highlights: [
        'Built scalable AMS UI for procurement workflows, reducing manual tracking errors by 30%',
        'Developed role-based dashboards with approval flows, cutting request processing time by 25%',
        'Implemented state-driven UI rules to block invalid actions, preventing 100% of post-approval edits',
        'Integrated backend APIs for assets and in/out transactions, improving data consistency by 40%',
      ],
      stack: ['Next.js', 'TypeScript', 'REST APIs', 'SQL Database', 'RBAC', 'State-Driven UI'],
      color: '#2dd4bf',
    },
    {
      id: 'sringeri',
      title: 'Sringeri Website',
      duration: 'Feb 2025 – Apr 2025',
      description:
        "Revamped a large-scale religious organization's website with performance optimization and responsive UI.",
      metrics: [
        { label: 'Load time improvement', value: '42%' },
        { label: 'SEO score', value: '78→95' },
        { label: 'Organic traffic boost', value: '22%' },
        { label: 'Mobile compatibility', value: '100%' },
      ],
      highlights: [
        'Migrated 40+ legacy components to Next.js + TypeScript, reducing codebase size by 18%',
        'Improved load time by 42% (3.6s→2.1s) and SEO score from 78→95, boosting organic traffic by 22%',
        'Enhanced accessibility from 82→96 and ensured 100% mobile compatibility across 15+ devices',
        'Integrated Firebase to serve page content and a secure admin login for content entry',
      ],
      stack: ['Next.js', 'TypeScript', 'Material-UI', 'Tailwind CSS', 'Firebase'],
      liveUrl: 'https://sringeri.net',
      color: '#fbbf24',
    },
  ],

  education: {
    degree: 'B.Voc in Artificial Intelligence and Robotics',
    institution: 'Dayalbagh Educational Institute (DEI)',
    faculty: 'Faculty of Engineering, DEI',
    duration: '2020 – 2023',
    cgpa: '7.5',
    coursework: ['Web Development', 'Software Engineering', 'Operating Systems', 'DBMS'],
  },
} as const;

export type ResumeData = typeof resumeData;
