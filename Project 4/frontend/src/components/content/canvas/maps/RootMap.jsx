import React, { Suspense, useEffect, useRef } from 'react';
import GroundElements from './structures/ground';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as THREE from 'three';
import {
  CharacterSelectFinishedAtom,
  CurrentMapAtom,
  PlayerGroundStructuresFloorPlaneCornersSelector,
  PlayersAtom,
  RecentChatsAtom,
} from '../../../../store/PlayersAtom';
import CharacterInit from '../../../lobby/CharacterInit';
import { useThree } from '@react-three/fiber';
import { Player } from './player/Player';
import { Line } from '@react-three/drei';
import { Loader } from '../../loader/Loader';
import { ChatBubble } from './structures/ground/3dUIs/ChatBubble';

const RootMap = () => {
  const characeterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);
  const [players] = useRecoilState(PlayersAtom);
  const recentChats = useRecoilValue(RecentChatsAtom);
  const playGroundStructuresFloorPlaneCorners = useRecoilValue(
    PlayerGroundStructuresFloorPlaneCornersSelector
  );
  const currentMap = useRecoilValue(CurrentMapAtom);
  const camera = useThree((three) => three.camera);
  const controls = useRef(null);

  useEffect(() => {
    if (!controls.current) {
      return;
    }
    camera.position.set(14, 14, 14);
    controls.current.target.set(0, 0, 0);
  }, [camera.position]);

  return (
    <Suspense fallback={<Loader />}>
      {!characeterSelectFinished ? (
        <CharacterInit />
      ) : (
        <>
          <GroundElements />
          {playGroundStructuresFloorPlaneCorners?.map((corner) => {
            return (
              <Line
                key={corner.name}
                color={'red'}
                points={corner.corners.map((c) => [c.x, 0.01, c.z])}
              />
            );
          })}
          {players.map((player) => {
            return (
              <React.Fragment key={player.id}>
                <ChatBubble
                  key={`${player.id}_chat`}
                  player={player}
                  chat={recentChats.find(
                    (recentChat) => recentChat.senderId === player.id
                  )}
                />
                <Player
                  key={`${player.id}_character`}
                  player={player}
                  position={
                    new THREE.Vector3(
                      player.position[0],
                      player.position[1],
                      player.position[2]
                    )
                  }
                />
              </React.Fragment>
            );
          })}
        </>
      )}
    </Suspense>
  );
};

export default RootMap;
