import {
    FirstPersonControls,
    FlyControls,
    OrbitControls,
    PointerLockControls,
    TrackballControls,
  } from '@react-three/drei';
  import React from 'react';
  
  const ControlsTest = () => {
    return (
      <>
        {/* <OrbitControls
          enableDamping
          dampingFactor={0.03}
          enableZoom
          // 카메라 움직임 제어
          enablePan
          // enablePan={false}
          zoomSpeed={5}
          // autoRotate
          // autoRotateSpeed={10}
  
          // 카메라 각도를 제한한다.
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          maxAzimuthAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 2}
        /> */}
        {/* <FlyControls
          movementSpeed={1}
          rollSpeed={Math.PI / 20}
          autoForward={false}
        /> */}
        {/* <FirstPersonControls lookSpeed={0.1} movementSpeed={1} lookVertical /> */}
        {/* FPS게임 카메라 */}
        {/* <PointerLockControls /> */}
        {/* 특정 타겟을 중심으로 하는 카메라 */}
        {/* <TrackballControls
          rotateSpeed={2}
          zoomSpeed={1.5}
          panSpeed={0.5}
          noRotate={false}
          noZoom={false}
          noPan={false}
          staticMoving={false}
          dynamicDampingFactor={0.05}
        /> */}
      </>
    );
  };
  
  export default ControlsTest;
  