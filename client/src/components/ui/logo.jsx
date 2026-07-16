import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Placeholder logo icon (dapat diganti dengan tag <img> nantinya) */}
      <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-obsidian-border flex items-center justify-center text-glow-cyan font-mono font-bold text-sm shadow-premium select-none">
        &lt;/&gt;
      </div>
      
      {/* Brand Text */}
      <span className="text-white font-mono text-sm sm:text-base font-bold tracking-wider hover:text-glow-cyan transition-colors whitespace-nowrap">
        Professional <span className="text-glow-cyan">Portfolio</span>
      </span>
    </div>
  );
};

export default Logo;
