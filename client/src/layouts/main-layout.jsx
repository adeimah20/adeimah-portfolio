import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-obsidian text-neutral-400 font-sans selection:bg-glow-cyan/20 selection:text-white flex flex-col">
      {/* Dynamic Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
