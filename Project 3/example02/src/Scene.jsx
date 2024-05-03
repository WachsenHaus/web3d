import { Canvas } from '@react-three/fiber';
import { Ground } from './Ground';
import { Physics, Debug, usePlane } from '@react-three/cannon';
import { useControls } from 'leva';
import Car from './Car';
import DummyMovementArea from './dummy/DummyMovementArea';
import DummyBox from './dummy/DummyBox';
import DummyBall from './dummy/DummyBall';
import DummyWall from './dummy/DummyWall';

function Scene() {
  return (
    <>
      <Canvas camera={{ fov: 45, position: [1.5, 2, 5] }}>
        <ambientLight />
        <directionalLight position={[0, 5, 5]} />
        <Physics gravity={[0, -2.6, 0]}>
          <Debug>
            <Car />
            <DummyBall position={[0, 0.2, -2]} args={[0.15]} />
            <DummyBox position={[0, 0.2, -2]} args={[0.2, 0.5, 0.2]} />
            <DummyBox
              position={[1, 0.2, 1]}
              args={[0.2, 0.5, 0.2]}
              type={'Static'}
            />
            <DummyWall position={[5, 0, 0]} args={[1, 1, 10]} />
            <DummyWall position={[0, 0, 5]} args={[10, 1, 1]} />
            <DummyWall position={[0, 0, -5]} args={[10, 1, 1]} />
            <DummyWall position={[-5, 0, 0]} args={[1, 1, 10]} />
            {/* <DummyMovementArea position={[0, -0.2, 0]} /> */}
            <Ground rotation={[-Math.PI / 2, 0, 0]} />
          </Debug>
        </Physics>
      </Canvas>
    </>
  );
}

export default Scene;
