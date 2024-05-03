import React, { useState } from 'react';
import { useBox } from '@react-three/cannon';
import { useEffect } from 'react';

export function Box(props) {
  const [meshRef, api] = useBox(() => ({ args: [1, 1, 1], mass: 1, ...props }));

  useEffect(() => {
    console.log(meshRef.current);
    console.log(api);
  }, [meshRef, api]);

  const [hovered, setHover] = useState(false);

  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerDown={() => api.velocity.set(0, 5, 0)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}
