import { useControls } from 'leva';
import DummyCarBody from './dummy/DummyCarBody';
import {
  useBox,
  useCompoundBody,
  useRaycastVehicle,
} from '@react-three/cannon';
import useWheels from './utils/useWheels';
import DummyWheel from './dummy/DummyWheel';
import { useMemo, useRef } from 'react';
import useVehicleControls from './utils/useVehicleControls';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import useFollowCam from './utils/useFollowCam';

const Car = () => {
  const { pivot } = useFollowCam();
  const worldPosition = useMemo(() => new Vector3(), []);
  const chassisBodyValue = useControls('chassisBody', {
    // position: [0, 0, 0],
    // rotation: [0, 0, 0],
    // scale: [1, 1, 1],
    // color: '#ff0000',
    // metalness: 0.5,
    // roughness: 0.5,
    // opacity: 1,
    // transparent: false,
    // wireframe: false,
    // visible: true,
    width: { value: 0.16, min: 0, max: 1 },
    height: { value: 0.12, min: 0, max: 1 },
    front: { value: 0.17 * 2, min: 0, max: 1 },
  });

  const position = [0, 0.5, 0];
  let width, height, front, mass, wheelRadius;

  width = 0.16;
  height = 0.12;
  front = 0.17;
  mass = 150;
  wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2];

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);
  const [chassisBody, chassisApi] = useCompoundBody(
    () => ({
      // args: chassisBodyArgs,
      position,
      mass,
      rotation: [0, Math.PI, 0],
      shapes: [
        {
          args: chassisBodyArgs,
          position: [0, 0, 0],
          type: 'Box',
        },
        {
          args: [width, height, front],
          position: [0, height, 0],
          type: 'Box',
        },
      ],
      // position: chassisBodyValue.position,
      // rotation: chassisBodyValue.rotation,
    }),
    useRef(null)
  );

  const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
    chassisBody,
    wheelInfos,
    wheels,
  }));

  useVehicleControls(vehicleApi, chassisApi);

  const makeFollowCam = () => {
    chassisBody?.current.getWorldPosition(worldPosition);
    pivot.position.lerp(worldPosition, 0.9);
  };

  useFrame(() => {
    chassisApi.position.subscribe((pos) => {
      worldPosition.copy(pos);
    });
    makeFollowCam();
  });
  return (
    <group ref={vehicle}>
      {/* 차체 */}
      <group ref={chassisBody}>
        {/* 차체 바디 */}
        <DummyCarBody
          width={chassisBodyValue.width}
          height={chassisBodyValue.height}
          front={chassisBodyValue.front}
        />
      </group>
      {/* 바퀴 */}
      <DummyWheel wheelRef={wheels[0]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[1]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[2]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
};

export default Car;
