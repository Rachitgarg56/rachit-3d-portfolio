'use client';

import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';
import Particles from './Particles';
import Laptop from './Laptop';
import SkillOrbs from './SkillOrbs';
import ProjectScreens from './ProjectScreens';
import Terminal from './Terminal';
import FloatingBits from './FloatingBits';
import DataStream from './DataStream';
import { useIsMobile } from '@/hooks/useMediaQuery';
import type { SectionId } from '@/types';

// Camera positions for each section (desktop values, will be adjusted for mobile)
const DESKTOP_CAMERA_CONFIGS: Record<SectionId, { position: [number, number, number]; target: [number, number, number] }> = {
  hero: { position: [-2.5, 1.5, 8], target: [-2.5, 0, 0] },
  about: { position: [-3.5, 1.2, 6.5], target: [-3.5, 0.2, 0] },
  skills: { position: [-2.5, 2, 8.5], target: [-2.5, 0, 0] },
  experience: { position: [-3.5, 1.2, 6.5], target: [-3.5, 0, 0] },
  projects: { position: [-1.5, 0.5, 7.5], target: [-1.5, 0, 0] },
  contact: { position: [-1.5, 1.2, 7], target: [-1.5, 0, 0] },
};

const MOBILE_CAMERA_CONFIGS: Record<SectionId, { position: [number, number, number]; target: [number, number, number] }> = {
  hero: { position: [0, 1.5, 8.5], target: [0, 0, 0] },
  about: { position: [0, 1, 7], target: [0, 0.5, 0] },
  skills: { position: [0, 2.5, 9], target: [0, 0, 0] },
  experience: { position: [0, 1, 7], target: [0, 0.5, 0] },
  projects: { position: [0, 0.5, 6.5], target: [0, 0, 0] },
  contact: { position: [0, 1.2, 6], target: [0, 0, 0] },
};

// Objects shown per section
const SECTION_OBJECTS: Record<SectionId, ('laptop' | 'orbs' | 'projects' | 'terminal' | 'decor')[]> = {
  hero: ['laptop', 'decor'],
  about: ['laptop', 'decor'],
  skills: ['orbs', 'decor'],
  experience: ['laptop', 'decor'],
  projects: ['projects'],
  contact: ['terminal', 'decor'],
};

interface SceneControllerProps {
  activeSection: SectionId;
  onSectionChange: (s: SectionId) => void;
}

function SceneController({ activeSection }: SceneControllerProps) {
  const { camera } = useThree();
  const isMobile = useIsMobile();
  
  const config = isMobile ? MOBILE_CAMERA_CONFIGS[activeSection] : DESKTOP_CAMERA_CONFIGS[activeSection];
  
  const targetPos = useRef(new THREE.Vector3(...config.position));
  const targetLook = useRef(new THREE.Vector3(...config.target));
  const currentLook = useRef(new THREE.Vector3(...config.target));

  useEffect(() => {
    targetPos.current.set(...config.position);
    targetLook.current.set(...config.target);
  }, [config]);

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.04);
    currentLook.current.lerp(targetLook.current, 0.04);
    camera.lookAt(currentLook.current);
  });

  const visible = SECTION_OBJECTS[activeSection];
  const hideModels = isMobile && activeSection === 'hero';

  return (
    <>
      {/* Background elements - always present for depth */}
      <DataStream />
      <Particles count={100} />

      {/* Ambient Floating Bits */}
      {visible.includes('decor') && !hideModels && (
        <FloatingBits 
          count={isMobile ? 8 : 15} 
          color={activeSection === 'skills' ? '#2dd4bf' : '#f59e0b'} 
        />
      )}

      {/* Laptop shown for hero, about, experience */}
      {visible.includes('laptop') && !hideModels && (
        <Laptop isActive={['hero', 'about', 'experience'].includes(activeSection)} />
      )}


      {/* Skill orbs */}
      {visible.includes('orbs') && (
        <SkillOrbs isActive={activeSection === 'skills'} />
      )}

      {/* Project screens */}
      {visible.includes('projects') && (
        <ProjectScreens isActive={activeSection === 'projects'} />
      )}

      {/* Terminal */}
      {visible.includes('terminal') && (
        <Terminal isActive={activeSection === 'contact'} />
      )}

      {/* Ground plane glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#0a0a0a" transparent opacity={0.6} />
      </mesh>

      {/* Grid lines */}
      <gridHelper args={[20, 20, '#111111', '#0d0d0d']} position={[0, -1.5, 0]} />
    </>
  );
}

interface Scene3DProps {
  activeSection: SectionId;
  onSectionChange: (s: SectionId) => void;
}

export default function Scene3D({ activeSection, onSectionChange }: Scene3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 7], fov: 55, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      style={{ background: '#080808' }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 8, 5]} intensity={0.6} color="#f0e8d0" castShadow={false} />
      <pointLight position={[-4, 3, 2]} intensity={0.8} color="#2dd4bf" distance={12} />
      <pointLight position={[4, 2, -2]} intensity={0.6} color="#f59e0b" distance={10} />
      <pointLight position={[0, -1, 3]} intensity={0.3} color="#6366f1" distance={8} />

      <Suspense fallback={null}>
        <SceneController activeSection={activeSection} onSectionChange={onSectionChange} />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
