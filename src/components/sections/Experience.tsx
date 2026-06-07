'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { resumeData } from '@/data/resume';
import Tag from '@/components/ui/Tag';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Experience() {
  const { experience } = resumeData;

  return (
    <div className="min-h-full flex flex-col justify-center py-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-2xl">
        {/* Section label */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="show"
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-6 h-px bg-[#f59e0b]" />
          <span className="font-mono text-xs text-[#f59e0b] tracking-widest uppercase">Work experience</span>
        </motion.div>

        <motion.h2
          custom={1} variants={fadeUp} initial="hidden" animate="show"
          className="font-display text-3xl md:text-4xl text-[#f0f0f0] mb-10 leading-tight"
        >
          Where I've been
          <br />
          <span className="text-gradient-amber">building things</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gradient-to-b from-[#f59e0b] via-[rgba(245,158,11,0.3)] to-transparent" />

          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="relative pl-10"
              >
                {/* Timeline dot */}
                <div className={`absolute left-0 top-1.5 w-7 h-7 rounded-full border flex items-center justify-center ${
                  exp.current
                    ? 'border-[rgba(245,158,11,0.5)] bg-[rgba(245,158,11,0.1)]'
                    : 'border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)]'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${exp.current ? 'bg-[#f59e0b]' : 'bg-[#333333]'}`} />
                  {exp.current && (
                    <div className="absolute inset-0 rounded-full border border-[#f59e0b] animate-ping opacity-30" />
                  )}
                </div>

                {/* Card */}
                <div className={`p-5 rounded-lg border transition-all duration-300 ${
                  exp.current
                    ? 'border-[rgba(245,158,11,0.15)] bg-[rgba(245,158,11,0.04)]'
                    : 'border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]'
                }`}>
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-[#f0f0f0] text-sm font-medium mb-0.5">{exp.role}</h3>
                      <p className="font-mono text-xs text-[#f59e0b]">{exp.company}</p>
                    </div>
                    {exp.current && (
                      <span className="px-2 py-0.5 rounded-full font-mono text-[9px] text-[#f59e0b] border border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.08)] tracking-wider">
                        CURRENT
                      </span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={11} className="text-[#444444]" />
                      <span className="font-mono text-[10px] text-[#555555]">{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={11} className="text-[#444444]" />
                      <span className="font-mono text-[10px] text-[#555555]">{exp.location}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-4">
                    {exp.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#f59e0b] mt-1 flex-shrink-0" style={{ fontSize: '6px' }}>▶</span>
                        <span className="text-[#666666] text-xs leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <Tag key={s} variant="default">{s}</Tag>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
