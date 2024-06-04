import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Vector3 } from 'three';
import gsap from 'gsap';
import { useFrame, useThree } from '@react-three/fiber';
import { TextBoard } from '../../3dUIs/TextBoard';
import { useAnimatedText } from '../../../../../../../hooks/useAnimatedText';
import {
  PlayerCompletedQuestsAtom,
  PlayerInventoryAtom,
} from '../../../../../../../../store/PlayersAtom';
import { useRecoilState } from 'recoil';

const name = 'ground-shiba-inu';

const ShibaInu = () => {
  const ref = useRef();
  const [text, setText] = useState(
    '크르르르르릉 왈왈월월왈왈월월왈왈월월왈왈월월 내 고기 어딨어!'
  );
  const nameRef = useRef();
  const chatRef = useRef();
  const { displayText } = useAnimatedText(text);

  const threeScene = useThree((three) => three.scene);

  const { scene, animations } = useGLTF('/models/Shiba Inu.glb');

  const { actions } = useAnimations(animations, ref);
  const position = useMemo(() => new Vector3(-1, 0, 21), []);

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
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    let animation;

    if (playerCompletedQuests.includes('dog')) {
      setText('멍멍! 고마워');
      actions['Walk']?.stop();
      actions['Eating']?.play();
      ref.current.lookAt(3, 0, 21);
      // 오브젝트의 정보를 가져옴.
      const steak = threeScene.getObjectByName('ground-steak');

      if (steak) {
        steak.visible = true;
        steak?.position.set(
          ref.current.position.x + 1,
          0,
          ref.current.position.z + 1
        );
      }
    } else {
      actions['Walk']?.play();
      animation = gsap.to(ref.current.position, {
        duration: 5,
        yoyo: true,
        repeat: -1,
        x: 3,
        ease: 'linear',
        onUpdate: () => {
          const progress = animation.progress();
          if (Math.abs(progress) < 0.01) {
            ref.current.lookAt(3, 0, 21);
          } else if (Math.abs(progress) > 0.99) {
            ref.current.lookAt(-1, 0, 21);
          }
        },
      });
      animation.play();
    }

    return () => {
      animation?.pause();
      //   animation.kill();
    };
  }, [position, scene, playerCompletedQuests, actions, threeScene]);
  useFrame(() => {
    if (!nameRef.current) return;
    if (!chatRef.current) return;

    nameRef.current.position.set(
      ref.current.position.x,
      ref.current.position.y + 4,
      ref.current.position.z
    );
    chatRef.current.position.set(
      ref.current.position.x,
      ref.current.position.y + 5,
      ref.current.position.z
    );

    nameRef.current.lookAt(new Vector3(10000, 10000, 10000));
    chatRef.current.lookAt(new Vector3(10000, 10000, 10000));
  });

  return (
    <>
      <TextBoard ref={chatRef} text={displayText} />
      <TextBoard ref={nameRef} text="시바" isNpc />
      <primitive
        onClick={(e) => {
          e.stopPropagation();
          if (playerInventory.includes('food')) {
            alert('시바가 고기를 먹었습니다.');
            setPlayerInventory((prev) =>
              prev.filter((item) => item !== 'food')
            );
            setPlayerCompletedQuests((prev) => [...prev, 'dog']);
          } else {
            alert('고기를 가져다줘야해요!');
          }
        }}
        scale={0.7}
        ref={ref}
        visible
        name={name}
        position={position}
        rotation-y={Math.PI / 1.5}
        object={scene}
      />
    </>
  );
};

export default ShibaInu;
