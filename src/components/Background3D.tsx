import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function ParticleWave({ isLightMode }: { isLightMode: boolean }) {
  const ref = useRef<THREE.Points>(null);
  
  const count = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={isLightMode ? "#DCDCDF" : "#4A4A52"} size={0.08} sizeAttenuation={true} depthWrite={false} opacity={0.8} />
    </Points>
  );
}

function GeometricStructure({ isLightMode }: { isLightMode: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.05;
      groupRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <icosahedronGeometry args={[8, 1]} />
          <meshBasicMaterial color={isLightMode ? "#E0E0E3" : "#3F3F46"} wireframe transparent opacity={0.6} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
        <mesh scale={1.2}>
          <icosahedronGeometry args={[10, 2]} />
          <meshBasicMaterial color={isLightMode ? "#E8E8EB" : "#333338"} wireframe transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

export function Background3D({ isLightMode }: { isLightMode: boolean }) {
  return (
    <div className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${isLightMode ? 'opacity-80' : 'opacity-100'}`}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <GeometricStructure isLightMode={isLightMode} />
        <ParticleWave isLightMode={isLightMode} />
      </Canvas>
      {/* Subtle overlay to blend into the theme */}
      <div className="absolute inset-0 bg-obsidian-bg/40 pointer-events-none transition-colors duration-1000" />
    </div>
  );
}
