import { useThree } from '@react-three/fiber';
import React, { useEffect, useMemo } from 'react';
import { CameraHelper, Object3D } from 'three';

const useFollowCam = () => {
  const { scene, camera } = useThree();
  const pivot = useMemo(() => new Object3D(), []);

  console.log(scene);

  const makeCamera = () => {
    camera.position.set(1, 2, 3.5);
    camera.rotation.x = -0.5;

    pivot.add(camera);
    scene.add(pivot);
  };

  useEffect(() => {
    makeCamera();
  }, []);

  return { pivot };
};

export default useFollowCam;
