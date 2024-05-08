import React from 'react';
import { Text } from '@react-three/drei';

const HowToPlay = () => {
  const fontUrl = '/assets/fonts/Pretendard.json';

  return (
    <group>
      <Text font={fontUrl} color={'white'} characters="abcdefghijks">
        Hello World
      </Text>
    </group>
  );
};

export default HowToPlay;
