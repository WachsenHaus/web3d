import React, { useRef } from 'react';
import { Detailed, useGLTF } from '@react-three/drei';
import { useSphere } from '@react-three/cannon';

useGLTF.preload('/assets/models/ball.glb');

export function Ball(props) {
  const { nodes, materials } = useGLTF('/assets/models/ball.glb');

  const [ref] = useSphere(
    () => ({
      args: [0.15],
      mass: 1,
      type: 'Dynamic',
      ...props,
    }),
    useRef(null)
  );

  return (
    <group ref={ref}>
      <Detailed distances={[0, 5, 10]}>
        {/* 하이퀄리티 */}
        <group scale={0.15} position={[0, -0.153, -0.004]}>
          <mesh
            geometry={nodes.beach_ball_red_0_1.geometry}
            material={materials.material}
          />
          <mesh
            geometry={nodes.beach_ball_red_0_2.geometry}
            material={materials.blue}
          />
          <mesh
            geometry={nodes.beach_ball_red_0_3.geometry}
            material={materials.white}
          />
          <mesh
            geometry={nodes.beach_ball_red_0_4.geometry}
            material={materials.yellow}
          />
        </group>
        {/* 중간퀄리티 */}
        <mesh>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="blue" />
        </mesh>

        {/* 로우퀄리티 */}
        <mesh>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </Detailed>
    </group>
  );
}
