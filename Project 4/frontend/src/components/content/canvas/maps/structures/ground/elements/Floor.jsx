/* eslint-disable react/no-unknown-property */
import { useLoader } from '@react-three/fiber';
import React from 'react';
import { RepeatWrapping, TextureLoader } from 'three';
import { groundMapSize } from '../../../../../../../data/constants';

const Floor = () => {
  const sandTexture = useLoader(TextureLoader, '/sand.jpg');

  sandTexture.wrapS = RepeatWrapping;
  sandTexture.wrapT = RepeatWrapping;
  sandTexture.repeat.x = 5;
  sandTexture.repeat.y = 5;

  return (
    <mesh
      castShadow
      receiveShadow
      rotation-x={-Math.PI / 2}
      position-y={-0.001}
    >
      <planeGeometry args={[groundMapSize, groundMapSize]} />
      <meshStandardMaterial map={sandTexture} />
    </mesh>
  );
};

export default Floor;
