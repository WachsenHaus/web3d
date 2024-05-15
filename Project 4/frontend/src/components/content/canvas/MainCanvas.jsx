/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import Player from './maps/player';
import RootMap from './maps/RootMap';

const MainCanvas = () => {
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
      <ambientLight name="ambientLight" intensity={5} />
      <directionalLight
        name="directionalLight"
        castShadow
        intensity={10}
        position={[0, 50, -50]}
        shadow-normalBias={0.1}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={200}
      />
      <OrbitControls />
      <Player />
      <RootMap />
    </Canvas>
  );
};

export default MainCanvas;
