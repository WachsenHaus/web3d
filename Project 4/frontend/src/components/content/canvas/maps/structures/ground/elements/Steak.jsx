import { useGLTF } from '@react-three/drei';
import React, { useEffect, useMemo, useRef } from 'react';
import { Vector3 } from 'three';
import gsap from 'gsap';
import { useRecoilState } from 'recoil';
import { PlayerInventoryAtom } from '../../../../../../../store/PlayersAtom';
import { uniq } from 'lodash';

const name = 'ground-steak';

const Steak = () => {
  const ref = useRef(null);
  const [playerInventory, setPlayerInventory] =
    useRecoilState(PlayerInventoryAtom);

  const { scene } = useGLTF('/models/Steak.glb');
  const position = useMemo(() => new Vector3(22, 1, -18), []);

  useEffect(() => {
    if (!ref.current) return;
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    if (ref.current) {
      gsap.to(ref.current.position, {
        duration: 3,
        repeat: -1,
        repeatDelay: 0,
        yoyo: true,
        ease: 'linear',
        y: 3,
        // z: 3,
        // x: 3,
      });
    }
  }, [position, scene]);
  return (
    <>
      {/* <rectAreaLight
        args={['yellow', 30, 5, 5]}
        position={[position.x, 0, position.z]}
        rotation-x={Math.PI / 2}
      /> */}
      <primitive
        visible
        onClick={(e) => {
          e.stopPropagation();
          alert('스테이크를 얻음');
          setPlayerInventory((prev) => uniq([...prev, 'food']));
          if (ref.current) {
            ref.current.visible = false;
          }
        }}
        name={name}
        scale={1}
        position={position}
        ref={ref}
        // rotation-z={Math.PI / 2.5}
        object={scene}
      />
    </>
  );
};

export default Steak;
