/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { InstancedBoxes } from './InstancedBoxes';
import { MergedMesh } from './MergedMesh';

export const MainCanvas = () => {
  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{
        fov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100000,
        position: [5, 5, 5],
      }}
      scene={{
        background: new THREE.Color('#fff'),
      }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[100, 100, 100]} intensity={2} />
      {/* <Box color="red" /> */}
      <OrbitControls />
      {/* <InstancedBoxes /> */}
      <MergedMesh />
    </Canvas>
  );
};
