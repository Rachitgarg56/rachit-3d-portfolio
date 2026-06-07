'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import Tag from '@/components/ui/Tag';

const CATEGORIES = [
  { key: 'languages', label: 'Languages', icon: '{ }', color: 'amber' as const },
  { key: 'frontend', label: 'Frontend', icon: '<>', color: 'teal' as const },
  { key: 'backend', label: 'Backend & DB', icon: '[]', color: 'amber' as const },
  { key: 'devTools', label: 'Dev Tools', icon: '⚙', color: 'teal' as const },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Skills() {
  const { skills } = resumeData;

  return (
    <div className="min-h-full flex flex-col justify-center py-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-xl">
        {/* Section label */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="show"
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-6 h-px bg-[#2dd4bf]" />
          <span className="font-mono text-xs text-[#2dd4bf] tracking-widest uppercase">Technical skills</span>
        </motion.div>

        <motion.h2
          custom={1} variants={fadeUp} initial="hidden" animate="show"
          className="font-display text-3xl md:text-4xl text-[#f0f0f0] mb-8 leading-tight"
        >
          Tools I build
          <br />
          <span className="text-gradient-teal">great things with</span>
        </motion.h2>

        <div className="space-y-6">
          {CATEGORIES.map(({ key, label, icon, color }, i) => {
            const skillList = skills[key as keyof typeof skills] as readonly string[];
            return (
              <motion.div
                key={key}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="group"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span className={`font-mono text-xs ${color === 'amber' ? 'text-[#f59e0b]' : 'text-[#2dd4bf]'}`}>
                    {icon}
                  </span>
                  <span className="font-mono text-xs text-[#555555] uppercase tracking-wider">{label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, idx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (i + 2) * 0.08 + idx * 0.03 }}
                    >
                      <Tag variant={color}>{skill}</Tag>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Soft skills */}
        <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show" className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)]">
          <p className="font-mono text-xs text-[#333333] uppercase tracking-wider mb-3">Soft skills</p>
          <div className="flex flex-wrap gap-2">
            {skills.soft.map((s) => (
              <Tag key={s} variant="default">{s}</Tag>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
