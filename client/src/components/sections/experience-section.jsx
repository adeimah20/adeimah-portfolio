import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award } from 'lucide-react';

const experiences = [
  {
    position: 'IT Project Manager & QA Analyst Intern',
    company: 'TechSolutions Innovation Group',
    period: 'Mar 2025 - Jul 2025',
    description: [
      'Led release cycle management and facilitated Daily Standups for a cross-functional AI development team of 6 members.',
      'Designed comprehensive Test Plans and executed functional test scenarios for web applications.'
    ],
    achievement: 'Increased team collaboration efficiency by 25% and reduced production release bugs by 40%.',
    tools: ['Jira', 'Trello', 'Postman', 'Manual Testing']
  },
  {
    position: 'UI/UX Designer (Academic Freelance Project)',
    company: 'Sistem Informasi Kampus Digital',
    period: 'Sep 2024 - Jan 2025',
    description: [
      'Conducted user research and interviewed 15 student respondents to map course registration flow challenges.',
      'Designed information architecture, wireframes, and interactive High-Fidelity (Hi-Fi) prototypes.'
    ],
    achievement: 'Achieved a System Usability Scale (SUS) score of 82 (Excellent category).',
    tools: ['Figma', 'User Persona', 'Prototyping', 'Wireframing']
  },
  {
    position: 'Quality Assurance Coordinator',
    company: 'UKM Rekayasa Perangkat Lunak',
    period: 'Jan 2024 - Dec 2024',
    description: [
      'Developed an E2E (End-to-End) test automation framework using JavaScript and Playwright.',
      'Conducted internal training sessions on test case design and bug reporting management for 12 new members.'
    ],
    achievement: 'Reduced manual regression testing time for periodic releases from 4 hours to 15 minutes through automation.',
    tools: ['Playwright', 'Git & GitHub', 'Test Case Design', 'API Testing']
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 lg:py-32 bg-obsidian border-b border-obsidian-border/50 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/3 left-0 w-[250px] h-[250px] bg-glow-blue/5 rounded-full blur-[100px] pointer-events-none" />

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
            <span className="text-glow-cyan font-mono text-sm tracking-widest uppercase block mb-2">02 / Experience</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Work & Leadership Experience</h2>
          </div>
          <div className="h-[1px] flex-grow bg-obsidian-border/50 hidden md:block max-w-md" />
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-obsidian-border pl-6 sm:pl-8 ml-4 space-y-12">
          
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative group">
              
              {/* Active Bullet dot indicator */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-4 h-4 rounded-full bg-obsidian border-2 border-obsidian-border group-hover:border-glow-cyan transition-all duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-glow-cyan transition-all duration-300" />
              </div>

              {/* Card Container with Premium Micro Interactions */}
              <motion.div 
                whileHover={{ 
                  y: -6, 
                  scale: 1.02, 
                  borderColor: 'rgba(0, 240, 255, 0.3)',
                  boxShadow: '0 20px 40px -15px rgba(0, 240, 255, 0.08)'
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="p-6 bg-obsidian-card border border-obsidian-border rounded-2xl shadow-premium transition-colors duration-300"
              >
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl text-white font-semibold flex items-center gap-2">
                      {exp.position}
                    </h3>
                    <p className="text-glow-cyan font-mono text-sm">{exp.company}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-obsidian-border/50 rounded-lg text-xs font-mono text-neutral-400">
                    <Calendar size={12} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Job Description bullets */}
                <ul className="list-disc pl-5 text-neutral-400 text-sm leading-relaxed space-y-2 mb-4">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>

                {/* Key Achievement */}
                {exp.achievement && (
                  <div className="flex items-start gap-2 bg-neutral-950/40 p-3 border border-obsidian-border/30 rounded-xl mb-4 text-xs">
                    <Award size={16} className="text-glow-cyan flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-neutral-300 font-semibold">Key Achievement: </span>
                      <span className="text-neutral-400 leading-relaxed">{exp.achievement}</span>
                    </div>
                  </div>
                )}

                {/* Tools Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.tools.map((tool, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-2.5 py-1 bg-neutral-900/80 border border-obsidian-border rounded-lg text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors duration-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

              </motion.div>
            </div>
          ))}

        </div>

      </motion.div>
    </section>
  );
};

export default ExperienceSection;
