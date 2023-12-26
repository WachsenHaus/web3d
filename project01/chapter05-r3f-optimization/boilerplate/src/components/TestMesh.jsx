/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export const TestMesh = () => {
  console.time('gltf읽기');
  const gltfs = useGLTF([
    '/dancer01.glb',
    '/dancer02.glb',
    '/dancer03.glb',
    '/dancer01.glb',
    '/dancer02.glb',
    '/dancer03.glb',
  ]);

  useEffect(() => {
    // 콘솔을 이용해서 time일 출력한다.
    console.timeEnd('gltf읽기');
  }, [gltfs]);
  console.log(gltfs);
  return (
    <>
      {gltfs.map((gltf, index) => (
        <primitive
          key={index}
          object={gltf.scene}
          scale={0.1}
          rotation-y={(Math.PI / 5) * index}
        />
      ))}
    </>
  );
};
