'use client';

import { useState, useCallback, useRef } from 'react';
import type { SectionId } from '@/types';

export function useActiveSection(initial: SectionId = 'hero') {
  const [activeSection, setActiveSection] = useState<SectionId>(initial);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateTo = useCallback((section: SectionId) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    if (transitionTimeout.current) {
      clearTimeout(transitionTimeout.current);
    }

    setActiveSection(section);

    transitionTimeout.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  }, [isTransitioning]);

  return { activeSection, navigateTo, isTransitioning };
}
