import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const pool = new pg.Pool({ connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🧹 Cleaning existing database records...');
  
  // Clean tables in correct order of dependencies
  await prisma.education.deleteMany({});
  await prisma.experience.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.contactMessage.deleteMany({});
  await prisma.profile.deleteMany({});

  console.log('🌱 Inserting master portfolio data inside transaction...');
  
  // Use Prisma transaction to ensure idempotency and atomicity
  await prisma.$transaction(async (tx) => {
    const profile = await tx.profile.create({
      data: {
        fullName: 'Ade Imah',
        professionalTitle: 'QA Engineer, IT Project Manager, UI/UX Designer',
        heroDescription: 'I am an undergraduate student in the Information Systems and Technology program at Cakrawala University , currently in my 4th semester , with a strong passion for building impactful digital solutions through technology. My primary interests are QA Engineer, IT Project Manager, UI/UX Designer where I enjoy transforming ideas into user-centered, high-quality digital products.',
        avatarUrl: '/images/foto imah.jpeg',
        cvUrl: 'https://drive.google.com/file/d/1mVEvm5mbPTybn68rozkn38ygOumw7__3/view?usp=sharing',
        aboutNarrative: 'Through academic projects and continuous self-learning, I have developed a solid understanding of software development workflows, project coordination, user experience design, and software quality assurance. I believe that successful digital products are created through strategic planning, effective collaboration, thoughtful design, and meticulous testing.',
        email: 'adeimah045@gmail.com',
        linkedinUrl: 'https://linkedin.com/in/adee-imah',
        githubUrl: 'https://github.com/adeimah',
        instagramUrl: 'https://www.instagram.com/adeeimh__/',
        phone: '088213406152'
      }
    });

    await tx.education.createMany({
      data: [
        {
          profileId: profile.id,
          schoolName: 'Cakrawala University',
          degree: 'Bachelor of Information Systems and Technology (B.Sc.)',
          period: '2024 – Present | Semester 4',
          location: 'South Jakarta, Indonesia',
          sortOrder: 1
        },
        {
          profileId: profile.id,
          schoolName: 'SMK Tirta Sari Surya',
          degree: 'Vocational High School – Accounting Major',
          period: '2022 – 2024',
          location: 'East Jakarta, Indonesia',
          sortOrder: 2
        }
      ]
    });

    await tx.experience.createMany({
      data: [
        {
          profileId: profile.id,
          position: 'IT Project Manager Intern',
          company: 'Dibimbing.id',
          period: 'November 2025 – March 2026',
          description: [
            'Coordinated project timelines, task priorities, and team deliverables to ensure projects were completed on schedule.',
            'Collaborated with cross-functional teams to facilitate communication and improve project workflow efficiency.',
            'Created and maintained Product Requirements Documents (PRDs) to clearly define product objectives, features, functional requirements, and project scope.',
            'Monitored project progress, identified potential risks, and supported timely issue resolution to maintain project quality.',
            'Prepared project documentation, meeting notes, and progress reports to enhance transparency and stakeholder communication.',
            'Assisted in planning project milestones and sprint activities, contributing to more structured project execution.'
          ],
          achievement: null,
          tools: ['Jira', 'Google Workspace', 'Discord'],
          sortOrder: 1
        },
        {
          profileId: profile.id,
          position: 'Event Management Intern',
          company: 'SOKO Financial',
          period: 'May 2026 – Present',
          description: [
            'Coordinated event planning activities by managing schedules, timelines, and operational requirements to ensure smooth event execution.',
            'Collaborated with internal teams and external stakeholders to improve communication and support successful project delivery.',
            'Organized event documentation, budgets, and administrative reports to maintain accurate project records.',
            'Monitored event progress and resolved operational issues to ensure activities were completed efficiently.',
            'Supported the execution of multiple events while maintaining quality standards, teamwork, and attention to detail.'
          ],
          achievement: null,
          tools: ['Google Sheets', 'Google Forms', 'Google Meet'],
          sortOrder: 2
        }
      ]
    });

    await tx.project.createMany({
      data: [
        {
          profileId: profile.id,
          title: 'Personal Saving Goals Management System',
          slug: 'personal-saving-goals-management-system',
          description: 'Developed a full-stack web application that enables users to create, manage, and track their personal savings goals through an intuitive dashboard and secure authentication system.',
          thumbnail: '/images/project-1.jpg',
          projectType: 'Personal Project',
          status: 'COMPLETED',
          techStack: ['React.js', 'Node.js', 'Express.js', 'Prisma ORM', 'PostgreSQL', 'JWT Auth', 'Postman', 'Vite'],
          githubUrl: 'https://github.com/adeimah/ProposalUAS_AdeImah.git',
          liveSiteUrl: null,
          overview: 'Developed a full-stack web application that enables users to create, manage, and track their personal savings goals through an intuitive dashboard and secure authentication system. The project was built from end to end, covering UI/UX design, frontend development, backend API development, database architecture, authentication, testing, and deployment preparation. The application was designed using a RESTful architecture with a responsive React.js frontend, an Express.js backend, and PostgreSQL managed through Prisma ORM. It provides users with a seamless experience for monitoring savings progress and achieving financial goals efficiently.',
          problemStatement: 'Many existing savings tracking applications are overloaded with unnecessary features, making them difficult for users who only need a simple and focused financial tracker. Additionally, users often lack a centralized dashboard to monitor their savings progress effectively. This project aims to provide a lightweight, user-friendly, and responsive solution that simplifies savings management while ensuring security, scalability, and maintainability.',
          solution: 'One of the biggest challenges was integrating the frontend with backend services while maintaining consistent data flow and secure authentication. This was addressed by implementing a structured REST API architecture, improving database relationships through Prisma ORM, and using JWT authentication to secure user sessions. Another challenge involved ensuring dashboard data remained synchronized after CRUD operations. This was solved by optimizing API endpoints and implementing efficient state management on the frontend, resulting in a smooth and responsive user experience.',
          features: [
            'Conducted requirement analysis and planned the project development lifecycle.',
            'Designed user flows, wireframes, and high-fidelity interfaces using Figma.',
            'Created Product Requirement Documents (PRDs) to define business objectives and functional requirements.',
            'Developed a responsive frontend using React.js.',
            'Built RESTful APIs using Node.js and Express.js.',
            'Designed relational database schemas with PostgreSQL and Prisma ORM.',
            'Implemented JWT-based authentication and user authorization.',
            'Performed API testing and debugging using Postman.',
            'Managed version control and project documentation through GitHub.',
            'Conducted functional testing to ensure system reliability and usability.'
          ],
          role: 'Full Stack Developer, IT Project Manager, UI/UX Designer, and QA Engineer',
          timeline: 'July 2026',
          sortOrder: 1
        },
        {
          profileId: profile.id,
          title: 'Partnership Management Website',
          slug: 'partnership-management-website',
          description: 'Developed a web-based Partnership Management System for Cakrawala University to streamline the management of partnership data between the university and external organizations.',
          thumbnail: '/images/project-1.jpg',
          projectType: 'Personal Project',
          status: 'COMPLETED',
          techStack: ['HTML', 'CSS', 'PHP Native', 'JavaScript', 'MySQL'],
          githubUrl: 'https://github.com/adeimah/adeimah_ProjectCakrawalaPartnership.git',
          liveSiteUrl: null,
          overview: 'Developed a web-based Partnership Management System for Cakrawala University to streamline the management of partnership data between the university and external organizations. The system digitizes administrative processes, making it easier to manage partnership records, monitor collaboration activities, and maintain organized documentation through a centralized platform. The application was built using PHP Native with MySQL as the database, while HTML, CSS, and JavaScript were used to create a responsive and user-friendly interface. The project emphasized functionality, data integrity, and ease of use for administrative users.',
          problemStatement: 'Managing partnership data manually often leads to scattered information, duplicated records, and inefficient administrative processes. The university required a centralized system that could simplify data management, improve accessibility, and support accurate documentation of institutional partnerships.',
          solution: 'One of the primary challenges was ensuring smooth communication between the frontend, backend, and database while maintaining data consistency. This was addressed by implementing structured database relationships and optimizing PHP queries for efficient CRUD operations. Another challenge involved organizing partnership records into an intuitive interface that administrators could easily navigate. Through iterative improvements and usability testing, the system was refined to provide a more efficient user experience.',
          features: [
            'Collaborated with team members to analyze system requirements and define functional features.',
            'Designed and developed responsive user interfaces using HTML, CSS, and JavaScript.',
            'Built backend functionalities using PHP Native.',
            'Designed and managed relational databases using MySQL (phpMyAdmin).',
            'Implemented CRUD operations for partnership data management.',
            'Integrated frontend and backend components to ensure seamless system functionality.',
            'Conducted functional testing and debugging to improve system stability and performance.',
            'Participated in team discussions, task coordination, and project documentation throughout the development process.'
          ],
          role: 'Full Stack Developer',
          timeline: 'October 2025',
          sortOrder: 2
        },
        {
          profileId: profile.id,
          title: 'UI/UX Case Study Mobile Shopping Application',
          slug: 'ui-ux-case-study-mobile-shopping-application',
          description: 'Designed a user-centered mobile shopping application as a UI/UX case study by applying the Design Thinking methodology.',
          thumbnail: '/images/project-1.jpg',
          projectType: 'Group Project',
          status: 'COMPLETED',
          techStack: ['Figma', 'Microsoft Office', 'Google Forms'],
          githubUrl: null,
          liveSiteUrl: 'https://www.figma.com/design/ZdPA3kgRmJsCQmzfNGCTaK/Portofoli%20o?node-id=76-1512&t=vPmnTJUaL47xIIMf-1',
          overview: 'Designed a user-centered mobile shopping application as a UI/UX case study by applying the Design Thinking methodology. The project focused on understanding user behavior, identifying pain points in online shopping experiences, and creating intuitive interface solutions that improve usability and customer satisfaction. The design process included user research, persona development, user flow creation, wireframing, high-fidelity UI design, interactive prototyping, and usability validation to ensure the final solution addressed real user needs.',
          problemStatement: 'Many mobile shopping applications present users with complex navigation, overwhelming interfaces, and inefficient checkout processes, resulting in poor user experiences and lower engagement. The objective of this case study was to redesign the shopping journey by creating a more intuitive, accessible, and user-friendly mobile application.',
          solution: 'One of the main challenges was balancing a visually appealing interface with an efficient shopping experience. Through user research and iterative prototyping, unnecessary interactions were minimized, navigation was simplified, and the checkout process was redesigned to reduce user effort. Another challenge involved organizing product information without overwhelming users. This was addressed by implementing a clean visual hierarchy, intuitive categorization, and consistent design components throughout the application.',
          features: [
            'Conducted user research through questionnaires using Google Forms to identify user needs and pain points.',
            'Analyzed research findings to define design opportunities and prioritize user requirements.',
            'Created user personas, user flows, and information architecture to improve navigation and usability.',
            'Designed low-fidelity wireframes and high-fidelity mobile interfaces using Figma.',
            'Developed interactive prototypes to visualize user interactions and application flow.',
            'Documented the design process, research findings, and design decisions using Microsoft Office.',
            'Evaluated the prototype through usability considerations and iterative design improvements.'
          ],
          role: 'UI/UX Designer',
          timeline: '2024',
          sortOrder: 3
        },
        {
          profileId: profile.id,
          title: 'Campus Marketplace: From Research to High-Fidelity Design',
          slug: 'campus-marketplace-from-research-to-high-fidelity-design',
          description: 'Designed a web-based marketplace platform that enables university students to buy and sell preloved items safely and conveniently within their campus community.',
          thumbnail: '/images/project-1.jpg',
          projectType: 'Group Project',
          status: 'COMPLETED',
          techStack: ['Figma', 'Microsoft Office', 'Google Forms'],
          githubUrl: null,
          liveSiteUrl: 'https://www.figma.com/design/rl6aWvCDzsz596R2ZpZb1z/Student%20Market---project?node-id=0-1&t=P8GIndzyJreKbbvu-1',
          overview: 'Designed a web-based marketplace platform that enables university students to buy and sell preloved items safely and conveniently within their campus community. The project was developed using a user-centered design approach to create a seamless experience for students looking to exchange second-hand products, including books, electronics, fashion, and study essentials. The design process covered user research, information architecture, wireframing, high-fidelity interface design, and interactive prototyping to ensure the platform was intuitive, trustworthy, and easy to navigate.',
          problemStatement: 'Many students have unused items that are still in good condition but lack a dedicated platform to sell them within their campus community. Existing online marketplaces often target a broad audience, making it difficult to find nearby buyers, verify users, or build trust between students. This project aims to design a dedicated campus marketplace that provides a safer, more efficient, and user-friendly environment for buying and selling preloved items among students.',
          solution: 'One of the primary challenges was designing a marketplace that felt trustworthy while remaining simple to use. This was addressed by introducing clear product information, intuitive navigation, and structured layouts that help users quickly browse listings and evaluate items. Another challenge was reducing the complexity of the selling process. The solution was to simplify the product listing flow, minimize the number of required steps, and provide clear guidance for uploading item details, resulting in a smoother and more efficient user experience.',
          features: [
            'Conducted user research through questionnaires using Google Forms to understand students\' buying and selling behaviors.',
            'Identified user pain points and translated research findings into actionable design requirements.',
            'Developed user personas, user flows, and information architecture to optimize the marketplace experience.',
            'Designed low-fidelity wireframes and high-fidelity web interfaces using Figma.',
            'Created interactive prototypes to demonstrate key user journeys, including product browsing, listing items, and communicating with sellers.',
            'Documented design decisions and project findings using Microsoft Office.',
            'Refined the design through iterative improvements based on usability principles and user feedback.'
          ],
          role: 'UI Designer',
          timeline: '2024',
          sortOrder: 4
        }
      ]
    });

    await tx.skill.createMany({
      data: [
        // Hard Skills
        { profileId: profile.id, name: 'Software Testing (Manual & Automation)', category: 'HARD_SKILL', level: 75, sortOrder: 1 },
        { profileId: profile.id, name: 'API Testing (Postman/Supertest)', category: 'HARD_SKILL', level: 75, sortOrder: 2 },
        { profileId: profile.id, name: 'Frontend Dev (React.js, Tailwind, ES6+)', category: 'HARD_SKILL', level: 70, sortOrder: 3 },
        { profileId: profile.id, name: 'Backend Dev (Node.js, Express, REST API)', category: 'HARD_SKILL', level: 70, sortOrder: 4 },
        { profileId: profile.id, name: 'Database (PostgreSQL, Prisma ORM)', category: 'HARD_SKILL', level: 65, sortOrder: 5 },
        { profileId: profile.id, name: 'Product Management & UI/UX Design', category: 'HARD_SKILL', level: 80, sortOrder: 6 },
        
        // Soft Skills
        { profileId: profile.id, name: 'Collaboration & Teamwork', category: 'SOFT_SKILL', level: 90, sortOrder: 7 },
        { profileId: profile.id, name: 'Problem Solving & Critical Thinking', category: 'SOFT_SKILL', level: 80, sortOrder: 8 },
        { profileId: profile.id, name: 'Adaptability & Self Learning', category: 'SOFT_SKILL', level: 90, sortOrder: 9 },
        { profileId: profile.id, name: 'IT Project Management & Jira Coordination', category: 'SOFT_SKILL', level: 85, sortOrder: 10 },
        { profileId: profile.id, name: 'Time Management', category: 'SOFT_SKILL', level: 85, sortOrder: 11 },
        { profileId: profile.id, name: 'Communication', category: 'SOFT_SKILL', level: 80, sortOrder: 12 },
        
        // Tools
        { profileId: profile.id, name: 'Figma', category: 'TOOL', level: 80, sortOrder: 13 },
        { profileId: profile.id, name: 'Postman', category: 'TOOL', level: 65, sortOrder: 14 },
        { profileId: profile.id, name: 'Git & GitHub', category: 'TOOL', level: 80, sortOrder: 15 },
        { profileId: profile.id, name: 'Visual Studio Code & Prisma Studio', category: 'TOOL', level: 80, sortOrder: 16 },
        { profileId: profile.id, name: 'n8n & Automations', category: 'TOOL', level: 50, sortOrder: 17 },
        { profileId: profile.id, name: 'Jira / Trello / Notion', category: 'TOOL', level: 90, sortOrder: 18 },
        { profileId: profile.id, name: 'Microsoft office', category: 'TOOL', level: 90, sortOrder: 19 },
        { profileId: profile.id, name: 'Google workspace', category: 'TOOL', level: 90, sortOrder: 20 }
      ]
    });
  });

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
