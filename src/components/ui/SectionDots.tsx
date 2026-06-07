'use client';

import { motion } from 'framer-motion';
import type { SectionId } from '@/types';

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

interface SectionDotsProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

export default function SectionDots({ activeSection, onNavigate }: SectionDotsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
    >
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => onNavigate(s.id)}
          title={s.label}
          className="group flex items-center justify-end gap-2"
        >
          <span className="font-mono text-[10px] text-[#333333] group-hover:text-[#888888] transition-colors duration-300 opacity-0 group-hover:opacity-100 tracking-wider">
            {s.label}
          </span>
          <div
            className={`rounded-full transition-all duration-300 ${
              activeSection === s.id
                ? 'w-4 h-1.5 bg-[#f59e0b]'
                : 'w-1.5 h-1.5 bg-[#333333] group-hover:bg-[#555555]'
            }`}
          />
        </button>
      ))}
    </motion.div>
  );
}
