import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Vector3 } from 'three';
import gsap from 'gsap';

const name = 'ground-npc-zombie';
const Zombie = () => {
  const ref = useRef(null);
  const { scene, animations } = useGLTF('/models/Zombie.glb');

  const { actions } = useAnimations(animations, ref);
  const position = useMemo(() => new Vector3(-5, 0, -6), []);
  const [currentAnimation, setCurrentAnimation] = useState(
    'EnemyArmature|EnemyArmature|EnemyArmature|Attack'
  );

  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    actions[currentAnimation]?.play().setDuration(0.8);
    return () => {
      actions[currentAnimation]?.stop();
    };
  }, []);

  return (
    <>
      <primitive
        scale={1.2}
        ref={ref}
        visible
        name={name}
        position={position}
        object={scene}
      />
    </>
  );
};

export default Zombie;
