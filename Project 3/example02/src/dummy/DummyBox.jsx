import { useBox } from '@react-three/cannon';
import React from 'react';

const DummyBox = (props) => {
  const { args } = props;

  const [ref] = useBox(() => ({
    args: args,
    mass: 5,

    ...props,
  }));
  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshBasicMaterial color="rgb(254,0,63)" transparent opacity={0.5} />
    </mesh>
  );
};

export default DummyBox;
