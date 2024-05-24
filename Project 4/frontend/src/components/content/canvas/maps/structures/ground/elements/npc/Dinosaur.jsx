import { useGLTF } from '@react-three/drei';
import React, { useEffect, useMemo } from 'react';
import { Vector3 } from 'three';

const name = 'ground-npc-dinosaur';

const Dinosaur = () => {
  const { scene } = useGLTF('/models/CuteRedDino.glb');
  const position = useMemo(() => new Vector3(0, 0, -5), []);

  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [position, scene]);

  return (
    <primitive
      visible
      name={name}
      scale={2}
      position={position}
      object={scene}
    />
  );
};

export default Dinosaur;
