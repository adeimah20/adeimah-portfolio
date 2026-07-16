import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

// Custom GitHub Icon SVG
const GithubIcon = ({ size = 16 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="flex-shrink-0"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const mockProjects = [
  {
    title: 'Automated E2E Testing Pipeline',
    slug: 'automated-e2e-testing-pipeline',
    description: 'Playwright-based E2E automation framework integrated with GitHub Actions CI/CD to detect UI functionality regressions periodically.',
    thumbnail: '/images/project-1.jpg',
    projectType: 'Personal Project',
    status: 'Completed',
    techStack: ['Playwright', 'JavaScript', 'GitHub Actions', 'Docker'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com'
  },
  {
    title: 'AI Smart Document Analyzer',
    slug: 'ai-smart-document-analyzer',
    description: 'NLP-based AI application for extracting valuable data from PDF documents and automatic validation against database schema rules.',
    thumbnail: '/images/project-1.jpg',
    projectType: 'Academic Research',
    status: 'Completed',
    techStack: ['Python', 'OpenAI API', 'FastAPI', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com'
  },
  {
    title: 'Agile Project Tracking System',
    slug: 'agile-project-tracking-system',
    description: 'Project management system with interactive Kanban Board, burndown chart tracking, and automated workload estimation.',
    thumbnail: '/images/project-1.jpg',
    projectType: 'Freelance Project',
    status: 'Ongoing',
    techStack: ['React', 'Express.js', 'Prisma', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com'
  },
  {
    title: 'Fintech Mobile Design System',
    slug: 'fintech-mobile-design-system',
    description: 'Comprehensive interface design, information architecture, persona research, and a high-accessibility standard UI Kit for a digital wallet.',
    thumbnail: '/images/project-1.jpg',
    projectType: 'Academic Project',
    status: 'Completed',
    techStack: ['Figma', 'Prototyping', 'User Research', 'Design System'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com'
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 lg:py-32 bg-obsidian border-b border-obsidian-border/50 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[350px] h-[350px] bg-glow-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Global Scroll Reveal Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        
        {/* Section Heading */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-glow-cyan font-mono text-xs tracking-widest uppercase block mb-2">03 / Projects</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Some of My Recent Work</h2>
          </div>
          <div className="h-[1px] flex-grow bg-obsidian-border/50 hidden md:block max-w-md" />
        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {mockProjects.map((project, idx) => (
            <motion.div
              key={idx}
              whileHover={{ 
                y: -6, 
                scale: 1.02, 
                borderColor: 'rgba(0, 240, 255, 0.3)',
                boxShadow: '0 20px 40px -15px rgba(0, 240, 255, 0.08)'
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="group relative flex flex-col bg-obsidian-card border border-obsidian-border rounded-2xl overflow-hidden shadow-premium transition-colors duration-300"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900 border-b border-obsidian-border/50">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                
                {/* Labels Overlay */}
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                  <span className="px-2.5 py-0.5 bg-obsidian/80 backdrop-blur-md border border-obsidian-border rounded-lg text-[10px] sm:text-xs font-mono text-neutral-300">
                    {project.projectType}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-lg text-[10px] sm:text-xs font-mono border backdrop-blur-md ${
                    project.status === 'Completed' 
                      ? 'bg-emerald-950/70 border-emerald-800/50 text-emerald-400' 
                      : 'bg-amber-950/70 border-amber-800/50 text-amber-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl text-white font-semibold group-hover:text-glow-cyan transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2 py-0.5 bg-neutral-900 border border-obsidian-border/50 rounded-lg text-xs font-mono text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions Area */}
                  <div className="flex items-center justify-between pt-2 border-t border-obsidian-border/30">
                    {/* External links */}
                    <div className="flex items-center gap-4">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-white transition-colors duration-200 hover:scale-110"
                        aria-label="GitHub Repository"
                      >
                        <GithubIcon size={18} />
                      </a>
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-white transition-colors duration-200 hover:scale-110"
                        aria-label="Live Site"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>

                    {/* Detail Route Link */}
                    <Link 
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-glow-cyan transition-colors duration-200"
                    >
                      <span>View Details</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </motion.div>
    </section>
  );
};

export default ProjectsSection;
