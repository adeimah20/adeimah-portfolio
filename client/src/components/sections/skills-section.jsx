import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Users, Wrench } from 'lucide-react';

const skillCategories = [
  {
    title: 'Hard Skills',
    skills: [
      { name: 'Software Testing (Manual & Automation)', level: 90 },
      { name: 'API Testing (Postman/Supertest)', level: 85 },
      { name: 'Frontend Dev (React.js, Tailwind, ES6+)', level: 80 },
      { name: 'Backend Dev (Node.js, Express, REST API)', level: 75 },
      { name: 'Database (PostgreSQL, Prisma ORM)', level: 80 },
      { name: 'Product Management & UI/UX Design', level: 85 }
    ]
  },
  {
    title: 'Soft Skills',
    skills: [
      { name: 'Collaboration & Teamwork', level: 95 },
      { name: 'Problem Solving & Critical Thinking', level: 90 },
      { name: 'Adaptability & Self Learning', level: 90 },
      { name: 'IT Project Management & Jira Coordination', level: 85 },
      { name: 'Time Management', level: 85 },
      { name: 'Communication', level: 90 }
    ]
  },
  {
    title: 'Tools & Utilities',
    skills: [
      { name: 'Figma', level: 85 },
      { name: 'Postman', level: 90 },
      { name: 'Git & GitHub', level: 85 },
      { name: 'Visual Studio Code & Prisma Studio', level: 90 },
      { name: 'n8n & Automations', level: 75 },
      { name: 'Jira / Trello / Notion', level: 90 }
    ]
  }
];

const getCategoryIcon = (title) => {
  switch (title) {
    case 'Hard Skills':
      return <Code2 size={20} className="text-glow-cyan" />;
    case 'Soft Skills':
      return <Users size={20} className="text-glow-cyan" />;
    case 'Tools & Utilities':
      return <Wrench size={20} className="text-glow-cyan" />;
    default:
      return <Code2 size={20} className="text-glow-cyan" />;
  }
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 lg:py-32 bg-obsidian border-b border-obsidian-border/50 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[300px] h-[300px] bg-glow-blue/5 rounded-full blur-[110px] pointer-events-none" />

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
            <span className="text-glow-cyan font-mono text-xs tracking-widest uppercase block mb-2">04 / Skills</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Skill Matrix & Competencies</h2>
          </div>
          <div className="h-[1px] flex-grow bg-obsidian-border/50 hidden md:block max-w-md" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {skillCategories.map((category, catIdx) => (
            <motion.div 
              key={catIdx}
              whileHover={{ 
                y: -6, 
                scale: 1.02, 
                borderColor: 'rgba(0, 240, 255, 0.3)',
                boxShadow: '0 20px 40px -15px rgba(0, 240, 255, 0.08)'
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="p-6 bg-obsidian-card border border-obsidian-border rounded-2xl flex flex-col space-y-6 shadow-premium transition-colors duration-300"
            >
              <h3 className="text-lg text-white font-semibold border-b border-obsidian-border/60 pb-3 flex items-center gap-2.5">
                {getCategoryIcon(category.title)}
                <span>{category.title}</span>
              </h3>

              <div className="space-y-4 flex-grow">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    {/* Label & Percentage */}
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-neutral-300 font-medium">{skill.name}</span>
                      <span className="text-glow-cyan font-bold">{skill.level}%</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-[3px] bg-neutral-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: sIdx * 0.05 }}
                        className="h-full bg-gradient-to-r from-glow-blue to-glow-cyan rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}

        </div>

      </motion.div>
    </section>
  );
};

export default SkillsSection;
