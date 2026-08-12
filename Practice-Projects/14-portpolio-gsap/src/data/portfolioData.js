

export const personalInfo = {
  name: "Hithesh",
  role: "Full Stack Developer",
  tagline: "Code is structural engineering for the digital realm.",
  subTagline: "Focus on minimal, robust systems. MCA Candidate.",
  email: "hitheshamin24@gmail.com",
  github: "https://github.com/Hitheshamin24",
  linkedin: "https://www.linkedin.com/in/hithesh-a-720b33297/",
};



export const aboutText = [
  "Hi! I'm Hithesh, a passionate student diving deep into the world of web development. My journey started with curiosity and has grown into a serious pursuit of building meaningful digital experiences.",
  "I'm currently pursuing my MCA while actively building real-world projects. I believe in learning by doing — every project teaches me something new about architecture, performance, and user experience.",
  "Focused on frontend with an eye on full-stack, I'm always exploring modern tools, frameworks, and best practices to sharpen my craft.",
];

export const aboutCards = [
  {
    id: "student",
    title: "Student",
    description: "Pursuing MCA while building real-world projects",
  },
  {
    id: "developer",
    title: "Web Developer",
    description: "Focused on frontend and learning full-stack development",
  },
  {
    id: "learner",
    title: "Always Learning",
    description: "Exploring modern tools, frameworks, and best practices",
  },
];


export const skills = [
  // Frontend
  { name: "React / Next.js",   level: "Intermediate", category: "Frontend" },
  { name: "TypeScript",        level: "Beginner",     category: "Frontend" },
  { name: "Tailwind CSS",      level: "Intermediate", category: "Frontend" },
  { name: "GSAP / Framer Motion", level: "Learning",  category: "Frontend" },
  // Backend
  { name: "Node.js / Express", level: "Beginner",     category: "Backend"  },
  { name: "RESTful APIs / GraphQL", level: "Beginner", category: "Backend"  },
  { name: "Python",            level: "Beginner",      category: "Backend"  },
  // Data / DB
  { name: "MongoDB / PostgreSQL", level: "Beginner",   category: "Database" },
  // Tools
  { name: "Git / GitHub Actions / Docker / Vercel", level: "Intermediate", category: "Tools" },
];


export const projects = [
  {
    id: "rhythmflow",
    index: "01",
    title: "Rhythm Flow",
    subtitle: "Dance Studio Management",
    description:
      "A complete management system for dance studios to handle student registrations, batch scheduling, fee tracking, instructor management, and attendance. Designed to streamline studio operations and improve administrative efficiency.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/Hitheshamin24/RhythmFlow.git",
    live: "https://rhflow.vercel.app",
    imgs: [
      "/dncr/dncr1.png",
      "/dncr/dncr2.png",
      "/dncr/dncr3.png",
      "/dncr/dncr4.png",
      "/dncr/dncr5.png",
      "/dncr/dncr6.png",
    ],
    featured: true,
  },
  {
    id: "paisafy",
    index: "02",
    title: "Paisafy",
    subtitle: "Personal Finance Lender",
    description:
      "An intelligent investment recommendation system that analyzes user profiles, risk appetite, and financial goals to suggest personalized investment options using data-driven logic.",
    tech: ["React", "Python", "Flask", "Node.js", "Express", "Tailwind CSS"],
    github: "https://github.com/Hitheshamin24/Paisafy.git",
    live: "https://paisafy.vercel.app",
    imgs: [
      "/paisafy/paisafy.png",
      "/paisafy/paisafy2.png",
      "/paisafy/paisafy3.png",
      "/paisafy/paisafy4.png",
    ],
    featured: true,
  },
  {
    id: "finlytics",
    index: "03",
    title: "Finlytics",
    subtitle: "Financial Analytics Dashboard",
    description:
      "React-based personal finance toolkit that provides real-time calculations for financial planning. Features tools for evaluating SIPs, EMIs, Lumpsum investments, and Present/Future values.",
    tech: ["React", "Tailwind CSS"],
    github: "https://github.com/Hitheshamin24/finlytics.git",
    live: "https://finlytics-one.vercel.app/",
    imgs: [
      "/finlytics/finlytics1.png",
      "/finlytics/finlytics2.png",
      "/finlytics/finlytics3.png",
      "/finlytics/finlytics4.png",
      "/finlytics/finlytics5.png",
      "/finlytics/finlytics6.png",
    ],
    featured: false,
  },
];


export const education = [
  {
    id: "mca",
    degree: "Master of Computer Applications (MCA)",
    institution: "Currently Pursuing",
    period: "2024 – Present",
    description: "Pursuing postgraduate studies in computer applications while actively building real-world software projects.",
  },
];


export const navLinks = [
  { name: "Work",    href: "#projects"   },
  { name: "About",   href: "#about"      },
  { name: "Skills",  href: "#skills"     },
  { name: "Contact", href: "#contact"    },
];
