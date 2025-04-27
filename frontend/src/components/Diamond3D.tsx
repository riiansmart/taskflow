import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import './Diamond3D.css';
import { Edges } from '@react-three/drei';

function SpinningDiamond({ primary, secondary }: { primary: string; secondary: string }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  useFrame((_, delta) => {
    if (hovered) mesh.current.rotation.y += delta;
  });
  return (
    <mesh
      ref={mesh}
      castShadow
      receiveShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <octahedronGeometry args={[1.2, 0]} />
      <meshPhysicalMaterial
        color={primary}
        emissive={secondary}
        metalness={1}
        roughness={0}
        transmission={0.9}
        opacity={0.4}
        transparent
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
      <Edges color={secondary} threshold={15} />
    </mesh>
  );
}

export default function Diamond3D() {
  const { isLightMode } = useTheme();
  const [colors, setColors] = useState({ primary: '', secondary: '' });
  useEffect(() => {
    const style = getComputedStyle(document.body);
    setColors({
      primary: style.getPropertyValue('--accent-primary').trim(),
      secondary: style.getPropertyValue('--accent-secondary').trim(),
    });
  }, [isLightMode]);
  return (
    <div className="diamond3d-container">
      <Canvas shadows camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight castShadow intensity={0.8} position={[2, 5, 2]} />
        <SpinningDiamond primary={colors.primary} secondary={colors.secondary} />
      </Canvas>
    </div>
  );
} 