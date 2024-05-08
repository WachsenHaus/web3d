import React, { useRef } from 'react';
import { Html, useGLTF } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import { motion } from 'framer-motion-3d';
import { useState } from 'react';
import { useEffect } from 'react';

useGLTF.preload('/assets/models/tree.glb');

export function Tree(props) {
  const { nodes, materials } = useGLTF('/assets/models/tree.glb');
  const [info, setInfo] = useState(false);

  const [ref, api] = useBox(() => ({
    args: [0.3, 1, 0.3],
    type: 'Kinematic',
    onCollide: handleCollision,
    ...props,
  }));

  const handleCollision = (e) => {
    // e.collisionFilters.bodyFilterGroup

    if (e.collisionFilters.bodyFilterGroup === 5) {
      // api.velocity.set(0, 1, 0);
      setInfo(true);
    }
    console.log(e, '충돌');
  };

  useEffect(() => {
    let timeout;
    if (info) {
      timeout = setTimeout(() => setInfo(false), 1000);
    }
    return () => clearTimeout(timeout);
  }, [info]);

  return (
    <group ref={ref}>
      <motion.mesh
        animate={{ scale: [0, 0.2], y: [-1, 0] }}
        transition={{ duration: 1, delay: 0.3 }}
        scale={0.2}
        geometry={nodes.tree.geometry}
        material={materials['Material.003']}
        position={[0, 0, 0]}
        rotation={[-1.555, 0, 0]}
      />
      {info ? (
        <Html>
          <div className="information">이것은 나무 입니다.</div>
        </Html>
      ) : null}
    </group>
  );
}
