export type SectionId = 'hero' | 'about' | 'skills' | 'experience' | 'projects' | 'contact';

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  duration: string;
  description: string;
  metrics: Metric[];
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  color: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  current: boolean;
  highlights: string[];
  stack: string[];
}

export interface ThreeSceneProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
}

export interface SkillCategory {
  label: string;
  skills: string[];
  icon: string;
}
