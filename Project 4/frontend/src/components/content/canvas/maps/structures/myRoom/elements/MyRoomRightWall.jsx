import React from 'react';
import { myRoomSize } from '../../../../../../../data/constants';

export const MyRoomLeftWall = () => {
  return (
    <mesh
      name="my-room-right-wall"
      receiveShadow
      position-y={0}
      position-z={-myRoomSize / 2}
    >
      <boxGeometry args={[myRoomSize, myRoomSize, 0.05]} />
      <meshStandardMaterial color={'pink'} />
    </mesh>
  );
};
