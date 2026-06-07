'use client';

import { Suspense, lazy, memo, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useIsMobile } from '@/hooks/useMediaQuery';
import Navbar from '@/components/ui/Navbar';
import SectionDots from '@/components/ui/SectionDots';
import LoadingScreen from '@/components/ui/LoadingScreen';
import type { SectionId } from '@/types';

// Lazy load heavy components
const Scene3D = lazy(() => import('@/components/3d/Scene3D'));
const Hero = lazy(() => import('@/components/sections/Hero'));
const About = lazy(() => import('@/components/sections/About'));
const Skills = lazy(() => import('@/components/sections/Skills'));
const Experience = lazy(() => import('@/components/sections/Experience'));
const Projects = lazy(() => import('@/components/sections/Projects'));
const Contact = lazy(() => import('@/components/sections/Contact'));

const SECTION_COMPONENTS: Record<SectionId, React.ComponentType<Record<string, never>>> = {
  hero: () => null,
  about: About as React.ComponentType<Record<string, never>>,
  skills: Skills as React.ComponentType<Record<string, never>>,
  experience: Experience as React.ComponentType<Record<string, never>>,
  projects: Projects as React.ComponentType<Record<string, never>>,
  contact: Contact as React.ComponentType<Record<string, never>>,
};

const panelVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const Portfolio = memo(function Portfolio() {
  const { activeSection, navigateTo, isTransitioning } = useActiveSection('hero');
  const isMobile = useIsMobile();
  const lastScrollTime = useRef(0);

  const ActiveSection = SECTION_COMPONENTS[activeSection];
  const showPanel = activeSection !== 'hero';

  // Navigation handlers
  useEffect(() => {
    const SECTIONS: SectionId[] = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
    let touchStartY = 0;
    let isTouchOnPanel = false;

    const handleNavigation = (direction: 'next' | 'prev') => {
      if (isTransitioning) return;
      
      const now = Date.now();
      if (now - lastScrollTime.current < 1000) return; // 1s throttle

      const currentIndex = SECTIONS.indexOf(activeSection);
      if (direction === 'next' && currentIndex < SECTIONS.length - 1) {
        navigateTo(SECTIONS[currentIndex + 1]);
        lastScrollTime.current = now;
      } else if (direction === 'prev' && currentIndex > 0) {
        navigateTo(SECTIONS[currentIndex - 1]);
        lastScrollTime.current = now;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 30) return; // Sensitivity threshold

      // If scrolling inside the side panel, only transition if at boundaries
      const panel = document.querySelector('.side-panel-scroll');
      if (panel && panel.contains(e.target as Node)) {
        const { scrollTop, scrollHeight, clientHeight } = panel;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
        const isAtTop = scrollTop <= 10;
        
        if (e.deltaY > 0 && !isAtBottom) return;
        if (e.deltaY < 0 && !isAtTop) return;
      }

      handleNavigation(e.deltaY > 0 ? 'next' : 'prev');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        if (e.key === ' ' && e.shiftKey) {
          handleNavigation('prev');
        } else {
          handleNavigation('next');
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        handleNavigation('prev');
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      const panel = document.querySelector('.side-panel-scroll');
      isTouchOnPanel = panel ? panel.contains(e.target as Node) : false;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) < 50) return; // Minimum swipe distance

      // Mobile swipe check - only block if swipe was on the panel
      const panel = document.querySelector('.side-panel-scroll');
      if (panel && isTouchOnPanel) {
        const { scrollTop, scrollHeight, clientHeight } = panel;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
        const isAtTop = scrollTop <= 10;
        
        if (deltaY > 0 && !isAtBottom) return;
        if (deltaY < 0 && !isAtTop) return;
      }

      handleNavigation(deltaY > 0 ? 'next' : 'prev');
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, navigateTo, isTransitioning, isMobile]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 3D Canvas - full screen background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<LoadingScreen />}>
          <Scene3D activeSection={activeSection} onSectionChange={navigateTo} />
        </Suspense>
      </div>

      {/* Navigation */}
      <Navbar activeSection={activeSection} onNavigate={navigateTo} />
      <SectionDots activeSection={activeSection} onNavigate={navigateTo} />

      {/* Hero overlay - always rendered when on hero */}
      <AnimatePresence mode="wait">
        {activeSection === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-10"
          >
            <Suspense fallback={null}>
              <Hero onNavigate={navigateTo} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side panel for non-hero sections */}
      <AnimatePresence mode="wait">
        {showPanel && (
          <motion.div
            key={activeSection}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute top-0 bottom-0 z-20 flex flex-col ${
              isMobile
                ? 'inset-x-0 bg-[rgba(8,8,8,0.96)] backdrop-blur-2xl'
                : 'left-0 w-[520px] lg:w-[600px] bg-[rgba(8,8,8,0.85)] backdrop-blur-2xl border-r border-[rgba(255,255,255,0.04)]'
            }`}
          >
            {/* Scanline decoration */}
            <div className="scanline absolute inset-0 pointer-events-none" />

            {/* Edge glow */}
            {!isMobile && (
              <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(245,158,11,0.1)] to-transparent" />
            )}

            <Suspense fallback={null}>
              <div className="side-panel-scroll flex-1 overflow-y-auto scrollbar-thin flex flex-col">
                <ActiveSection />
              </div>
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition vignette */}
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-30 bg-[#080808] pointer-events-none"
        />
      )}

      {/* Bottom status bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-2.5 border-t border-[rgba(255,255,255,0.04)] bg-[rgba(8,8,8,0.6)] backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#28c840] animate-pulse" />
          <span className="font-mono text-[10px] text-[#333333] tracking-wider">
            rachit.dev
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span className="font-mono text-[10px] text-[#222222] tracking-wider uppercase">
            {activeSection}
          </span>
          <span className="font-mono text-[10px] text-[#222222]">·</span>
          <span className="font-mono text-[10px] text-[#222222]">Next.js · R3F · TypeScript</span>
        </div>
      </motion.div>
    </div>
  );
});

export default Portfolio;
