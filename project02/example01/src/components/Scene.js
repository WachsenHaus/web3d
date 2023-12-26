import { Canvas } from '@react-three/fiber';
import React from 'react';
import Lights from './Lights';
import * as THREE from 'three';
import Earth from './Earth';
import Weather from './Weather';

const Scene = () => {
  return (
    <>
      <Canvas
        camera={{
          position: [0, 1, 3],
        }}
      >
        <color attach="background" args={['skyblue']} />
        <Lights />
        <Earth position={[0, -2, 0]} />
        <Weather position={[-2, 0, 0]} weather={'clear'} />
        <Weather position={[-1, 0, 0]} weather={'cloud'} />
        <Weather position={[0, 0, 0]} weather={'clouds'} />
        <Weather position={[1, 0, 0]} weather={'mist'} />
        <Weather position={[2, 0, 0]} weather={'rain'} />
        <Weather position={[3, 0, 0]} weather={'rain2'} />
        <Weather position={[4, 0, 0]} weather={'snow'} />
      </Canvas>
    </>
  );
};

export default Scene;
