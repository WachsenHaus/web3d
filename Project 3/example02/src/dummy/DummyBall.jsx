import { useBox, useSphere } from '@react-three/cannon';
import React from 'react';

const DummyBall = (props) => {
  const { args } = props;

  const [ref] = useSphere(() => ({
    args: args,
    mass: 50,
    type: 'Dynamic',
    ...props,
  }));
  return (
    <mesh ref={ref}>
      <sphereGeometry args={args} />
      <meshBasicMaterial color="rgb(10,244,63)" transparent opacity={0.5} />
    </mesh>
  );
};

export default DummyBall;
