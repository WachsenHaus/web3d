/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const GLBModel = () => {
  const { scene, animations } = useGLTF('/dancer.glb');
  const ref = useRef(null);
  const [currentAnimation, setCurrentAnimation] = useState('wave');

  const { actions } = useAnimations(animations, ref);
  //   console.log(anim);
  useEffect(() => {
    actions['wave'].play();
  }, [actions]);
  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    actions[currentAnimation].fadeIn(0.5).play();
    return () => {
      actions[currentAnimation].fadeOut(0.5).stop();
    };
  }, [actions, currentAnimation]);

  //   gl,camera,raycaster에 접근 가능하다.
  //   useFrame,three 많이 사용된다. three는 canvas를 가리킨다.
  useFrame((state, delta) => {
    // ref.current.rotation.y += 0.02;
    // console.log(state);
    // console.log(delta);
  });
  return (
    <primitive
      onClick={() => {
        setCurrentAnimation((prev) => {
          if (prev === 'wave') {
            return 'windmill';
          }
          return 'wave';
        });
      }}
      onPointerUp={() => {
        console.log('업!');
      }}
      onPointerDown={() => {
        console.log('다운!');
      }}
      ref={ref}
      scale={0.01}
      object={scene}
      position-y={0.8}
    />
  );
};

export default GLBModel;
