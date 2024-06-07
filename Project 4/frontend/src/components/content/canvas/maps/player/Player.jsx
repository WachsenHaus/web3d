import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useFrame, useGraph } from '@react-three/fiber';
import { usePlayer } from './hooks/usePlayer';
import { TextBoard } from '../structures/ground/3dUIs/TextBoard';
import { Vector3 } from 'three';
const path = './models/CubeGuyCharacter.glb';
useGLTF.preload(path);

export function Player({ player, position, modelIndex: mIdx }) {
  const modelIndex = mIdx ?? player.selectedCharacterGlbNameIndex;
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
    modelIndex,
  });

  return (
    <>
      {me && (
        <TextBoard
          ref={nickNameRef}
          text={`${player?.nickName}[${player?.jobPosition}]`}
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
              material={
                modelIndex === 1 ? materials['Atlas.001'] : materials.Atlas
              }
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
