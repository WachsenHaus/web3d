import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Merged } from '@react-three/drei';
import * as THREE from 'three';

export const MergedMesh = () => {
  const three = useThree();
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });
  const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
      color: 0xffff00,
    })
  );
  const mesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
      color: 0xf12f00,
    })
  );
  return (
    <Merged ref={ref} position={[1, 1, 1]} meshes={[mesh1, mesh2]}>
      {(Box, Box2) => (
        <>
          <Box position={[-1, -2, 0]} />
          <Box position={[1, -1, 0]} />
          <Box2 position={[-3, -3, 0]} />
          <Box2 position={[-3, -5, 0]} />
        </>
      )}
    </Merged>
  );
};
