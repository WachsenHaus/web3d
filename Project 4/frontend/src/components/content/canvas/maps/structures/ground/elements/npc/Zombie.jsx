import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Vector3 } from 'three';
import gsap from 'gsap';
import { useFrame } from '@react-three/fiber';
import { TextBoard } from '../../3dUIs/TextBoard';
import { useAnimatedText } from '../../../../../../../hooks/useAnimatedText';
import { useRecoilState } from 'recoil';
import {
  PlayerCompletedQuestsAtom,
  PlayerInventoryAtom,
} from '../../../../../../../../store/PlayersAtom';

const name = 'ground-npc-zombie';

const Zombie = () => {
  const ref = useRef();
  const nameRef = useRef();
  const chatRef = useRef();
  const [text, setText] = useState(
    '으으 오늘도 야근이라니...          괜탸나,,    '
  );
  const { displayText } = useAnimatedText(text);
  const { scene, animations } = useGLTF('/models/Zombie.glb');
  const { actions } = useAnimations(animations, ref);
  const position = useMemo(() => new Vector3(-5, 0, -6), []);
  const [currentAnimation, setCurrentAnimation] = useState(
    'EnemyArmature|EnemyArmature|EnemyArmature|Attack'
  );
  const [playerInventory, setPlayerInventory] =
    useRecoilState(PlayerInventoryAtom);

  const [playerCompletedQuests, setPlayerCompletedQuests] = useRecoilState(
    PlayerCompletedQuestsAtom
  );

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (!chatRef.current) {
      return;
    }
    if (!nameRef.current) {
      return;
    }
    chatRef.current.position.set(
      ref.current.position.x,
      ref.current.position.y + 5,
      ref.current.position.z
    );

    nameRef.current.position.set(
      ref.current.position.x,
      ref.current.position.y + 4,
      ref.current.position.z
    );

    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    actions[currentAnimation]?.play().setDuration(0.8);
    return () => {
      actions[currentAnimation]?.stop();
    };
  }, [position, currentAnimation, scene]);

  useFrame(() => {
    if (!nameRef.current) return;
    if (!chatRef.current) return;
    nameRef.current.lookAt(new Vector3(10000, 10000, 10000));
    chatRef.current.lookAt(new Vector3(10000, 10000, 10000));

    if (playerCompletedQuests.includes('zombie')) {
      ref.current.lookAt(-50, 0, -50);
      ref.current.position.x -= 0.02;
      ref.current.position.z -= 0.02;

      chatRef.current.position.x -= 0.02;
      chatRef.current.position.z -= 0.02;

      nameRef.current.position.x -= 0.02;
      nameRef.current.position.z -= 0.02;
    }

    if (ref.current.position.x >= 50 || ref.current.position.z >= 50) {
      ref.current.visible = false;
    }
  });

  return (
    <>
      <TextBoard ref={chatRef} text={displayText} />
      <TextBoard ref={nameRef} text="야근좀비" isNpc />
      <primitive
        onClick={(e) => {
          e.stopPropagation();
          if (playerInventory.includes('ticket')) {
            alert('야근좀비가 퇴근했습니다.');
            setText('드디ㅓㅇ 퇴근이다!!!! ');

            setCurrentAnimation(
              'EnemyArmature|EnemyArmature|EnemyArmature|Run'
            );

            setPlayerInventory((prev) => [
              ...prev.filter((item) => item !== 'ticket'),
            ]);

            setPlayerCompletedQuests((prev) => [...prev, 'zombie']);
          } else {
            alert('티켓이 필요합니다.');
          }
        }}
        scale={1.2}
        ref={ref}
        visible
        name={name}
        position={position}
        object={scene}
      />
    </>
  );
};

export default Zombie;
