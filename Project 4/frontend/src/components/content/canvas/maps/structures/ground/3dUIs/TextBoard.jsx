/* eslint-disable react/display-name */
import { Billboard, Text } from '@react-three/drei';
import React, { forwardRef } from 'react';

export const TextBoard = forwardRef(({ text, isNpc }, ref) => {
  return (
    <Billboard ref={ref}>
      <Text
        font="/NotoSansKR-Regular.ttf"
        fontSize={isNpc ? 0.4 : 0.25}
        color={isNpc ? 0xff81c2 : 0x000000}
      >
        {text}
      </Text>
    </Billboard>
  );
});
