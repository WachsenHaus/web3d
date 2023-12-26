import React, { useRef } from 'react';

const Lights = () => {
  const ref = useRef();

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight ref={ref} intensity={3} position={[1, 3, -1]} />
    </>
  );
};

export default Lights;
