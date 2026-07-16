import React from 'react';
import { useProfile } from '../hooks/useProfile';
import HeroSection from '../components/sections/hero-section';
import AboutSection from '../components/sections/about-section';
import ExperienceSection from '../components/sections/experience-section';
import ProjectsSection from '../components/sections/projects-section';
import SkillsSection from '../components/sections/skills-section';
import ContactSection from '../components/sections/contact-section';

const HomePage = () => {
  const { profile, loading, error } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-obsidian text-glow-cyan font-mono gap-4">
        <div className="w-10 h-10 border-4 border-glow-cyan border-t-transparent rounded-full animate-spin" />
        <span className="text-sm tracking-widest uppercase">Loading profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-obsidian text-red-500 font-mono p-6 text-center gap-2">
        <h3 className="text-xl font-bold tracking-tight uppercase">Connection Error</h3>
        <p className="text-neutral-400 text-sm max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-6 py-2 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors rounded-xl text-xs uppercase tracking-wider"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection profile={profile} />

      {/* 2. About Section */}
      <AboutSection profile={profile} />

      {/* 3. Experience Section */}
      <ExperienceSection />

      {/* 4. Projects Section */}
      <ProjectsSection />

      {/* 5. Skills Section */}
      <SkillsSection />

      {/* 6. Contact Section */}
      <ContactSection />
    </div>
  );
};

export default HomePage;
