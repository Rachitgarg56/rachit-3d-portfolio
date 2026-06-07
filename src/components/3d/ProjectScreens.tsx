'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectScreenProps {
  title: string;
  subtitle: string;
  metrics: string[];
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  isActive: boolean;
}

type ProjectData = {
  title: string;
  subtitle: string;
  metrics: string[];
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
};

function ProjectScreen({
  title,
  subtitle,
  metrics,
  color,
  position,
  rotation,
  isActive,
}: ProjectScreenProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime();

    groupRef.current.rotation.y =
      rotation[1] + Math.sin(t * 0.5) * 0.03;
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.15}
      floatIntensity={0.35}
      position={position}
    >
      <group
        ref={groupRef}
        rotation={rotation}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <RoundedBox args={[2.4, 1.6, 0.08]} radius={0.05}>
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.7}
            roughness={0.2}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[2.2, 1.4]} />
          <meshStandardMaterial
            color="#020617"
            emissive={new THREE.Color(color)}
            emissiveIntensity={
              hovered || isActive ? 0.35 : 0.15
            }
          />
        </mesh>

        <Text
          position={[0, 0.55, 0.06]}
          fontSize={0.12}
          color={color}
          anchorX="center"
        >
          {title}
        </Text>

        <Text
          position={[0, 0.35, 0.06]}
          fontSize={0.06}
          color="#94a3b8"
          anchorX="center"
        >
          {subtitle}
        </Text>

        {metrics.map((metric, idx) => (
          <group
            key={metric}
            position={[0, 0.08 - idx * 0.22, 0.06]}
          >
            <mesh>
              <planeGeometry args={[1.7, 0.12]} />
              <meshBasicMaterial
                color="#111827"
                transparent
                opacity={0.85}
              />
            </mesh>

            <Text
              position={[0, 0, 0.01]}
              fontSize={0.05}
              color="#e5e7eb"
              anchorX="center"
            >
              {metric}
            </Text>
          </group>
        ))}

        <mesh position={[0, 0, -0.08]}>
          <planeGeometry args={[3, 2]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={
              hovered || isActive ? 0.08 : 0.03
            }
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function ProjectScreens({
  isActive,
}: {
  isActive: boolean;
}) {
  const projects: ProjectData[] = [
    {
      title: 'Asset Management',
      subtitle: 'Enterprise Workflow System',
      color: '#14b8a6',
      position: [-3.2, 0.2, 0],
      rotation: [0, 0.35, 0],
      metrics: [
        'Role-Based Access',
        'Approval Workflows',
        'Next.js + TypeScript',
      ],
    },
    {
      title: 'Sringeri Website',
      subtitle: 'High Traffic Production Site',
      color: '#f59e0b',
      position: [0, 0.5, 1],
      rotation: [0, 0, 0],
      metrics: [
        'SEO: 95',
        'Accessibility: 96',
        'Firebase CMS',
      ],
    },
    {
      title: 'Kommunicate',
      subtitle: 'Frontend & Deployment',
      color: '#60a5fa',
      position: [3.2, -0.2, 0],
      rotation: [0, -0.35, 0],
      metrics: [
        'Jekyll + Liquid',
        'AWS Deployment',
        'Performance Optimization',
      ],
    },
  ];

  return (
    <group>
      {projects.map((project) => (
        <ProjectScreen
          key={project.title}
          {...project}
          isActive={isActive}
        />
      ))}
    </group>
  );
}