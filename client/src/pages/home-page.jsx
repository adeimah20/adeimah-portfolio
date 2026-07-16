import React from 'react';
import HeroSection from '../components/sections/hero-section';
import AboutSection from '../components/sections/about-section';
import ExperienceSection from '../components/sections/experience-section';
import ProjectsSection from '../components/sections/projects-section';
import SkillsSection from '../components/sections/skills-section';
import ContactSection from '../components/sections/contact-section';

const HomePage = () => {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. About Section */}
      <AboutSection />

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
