import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Vector3 } from 'three';
import gsap from 'gsap';
import { useFrame } from '@react-three/fiber';
import { TextBoard } from '../../3dUIs/TextBoard';
import { useAnimatedText } from '../../../../../../../hooks/useAnimatedText';

const name = 'ground-npc-zombie';
const text = '으으 오늘도 야근이라니...          괜탸나,,    ';

const Zombie = () => {
  const ref = useRef();
  const nameRef = useRef();
  const chatRef = useRef();
  const { displayText } = useAnimatedText(text);
  const { scene, animations } = useGLTF('/models/Zombie.glb');
  const { actions } = useAnimations(animations, ref);
  const position = useMemo(() => new Vector3(-5, 0, -6), []);
  const [currentAnimation, setCurrentAnimation] = useState(
    'EnemyArmature|EnemyArmature|EnemyArmature|Attack'
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
  }, [position, scene]);

  useFrame(() => {
    if (!nameRef.current) return;
    if (!chatRef.current) return;
    nameRef.current.lookAt(new Vector3(10000, 10000, 10000));
    chatRef.current.lookAt(new Vector3(10000, 10000, 10000));
  });

  return (
    <>
      <TextBoard ref={chatRef} text={displayText} />
      <TextBoard ref={nameRef} text="야근좀비" isNpc />
      <primitive
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
