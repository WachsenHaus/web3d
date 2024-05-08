import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useCylinder } from '@react-three/cannon';
import { motion } from 'framer-motion-3d';
import { useState } from 'react';

export function RoadSign({ position }) {
  const { nodes, materials } = useGLTF('/assets/models/road_sign.glb');
  const [active, setActive] = useState(false);

  const handleCollision = (e) => {
    // e.collisionFilters.bodyFilterGroup
    if (e.body.name == 'chassisbody') {
      console.log(e, '충돌');
      // console.log(active);
      setActive((prev) => {
        console.log(prev);
        return !prev;
      });
    }
    // if (e.collisionFilters.bodyFilterGroup === 5) {
    //   // api.velocity.set(0, 1, 0);
    //   console.log(e, '충돌');
    //   setActive(!active);
    // }
  };

  const [ref] = useCylinder(
    () => ({
      args: [0.1, 0.1, 1, 8],
      mass: 1,
      type: 'Static',
      onCollide: handleCollision,
      position,
    }),

    useRef(null)
  );
  return (
    <group ref={ref}>
      <mesh
        scale={0.2}
        position={[0, -0.48, 0]}
        geometry={nodes.Object_1_1.geometry}
        material={materials.Wood}
      />
      <motion.group
        animate={
          active
            ? {
                rotateY: 4,
              }
            : {
                rotateY: -4,
              }
        }
        transition={{
          duration: 0.5,
          type: 'spring',
        }}
        scale={0.2}
        position={[0, -0.48, 0]}
      >
        <mesh
          geometry={nodes.Object_1.geometry}
          material={materials['WoodLight.001']}
        />
        <mesh
          geometry={nodes.Object_1_2.geometry}
          material={materials['WoodLight.002']}
        />
        <mesh
          geometry={nodes.Object_1_3.geometry}
          material={materials['WoodLight.003']}
        />
      </motion.group>
    </group>
  );
}

useGLTF.preload('/road_sign.glb');
