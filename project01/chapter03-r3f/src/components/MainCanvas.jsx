/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Physics } from '@react-three/cannon';
import Meshes from './Meshes';
import Lights from './Lights';
import Controls from './Controls';

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
      {/* defaultContact는 기본적인 탄성과 마찰력이다. */}
      <Physics
      // gravity={[0, -9, 0]}
      // defaultContactMaterial={{
      //   restitution: 0.1,
      //   friction: 1,
      // }}
      >
        <Lights />
        <Meshes />
      </Physics>
      <Controls />
      {/* <GLBModel /> */}
      {/* <Dancer /> */}
      {/* <PostProcessor /> */}
    </Canvas>
  );
};

export default MainCanvas;
