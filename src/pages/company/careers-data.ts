export type IconKey =
  | "sparkles"
  | "users"
  | "lightbulb"
  | "rocket"
  | "barChart"
  | "code"
  | "brush"
  | "bug"
  | "clipboard"
  | "headphones"
  | "megaphone"
  | "wallet"
  | "workflow"
  | "briefcase"
  | "handshake"
  | "graduation"
  | "message"
  | "shield"
  | "badge"
  | "clock"
  | "map"
  | "check"
  | "search"
  | "fileText"
  | "book"
  | "chart"
  | "target";

export type CareerDepartment = {
  id: string;
  title: string;
  iconKey: IconKey;
  overview: string;
  responsibilities: string[];
  skills: string[];
  entryRoles: string[];
  experiencedRoles: string[];
};

export type CareerArea = {
  title: string;
  description: string;
  iconKey: IconKey;
  skills: string[];
};

export type ListItem = {
  title: string;
  description: string;
  iconKey: IconKey;
};

export const careersSeo = {
  title: "Careers at Altroz Technologies | HRMS Jobs in Pune",
  description:
    "Explore career opportunities at Altroz Technologies. Discover roles in software development, design, testing, sales, marketing, customer support, HR, and business operations.",
  canonical: "/careers",
};

export const capabilityStrip: ListItem[] = [
  { title: "Learning", description: "Grow through practical exposure", iconKey: "graduation" },
  { title: "Collaboration", description: "Work with product and business teams", iconKey: "users" },
  { title: "Innovation", description: "Improve workflows and experiences", iconKey: "lightbulb" },
  { title: "Career Growth", description: "Expand your responsibilities over time", iconKey: "rocket" },
  { title: "Real Business Exposure", description: "Support real HR operations", iconKey: "briefcase" },
  { title: "Product Development", description: "Build practical HRMS features", iconKey: "code" },
  { title: "Customer Impact", description: "Help people use the platform better", iconKey: "handshake" },
];

export const whyWorkPoints = [
  "Solve real business problems that support everyday HR work.",
  "Learn how product, customer, and business needs connect.",
  "Develop practical technical and professional skills.",
  "Collaborate across teams and contribute ideas with context.",
  "Build experience in software and HR operations.",
  "Understand how growing organizations use HR technology.",
];

export const workplacePrinciples: ListItem[] = [
  {
    title: "Friendly and Respectful Environment",
    description: "We value professional communication, mutual respect, and supportive teamwork.",
    iconKey: "handshake",
  },
  {
    title: "Learning and Development",
    description:
      "Team members are encouraged to improve their technical, product, communication, and business skills.",
    iconKey: "graduation",
  },
  {
    title: "Career Growth Opportunities",
    description:
      "Growth opportunities may be available according to performance, skills, experience, role requirements, and business needs.",
    iconKey: "rocket",
  },
  {
    title: "Open Communication",
    description: "We encourage team members to share ideas, raise concerns, and communicate clearly.",
    iconKey: "message",
  },
  {
    title: "Team Collaboration",
    description:
      "Projects may involve development, design, testing, sales, marketing, support, and business teams.",
    iconKey: "users",
  },
  {
    title: "Innovation-Driven Work",
    description:
      "Team members can contribute to software features, user experience, process improvements, and customer solutions.",
    iconKey: "lightbulb",
  },
  {
    title: "Recognition and Appreciation",
    description:
      "Good work, ownership, improvement, and teamwork should be acknowledged through appropriate company practices.",
    iconKey: "badge",
  },
  {
    title: "Supportive Leadership",
    description:
      "Managers and team leads should provide direction, feedback, and practical support according to the role and team structure.",
    iconKey: "shield",
  },
  {
    title: "Real Business Exposure",
    description:
      "Employees may work on real product requirements, customer challenges, and business processes.",
    iconKey: "briefcase",
  },
  {
    title: "Work-Life Awareness",
    description:
      "Altroz Technologies aims to encourage responsible planning and sustainable working practices.",
    iconKey: "clock",
  },
];

export const growthPanels = [
  {
    title: "Career Growth",
    description:
      "Develop your capabilities by taking responsibility, learning new skills, and contributing to meaningful work.",
    iconKey: "rocket",
  },
  {
    title: "Learning Opportunities",
    description:
      "Work with experienced professionals and gain practical exposure to software development, HR technology, customer requirements, and business operations.",
    iconKey: "graduation",
  },
  {
    title: "Innovative Work Culture",
    description:
      "Contribute to modern HRMS products and workflows designed for businesses across multiple industries.",
    iconKey: "lightbulb",
  },
  {
    title: "Team Collaboration",
    description:
      "Work with team members from different functions and learn through shared knowledge and project experience.",
    iconKey: "users",
  },
  {
    title: "Meaningful Work",
    description:
      "Help create technology that supports attendance, payroll, employee records, leave, reporting, and HR operations.",
    iconKey: "briefcase",
  },
  {
    title: "Ownership and Responsibility",
    description:
      "Take ownership of assigned tasks, communicate progress clearly, and contribute to quality outcomes.",
    iconKey: "badge",
  },
];

export const impactSteps = [
  "Product teams understand business requirements.",
  "Designers simplify user journeys.",
  "Developers build functional solutions.",
  "QA teams verify quality.",
  "Sales teams connect with suitable businesses.",
  "Customer teams support product adoption.",
  "Feedback helps improve the platform.",
];

export const departments: CareerDepartment[] = [
  {
    id: "software-development",
    title: "Software Development",
    iconKey: "code",
    overview:
      "Work on product features, APIs, integrations, data handling, and responsive experiences across the Altroz HRMS product surface.",
    responsibilities: [
      "Build and maintain frontend and backend features",
      "Work with APIs, data flow, and product integrations",
      "Fix bugs and improve application performance",
      "Collaborate with product, design, QA, and support teams",
    ],
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "HTML and CSS",
      "REST APIs",
      "Git",
      "Debugging",
    ],
    entryRoles: ["Junior Developer", "Associate Software Engineer"],
    experiencedRoles: ["Software Engineer", "Senior Engineer", "Tech Lead"],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    iconKey: "brush",
    overview:
      "Shape clean, accessible, and responsive interfaces for HR teams, managers, employees, and other users across the platform.",
    responsibilities: [
      "Design user flows and interface layouts",
      "Improve readability, accessibility, and consistency",
      "Support product design reviews and handoff work",
      "Use feedback to refine screens and journeys",
    ],
    skills: ["Figma", "Wireframing", "Responsive design", "Accessibility", "Design systems"],
    entryRoles: ["Junior Designer", "Design Associate"],
    experiencedRoles: ["UI/UX Designer", "Product Designer"],
  },
  {
    id: "quality-assurance",
    title: "Quality Assurance and Testing",
    iconKey: "bug",
    overview:
      "Help verify product quality across workflows, forms, responsive views, browser behavior, and release readiness.",
    responsibilities: [
      "Create test cases and run regression checks",
      "Validate workflows, inputs, and edge cases",
      "Report and retest issues clearly",
      "Support release confidence and product stability",
    ],
    skills: [
      "Manual testing",
      "Regression testing",
      "API testing",
      "Bug reporting",
      "Test planning",
      "Attention to detail",
    ],
    entryRoles: ["QA Tester", "Test Associate"],
    experiencedRoles: ["QA Engineer", "Test Lead"],
  },
  {
    id: "product-business-analysis",
    title: "Product and Business Analysis",
    iconKey: "clipboard",
    overview:
      "Translate business requirements into clear product understanding and help teams stay aligned on scope and workflow.",
    responsibilities: [
      "Gather and document product requirements",
      "Map business workflows and use cases",
      "Coordinate between business and technical teams",
      "Support prioritization and feature understanding",
    ],
    skills: [
      "Requirement gathering",
      "Documentation",
      "Process mapping",
      "Communication",
      "Critical thinking",
      "Stakeholder coordination",
    ],
    entryRoles: ["Business Analyst", "Product Associate"],
    experiencedRoles: ["Senior Business Analyst", "Product Manager"],
  },
  {
    id: "customer-success-support",
    title: "Customer Success and Support",
    iconKey: "headphones",
    overview:
      "Help customers understand the platform, coordinate issue resolution, and support product adoption after onboarding.",
    responsibilities: [
      "Guide users through product usage and adoption",
      "Answer product questions and coordinate follow-ups",
      "Support issue resolution and customer communication",
      "Share feedback that helps improve the experience",
    ],
    skills: ["Communication", "Problem-solving", "Product understanding", "Support tools", "Empathy"],
    entryRoles: ["Support Associate", "Customer Success Associate"],
    experiencedRoles: ["Customer Success Executive", "Support Lead"],
  },
  {
    id: "sales-business-development",
    title: "Sales and Business Development",
    iconKey: "megaphone",
    overview:
      "Connect with suitable businesses, understand requirements, and support demos, follow-ups, and relationship management.",
    responsibilities: [
      "Identify suitable businesses and opportunities",
      "Coordinate product demonstrations and follow-up discussions",
      "Understand buyer needs and business context",
      "Maintain professional client relationships",
    ],
    skills: ["Communication", "Presentation", "CRM workflow", "Follow-up discipline", "Business awareness"],
    entryRoles: ["Sales Associate", "Business Development Associate"],
    experiencedRoles: ["Sales Executive", "Business Development Manager"],
  },
  {
    id: "digital-marketing-content-seo",
    title: "Digital Marketing, Content and SEO",
    iconKey: "chart",
    overview:
      "Support website content, search visibility, product communication, lead generation, and thoughtful marketing execution.",
    responsibilities: [
      "Plan and update website and product content",
      "Support SEO, campaigns, and social communication",
      "Contribute to lead-generation and product awareness work",
      "Track performance and improve content quality",
    ],
    skills: ["SEO fundamentals", "Content writing", "Analytics", "Social media", "Campaign planning"],
    entryRoles: ["Marketing Associate", "Content Associate"],
    experiencedRoles: ["SEO Specialist", "Digital Marketing Executive"],
  },
  {
    id: "hr-administration",
    title: "HR and Administration",
    iconKey: "workflow",
    overview:
      "Support recruitment coordination, internal records, onboarding, employee communication, and office administration tasks.",
    responsibilities: [
      "Coordinate hiring and employee records",
      "Support onboarding and internal documentation",
      "Maintain organized HR and admin workflows",
      "Assist with communication and coordination needs",
    ],
    skills: [
      "Organization",
      "Confidentiality",
      "Documentation",
      "Communication",
      "Time management",
    ],
    entryRoles: ["HR Associate", "Admin Associate"],
    experiencedRoles: ["HR Executive", "HR Coordinator"],
  },
  {
    id: "finance-accounts",
    title: "Finance and Accounts",
    iconKey: "wallet",
    overview:
      "Maintain financial records, support reporting tasks, and help keep finance processes organized and accurate.",
    responsibilities: [
      "Maintain records and support reconciliations",
      "Help with billing and finance coordination",
      "Support reporting and documentation tasks",
      "Keep financial information organized and accurate",
    ],
    skills: ["Accuracy", "Excel", "Record keeping", "Accounting basics", "Documentation"],
    entryRoles: ["Accounts Associate", "Finance Associate"],
    experiencedRoles: ["Accounts Executive", "Finance Executive"],
  },
];

export const careerAreas: CareerArea[] = [
  {
    title: "Software Development",
    description:
      "Work on frontend, backend, APIs, integrations, databases, performance, and HRMS product features.",
    iconKey: "code",
    skills: ["JavaScript", "React", "Node.js", "HTML and CSS", "REST APIs", "Databases", "Git", "Debugging"],
  },
  {
    title: "UI/UX Design",
    description:
      "Design clean, accessible, responsive, and user-friendly experiences for HR teams, managers, and employees.",
    iconKey: "brush",
    skills: ["Figma", "Wireframing", "Accessibility", "Responsive design", "Design systems"],
  },
  {
    title: "Quality Assurance",
    description:
      "Test functionality, responsiveness, usability, workflows, forms, APIs, and releases.",
    iconKey: "bug",
    skills: ["Manual testing", "Regression testing", "Bug reporting", "Test cases", "API testing"],
  },
  {
    title: "Product and Business Analysis",
    description:
      "Understand business requirements, document workflows, support product planning, and coordinate between technical and business teams.",
    iconKey: "clipboard",
    skills: ["Requirements", "Process mapping", "Documentation", "Stakeholder coordination"],
  },
  {
    title: "Sales and Business Development",
    description:
      "Identify suitable businesses, understand requirements, coordinate demonstrations, follow up on opportunities, and maintain professional relationships.",
    iconKey: "megaphone",
    skills: ["Communication", "Presentation", "CRM workflow", "Follow-up", "Business awareness"],
  },
  {
    title: "Customer Success and Support",
    description:
      "Help users understand the platform, resolve product questions, coordinate issues, and support product adoption.",
    iconKey: "headphones",
    skills: ["Support communication", "Problem-solving", "Product knowledge", "Empathy"],
  },
  {
    title: "Digital Marketing",
    description:
      "Support SEO, content, social media, campaigns, lead generation, website updates, and product communication.",
    iconKey: "chart",
    skills: ["SEO", "Content writing", "Analytics", "Campaigns", "Social media"],
  },
  {
    title: "HR and Administration",
    description:
      "Support recruitment, employee records, onboarding, engagement, policies, coordination, and internal HR operations.",
    iconKey: "workflow",
    skills: ["Organization", "Documentation", "Confidentiality", "Communication"],
  },
];

export const skillsWeValue = [
  "Problem-solving",
  "Communication",
  "Professional responsibility",
  "Willingness to learn",
  "Team collaboration",
  "Attention to detail",
  "Customer awareness",
  "Time management",
  "Adaptability",
  "Technical fundamentals",
  "Ownership",
  "Ethical conduct",
  "Documentation skills",
  "Quality focus",
  "Respectful communication",
];

export const hiringSteps = [
  {
    title: "Application Review",
    description:
      "The team reviews submitted profiles based on current role requirements.",
    iconKey: "check",
  },
  {
    title: "Initial Discussion",
    description:
      "Selected candidates may be contacted for an introductory conversation.",
    iconKey: "message",
  },
  {
    title: "Skill or Role Assessment",
    description:
      "Depending on the position, candidates may complete a technical, practical, written, design, sales, or role-specific assessment.",
    iconKey: "clipboard",
  },
  {
    title: "Interview",
    description:
      "Selected candidates may meet relevant team members or managers.",
    iconKey: "users",
  },
  {
    title: "Final Discussion",
    description:
      "Role expectations, responsibilities, location, employment terms, and next steps may be discussed.",
    iconKey: "handshake",
  },
  {
    title: "Offer and Onboarding",
    description:
      "Successful candidates receive formal communication and onboarding instructions.",
    iconKey: "rocket",
  },
];

export const faqItems = [
  {
    q: "How can I apply for a job at Altroz Technologies?",
    a: "You can apply through the Careers page by selecting the general application or an available career area and submitting the application form.",
  },
  {
    q: "Can I submit my profile if there are no open positions?",
    a: "Yes. You may submit a general application for future opportunities. Submission does not guarantee an interview or response.",
  },
  {
    q: "Can freshers apply?",
    a: "Freshers and early-career candidates may apply for suitable entry-level roles when available.",
  },
  {
    q: "Does Altroz Technologies offer internships?",
    a: "Internship availability depends on current business requirements and published opportunities. This page does not confirm an internship program.",
  },
  {
    q: "Can I apply for multiple positions?",
    a: "Candidates may apply for relevant roles, but each application should accurately reflect their skills and interest.",
  },
  {
    q: "What documents are required?",
    a: "Candidates may be asked to submit a resume and other role-specific documents. Additional documents should only be requested when necessary.",
  },
  {
    q: "What happens after I apply?",
    a: "The recruitment team reviews applications based on current requirements. Selected candidates may be contacted for discussions, assessments, or interviews.",
  },
  {
    q: "How many interview rounds are there?",
    a: "The number of rounds varies by role, experience level, and department.",
  },
  {
    q: "Are jobs remote, hybrid, or office-based?",
    a: "The work arrangement depends on the specific position and should be stated in the verified job listing.",
  },
  {
    q: "Will every applicant receive a response?",
    a: "The company may only be able to contact shortlisted candidates. Avoid assuming that every applicant will receive a response.",
  },
  {
    q: "Is there any fee to apply?",
    a: "Candidates should not be charged a recruitment fee unless a lawful and officially documented policy says otherwise.",
  },
  {
    q: "How is my personal information used?",
    a: "Candidate information is used for recruitment-related purposes according to the company’s privacy practices and the consent provided in the form.",
  },
];

export const positionOptions = ["General Application", ...careerAreas.map((item) => item.title)];

export const departmentOptions = [
  "General Application",
  ...departments.map((item) => item.title),
];

export const experienceOptions = [
  "Fresher",
  "0-1 years",
  "1-3 years",
  "3-5 years",
  "5-8 years",
  "8+ years",
];

export const noticePeriodOptions = [
  "Available now",
  "15 days",
  "30 days",
  "45 days",
  "60 days",
  "90 days",
  "Flexible / other",
];

export const sourceOptions = [
  "Company website",
  "LinkedIn",
  "Referral",
  "Search engine",
  "Social media",
  "Job portal",
  "Other",
];

export const verifiedOpenings: never[] = [];
