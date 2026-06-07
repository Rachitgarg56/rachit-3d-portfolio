'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  Sphere,
  Text,
  Float,
  MeshDistortMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

const SKILL_NODES = [
  {
    label: 'React',
    color: '#61DAFB',
    size: 0.24,
    distance: 1.8,
    angle: 0,
  },
  {
    label: 'Next.js',
    color: '#ffffff',
    size: 0.26,
    distance: 2.2,
    angle: Math.PI * 0.25,
  },
  {
    label: 'TypeScript',
    color: '#3178C6',
    size: 0.24,
    distance: 2.4,
    angle: Math.PI * 0.5,
  },
  {
    label: 'Firebase',
    color: '#F59E0B',
    size: 0.22,
    distance: 2,
    angle: Math.PI * 0.75,
  },
  {
    label: 'Tailwind',
    color: '#38BDF8',
    size: 0.22,
    distance: 2.2,
    angle: Math.PI,
  },
  {
    label: 'Node.js',
    color: '#68A063',
    size: 0.22,
    distance: 2.3,
    angle: Math.PI * 1.25,
  },
  {
    label: 'AWS',
    color: '#FF9900',
    size: 0.2,
    distance: 2,
    angle: Math.PI * 1.5,
  },
  {
    label: 'Jekyll',
    color: '#ef4444',
    size: 0.18,
    distance: 1.9,
    angle: Math.PI * 1.75,
  },
];

interface SkillOrbProps {
  label: string;
  color: string;
  size: number;
  position: [number, number, number];
  phase: number;
  isActive: boolean;
  onClick: () => void;
}

function SkillOrb({
  label,
  color,
  size,
  position,
  phase,
  isActive,
  onClick,
}: SkillOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    const bounce = Math.sin(t * 0.8 + phase) * 0.15;

    if (meshRef.current) {
      meshRef.current.position.y = position[1] + bounce;

      const mat =
        meshRef.current.material as THREE.MeshStandardMaterial;

      mat.emissiveIntensity =
        hovered || isActive
          ? 1.2 + Math.sin(t * 4) * 0.3
          : 0.4;
    }

    if (shellRef.current) {
      shellRef.current.position.y = position[1] + bounce;
      shellRef.current.rotation.y = t * 0.3;
      shellRef.current.rotation.z = t * 0.2;
    }

    if (ringRef.current) {
      ringRef.current.position.y = position[1] + bounce;
      ringRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.4}
      floatIntensity={0.5}
    >
      <group onClick={onClick}>
        <Sphere
          ref={meshRef}
          args={[size, 32, 32]}
          position={position}
          onPointerOver={() => {
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'default';
          }}
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            roughness={0.1}
            metalness={1}
          />
        </Sphere>

        <mesh ref={shellRef} position={position}>
          <icosahedronGeometry args={[size * 1.6, 1]} />
          <meshStandardMaterial
            color={color}
            wireframe
            transparent
            opacity={hovered || isActive ? 0.45 : 0.12}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>

        <Sphere
          args={[size * 2.1, 32, 32]}
          position={position}
        >
          <meshBasicMaterial
            color={color}
            transparent
            opacity={hovered || isActive ? 0.08 : 0.02}
            depthWrite={false}
          />
        </Sphere>

        {(hovered || isActive) && (
          <mesh
            ref={ringRef}
            position={position}
            rotation={[Math.PI / 3, 0, 0]}
          >
            <torusGeometry
              args={[size * 2.7, 0.01, 8, 64]}
            />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.8}
            />
          </mesh>
        )}

        <Text
          position={[
            position[0],
            position[1] - 0.55,
            position[2],
          ]}
          fontSize={0.12}
          color={
            hovered || isActive
              ? '#ffffff'
              : '#94a3b8'
          }
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

interface SkillOrbsProps {
  isActive: boolean;
}

export default function SkillOrbs({
  isActive,
}: SkillOrbsProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [activeOrb, setActiveOrb] =
    useState<string | null>(null);

  const orbs = useMemo(
    () =>
      SKILL_NODES.map((node) => ({
        ...node,
        position: [
          Math.cos(node.angle) * node.distance,
          (Math.random() - 0.5) * 0.8,
          Math.sin(node.angle) * node.distance,
        ] as [number, number, number],
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime();

    groupRef.current.rotation.y =
      t * (isActive ? 0.12 : 0.05);
  });

  return (
    <group ref={groupRef}>
      {/* Center Core */}
      <Sphere args={[0.55, 64, 64]}>
        <MeshDistortMaterial
          color="#0ea5e9"
          speed={1.5}
          distort={0.25}
          transparent
          opacity={0.85}
        />
      </Sphere>

      <Text
        position={[0, 0, 0.75]}
        fontSize={0.16}
        color="#ffffff"
        anchorX="center"
      >
        RACHIT
      </Text>

      <Text
        position={[0, -0.25, 0.75]}
        fontSize={0.08}
        color="#94a3b8"
        anchorX="center"
      >
        Frontend Engineer
      </Text>

      {/* Orbit Rings */}
      {[1.2, 1.8, 2.4].map((radius) => (
        <mesh
          key={radius}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry
            args={[radius, 0.006, 8, 128]}
          />
          <meshBasicMaterial
            color="#334155"
            transparent
            opacity={0.25}
          />
        </mesh>
      ))}

      {/* Skill Connections */}
      {orbs.map((orb, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={
                new Float32Array([
                  0,
                  0,
                  0,
                  ...orb.position,
                ])
              }
              itemSize={3}
            />
          </bufferGeometry>

          <lineBasicMaterial
            color={orb.color}
            transparent
            opacity={0.25}
          />
        </line>
      ))}

      {/* Skill Planets */}
      {orbs.map((orb, index) => (
        <SkillOrb
          key={orb.label}
          label={orb.label}
          color={orb.color}
          size={orb.size}
          position={orb.position}
          phase={index}
          isActive={activeOrb === orb.label}
          onClick={() =>
            setActiveOrb(
              activeOrb === orb.label
                ? null
                : orb.label
            )
          }
        />
      ))}

      {/* Lighting */}
      <pointLight
        color="#0ea5e9"
        intensity={2}
        distance={8}
      />

      <pointLight
        color="#8b5cf6"
        intensity={1}
        distance={6}
      />
    </group>
  );
}