import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const AboutSection = () => {
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

        {/* Layout Grid - items-stretch to align left and right column heights perfectly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Main Description */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
            <h3 className="text-2xl text-white font-semibold leading-snug">
              Bridging quality software, agile project coordination, and AI-powered solutions.
            </h3>
            <p className="text-neutral-400 text-base leading-relaxed">
              I'm a 4th-semester Information Systems and Technology student with a strong interest in Quality Assurance (QA), IT Project Management, and AI Engineering. I enjoy building reliable software, managing digital projects efficiently, and leveraging artificial intelligence to create meaningful solutions.
            </p>
            <p className="text-neutral-400 text-base leading-relaxed">
              Through academic and personal projects, I have continuously developed my skills in software testing, project coordination, and AI technologies. I believe that continuous learning, adaptability, and collaboration are essential for delivering high-quality digital products and making a positive impact in the technology industry.
            </p>
          </div>

          {/* Education Timeline Card with premium Micro Interactions */}
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
              {/* Cakrawala University */}
              <div className="relative">
                <div className="absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full bg-glow-cyan" />
                <h5 className="text-white text-sm sm:text-base font-semibold">Cakrawala University</h5>
                <p className="text-neutral-300 text-xs sm:text-sm font-medium mt-1">Bachelor's Degree in Information Systems and Technology</p>
                <p className="text-neutral-500 text-[11px] font-mono mt-1.5">South Jakarta, Indonesia | 2024 – Present (Current: 4th Semester)</p>
              </div>
              
              {/* SMK Tirta Sari Surya */}
              <div className="relative">
                <div className="absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full bg-obsidian-border border border-neutral-600" />
                <h5 className="text-white text-sm sm:text-base font-semibold">SMK Tirta Sari Surya</h5>
                <p className="text-neutral-300 text-xs sm:text-sm font-medium mt-1">Accounting</p>
                <p className="text-neutral-500 text-[11px] font-mono mt-1.5">East Jakarta, Indonesia | 2022 – 2024</p>
              </div>
            </div>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
};

export default AboutSection;
