/* eslint-disable react/no-unknown-property */
import { Plane, TorusKnot } from '@react-three/drei';

const Meshes = () => {
  return (
    <>
      {/* drei로 선언하면 성능이 좋다는데. 내부적으로 buffergeometry로 구현해서 gpu자원을 더 효율적으로 사용한다. */}
      <Plane args={[40, 40]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial />
      </Plane>

      {/* <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={0xff0000} />
      </TorusKnot> */}
    </>
  );
};

export default Meshes;
