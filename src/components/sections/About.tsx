'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Briefcase } from 'lucide-react';
import { resumeData } from '@/data/resume';
import Tag from '@/components/ui/Tag';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  const { personal, education } = resumeData;

  return (
    <div className="min-h-full flex flex-col justify-center py-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-2xl">
        {/* Section label */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="show"
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-6 h-px bg-[#f59e0b]" />
          <span className="font-mono text-xs text-[#f59e0b] tracking-widest uppercase">About me</span>
        </motion.div>

        <motion.h2
          custom={1} variants={fadeUp} initial="hidden" animate="show"
          className="font-display text-3xl md:text-4xl text-[#f0f0f0] mb-6 leading-tight"
        >
          Frontend engineer who
          <br />
          <span className="text-gradient-amber">cares about craft</span>
        </motion.h2>

        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="show"
          className="text-[#666666] text-base leading-relaxed mb-8"
        >
          {personal.summary}
        </motion.p>

        {/* Info cards */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="show"
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8"
        >
          {[
            { icon: MapPin, label: 'Location', value: 'Bangalore, IN' },
            { icon: Briefcase, label: 'Status', value: 'Open to work' },
            { icon: GraduationCap, label: 'Education', value: 'B.Voc AI & Robotics' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="p-4 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
              <div className="flex items-center gap-2 mb-1.5">
                <Icon size={13} className="text-[#f59e0b]" />
                <span className="font-mono text-[10px] text-[#444444] uppercase tracking-wider">{label}</span>
              </div>
              <p className="font-mono text-xs text-[#888888]">{value}</p>
            </div>
          ))}
        </motion.div>

        {/* Education */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="show"
          className="p-5 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded border border-[rgba(245,158,11,0.2)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <GraduationCap size={14} className="text-[#f59e0b]" />
            </div>
            <div className="flex-1">
              <p className="font-mono text-xs text-[#f59e0b] mb-0.5">{education.duration}</p>
              <h3 className="text-sm text-[#f0f0f0] mb-0.5">{education.degree}</h3>
              <p className="font-mono text-xs text-[#555555] mb-3">{education.institution} · CGPA {education.cgpa}</p>
              <div className="flex flex-wrap gap-1.5">
                {education.coursework.map((c) => (
                  <Tag key={c} variant="default">{c}</Tag>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
