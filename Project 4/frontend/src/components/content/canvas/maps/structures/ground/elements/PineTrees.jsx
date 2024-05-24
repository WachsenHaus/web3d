import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import { Vector3 } from 'three';
import { SkeletonUtils } from 'three-stdlib';

const name = 'ground-pine-trees';
const scale = 0.8;

export const PineTrees = ({ position }) => {
  const { scene: scene_ } = useGLTF('/models/Pine Trees.glb');
  const scene = useMemo(() => {
    return SkeletonUtils.clone(scene_);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [scene]);

  return (
    <primitive
      visible
      name={name}
      scale={15}
      position={position}
      rotation-y={Math.PI / 4}
      object={scene}
    />
  );
};
