import { useConvexPolyhedron } from '@react-three/cannon';
import { useMemo } from 'react';
import { IcosahedronGeometry } from 'three';
import CannonUtils from './utils/CannonUtils';
import { useEffect } from 'react';

export function Icosahedron(props) {
  const geometry = useMemo(() => new IcosahedronGeometry(0.5, 0), []);

  const args = useMemo(
    () => CannonUtils.toConvexPolyhedronProps(geometry),
    [geometry]
  );

  const [ref, api] = useConvexPolyhedron(() => ({
    args,
    mass: 1,
    ...props,
  }));

  useEffect(() => {
    console.log('geo', geometry);
    console.log('args', args);
  }, [ref]);

  return (
    <mesh
      ref={ref}
      onPointerDown={() => api.velocity.set(0, 2, 1)}
      geometry={geometry}
    >
      <meshBasicMaterial color="orange" />
    </mesh>
  );
}
