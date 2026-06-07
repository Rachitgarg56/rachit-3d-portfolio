'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

interface LaptopProps {
  onClick?: () => void;
  isActive?: boolean;
}

export default function Laptop({ onClick, isActive }: LaptopProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime();

    groupRef.current.position.y = Math.sin(t * 0.6) * 0.08;
    groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.05;

    if (screenRef.current && screenRef.current.material) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;

      mat.emissiveIntensity =
        hovered || isActive
          ? 0.8 + Math.sin(t * 2) * 0.1
          : 0.4 + Math.sin(t * 1.5) * 0.05;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
      onClick={onClick}
    >
      {/* Base */}
      <RoundedBox
        args={[2.4, 0.1, 1.6]}
        radius={0.04}
        position={[0, -0.05, 0]}
      >
        <meshStandardMaterial
          color="#18181b"
          metalness={0.9}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Screen Assembly */}
      <group position={[0, 0.75, -0.78]} rotation={[-0.25, 0, 0]}>
        <RoundedBox args={[2.4, 1.5, 0.06]} radius={0.04}>
          <meshStandardMaterial
            color="#111827"
            metalness={0.8}
            roughness={0.25}
          />
        </RoundedBox>

        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.04]}>
          <planeGeometry args={[2.1, 1.26]} />
          <meshStandardMaterial
            color="#020617"
            emissive="#0ea5e9"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* AMS Header */}
        <Text
          position={[0, 0.42, 0.05]}
          fontSize={0.09}
          color="#2dd4bf"
          anchorX="center"
        >
          Asset Management System
        </Text>

        {/* Dashboard Cards */}
        {[
          {
            x: -0.55,
            y: 0.12,
            label: 'Assets',
            value: '1248',
          },
          {
            x: 0.25,
            y: 0.12,
            label: 'Requests',
            value: '86',
          },
          {
            x: -0.55,
            y: -0.18,
            label: 'Users',
            value: '342',
          },
          {
            x: 0.25,
            y: -0.18,
            label: 'Approvals',
            value: '42',
          },
        ].map((card) => (
          <group
            key={card.label}
            position={[card.x, card.y, 0.05]}
          >
            <mesh>
              <planeGeometry args={[0.55, 0.22]} />
              <meshBasicMaterial
                color="#0f172a"
                transparent
                opacity={0.95}
              />
            </mesh>

            <Text
              position={[0, 0.04, 0.01]}
              fontSize={0.04}
              color="#94a3b8"
              anchorX="center"
            >
              {card.label}
            </Text>

            <Text
              position={[0, -0.04, 0.01]}
              fontSize={0.07}
              color="#f59e0b"
              anchorX="center"
            >
              {card.value}
            </Text>
          </group>
        ))}

        {/* Status Indicator */}
        <mesh position={[0.9, 0.48, 0.05]}>
          <circleGeometry args={[0.03, 16]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>

        {/* Tech Stack Footer */}
        <Text
          position={[0, -0.5, 0.05]}
          fontSize={0.055}
          color="#60a5fa"
          anchorX="center"
        >
          Next.js • TypeScript • Firebase
        </Text>
      </group>

      {/* Keyboard */}
      {[-0.2, -0.05, 0.1, 0.25].map((z, rowIdx) =>
        Array.from({ length: 10 }, (_, i) => (
          <mesh
            key={`${rowIdx}-${i}`}
            position={[-1.0 + i * 0.22, 0.06, z]}
          >
            <boxGeometry args={[0.16, 0.02, 0.14]} />
            <meshStandardMaterial
              color="#27272a"
              metalness={0.4}
              roughness={0.6}
            />
          </mesh>
        ))
      )}

      {/* Touchpad */}
      <RoundedBox
        args={[0.7, 0.02, 0.44]}
        radius={0.02}
        position={[0, 0.06, 0.5]}
      >
        <meshStandardMaterial
          color="#3f3f46"
          metalness={0.6}
          roughness={0.4}
        />
      </RoundedBox>

      {/* Under Glow */}
      <mesh
        position={[0, -0.12, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[3, 2.5]} />
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={hovered || isActive ? 0.12 : 0.05}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}