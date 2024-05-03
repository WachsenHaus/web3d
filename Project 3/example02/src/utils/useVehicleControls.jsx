import { useEffect, useState } from 'react';

//
const useVehicleControls = (vehicleApi, chassisApi) => {
  const [controls, setControls] = useState({});
  useEffect(() => {
    const KeyDownPressHandler = (e) => {
      console.log(e);
      setControls((controls) => {
        return {
          ...controls,
          [e.key]: true,
        };
      });
    };
    const keyUpPressHandler = (e) => {
      setControls((controls) => {
        return {
          ...controls,
          [e.key]: false,
        };
      });
    };
    window.addEventListener('keydown', KeyDownPressHandler);
    window.addEventListener('keyup', keyUpPressHandler);

    return () => {
      window.removeEventListener('keydown', KeyDownPressHandler);
      window.removeEventListener('keyup', keyUpPressHandler);
    };
  }, []);

  useEffect(() => {
    console.log(controls);
    if (controls.ArrowUp) {
      vehicleApi.applyEngineForce(120, 2);
      vehicleApi.applyEngineForce(120, 3);
    } else if (controls.ArrowDown) {
      vehicleApi.applyEngineForce(-120, 2);
      vehicleApi.applyEngineForce(-120, 3);
    } else {
      vehicleApi.applyEngineForce(0, 0);
      vehicleApi.applyEngineForce(0, 1);
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (controls.ArrowLeft) {
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
    } else if (controls.ArrowRight) {
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
    } else {
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }
  }, [controls, vehicleApi, chassisApi]);
  return controls;
};

export default useVehicleControls;
