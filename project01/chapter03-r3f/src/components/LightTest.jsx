/* eslint-disable react/no-unknown-property */
import { SpotLight, useHelper } from '@react-three/drei';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import * as THREE from 'three';

const LightTest = () => {
  const lightRef = useRef(null);
  const targetRef = useRef(null);
  const [target, setTarget] = useState();
  // useHelper(lightRef, THREE.DirectionalLightHelper, 3, 'light');
  // useHelper(lightRef, THREE.PointLightHelper, 1, 'light');
  // useHelper(lightRef, THREE.HemisphereLightHelper, 1, 'light');
  // useHelper(lightRef, THREE.SpotLightHelper, 5, 'light');

  useEffect(() => {
    if (targetRef.current) {
      setTarget(targetRef.current);
    }
  }, []);
  return (
    <>
      {/* <ambientLight args={[0xffffff, 10]} /> */}
      <directionalLight
        ref={lightRef}
        castShadow
        args={[0xffffff, 5]}
        position={[4, 4, 4]}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={1000}
        // shadow-mapSize-width={512}
        // shadow-mapSize-height={512}
      />
      {/* <pointLight
        ref={lightRef}
        args={[0xffffff, 10, 5, 3]}
        position-y={2}
        castShadow
      /> */}
      {/* 스카이컬러와 지면컬러 */}
      {/* <hemisphereLight
        ref={lightRef}
        args={[0x0000ff, 0xf00ff0, 5]}
        position-y={2}
      /> */}
      {/* 얘는 헬퍼가없 */}
      {/* <rectAreaLight
        args={[0xffffff, 5, 4, 4]}
        position-y={1}
        rotation-x={-Math.PI / 2}
      /> */}

      {/* <spotLight
        ref={lightRef}
        args={[0x00ff00, 10, 100, Math.PI / 4, 1, 0.5]}
        position={[3, 3, 3]}
      /> */}
      {/* <SpotLight
        ref={lightRef}
        color={0xffffff}
        intensity={10}
        distance={100}
        penumbra={1}
        decay={0.5}
        anglePower={100}
        angle={Math.PI / 4}
        attenuation={5}
        radiusTop={1}
        radiusBottom={10}
        opacity={1}
        // 최적 조명 사용여부
        volumetric
        debug
        position={[3, 3, 3]}
        target={target}
      /> */}
    </>
  );
};

export default LightTest;
