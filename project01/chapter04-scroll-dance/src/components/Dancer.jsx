/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { IsEnnteredAtom } from '../stores';
import Loader from './Loader';

const Dancer = () => {
  const isEntered = useRecoilValue(IsEnnteredAtom);
  const dancerRef = useRef(null);
  const { scene, animations } = useGLTF('/models/dancer.glb');
  const { actions } = useAnimations(animations, dancerRef);
  const scroll = useScroll();

  useEffect(() => {
    if (!isEntered) {
      return;
    }
    actions['wave'].play();
  }, [actions, isEntered]);

  useFrame(() => {
    console.log(scroll.offset);
  });

  if (isEntered) {
    return (
      <>
        <ambientLight intensity={2} />
        <primitive ref={dancerRef} object={scene} scale={0.05} />
      </>
    );
  }
  return <Loader isCompleted />;
};

export default Dancer;
