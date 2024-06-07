import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useGraph } from '@react-three/fiber';
import { usePlayer } from './hooks/usePlayer';
import { TextBoard } from '../structures/ground/3dUIs/TextBoard';
const path = './models/CubeGuyCharacter.glb';
useGLTF.preload(path);

export function Man({ player, position, modelIndex }) {
  const {
    me,
    playerRef,
    nickNameRef,
    memoziedPosition,
    playerId,
    nodes,
    materials,
  } = usePlayer({
    player,
    position,
    modelIndex: modelIndex ?? player.selectedCharacterGlbNameIndex,
  });
  return (
    <>
      {me && (
        <TextBoard
          ref={nickNameRef}
          text={`${player?.nickName}${player?.jobPosition}`}
        />
      )}
      <group
        ref={playerRef}
        position={memoziedPosition}
        name={playerId ?? ''}
        dispose={null}
      >
        <group name="Root_Scene">
          <group name="RootNode">
            <group
              name="CharacterArmature"
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            >
              <primitive object={nodes.Root} />
            </group>
            <skinnedMesh
              name="Character"
              geometry={nodes.Character.geometry}
              material={materials.Atlas}
              skeleton={nodes.Character.skeleton}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            />
          </group>
        </group>
      </group>
    </>
  );
}
