import React from 'react';
import { usePlane } from '@react-three/cannon';
import DummyWall from './dummy/DummyWall';
import { Tree } from './components/Tree';
import { Ball } from './components/Ball';
import { useControls } from 'leva';

export function Ground(props) {
  const [meshRef] = usePlane(() => ({
    args: [15, 15],
    mass: 1,
    type: 'Static',
    ...props,
  }));

  const ballPosition = useControls('ballPosition', {
    x: { value: 1, min: -5, max: 5 },
    y: { value: 0, min: -5, max: 5 },
    z: { value: 1, min: -5, max: 5 },
  });

  return (
    <group>
      <mesh {...props} ref={meshRef} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="white" opacity={0} transparent />
      </mesh>
      {/* 나무 */}
      <Tree position={[1, 0.5, 0]} />
      <Tree position={[2, 0.5, 0]} />
      <Tree position={[-1, 0.5, 0]} />
      <Tree position={[-2, 0.5, 0]} />
      <Ball position={[ballPosition.x, ballPosition.y, ballPosition.z]} />
      <DummyWall position={[5, 0.5, 0]} args={[1, 1, 10]} />
      <DummyWall position={[0, 0.5, 5]} args={[10, 1, 1]} />
      <DummyWall position={[0, 0.5, -5]} args={[10, 1, 1]} />
      <DummyWall position={[-5, 0.5, 0]} args={[1, 1, 10]} />
    </group>
  );
}
