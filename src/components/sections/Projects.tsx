'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';
import { resumeData } from '@/data/resume';
import Tag from '@/components/ui/Tag';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Projects() {
  const { projects } = resumeData;
  const [expanded, setExpanded] = useState<string | null>(
    projects[0]?.id ?? null
  );

  return (
    <div className="min-h-full flex flex-col justify-center py-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-2xl">
        {/* Section Label */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-6 h-px bg-[#2dd4bf]" />
          <span className="font-mono text-xs text-[#2dd4bf] tracking-widest uppercase">
            Featured Projects
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-display text-3xl md:text-4xl text-[#f0f0f0] mb-8 leading-tight"
        >
          What I've
          <br />
          <span className="text-gradient-teal">Shipped</span>
        </motion.h2>

        <div className="space-y-4">
          {projects.map((project, i) => {
            const isOpen = expanded === project.id;
            const accentColor = project.color;

            return (
              <motion.div
                key={project.id}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="rounded-lg border overflow-hidden transition-all duration-300"
                style={{
                  borderColor: isOpen
                    ? `${accentColor}33`
                    : 'rgba(255,255,255,0.06)',
                  background: isOpen
                    ? `${accentColor}06`
                    : 'rgba(255,255,255,0.02)',
                }}
              >
                {/* Header */}
                <button
                  onClick={() =>
                    setExpanded(isOpen ? null : project.id)
                  }
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: accentColor,
                          boxShadow: `0 0 8px ${accentColor}`,
                        }}
                      />
                      <h3 className="text-sm text-[#f0f0f0] font-medium">
                        {project.title}
                      </h3>
                    </div>

                    <p className="font-mono text-[10px] text-[#444444] ml-4.5 tracking-wide">
                      {project.duration}
                    </p>
                  </div>

                  <div className="flex items-center ml-4">
                    {isOpen ? (
                      <ChevronUp
                        size={14}
                        className="text-[#444444]"
                      />
                    ) : (
                      <ChevronDown
                        size={14}
                        className="text-[#444444]"
                      />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0">
                        <div className="h-px bg-[rgba(255,255,255,0.06)] mb-5" />

                        {/* Description */}
                        <p className="text-[#666666] text-xs leading-relaxed mb-5">
                          {project.description}
                        </p>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-2 mb-5">
                          {project.metrics.map((metric) => (
                            <div
                              key={metric.label}
                              className="p-3 rounded border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
                            >
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <TrendingUp
                                  size={10}
                                  style={{
                                    color: accentColor,
                                  }}
                                />

                                <span className="font-mono text-[9px] text-[#444444] uppercase tracking-wider">
                                  {metric.label}
                                </span>
                              </div>

                              <p
                                className="font-mono text-sm font-medium"
                                style={{
                                  color: accentColor,
                                }}
                              >
                                {metric.value}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Highlights */}
                        <ul className="space-y-1.5 mb-5">
                          {project.highlights.map(
                            (highlight, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2"
                              >
                                <span
                                  className="mt-1 flex-shrink-0"
                                  style={{
                                    color: accentColor,
                                    fontSize: '6px',
                                  }}
                                >
                                  ▶
                                </span>

                                <span className="text-[#666666] text-xs leading-relaxed">
                                  {highlight}
                                </span>
                              </li>
                            )
                          )}
                        </ul>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <Tag
                              key={tech}
                              variant={
                                accentColor === '#2dd4bf'
                                  ? 'teal'
                                  : 'amber'
                              }
                            >
                              {tech}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}