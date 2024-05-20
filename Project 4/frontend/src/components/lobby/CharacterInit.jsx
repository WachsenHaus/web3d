import { useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { SelectedCharacterGlbNameIndexAtom } from '../../store/PlayersAtom';
import { OrbitControls } from '@react-three/drei';

const CharacterInit = () => {
  const camera = useThree((three) => three.camera);
  const selectedCharacterGlbNameIndex = useRecoilValue(
    SelectedCharacterGlbNameIndexAtom
  );

  const controls = useRef(null);

  useEffect(() => {
    if (!controls.current?.target) {
      return;
    }
    camera.position.set(8, 8, 8);
    controls.current.target.set(0, 1, 0);
  }, [camera.position]);

  return (
    <>
      {selectedCharacterGlbNameIndex === 0 && null}
      {selectedCharacterGlbNameIndex === 1 && null}
      {selectedCharacterGlbNameIndex === 2 && null}
      <OrbitControls
        ref={controls}
        minDistance={1}
        maxDistance={8}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate
      />
    </>
  );
};

export default CharacterInit;
