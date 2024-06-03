import { useGLTF } from '@react-three/drei';
import React, { useEffect, useMemo, useRef } from 'react';
import { Vector3 } from 'three';
import { TextBoard } from '../../3dUIs/TextBoard';
import { useFrame } from '@react-three/fiber';
import { useAnimatedText } from '../../../../../../../hooks/useAnimatedText';

const name = 'ground-npc-dinosaur';
const text = '나는 무서운 육식 공룡이야...! 크아앙~    ';

const Dinosaur = () => {
  const ref = useRef();
  const nameRef = useRef();
  const chatRef = useRef();
  const { displayText } = useAnimatedText(text);
  const { scene } = useGLTF('/models/CuteRedDino.glb');
  const position = useMemo(() => new Vector3(0, 0, -5), []);

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
      <TextBoard ref={nameRef} text="디노" isNpc />
      <primitive
        ref={ref}
        visible
        name={name}
        scale={2}
        position={position}
        object={scene}
      />
    </>
  );
};

export default Dinosaur;
