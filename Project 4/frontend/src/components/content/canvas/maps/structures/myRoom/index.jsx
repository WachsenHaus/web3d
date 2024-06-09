import React from 'react';
import { MyRoomFloor } from './elements/MyRoomFloor';
import { MyRoomLeftWall } from './elements/MyRoomLeftWall';
import { MyRoomRightWall } from '../../../../../../../../result/src/components/content/canvas/maps/structures/myRoom/elements/MyRoomRightWall';

export const MyRoom = () => {
  return (
    <>
      <directionalLight
        castShadow
        intensity={1}
        position={[0, 20, 20]}
        shadow-camera-bias={1}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <spotLight castShadow intensity={10} position={[-1, 10, -1]} />
      {/* 기본 바닥, 벽 */}
      <MyRoomFloor />
      <MyRoomLeftWall />
      <MyRoomRightWall />
    </>
  );
};
