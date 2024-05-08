import { Canvas } from '@react-three/fiber';
import { Ground } from './Ground';
import { Physics, Debug } from '@react-three/cannon';
import Car from './Car';
import DummyBall from './dummy/DummyBall';
import DummyBox from './dummy/DummyBox';
import DummyWall from './dummy/DummyWall';
import HowToPlay from './HowToPlay';

function Scene() {
  return (
    <>
      <Canvas camera={{ fov: 45, position: [1.5, 2, 4] }}>
        <ambientLight />
        <directionalLight position={[0, 5, 5]} />
        <Physics gravity={[0, -2.6, 0]}>
          <Debug>
            <Car />
            <HowToPlay />

            <Ground rotation={[-Math.PI / 2, 0, 0]} />
          </Debug>
        </Physics>
      </Canvas>
    </>
  );
}

export default Scene;
