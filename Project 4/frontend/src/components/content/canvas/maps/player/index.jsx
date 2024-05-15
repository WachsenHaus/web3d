import { Box } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

const Player = () => {
  const ref = useRef(null);

  useFrame(() => {
    if (ref) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <Box ref={ref}>
      <meshStandardMaterial color="red" />
    </Box>
  );
};

export default Player;
