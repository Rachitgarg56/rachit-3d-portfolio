'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DataStream() {
  const count = 60;
  const meshRef = useRef<THREE.Group>(null);

  const streams = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 40,
      z: (Math.random() - 0.5) * 20 - 5,
      speed: 0.02 + Math.random() * 0.08,
      length: 1 + Math.random() * 4,
      opacity: 0.03 + Math.random() * 0.07,
      color: Math.random() > 0.5 ? '#2dd4bf' : '#f59e0b',
    }));
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.children.forEach((child, i) => {
      if (i < count) {
        const stream = streams[i];
        child.position.y -= stream.speed;
        if (child.position.y < -12) child.position.y = 12;
      }
    });
  });

  return (
    <group>
      <group ref={meshRef}>
        {streams.map((stream, i) => (
          <mesh key={i} position={[stream.x, (Math.random() - 0.5) * 20, stream.z]}>
            <boxGeometry args={[0.015, stream.length, 0.015]} />
            <meshBasicMaterial 
              color={stream.color} 
              transparent 
              opacity={stream.opacity} 
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
      
      {/* Perspective Grid */}
      <group position={[0, -2, -5]} rotation={[-Math.PI / 2, 0, 0]}>
        <gridHelper args={[60, 30, '#111111', '#0a0a0a']} />
      </group>

      {/* Background glow orbs */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={`glow-${i}`} position={[(i - 1) * 10, -2, -8]}>
          <sphereGeometry args={[4, 16, 16]} />
          <meshBasicMaterial color={i === 1 ? '#f59e0b' : '#2dd4bf'} transparent opacity={0.02} />
        </mesh>
      ))}
    </group>
  );
}
