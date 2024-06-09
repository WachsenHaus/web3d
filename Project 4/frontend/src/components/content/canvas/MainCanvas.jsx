/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';

import RootMap from './maps/RootMap';
import { CurrentMapAtom } from '../../../store/PlayersAtom';
import { useRecoilValue } from 'recoil';

const MainCanvas = () => {
  const currentMap = useRecoilValue(CurrentMapAtom);
  const asepectRatio = window.innerWidth / window.innerHeight;

  return (
    <Canvas
      id="canvas"
      gl={{
        antialias: true,
      }}
      shadows
      camera={{
        fov: 30,
        aspect: asepectRatio,
        near: 0.01,
        far: 1000000,
        position: [12, 12, 12],
      }}
    >
      {currentMap === 'MY_ROOM' && (
        <color attach="background" args={['beige']} />
      )}

      <OrbitControls />

      <RootMap />
    </Canvas>
  );
};

export default MainCanvas;
