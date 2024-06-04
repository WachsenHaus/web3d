import { useGLTF } from '@react-three/drei';
import React, { useEffect, useMemo, useRef } from 'react';
import { Vector3 } from 'three';
import gsap from 'gsap';
import { useRecoilState } from 'recoil';
import {
  PlayerCompletedQuestsAtom,
  PlayerInventoryAtom,
} from '../../../../../../../store/PlayersAtom';

const name = 'ground-wood-chest';

const WoodChest = () => {
  const ref = useRef(null);
  const [playerInventory, setPlayerInventory] =
    useRecoilState(PlayerInventoryAtom);

  const [playerCompletedQuests, setPlayerCompletedQuests] = useRecoilState(
    PlayerCompletedQuestsAtom
  );

  const { scene } = useGLTF('/models/Wood Chest.glb');
  const position = useMemo(() => new Vector3(8, 0, 0), []);

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current.scale, {
        yoyo: true,
        repeat: -1,
        x: 1.1,
        y: 1.1,
        z: 1.1,
      });
    }
  }, []);

  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [scene]);

  // 유저가 보물을 가지고있따면 null을 반환
  if (playerCompletedQuests.includes('treasure')) {
    return null;
  }
  return (
    <>
      <rectAreaLight
        args={['yellow', 50, 5, 5]}
        position={[position.x, 0, position.z]}
        rotation-x={Math.PI / 2}
      />
      <primitive
        onClick={(e) => {
          e.stopPropagation();
          if (playerInventory.includes('key')) {
            alert('조기 퇴근권을 획득햇습니다. 야근좀비의 퇴근을 도와주세요.');
            // 키를 없애고 티켓으로 변경한다.
            setPlayerInventory((prev) => [
              ...prev.filter((item) => item !== 'key'),
              'ticket',
            ]);
            // 완료된 퀘스트 트레져 추가.
            setPlayerCompletedQuests((prev) => [...prev, 'treasure']);
          } else {
            alert('열쇠가 필요합니다.');
          }
        }}
        visible
        ref={ref}
        name={name}
        scale={1}
        position={position}
        object={scene}
      />
    </>
  );
};

export default WoodChest;
