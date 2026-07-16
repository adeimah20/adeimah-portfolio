import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-8 border-t border-obsidian-border/50 bg-black/40 text-center text-xs text-neutral-500 font-mono"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          &copy; {new Date().getFullYear()} Ade Imah. All rights reserved.
        </div>
        <div className="text-neutral-600 text-[10px] sm:text-xs">
          Built with <span className="text-neutral-400">React + Express + PostgreSQL</span>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
