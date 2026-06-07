'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('Initializing workspace');

  useEffect(() => {
    const steps = [
      { p: 20, t: 'Loading assets' },
      { p: 45, t: 'Compiling shaders' },
      { p: 70, t: 'Building scene' },
      { p: 90, t: 'Finalizing environment' },
      { p: 100, t: 'Ready' },
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i].p);
        setText(steps[i].t);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808]">
      {/* Logo mark */}
      <div className="mb-12 relative">
        <div className="w-16 h-16 border border-[rgba(255,255,255,0.06)] rounded-lg flex items-center justify-center">
          <span className="font-display text-2xl text-[#f59e0b]">RG</span>
        </div>
        <div className="absolute inset-0 rounded-lg border border-[#f59e0b] opacity-20 animate-ping" />
      </div>

      {/* Progress bar */}
      <div className="w-48 mb-4">
        <div className="h-px bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#f59e0b] to-[#2dd4bf] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Status text */}
      <p className="font-mono text-xs text-[#555555] tracking-widest uppercase">
        {text}
        <span className="cursor-blink">_</span>
      </p>
    </div>
  );
}
