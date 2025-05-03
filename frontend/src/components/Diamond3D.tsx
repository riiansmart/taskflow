import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import './Diamond3D.css';
import { Edges } from '@react-three/drei';

interface SpinningDiamondProps { baseColor: string; edgeColor: string }

function SpinningDiamond({ baseColor, edgeColor }: SpinningDiamondProps) {
  // group for axis tilt and precession
  const group = useRef<THREE.Group>(null!);
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  // apply static diagonal plus perspective tilt for a slanted diamond view
  useEffect(() => {
    const diagonalAng = Math.PI / 4;   // 45° tilt in screen plane
    const perspectiveAng = Math.PI / 3; // 60° tilt backward for depth
    group.current.rotation.x = perspectiveAng;
    group.current.rotation.z = diagonalAng;
  }, []);
  // precession cycle: full rotation in 120 seconds for demo
  const PRECESSION_SPEED = 2 * Math.PI / 120; // rad per second
  useFrame((_, delta) => {
    // prograde spin around local Y
    const spinSpeed = hovered ? delta : delta * 0.2;
    mesh.current.rotation.y += spinSpeed;
    // group precession around global Y
    group.current.rotation.y += PRECESSION_SPEED * delta;
  });
  return (
    <group ref={group}>
      <mesh
        ref={mesh}
        castShadow
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[1.2, 0]} />
        <meshPhysicalMaterial
          color={baseColor}
          emissive={'#000000'}
          metalness={1}
          roughness={0}
          transmission={0.9}
          opacity={0.4}
          transparent
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
        <Edges color={edgeColor} threshold={15} />
      </mesh>
    </group>
  );
}

export default function Diamond3D() {
  const { isLightMode } = useTheme();

  // Use neutral greyscale palette so diamond has no accent tint
  const baseColor = isLightMode ? '#ffffff' : '#cccccc';
  const edgeColor = isLightMode ? '#666666' : '#ffffff';

  return (
    <div className="diamond3d-container">
      <Canvas key={isLightMode ? 'light' : 'dark'} shadows camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight castShadow intensity={0.8} position={[2, 5, 2]} />
        <SpinningDiamond baseColor={baseColor} edgeColor={edgeColor} />
      </Canvas>
    </div>
  );
} 