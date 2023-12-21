/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Meshes from './Meshes';
import Lights from './Lights';
import Controls from './Controls';
import GLBModel from './GLBModel';

const MainCanvas = () => {
  return (
    <Canvas
      // shadows={"soft"}
      shadows={{
        enabled: true,
        type: THREE.PCFShadowMap,
      }}
      camera={{
        fov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100,
        position: [5, 5, 5],
      }}
      gl={{
        antialias: true,
      }}
      scene={{
        background: new THREE.Color(0x000000),
      }}
    >
      <Controls />
      <Lights />
      <Meshes />
      <GLBModel />
    </Canvas>
  );
};

export default MainCanvas;
