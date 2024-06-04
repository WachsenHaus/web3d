import { useGLTF } from '@react-three/drei';
import React, { useEffect, useMemo, useRef } from 'react';
import { Vector3 } from 'three';
import gsap from 'gsap';
import { uniq } from 'lodash';
import { useRecoilState } from 'recoil';
import {
  PlayerCompletedQuestsAtom,
  PlayerInventoryAtom,
} from '../../../../../../../store/PlayersAtom';

const name = 'ground-key';

const Key = () => {
  const ref = useRef(null);
  const [playerInventory, setPlayerInventory] =
    useRecoilState(PlayerInventoryAtom);

  const [playerCompletedQuests, setPlayerCompletedQuests] = useRecoilState(
    PlayerCompletedQuestsAtom
  );

  const { scene } = useGLTF('/models/Key.glb');
  const position = useMemo(() => new Vector3(22, 1, -18), []);

  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    if (ref.current) {
      gsap.to(ref.current.rotation, {
        duration: 3,
        repeat: -1,
        repeatDelay: 0,
        y: Math.PI * 6,
      });
    }
  }, [position, scene]);

  // 유저가 보물이나 키를 가지고있다면 null을 반환.
  if (
    playerCompletedQuests.includes('treasure') ||
    playerInventory.includes('key')
  ) {
    return null;
  }
  return (
    <>
      <rectAreaLight
        args={['yellow', 30, 5, 5]}
        position={[position.x, 0, position.z]}
        rotation-x={Math.PI / 2}
      />
      <primitive
        onClick={(e) => {
          e.stopPropagation();
          alert('열쇠를얻음');
          setPlayerInventory((prev) => uniq([...prev, 'key']));
        }}
        visible
        name={name}
        scale={1}
        position={position}
        ref={ref}
        rotation-z={Math.PI / 2.5}
        object={scene}
      />
    </>
  );
};

export default Key;
