'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface TerminalProps {
  isActive: boolean;
}

export default function Terminal({ isActive }: TerminalProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const [time, setTime] = useState(0);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    setTime(t);
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Terminal body */}
        <RoundedBox args={[2.8, 2.0, 0.1]} radius={0.08}>
          <meshStandardMaterial color="#080808" metalness={0.9} roughness={0.1} />
        </RoundedBox>

        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.055]}>
          <planeGeometry args={[2.6, 1.8]} />
          <meshStandardMaterial
            color="#010303"
            emissive="#2dd4bf"
            emissiveIntensity={isActive ? 0.2 : 0.1}
            roughness={0.05}
          />
        </mesh>

        {/* Scanlines Effect Simulation */}
        <mesh position={[0, 0, 0.056]}>
          <planeGeometry args={[2.6, 1.8]} />
          <meshBasicMaterial
            color="#000000"
            transparent
            opacity={0.1}
          />
        </mesh>

        {/* Terminal header */}
        <mesh position={[0, 0.8, 0.06]}>
          <planeGeometry args={[2.6, 0.2]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>

        {/* Traffic dots */}
        {[-1.0, -0.9, -0.8].map((x, i) => (
          <mesh key={i} position={[x, 0.8, 0.07]}>
            <circleGeometry args={[0.035, 16]} />
            <meshBasicMaterial color={['#ff5f57', '#febc2e', '#28c840'][i]} />
          </mesh>
        ))}

        {/* Title bar text */}
        <Text
          position={[0, 0.8, 0.07]}
          fontSize={0.08}
          color="#888888"
          anchorX="center"
          anchorY="middle"
        >
          rachit@dev: ~/contact
        </Text>

        {/* Terminal Content */}
        <group position={[-1.1, 0.5, 0.07]}>
          {[
            { text: '$ whoami', color: '#555555', delay: 0 },
            { text: 'rachit_garg', color: '#2dd4bf', delay: 0.1 },
            { text: '$ cat contact.info', color: '#555555', delay: 0.2 },
            { text: '{', color: '#f59e0b', delay: 0.3 },
            { text: '  "email": "rachitgarg56@gmail.com",', color: '#f59e0b', delay: 0.4 },
            { text: '  "github": "Rachitgarg56",', color: '#f59e0b', delay: 0.5 },
            { text: '  "location": "Bangalore, IN"', color: '#f59e0b', delay: 0.6 },
            { text: '}', color: '#f59e0b', delay: 0.7 },
            { text: `$ █`, color: '#2dd4bf', delay: 0.8 },
          ].map((line, i) => (
            <Text
              key={i}
              position={[0, -i * 0.14, 0]}
              fontSize={0.07}
              color={line.color}
              anchorX="left"
              anchorY="top"
              fillOpacity={isActive ? 1 : 0.5}
            >
              {line.text}
            </Text>
          ))}
        </group>

        {/* Ambient floating code bits around terminal */}
        {Array.from({ length: 8 }).map((_, i) => (
          <Text
            key={i}
            position={[
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 4,
              -1,
            ]}
            fontSize={0.1}
            color="#2dd4bf"
            opacity={0.05}
            transparent
          >
            {i % 2 === 0 ? '{ }' : '01'}
          </Text>
        ))}
      </group>
    </Float>
  );
}
