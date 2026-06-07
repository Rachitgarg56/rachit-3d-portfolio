'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import type { SectionId } from '@/types';
import { resumeData } from '@/data/resume';

interface HeroProps {
  onNavigate: (s: SectionId) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ onNavigate }: HeroProps) {
  const { personal } = resumeData;

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 pb-16">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-2xl"
      >
        {/* Pre-label */}
        <motion.div variants={item} className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-[#f59e0b]" />
          <span className="font-mono text-xs text-[#f59e0b] tracking-widest uppercase">
            Available for work
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-display text-5xl md:text-6xl lg:text-7xl text-[#f0f0f0] leading-tight mb-3"
        >
          {personal.name}
        </motion.h1>

        {/* Title */}
        <motion.div variants={item} className="flex items-baseline gap-3 mb-6">
          <span className="font-mono text-base md:text-lg text-[#f59e0b] tracking-wide">
            {personal.title}
          </span>
          <span className="text-[#333333]">/</span>
          <span className="font-mono text-sm text-[#555555] tracking-wide">Bangalore, IN</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-[#666666] text-base md:text-lg leading-relaxed max-w-md mb-10 font-body"
        >
          {personal.tagline}
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={item}
          className="pointer-events-auto flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => onNavigate('projects')}
            className="px-6 py-3 bg-[#f59e0b] text-[#080808] font-mono text-sm tracking-wider rounded hover:bg-[#fbbf24] transition-colors duration-300 hover:shadow-[0_0_24px_rgba(245,158,11,0.3)]"
          >
            View Projects
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 border border-[rgba(255,255,255,0.08)] text-[#888888] font-mono text-sm tracking-wider rounded hover:border-[rgba(255,255,255,0.16)] hover:text-[#f0f0f0] transition-all duration-300"
          >
            Get in touch
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div variants={item} className="pointer-events-auto flex items-center gap-5 mt-10">
          <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer"
            className="text-[#444444] hover:text-[#f0f0f0] transition-colors duration-300">
            <Github size={18} />
          </a>
          <a href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer"
            className="text-[#444444] hover:text-[#0a66c2] transition-colors duration-300">
            <Linkedin size={18} />
          </a>
          <a href={`mailto:${personal.email}`}
            className="text-[#444444] hover:text-[#f59e0b] transition-colors duration-300">
            <Mail size={18} />
          </a>
          <div className="w-px h-4 bg-[rgba(255,255,255,0.08)] mx-1" />
          <span className="font-mono text-xs text-[#333333]">{personal.email}</span>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => onNavigate('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="pointer-events-auto absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#333333] hover:text-[#888888] transition-colors duration-300"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </div>
  );
}
