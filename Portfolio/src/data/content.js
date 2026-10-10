// All copy and data here is sourced directly from the original portfolio content.
// Nothing invented: numbers below are literal counts of the real lists in this file.

export const PROFILE = {
  name: 'Usman Ghazanfar',
  firstName: 'Usman',
  lastName: 'Ghazanfar',
  title: 'AI & Web Developer',
  location: 'Faisalabad, Pakistan',
  siteUrl: 'https://usmanghazanfar.vercel.app',
  tagline:
    'I build AI-powered systems and websites — combining automation, machine learning and modern web engineering to help brands scale.',
  email: 'Usmanghazanfar100@gmail.com',
  phone: '+92 305 9612867',
  whatsapp: '+92 305 9612867',
  whatsappLink: 'https://wa.me/923059612867',
  linkedin: 'https://www.linkedin.com/in/usman-ghazanfar',
  linkedinLabel: 'linkedin.com/in/Usman-ghazanfar',
  github: 'https://github.com/usmanghazanfar001-creator',
  githubLabel: 'github.com/usmanghazanfar001-creator',
  fiverr: 'https://www.fiverr.com/afidevelopers?public_mode=true',
  openToWork: true,
};

export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export const ABOUT = {
  intro: [
    "I'm a motivated, tech-savvy Digital Marketing & Growth Associate based in Faisalabad, Pakistan, blending web design, content strategy and social media marketing with a strong foundation in Artificial Intelligence.",
    "Currently pursuing an Associate Degree in AI at Punjab Group of Colleges, I use technology and data-driven strategies to drive measurable online growth and real business results — from automating store operations to shipping AI agents and modern websites.",
  ],
  interests: [
    'Artificial Intelligence',
    'Digital Marketing',
    'SEO & Content Strategy',
    'Web Design',
    'Technology Trends',
    'Workflow Automation',
  ],
};

// Stats are literal counts derived from the real data below — nothing estimated.
export const STATS = [
  { label: 'Projects Completed', value: 8, suffix: '' },
  { label: 'Core Technologies', value: 16, suffix: '+' },
  { label: 'Services Offered', value: 6, suffix: '' },
];

export const SKILL_GROUPS = [
  {
    key: 'programming',
    title: 'Programming',
    description: 'Core languages behind everything I build.',
    icon: 'Code2',
    items: ['Python', 'C++', 'JavaScript'],
  },
  {
    key: 'ai',
    title: 'AI',
    description: 'Intelligent systems and automation logic.',
    icon: 'BrainCircuit',
    items: ['Artificial Intelligence', 'Machine Learning', 'Search Algorithms', 'AI Automation'],
  },
  {
    key: 'web',
    title: 'Web Development',
    description: 'End-to-end product and interface engineering.',
    icon: 'Globe2',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'PHP'],
  },
  {
    key: 'automation',
    title: 'Automation',
    description: 'Connecting tools so work runs itself.',
    icon: 'Workflow',
    items: ['n8n', 'AI Agents', 'Workflow Automation', 'API Integration'],
  },
];

export const SERVICES = [
  {
    key: 'ai-automation',
    title: 'AI Automation',
    icon: 'Sparkles',
    description:
      'Automating repetitive business processes with AI-driven pipelines, so teams spend less time on manual work.',
    points: ['Process automation', 'AI-driven pipelines', 'Reduced manual work'],
  },
  {
    key: 'ai-agents',
    title: 'AI Agents',
    icon: 'BrainCircuit',
    description:
      'Designing and deploying autonomous AI agents built on LangChain and LangGraph for research, support and analytics.',
    points: ['LangChain / LangGraph', 'Task orchestration', 'Autonomous workflows'],
  },
  {
    key: 'web-development',
    title: 'Web Development',
    icon: 'Code2',
    description:
      'Building fast, responsive websites and web apps with React, Next.js and modern front-end engineering.',
    points: ['React & Next.js', 'Responsive UI', 'Clean, scalable code'],
  },
  {
    key: 'portfolio-websites',
    title: 'Modern Portfolio Websites',
    icon: 'LayoutTemplate',
    description:
      'Premium, animated portfolio sites that present your work with a professional, memorable first impression.',
    points: ['Animated interfaces', 'Personal branding', 'Mobile-first design'],
  },
  {
    key: 'business-websites',
    title: 'Business Websites',
    icon: 'Building2',
    description:
      'Conversion-focused business and listing websites — from real estate to SaaS — built with SEO in mind.',
    points: ['Conversion-focused UI', 'SEO best practices', 'Content strategy'],
  },
  {
    key: 'workflow-automation',
    title: 'Workflow Automation',
    icon: 'Workflow',
    description:
      'Connecting tools and platforms with n8n so store and business operations run with less manual effort.',
    points: ['n8n workflows', 'API integrations', 'Shopify automation'],
  },
];

export const PROJECTS = [
  {
    key: 'ma-fabrics',
    badge: 'Case — E-commerce',
    title: 'MA Fabrics – Premium Fabric Store',
    category: 'Web',
    tags: ['Next.js', 'E-commerce', 'UI/UX'],
    description:
      'A premium online storefront for a Lahore-based textile and suiting brand, with shop, collections, gallery and fabric videos.',
    problem:
      'A Pakistani fabric brand needed an elegant online presence where customers could browse suiting by category and color, see the fabric in motion, and get help choosing.',
    solution:
      'Designed and built a modern Next.js storefront with a shop, curated collections, a photo gallery and fabric videos, plus customer accounts, cart, order tracking and a WhatsApp button for personal fabric advice.',
    features: ['Shop & curated collections', 'Gallery and fabric videos', 'Cart, accounts & order tracking', 'WhatsApp fabric-advice contact'],
    link: 'https://ma-fabrics.vercel.app/',
    linkLabel: 'View Project',
    linkType: 'demo',
  },
  {
    key: 'real-estate',
    badge: 'Case — Real Estate',
    title: 'Real Estate Website',
    category: 'Web',
    tags: ['Web Development', 'SEO', 'UI/UX'],
    description:
      'A full real estate listing website featuring property search, detailed listing pages, and a clean, conversion-focused UI.',
    problem:
      'Property seekers needed a fast, clear way to search and browse real estate listings online.',
    solution:
      'Designed and developed a full real estate listing website with property search, detailed listing pages, and a clean, conversion-focused UI — applying SEO best practices to improve search visibility from launch.',
    features: ['Property search', 'Detailed listing pages', 'Conversion-focused UI', 'SEO optimized from launch'],
    link: 'https://hussnainestateadvisor.com/',
    linkLabel: 'View Project',
    linkType: 'demo',
  },
  {
    key: 'discrete-solver',
    badge: 'Case — Flask',
    title: 'DiscreteSolver – Discrete Mathematics Calculator',
    category: 'Web',
    tags: ['Python', 'Flask', 'SQLite'],
    description:
      'A full-stack educational web application covering logic, sets, relations, functions, combinatorics and number theory.',
    problem:
      'Students needed an accessible tool to practice and verify discrete mathematics problems with instant feedback.',
    solution:
      'Built a full-stack educational web application using Python, Flask and SQLite, covering logic, sets, relations, functions, combinatorics and number theory — with quizzes, PDF export and an admin dashboard.',
    features: ['Logic, sets & relations solvers', 'Combinatorics & number theory', 'Quizzes with PDF export', 'Admin dashboard'],
    link: 'https://descretiq.online/',
    linkLabel: 'View Project',
    linkType: 'demo',
  },
  {
    key: 'nexseat',
    badge: 'Case — SaaS',
    title: 'NexSeat – AI Subscription Sharing Platform',
    category: 'Web',
    tags: ['SaaS', 'Web App'],
    description:
      'A modern SaaS platform that lets users securely share premium AI tool subscriptions with trusted groups.',
    problem:
      'Premium AI tool subscriptions are expensive for individuals, but plans are often built for teams.',
    solution:
      'Built NexSeat, a SaaS platform that enables users to share premium AI tool subscriptions securely with trusted groups — reducing subscription costs by letting multiple users access team plans through an intuitive, responsive experience.',
    features: ['Secure group subscription sharing', 'Reduced per-user cost', 'Responsive, user-friendly interface'],
    link: 'https://github.com/usmanghazanfar001-creator/NexSeat.git',
    linkLabel: 'GitHub Repository',
    linkType: 'github',
  },
  {
    key: 'weatheriq',
    badge: 'Case — Weather App',
    title: 'WeatherIQ – Weather Forecast Web App',
    category: 'Web',
    tags: ['Next.js', 'Weather API', 'SEO', 'UI/UX'],
    description:
      'A fast weather web app with current conditions, hourly and daily forecasts, and air quality for locations worldwide.',
    problem:
      'People need a quick, clear way to check accurate weather for any city without signing up or wading through clutter.',
    solution:
      'Built WeatherIQ, a responsive Next.js weather app powered by WeatherAPI.com. Users can search any city, region, country or postal code, or use their location, and see current conditions, hourly and daily forecasts and air quality — with light/dark themes and °C/°F units.',
    features: [
      'Search by city, region, country or postal code',
      'Current conditions, hourly & daily forecasts',
      'Air quality (PM2.5, PM10) in plain language',
      'Light/dark themes and °C/°F toggle',
      'Favorites & recent searches saved locally, no account needed',
    ],
    link: 'https://weathercatch.vercel.app/',
    linkLabel: 'View Project',
    linkType: 'demo',
  },
  {
    key: 'ai-ecommerce',
    badge: 'Case — E-commerce',
    title: 'AI E-Commerce Store Manager',
    category: 'AI',
    tags: ['LangChain', 'LangGraph', 'AI Agents', 'Shopify'],
    description:
      'An AI-powered e-commerce automation platform orchestrating specialized agents across a Shopify store.',
    problem:
      'Online store owners spend significant manual effort on product research, SEO, listings, support and analytics.',
    solution:
      'Built an AI-powered e-commerce automation platform using LangGraph and LangChain to orchestrate specialized agents for product research, SEO, listing generation, customer support, analytics and Shopify store management.',
    features: ['Multi-agent orchestration', 'Automated SEO & listings', 'AI customer support', 'Store analytics'],
    link: 'https://github.com/usmanghazanfar001-creator/AI-E-Commerce-Store-Manager',
    linkLabel: 'GitHub Repository',
    linkType: 'github',
  },
  {
    key: 'shopify-automation',
    badge: 'Case — Shopify',
    title: 'Shopify Management Automation',
    category: 'Automation',
    tags: ['Shopify', 'AI Automation'],
    description:
      'An AI-powered Shopify management system that automates repetitive e-commerce operations.',
    problem:
      'Repetitive Shopify store operations were consuming time that could go toward growth.',
    solution:
      'Designed an AI-powered Shopify management system to automate repetitive e-commerce operations, reduce manual work, and help store owners manage their businesses more efficiently.',
    features: ['Automated store operations', 'Reduced manual workload', 'Efficiency-focused workflows'],
    link: null,
    linkLabel: null,
    linkType: null,
  },
  {
    key: 'hospital-management',
    badge: 'Case — C++',
    title: 'Hospital Management System',
    category: 'Other',
    tags: ['C++', 'GUI'],
    description:
      'A comprehensive GUI-based Hospital Management System managing core hospital operations.',
    problem:
      'Hospitals need a structured, menu-driven way to manage core operations without paper records.',
    solution:
      'Developed a comprehensive GUI-based Hospital Management System in standard C++ to manage core hospital operations through a menu-driven interface.',
    features: ['Menu-driven interface', 'Core hospital operation management', 'Built in standard C++'],
    link: null,
    linkLabel: null,
    linkType: null,
  },
];

export const PROJECT_FILTERS = ['All', 'AI', 'Web', 'Automation', 'Other'];

export const TIMELINE = [
  {
    key: 'experience-skillsider',
    type: 'experience',
    date: 'Nov 2025 — Nov 2027',
    title: 'Tech & Marketing Operations Assistant',
    place: 'SKILL SIDER · Faisalabad, Pakistan',
    bullets: [
      'Assisting in digital marketing and operational activities.',
      'Utilizing Microsoft Office tools for documentation and reporting.',
      'Supporting SEO, online marketing and web development initiatives.',
      'Managing data organization and workflow optimization.',
      'Contributing to technology-driven solutions and business operations.',
    ],
  },
  {
    key: 'education-pgc',
    type: 'education',
    date: 'Expected 2027',
    title: 'Associate Degree in Artificial Intelligence',
    place: 'Punjab Group of Colleges · Faisalabad',
    bullets: [
      'AI Fundamentals',
      'Mathematics for AI',
      'Computer Science Concepts',
      'Problem Solving Techniques',
      'Data Analysis',
      'Intelligent Systems',
    ],
  },
];
