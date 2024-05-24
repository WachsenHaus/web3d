import React, { useEffect, useRef } from 'react';
import GroundElements from './structures/ground';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  CharacterSelectFinishedAtom,
  PlayersAtom,
} from '../../../../store/PlayersAtom';
import CharacterInit from '../../../lobby/CharacterInit';
import { useThree } from '@react-three/fiber';
import { Man } from './player/Man';
import { Woman } from './player/Woman';
import { Kid } from './player/Kid';
import { Vector3 } from 'three';

const RootMap = () => {
  const [characterSelectFinished] = useRecoilState(CharacterSelectFinishedAtom);
  const [players] = useRecoilState(PlayersAtom);
  const camera = useThree((three) => three.camera);
  const controls = useRef(null);

  const characeterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);

  useEffect(() => {
    if (!controls.current) {
      return;
    }
    camera.position.set(14, 14, 14);
    controls.current.target.set(0, 0, 0);
  }, [camera.position]);

  return (
    <>
      {!characeterSelectFinished ? (
        <CharacterInit />
      ) : (
        <>
          <GroundElements />
          {players.map((player) => {
            return (
              <>
                {player.selectedCharacterGlbNameIndex === 0 && (
                  <Man
                    player={player}
                    modelIndex={0}
                    position={
                      new Vector3(
                        player.position[0],
                        player.position[1],
                        player.position[2]
                      )
                    }
                  />
                )}
                {player.selectedCharacterGlbNameIndex === 1 && (
                  <Woman
                    modelIndex={1}
                    player={player}
                    position={
                      new Vector3(
                        player.position[0],
                        player.position[1],
                        player.position[2]
                      )
                    }
                  />
                )}
                {player.selectedCharacterGlbNameIndex === 2 && (
                  <Kid
                    modelIndex={2}
                    player={player}
                    position={
                      new Vector3(
                        player.position[0],
                        player.position[1],
                        player.position[2]
                      )
                    }
                  />
                )}
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default RootMap;
