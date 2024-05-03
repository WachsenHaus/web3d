import { Canvas } from '@react-three/fiber';
import Scene from '../components/Scene';
import Lights from '../components/Lights';
import { Suspense, lazy } from 'react';
import { Loader } from '@react-three/drei';

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
}

// const Scene = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import('../components/Scene')), 1000);
//   });
// });

function Home() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['rgb(67, 127, 240) 100%)']} />
        <Suspense fallback={null}>
          <Lights />
          <Scene />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

export default Home;
