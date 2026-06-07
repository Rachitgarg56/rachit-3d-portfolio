'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingBitsProps {
  count?: number;
  color?: string;
}

export default function FloatingBits({ count = 12, color = '#2dd4bf' }: FloatingBitsProps) {
  const bits = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.2) * 6, // Biased towards right
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ] as [number, number, number],
      size: 0.05 + Math.random() * 0.1,
      speed: 0.5 + Math.random() * 0.5,
      rotationSpeed: [
        Math.random() * 0.02,
        Math.random() * 0.02,
        Math.random() * 0.02,
      ] as [number, number, number],
    }));
  }, [count]);

  return (
    <group>
      {bits.map((bit, i) => (
        <Float
          key={i}
          speed={bit.speed}
          rotationIntensity={2}
          floatIntensity={2}
          position={bit.position}
        >
          <mesh rotation={bit.rotationSpeed}>
            {i % 3 === 0 ? (
              <tetrahedronGeometry args={[bit.size * 1.2]} />
            ) : (
              <boxGeometry args={[bit.size, bit.size, bit.size]} />
            )}
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.4}
              transparent
              opacity={0.5}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}

      {/* Ambient background "wires" / grid bits */}
      <group>
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={`wire-${i}`} position={[2, 0, -2]} rotation={[0, 0, Math.PI / 4 * i]}>
            <torusGeometry args={[3 + i * 0.5, 0.005, 8, 100]} />
            <meshBasicMaterial color={color} transparent opacity={0.03} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
