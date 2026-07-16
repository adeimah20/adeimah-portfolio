import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, User, Code2, Globe } from 'lucide-react';
import { useProjectDetail } from '../hooks/useProjectDetail';

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

const ProjectDetailPage = () => {
  const { project, loading, error } = useProjectDetail();

  // Scroll to top on load
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-obsidian text-glow-cyan font-mono gap-4">
        <div className="w-10 h-10 border-4 border-glow-cyan border-t-transparent rounded-full animate-spin" />
        <span className="text-sm tracking-widest uppercase">Loading case study...</span>
      </div>
    );
  }

  // Error / 404 State
  if (error || !project) {
    const isNotFound = error?.status === 404;
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-obsidian text-neutral-400 font-mono p-6 text-center gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl text-white font-bold tracking-tight uppercase">
            {isNotFound ? 'Project Not Found' : 'Server Error'}
          </h1>
          <p className="text-neutral-500 text-sm max-w-md">
            {isNotFound 
              ? "The project you are looking for doesn't exist." 
              : "Unable to load case study details at this time."}
          </p>
        </div>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-obsidian-border text-white rounded-xl hover:bg-neutral-800 hover:scale-[1.03] transition-all duration-300 text-sm uppercase tracking-wider"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  const isCompleted = project.status === 'COMPLETED';
  const isFigma = project.liveSiteUrl && project.liveSiteUrl.toLowerCase().includes('figma.com');
  const liveLabel = isFigma ? 'View Prototype' : 'Live Demo';

  return (
    <div className="min-h-screen bg-obsidian text-neutral-400 pt-28 pb-24 overflow-hidden relative">
      {/* Background radial glowing effects */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-glow-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-glow-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-12">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors group font-mono"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-600">
            <span>Home</span>
            <span>/</span>
            <span>Projects</span>
            <span>/</span>
            <span className="text-glow-cyan">{project.title}</span>
          </div>
        </div>

        {/* Hero Segment */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2.5">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-neutral-300">
              {project.projectType}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-mono border backdrop-blur-md ${
              isCompleted 
                ? 'bg-emerald-950/70 border-emerald-800/50 text-emerald-400' 
                : 'bg-amber-950/70 border-amber-800/50 text-amber-400'
            }`}>
              {isCompleted ? 'Completed' : 'Ongoing'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight leading-tight font-display">
            {project.title}
          </h1>

          <p className="text-neutral-300 text-lg max-w-3xl leading-relaxed">
            {project.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-100 hover:scale-[1.04] transition-all duration-300 text-sm shadow-md"
              >
                <GithubIcon size={16} />
                <span>GitHub Repository</span>
              </a>
            )}
            {project.liveSiteUrl && (
              <a 
                href={project.liveSiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#2563EB] text-white font-semibold rounded-xl hover:from-[#08c7e6] hover:to-[#3b82f6] hover:scale-[1.04] hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all duration-300 text-sm"
              >
                <ExternalLink size={16} />
                <span>{liveLabel}</span>
              </a>
            )}
          </div>
        </div>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-obsidian-card border border-obsidian-border rounded-2xl shadow-premium">
          <div className="space-y-1">
            <span className="text-xs font-mono text-neutral-500 uppercase flex items-center gap-1.5">
              <User size={12} className="text-glow-cyan" />
              <span>Role</span>
            </span>
            <p className="text-white font-semibold text-sm sm:text-base leading-snug">{project.role}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-neutral-500 uppercase flex items-center gap-1.5">
              <Calendar size={12} className="text-glow-cyan" />
              <span>Timeline</span>
            </span>
            <p className="text-white font-semibold text-sm sm:text-base leading-snug">{project.timeline}</p>
          </div>
          <div className="col-span-2 md:col-span-1 space-y-1">
            <span className="text-xs font-mono text-neutral-500 uppercase flex items-center gap-1.5">
              <Code2 size={12} className="text-glow-cyan" />
              <span>Technologies</span>
            </span>
            <p className="text-white font-semibold text-sm sm:text-base leading-snug">
              {project.techStack.slice(0, 3).join(', ')}
              {project.techStack.length > 3 ? '...' : ''}
            </p>
          </div>
        </div>

        {/* Thumbnail Showcase */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900 border border-obsidian-border rounded-2xl shadow-premium">
          <img 
            src={project.thumbnail} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Segments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
          
          {/* Left Column: Narrative Details */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <h3 className="text-2xl text-white font-bold tracking-tight">Project Overview</h3>
              <p className="text-neutral-400 text-base leading-relaxed whitespace-pre-line">
                {project.overview}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl text-white font-bold tracking-tight">Problem Statement</h3>
              <p className="text-neutral-400 text-base leading-relaxed whitespace-pre-line">
                {project.problemStatement}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl text-white font-bold tracking-tight">Proposed Solution</h3>
              <p className="text-neutral-400 text-base leading-relaxed whitespace-pre-line">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Right Column: Features & Technologies */}
          <div className="lg:col-span-5 space-y-10">
            <div className="p-6 bg-obsidian-card border border-obsidian-border rounded-2xl space-y-6">
              <h3 className="text-xl text-white font-bold border-b border-obsidian-border/60 pb-3 flex items-center gap-2">
                <Globe size={18} className="text-glow-cyan" />
                <span>Key Deliverables</span>
              </h3>
              <ul className="list-disc pl-5 text-neutral-400 text-sm leading-relaxed space-y-3">
                {project.features.map((feature, fIdx) => (
                  <li key={fIdx} className="pl-1">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-obsidian-card border border-obsidian-border rounded-2xl space-y-4">
              <h3 className="text-xl text-white font-bold border-b border-obsidian-border/60 pb-3 flex items-center gap-2">
                <Code2 size={18} className="text-glow-cyan" />
                <span>Tech Stack</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, tIdx) => (
                  <span 
                    key={tIdx}
                    className="px-2.5 py-1 bg-neutral-900 border border-obsidian-border/50 rounded-lg text-xs font-mono text-neutral-300 hover:text-white transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
