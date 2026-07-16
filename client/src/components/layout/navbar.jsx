import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollSpy } from '../../hooks/use-scroll-spy';
import Logo from '../ui/logo';

// Ikon GitHub SVG Kustom (karena Lucide React versi baru menghapus ikon brand)
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' },
  ];

  // Mengambil ID seksi yang sedang aktif di viewport
  const activeSection = useScrollSpy(menuItems.map((item) => item.id));

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname === '/') {
      // Jika di beranda, lakukan smooth scroll langsung
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Jika di sub-halaman lain, navigasikan ke beranda dengan hash
      navigate(`/#${id}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-obsidian/85 backdrop-blur-md border-b border-obsidian-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <Link 
          to="/" 
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <Logo />
        </Link>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id && location.pathname === '/';
            return (
              <a
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative text-sm font-medium transition-colors hover:text-white py-2 ${
                  isActive ? 'text-white' : 'text-neutral-400'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-glow-cyan"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* GitHub Button (Sisi Kanan Navbar) */}
        <div className="hidden md:flex items-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white bg-obsidian-card border border-obsidian-border rounded-xl hover:bg-neutral-900 transition-all duration-200"
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          className="md:hidden text-neutral-400 hover:text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu (Framer Motion) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden w-full bg-obsidian border-b border-obsidian-border/50 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col space-y-4">
              {menuItems.map((item) => {
                const isActive = activeSection === item.id && location.pathname === '/';
                return (
                  <a
                    key={item.id}
                    href={`/#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`text-sm font-medium py-1 border-b border-transparent transition-colors hover:text-white ${
                      isActive ? 'text-glow-cyan font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              
              {/* GitHub Button Mobile */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-neutral-900 border border-obsidian-border rounded-xl text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
              >
                <GithubIcon size={18} />
                <span>GitHub Profile</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
