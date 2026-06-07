'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Phone, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { resumeData } from '@/data/resume';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="p-1.5 text-[#333333] hover:text-[#888888] transition-colors duration-200"
    >
      {copied ? <Check size={12} className="text-[#2dd4bf]" /> : <Copy size={12} />}
    </button>
  );
}

export default function Contact() {
  const { personal } = resumeData;

  const links = [
    {
      icon: Mail,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      color: '#f59e0b',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: personal.github,
      href: personal.githubUrl,
      color: '#f0f0f0',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: personal.linkedin,
      href: personal.linkedinUrl,
      color: '#0a66c2',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone}`,
      color: '#2dd4bf',
    },
  ];

  return (
    <div className="min-h-full flex flex-col justify-center py-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-lg">
        {/* Section label */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="show"
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-6 h-px bg-[#f59e0b]" />
          <span className="font-mono text-xs text-[#f59e0b] tracking-widest uppercase">Get in touch</span>
        </motion.div>

        <motion.h2
          custom={1} variants={fadeUp} initial="hidden" animate="show"
          className="font-display text-3xl md:text-4xl text-[#f0f0f0] mb-4 leading-tight"
        >
          Let's build something
          <br />
          <span className="text-gradient-amber">great together</span>
        </motion.h2>

        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="show"
          className="text-[#555555] text-sm leading-relaxed mb-10"
        >
          I'm actively looking for new opportunities. Whether you have a project in mind,
          a role to fill, or just want to say hello — my inbox is always open.
        </motion.p>

        {/* Terminal card */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="show"
          className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] overflow-hidden mb-6"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
            <span className="font-mono text-[10px] text-[#333333] ml-2 tracking-wider">
              contact.json
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-5 space-y-3">
            {links.map(({ icon: Icon, label, value, href, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center gap-3 group"
              >
                <span className="font-mono text-xs text-[#333333] w-16 flex-shrink-0">{label}:</span>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Icon size={11} style={{ color, flexShrink: 0 }} />
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="font-mono text-xs truncate hover:underline transition-all duration-200"
                    style={{ color }}
                  >
                    {value}
                  </a>
                </div>
                <CopyButton text={value} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show">
          <a
            href={`mailto:${personal.email}`}
            className="block w-full py-4 text-center font-mono text-sm tracking-wider text-[#080808] bg-[#f59e0b] rounded hover:bg-[#fbbf24] transition-colors duration-300 hover:shadow-[0_0_32px_rgba(245,158,11,0.25)]"
          >
            Send me an email →
          </a>
        </motion.div>

        <motion.p
          custom={5} variants={fadeUp} initial="hidden" animate="show"
          className="mt-6 font-mono text-[10px] text-[#333333] text-center tracking-wider"
        >
          Usually responds within 24 hours · Based in Bangalore, India
        </motion.p>
      </div>
    </div>
  );
}
