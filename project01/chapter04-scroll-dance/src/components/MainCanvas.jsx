import { Box, OrbitControls, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import * as THREE from 'three';
import Dancer from './Dancer';
import Loader from './Loader';
import MovingDom from './dom/MovingDom';
import { useRecoilValue } from 'recoil';
import { IsEnnteredAtom } from '../stores';

const MainCanvas = () => {
  const isEntered = useRecoilValue(IsEnnteredAtom);
  const aspectRatio = window.innerWidth / window.innerHeight;
  return (
    <Canvas
      id="canvas"
      shadows="soft"
      camera={{
        fov: 30,
        aspect: aspectRatio,
        near: 0.01,
        far: 1000,
        position: [0, 6, 12],
      }}
      scene={{
        background: { r: 0, g: 0, b: 0 },
      }}
      gl={{
        antialias: true,
      }}
    >
      <ScrollControls pages={isEntered ? 8 : 0} damping={0.25}>
        <Suspense fallback={<Loader />}>
          <MovingDom />
          <Dancer />
        </Suspense>
      </ScrollControls>
      <OrbitControls />
    </Canvas>
  );
};

export default MainCanvas;
