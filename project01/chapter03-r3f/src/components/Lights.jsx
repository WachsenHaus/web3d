/* eslint-disable react/no-unknown-property */
import { SpotLight, useHelper } from '@react-three/drei';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import * as THREE from 'three';

const Lights = () => {
  const lightRef = useRef(null);

  return (
    <>
      <directionalLight
        ref={lightRef}
        castShadow
        args={[0xffffff, 5]}
        position={[4, 4, 4]}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={1000}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
      />
    </>
  );
};

export default Lights;
