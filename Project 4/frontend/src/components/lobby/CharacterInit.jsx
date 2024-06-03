import { useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { SelectedCharacterGlbNameIndexAtom } from '../../store/PlayersAtom';
import { OrbitControls } from '@react-three/drei';
import { Man } from '../content/canvas/maps/player/Man';
import { Vector3 } from 'three';
import { Woman } from '../content/canvas/maps/player/Woman';
import { Kid } from '../content/canvas/maps/player/Kid';
import { Player } from '../content/canvas/maps/player/Player';

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
      <Player
        key={selectedCharacterGlbNameIndex}
        player={undefined}
        position={new Vector3(0, 0, 0)}
        modelIndex={selectedCharacterGlbNameIndex}
      />

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
