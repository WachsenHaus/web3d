import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect, useMemo, useRef } from 'react';
import { Vector3 } from 'three';
import gsap from 'gsap';
import { useFrame } from '@react-three/fiber';
import { TextBoard } from '../../3dUIs/TextBoard';
import { useAnimatedText } from '../../../../../../../hooks/useAnimatedText';

const name = 'ground-shiba-inu';
const text =
  '크르르르르릉 왈왈월월왈왈월월왈왈월월왈왈월월왈왈월월 내 고기 어딨어!';

const ShibaInu = () => {
  const ref = useRef();
  const nameRef = useRef();
  const chatRef = useRef();
  const { displayText } = useAnimatedText(text);

  const { scene, animations } = useGLTF('/models/Shiba Inu.glb');

  const { actions } = useAnimations(animations, ref);
  const position = useMemo(() => new Vector3(-1, 0, 21), []);

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
    return () => {
      animation.pause();
      //   animation.kill();
    };
  }, [actions, position, scene]);
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
