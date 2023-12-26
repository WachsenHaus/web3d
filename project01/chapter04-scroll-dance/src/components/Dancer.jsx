/* eslint-disable react/no-unknown-property */
import {
  Box,
  Circle,
  Points,
  useAnimations,
  useGLTF,
  useScroll,
  useTexture,
} from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useRecoilValue } from 'recoil';
import { IsEnnteredAtom } from '../stores';
import Loader from './Loader';
import gsap from 'gsap';
import { useMemo } from 'react';

let timeline = null;
/**
 * Dancer 컴포넌트는 춤을 추는 모델을 렌더링하는 React 컴포넌트입니다.
 */
const Dancer = () => {
  const isEntered = useRecoilValue(IsEnnteredAtom);
  const three = useThree();
  const dancerRef = useRef(null);
  const boxRef = useRef(null);
  const starGroupRef01 = useRef(null);
  const starGroupRef02 = useRef(null);
  const starGroupRef03 = useRef(null);
  const rectAreaLightRef = useRef(null);
  const hemisphereLightRef = useRef(null);

  const { scene, animations } = useGLTF('/models/dancer.glb');
  const { actions } = useAnimations(animations, dancerRef);
  const scroll = useScroll();
  const texture = useTexture('/texture/5.png');

  const { positions } = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 25;
    }
    return { positions: pos };
  }, []);

  // const { positions } = useMemo(() => {
  //   const count = 500;
  //   const positions = new Float32Array(count * 3);

  //   for (let i = 0; i < count * 3; i++) {
  //     positions[i] = (Math.random() - 0.5) * 25;
  //   }
  //   return { positions };
  // }, []);

  useEffect(() => {
    if (!isEntered) {
      return;
    }
    actions['wave'].play();
  }, [actions, isEntered]);

  useFrame(() => {
    console.log();
    if (!isEntered) return;
    // console.log(`offset : ${scroll.offset}, timeline ${timeline.duration()}`);
    // scroll.offset는 0 ~ 1 사이의 값을 가지므로, duration에 곱해줍니다.
    // 타임라인을 스크롤에 따라 이동시킵니다.
    timeline.seek(scroll.offset * timeline.duration());
  });

  // useEffect(() => {
  //   if (!isEntered) return;
  //   if (!dancerRef.current) return;
  //   console.log(three.camera);
  //   gsap.fromTo(
  //     three.camera.position,
  //     {
  //       x: -5,
  //       y: 5,
  //       z: 5,
  //     },
  //     {
  //       duration: 1.5,
  //       x: 0,
  //       y: 6,
  //       z: 12,
  //     }
  //   );
  //   gsap.fromTo(
  //     three.camera.rotation,
  //     {
  //       z: Math.PI,
  //     },
  //     {
  //       duration: 1.5,

  //       z: 0,
  //     }
  //   );
  // }, [isEntered, three.camera]);

  useEffect(() => {
    if (!isEntered) return;
    if (!dancerRef.current) return;
    timeline = gsap.timeline();
    timeline
      .from(
        dancerRef.current.rotation,
        {
          duration: 4,
          y: -4 * Math.PI,
        },
        0.5
      )
      .from(
        dancerRef.current.position,
        {
          duration: 4,
          x: 3,
        },
        '<'
      )
      .to(
        three.camera.position,
        {
          duration: 10,
          x: 2,
          z: 8,
        },
        '<'
      )
      .to(three.camera.position, {
        duration: 10,
        x: 0,
        z: 6,
      })
      .to(three.camera.position, {
        duration: 10,
        x: 0,
        z: 16,
      });
  }, [isEntered]);

  if (isEntered) {
    return (
      <>
        <primitive ref={dancerRef} object={scene} scale={0.05} />
        <ambientLight intensity={2} />
        <rectAreaLight
          ref={rectAreaLightRef}
          position={[0, 10, 0]}
          intensity={30}
        />
        <pointLight
          position={[0, 5, 0]}
          intensity={45}
          castShadow
          receiveShadow
        />
        <hemisphereLight
          ref={hemisphereLightRef}
          position={[0, 5, 0]}
          intensity={0}
          groundColor={'lime'}
          color={'blue'}
        />
        <Box ref={boxRef} position={[0, 0, 0]} args={[100, 100, 100]}>
          <meshStandardMaterial color={'#DC4F00'} side={THREE.DoubleSide} />
        </Box>
        <Circle
          castShadow
          receiveShadow
          args={[8, 32]}
          rotation-x={Math.PI / 2}
          position-y={-4.4}
        >
          <meshStandardMaterial color={'#dc4f00'} side={THREE.DoubleSide} />
        </Circle>
        <Points positions={positions.slice(0, positions.length / 3)}>
          {/* sizeattenuation은 원금감에 따라 사이즈를 조절하고싶을때 */}
          {/* depthWrite 앞에있는게 뒤에별을 가리고 싶을때 */}
          <pointsMaterial
            ref={starGroupRef01}
            size={0.5}
            color={new THREE.Color('#dc4f00')}
            sizeAttenuation
            depthWrite
            alphaMap={texture}
            transparent
            alphaTest={0.001}
          />
        </Points>
        <Points
          positions={positions.slice(
            positions.length / 3,
            (positions.length * 2) / 3
          )}
        >
          {/* sizeattenuation은 원금감에 따라 사이즈를 조절하고싶을때 */}
          {/* depthWrite 앞에있는게 뒤에별을 가리고 싶을때 */}
          <pointsMaterial
            ref={starGroupRef02}
            size={0.5}
            color={new THREE.Color('#dc4f00')}
            sizeAttenuation
            depthWrite
            alphaMap={texture}
            transparent
            alphaTest={0.001}
          />
        </Points>
        <Points positions={positions.slice((positions.length * 2) / 3)}>
          {/* sizeattenuation은 원금감에 따라 사이즈를 조절하고싶을때 */}
          {/* depthWrite 앞에있는게 뒤에별을 가리고 싶을때 */}
          <pointsMaterial
            ref={starGroupRef03}
            size={0.5}
            color={new THREE.Color('#dc4f00')}
            sizeAttenuation
            depthWrite
            alphaMap={texture}
            transparent
            alphaTest={0.001}
          />
        </Points>
      </>
    );
  }
  return <Loader isCompleted />;
};

export default Dancer;
