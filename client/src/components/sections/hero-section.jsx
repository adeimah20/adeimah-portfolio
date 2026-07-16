import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import profileImg from '../../assets/image/foto imah.jpeg';

// Coding stream background animates behind profile card
const CodeStream = () => {
  const snippets = [
    'const developer = { name: "Ade Imah", role: "QA Engineer" };',
    'async function buildPortfolio() { await testing(); deploy(); }',
    'describe("Portfolio Suite", () => { test("Responsive Layout"); });',
    'expect(result).toBe(true);',
    'const design = new UIUXDesigner({ theme: "premium", style: "clean" });',
    'await playwright.test("/home");',
    'const pm = new ITProjectManager({ method: "Agile", sprint: 2 });',
    'pm.trackBurndown();',
    'qa.runSanityCheck();',
    'expect(status).toEqual(200);'
  ];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.06] font-mono text-[9px] text-glow-cyan pointer-events-none select-none z-0">
      <motion.div
        animate={{ y: ['-100%', '0%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="space-y-4 py-4"
      >
        {snippets.map((snip, idx) => (
          <div key={idx} className="font-mono whitespace-nowrap">{snip}</div>
        ))}
        {snippets.map((snip, idx) => (
          <div key={`dup-${idx}`} className="font-mono whitespace-nowrap">{snip}</div>
        ))}
      </motion.div>
    </div>
  );
};

// Elegant cyan glowing particles
const DigitalParticles = () => {
  const particles = [
    { top: '12%', left: '15%', size: 4, delay: 0 },
    { top: '28%', left: '78%', size: 5, delay: 1.5 },
    { top: '62%', left: '10%', size: 3, delay: 0.8 },
    { top: '85%', left: '85%', size: 4, delay: 2.2 },
    { top: '48%', left: '92%', size: 5, delay: 1.2 }
  ];

  return (
    <>
      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-glow-cyan/50 blur-[1px] pointer-events-none z-0"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            boxShadow: '0 0 10px #00F0FF'
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 5 + idx,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </>
  );
};

const HeroSection = ({ profile }) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-16 overflow-hidden bg-obsidian"
    >
      {/* Premium Background Glow Accents & Gradients */}
      <div className="absolute inset-0 bg-obsidian overflow-hidden pointer-events-none">
        {/* Moving Background Gradient */}
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-glow-blue/10 via-transparent to-glow-cyan/5 opacity-80 animate-[spin_60s_linear_infinite]" />
        
        {/* Glowing Circles */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-glow-blue/15 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-glow-cyan/15 rounded-full blur-[150px]" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      {/* SVG Grain Noise Filter Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none z-10">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: Copy & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Glassmorphism Role Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-glow-cyan backdrop-blur-md shadow-premium hover:border-glow-cyan/50 hover:bg-white/10 transition-all duration-300 group cursor-default select-none mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform duration-300 animate-pulse" />
            <span className="font-mono">{profile.professionalTitle}</span>
          </motion.div>

          {/* Premium Space Grotesk Heading with Stagger Mask Reveal Animation */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[90px] text-white font-bold leading-[1.05] tracking-tight font-display mb-6">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm md:text-base block font-mono text-neutral-400 font-normal tracking-widest mb-3 uppercase"
            >
              Hi, I'm
            </motion.span>
            
            <span className="block overflow-hidden py-1">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400 drop-shadow-sm font-display"
              >
                {profile.fullName.toUpperCase()}
              </motion.span>
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.6, type: 'spring', stiffness: 100 }}
                className="inline-block ml-2 select-none"
              >
                👋
              </motion.span>
            </span>
          </h1>

          {/* Inter Paragraph Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-[540px] leading-relaxed font-sans mb-8 tracking-wide whitespace-pre-line"
          >
            {profile.heroDescription}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start"
          >
            <a 
              href={profile.cvUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-neutral-100 hover:scale-[1.05] hover:-translate-y-[2px] hover:shadow-[0_0_25px_rgba(255,255,255,0.18)] active:scale-[0.97] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group"
            >
              <Download size={16} className="group-hover:translate-y-[1px] transition-transform duration-300" />
              <span>View My Resume</span>
            </a>
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-[#06B6D4] to-[#2563EB] text-white font-semibold rounded-xl hover:from-[#08c7e6] hover:to-[#3b82f6] hover:scale-[1.05] hover:-translate-y-[2px] hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] active:scale-[0.97] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group"
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Technology Workspace & Circular Profile */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
          
          {/* Technology Workspace Profile Area */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center select-none">
            
            {/* 1. Abstract Digital Circuit Networks Behind Photo */}
            <svg className="absolute inset-[-25%] w-[150%] h-[150%] opacity-20 pointer-events-none z-0" viewBox="0 0 100 100">
              {/* Circuit Path 1 */}
              <path 
                d="M 10 20 L 30 20 L 40 40 L 70 40 L 80 60 L 95 60" 
                stroke="#00E5FF" 
                strokeWidth="0.3" 
                fill="none" 
                strokeDasharray="2, 4" 
                className="animate-dash" 
              />
              {/* Circuit Path 2 */}
              <path 
                d="M 5 80 L 25 80 L 35 60 L 65 60 L 75 80 L 95 80" 
                stroke="#0EA5E9" 
                strokeWidth="0.3" 
                fill="none" 
                strokeDasharray="3, 5" 
                className="animate-dash" 
              />
              {/* Intersecting vertical lines */}
              <line x1="40" y1="40" x2="35" y2="60" stroke="#00E5FF" strokeWidth="0.2" strokeDasharray="1, 1" />
              <line x1="70" y1="40" x2="65" y2="60" stroke="#0EA5E9" strokeWidth="0.2" strokeDasharray="1, 1" />

              {/* Glowing Network Nodes */}
              <circle cx="10" cy="20" r="1.2" fill="#00E5FF" className="animate-pulse" />
              <circle cx="30" cy="20" r="0.8" fill="#0EA5E9" />
              <circle cx="40" cy="40" r="1" fill="#00E5FF" />
              <circle cx="70" cy="40" r="1" fill="#0EA5E9" />
              <circle cx="80" cy="60" r="0.8" fill="#00E5FF" />
              <circle cx="95" cy="60" r="1.2" fill="#0EA5E9" className="animate-pulse" />
              
              <circle cx="25" cy="80" r="0.8" fill="#00E5FF" />
              <circle cx="35" cy="60" r="1" fill="#0EA5E9" />
              <circle cx="65" cy="60" r="1" fill="#00E5FF" />
              <circle cx="75" cy="80" r="0.8" fill="#0EA5E9" />
            </svg>

            {/* 2. Coding Stream Scrolling Animation */}
            <CodeStream />

            {/* 3. Floating Digital Particles */}
            <DigitalParticles />

            {/* 4. Rotating Light Rings (Very Slow) */}
            <div className="absolute inset-[-6%] rounded-full border border-dashed border-glow-cyan/20 animate-[spin_40s_linear_infinite] z-0 pointer-events-none" />
            <div className="absolute inset-[-3%] rounded-full border border-glow-blue/10 animate-[spin_60s_linear_infinite_reverse] z-0 pointer-events-none" />

            {/* 5. Soft gradient glow (breathing animation) */}
            <div className="absolute inset-[-12%] bg-gradient-to-tr from-glow-blue/25 to-glow-cyan/25 rounded-full blur-2xl opacity-75 animate-pulse pointer-events-none z-0" />

            {/* 6. Circular Glassmorphic Profile Card (z-index: 10) with Independent Floating Motion */}
            <div className="animate-float-slow relative z-10 w-full h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04 }}
                className="w-full h-full rounded-full overflow-hidden p-[2.5px] bg-gradient-to-tr from-glow-blue/30 via-obsidian-border to-glow-cyan/30 shadow-premium transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                {/* Profile image with full color, centered face */}
                <div className="w-full h-full bg-obsidian rounded-full overflow-hidden p-1.5 backdrop-blur-md">
                  <img 
                    src={profile.avatarUrl || profileImg} 
                    alt={`${profile.fullName} Portrait`} 
                    className="w-full h-full object-cover rounded-full select-none"
                  />
                </div>
              </motion.div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
