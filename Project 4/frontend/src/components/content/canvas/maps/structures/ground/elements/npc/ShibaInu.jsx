import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect, useMemo, useRef } from 'react';
import { Vector3 } from 'three';
import gsap from 'gsap';

const name = 'ground-shiba-inu';

const ShibaInu = () => {
  const ref = useRef(null);
  const { scene, animations } = useGLTF('/models/Shiba Inu.glb');

  const { actions } = useAnimations(animations, ref);
  const position = useMemo(() => new Vector3(-1, 0, 21), []);

  useEffect(() => {
    if (!ref.current) return;
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    let animation;
    actions['Walk']?.play();
    animation = gsap.to(ref.current.position, {
      duration: 5,
      yoyo: true,
      repeat: -1,
      x: 3,
      ease: 'linear',
      onUpdate: () => {
        const progress = animation.progress();
        if (Math.abs(progress) < 0.01) {
          ref.current.lookAt(3, 0, 21);
        } else if (Math.abs(progress) > 0.99) {
          ref.current.lookAt(-1, 0, 21);
        }
      },
    });
    animation.play();
    return () => {
      animation.pause();
      //   animation.kill();
    };
  }, [actions, position, scene]);

  return (
    <primitive
      scale={0.7}
      ref={ref}
      visible
      name={name}
      position={position}
      rotation-y={Math.PI / 1.5}
      object={scene}
    />
  );
};

export default ShibaInu;
