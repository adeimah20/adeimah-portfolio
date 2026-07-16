import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useEducation } from '../../hooks/useEducation';

const AboutSection = ({ profile }) => {
  const { education, loading, error } = useEducation();

  return (
    <section id="about" className="py-24 bg-obsidian border-b border-obsidian-border/50 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-glow-cyan/5 rounded-full blur-[100px] pointer-events-none" />

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
            <span className="text-glow-cyan font-mono text-sm tracking-widest uppercase block mb-2">01 / About Me</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Professional Summary</h2>
          </div>
          <div className="h-[1px] flex-grow bg-obsidian-border/50 hidden md:block max-w-md" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Main Description */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
            <h3 className="text-2xl text-white font-semibold leading-snug">
              Bridging quality software, agile project coordination, and AI-powered solutions.
            </h3>
            {profile?.aboutNarrative?.split('\n\n').map((para, index) => (
              <p key={index} className="text-neutral-400 text-base leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Education Timeline Card */}
          <motion.div 
            whileHover={{ 
              y: -6, 
              scale: 1.02, 
              borderColor: 'rgba(0, 240, 255, 0.3)',
              boxShadow: '0 20px 40px -15px rgba(0, 240, 255, 0.08)'
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:col-span-6 p-8 bg-obsidian-card border border-obsidian-border rounded-2xl flex flex-col gap-6 shadow-premium transition-colors duration-300"
          >
            <div className="flex items-center gap-2.5 text-neutral-500 text-xs font-mono tracking-wider uppercase">
              <GraduationCap size={20} className="text-glow-cyan" />
              <span>Education</span>
            </div>
            
            <div className="relative border-l border-obsidian-border pl-5 ml-2.5 space-y-8 flex-grow flex flex-col justify-center">
              {loading ? (
                <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs py-4">
                  <span className="w-4 h-4 border-2 border-glow-cyan border-t-transparent rounded-full animate-spin" />
                  <span>Loading education...</span>
                </div>
              ) : error ? (
                <div className="text-red-500 font-mono text-xs py-4">
                  <span>Unable to load education data.</span>
                </div>
              ) : (
                education.map((item, index) => {
                  const isCurrent = index === 0 || item.period.toLowerCase().includes('present');
                  return (
                    <div key={item.id} className="relative">
                      <div className={isCurrent 
                        ? "absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full bg-glow-cyan shadow-[0_0_8px_#00F0FF]" 
                        : "absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full bg-obsidian-border border border-neutral-600"
                      } />
                      <h5 className="text-white text-sm sm:text-base font-semibold">{item.schoolName}</h5>
                      <p className="text-neutral-300 text-xs sm:text-sm font-medium mt-1">{item.degree}</p>
                      <p className="text-neutral-500 text-[11px] font-mono mt-1.5">
                        {item.location} | {item.period}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
};

export default AboutSection;
