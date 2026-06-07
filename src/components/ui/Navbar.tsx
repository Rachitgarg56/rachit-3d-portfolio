'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { SectionId, NavItem } from '@/types';

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id: SectionId) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 md:px-10"
      >
        {/* Backdrop blur strip */}
        <div className="absolute inset-0 bg-[#080808]/70 backdrop-blur-xl border-b border-[rgba(255,255,255,0.04)]" />

        {/* Logo */}
        <button
          onClick={() => handleNav('hero')}
          className="relative z-10 flex items-center gap-2 group"
        >
          <div className="w-8 h-8 border border-[rgba(245,158,11,0.3)] rounded flex items-center justify-center group-hover:border-[#f59e0b] transition-colors duration-300">
            <span className="font-display text-sm text-[#f59e0b]">RG</span>
          </div>
          <span className="hidden sm:block font-mono text-xs text-[#555555] group-hover:text-[#888888] transition-colors duration-300 tracking-wider">
            rachit.dev
          </span>
        </button>

        {/* Desktop nav */}
        <div className="relative z-10 hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="relative px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 group"
            >
              <span
                className={`transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-[#f0f0f0]'
                    : 'text-[#555555] group-hover:text-[#888888]'
                }`}
              >
                {item.label}
              </span>
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#f59e0b]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="relative z-10 hidden md:flex items-center gap-3">
          <a
            href="mailto:rachitgarg56@gmail.com"
            className="px-4 py-1.5 font-mono text-xs border border-[rgba(255,255,255,0.08)] text-[#888888] hover:text-[#f0f0f0] hover:border-[rgba(255,255,255,0.16)] rounded transition-all duration-300 tracking-wider"
          >
            Hire me
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-10 md:hidden p-2 text-[#555555] hover:text-[#f0f0f0] transition-colors duration-300"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)] md:hidden"
          >
            <div className="py-4 px-6 flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(item.id)}
                  className={`text-left py-3 font-mono text-sm tracking-wider border-b border-[rgba(255,255,255,0.04)] transition-colors duration-200 ${
                    activeSection === item.id ? 'text-[#f59e0b]' : 'text-[#555555]'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
