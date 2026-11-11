'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RotatingObject() {
  const groupRef = useRef(null);
  const rotationGroupRef = useRef(null);

  const geometryRef = useRef(null);
  const facesToLightRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Light up a face on alphanumeric keys, backspace, enter, etc.
      if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter') {
        facesToLightRef.current += 1;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Create a non-indexed geometry so we can color individual faces
  const geometry = useMemo(() => {
    const geom = new THREE.IcosahedronGeometry(2.5, 1).toNonIndexed();
    const count = geom.attributes.position.count;
    const colors = new Float32Array(count * 3);
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geom;
  }, []);

  useFrame((state, delta) => {
    if (!geometryRef.current) return;
    // 1. Slow base rotation on the object
    if (rotationGroupRef.current) {
      rotationGroupRef.current.rotation.x += delta * 0.2;
      rotationGroupRef.current.rotation.y += delta * 0.3;
    }

    // 2. Mouse interaction (tilt) on the parent group
    if (groupRef.current) {
      // state.pointer contains normalized device coordinates (-1 to +1)
      const targetX = -(state.pointer.y * Math.PI) / 4;
      const targetY = (state.pointer.x * Math.PI) / 4;

      // 帧率无关的平滑插值：不同刷新率下跟随速度一致，且响应更跟手
      const k = 1 - Math.exp(-10 * delta);
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * k;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * k;
    }

    // 3. Light up faces effect
    const colorAttr = geometryRef.current.geometry.attributes.color;
    const count = colorAttr.count;
    const faceCount = count / 3;

    // Fade out existing colors slowly
    for (let i = 0; i < count * 3; i++) {
      colorAttr.array[i] = Math.max(0, colorAttr.array[i] - delta * 0.8);
    }

    // Light up faces when typing
    if (facesToLightRef.current > 0) {
      const numFacesToLight = Math.min(facesToLightRef.current, 5); // Limit per frame if typing fast
      facesToLightRef.current -= numFacesToLight;

      for (let f = 0; f < numFacesToLight; f++) {
        let faceIndex = Math.floor(Math.random() * faceCount);
        let attempts = 0;
        
        // Ensure we pick a face that isn't currently glowing (red channel > 0.1)
        while (colorAttr.array[faceIndex * 9] > 0.1 && attempts < 50) {
          faceIndex = Math.floor(Math.random() * faceCount);
          attempts++;
        }
        
        // Neon purple #b57bff -> rgb(181, 123, 255)
        // Normalized: r=0.71, g=0.48, b=1.0
        for (let v = 0; v < 3; v++) {
          const idx = (faceIndex * 3 + v) * 3;
          colorAttr.array[idx] = 0.71;
          colorAttr.array[idx + 1] = 0.48;
          colorAttr.array[idx + 2] = 1.0;
        }
      }
    }

    colorAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <group ref={rotationGroupRef}>
        {/* The solid faces that light up */}
        <mesh geometry={geometry} ref={geometryRef}>
          <meshBasicMaterial
            vertexColors={true}
            transparent={true}
            opacity={0.8}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* The persistent wireframe */}
        <mesh geometry={geometry}>
          <meshBasicMaterial color="#b57bff" wireframe={true} transparent={true} opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

export default function Hero3DObject() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <RotatingObject />
      {/* 已移除 OrbitControls：它会拦截 Canvas 上的拖拽与滚轮事件，造成页面“被劫持”的卡顿感 */}
    </Canvas>
  );
}
