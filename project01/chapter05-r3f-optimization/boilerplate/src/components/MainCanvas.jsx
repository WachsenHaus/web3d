/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { TestMesh } from './TestMesh';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Suspense } from 'react';

export const MainCanvas = () => {
  const [isLoading, setIsLoading] = useState(true);
  const handleModelLoaded = useCallback(() => {
    setIsLoading(false);
    console.timeLog();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleModelLoaded();
      console.log('로딩 끝!');
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [handleModelLoaded]);
  console.log('isLoading', isLoading);
  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{
        fov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100000,
        position: [10, 10, 10],
      }}
      scene={{
        background: new THREE.Color('#fff'),
      }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[100, 100, 100]} intensity={2} />
      <OrbitControls />
      <Suspense
        fallback={
          <Html>
            <div>로딩중...</div>
          </Html>
        }
      >
        {/* {isLoading ? null : <TestMesh />} */}
        {<TestMesh />}
      </Suspense>
    </Canvas>
  );
};

useGLTF.preload([
  '/dancer01.glb',
  '/dancer02.glb',
  '/dancer03.glb',
  '/dancer01.glb',
  '/dancer02.glb',
  '/dancer03.glb',
  
]);
