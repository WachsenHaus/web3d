import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useGraph } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { SkeletonUtils } from 'three-stdlib';
import { MeAtom } from '../../../../../../store/PlayersAtom';

export const usePlayer = ({ player, position, modelIndex }) => {
  const memoziedPosition = useMemo(() => position, []);
  const playerId = player?.id;
  const playerRef = useRef(null);
  const me = useRecoilValue(MeAtom);
  const { scene, materials, animations } = useGLTF(
    (() => {
      switch (modelIndex) {
        case 0:
          return `./models/CubeGuyCharacter.glb`;
        case 1:
          return `./models/CubeWomanCharacter.glb`;
        case 2:
          return `./models/Steve.glb`;
        default:
          return `./models/CubeGuyCharacter.glb`;
      }
    })()
  );

  useFrame(({ camera }) => {
    if (!player) {
      return;
    }
    if (!playerRef.current) {
      return;
    }
    if (playerRef.current.position.distanceTo(position) > 0.1) {
      const direction = playerRef.current.position
        .clone()
        .sub(position)
        .normalize()
        .multiplyScalar(0.05);

      playerRef.current.position.sub(direction);
      playerRef.current.lookAt(position);
      console.log(playerRef.current);

      setAnimation('CharacterArmature|CharacterArmature|CharacterArmature|Run');
    } else {
      setAnimation(
        'CharacterArmature|CharacterArmature|CharacterArmature|Idle'
      );
    }
    if (me?.id === playerId) {
      camera.position.set(
        playerRef.current.position.x + 12,
        playerRef.current.position.y + 12,
        playerRef.current.position.z + 12
      );
      camera.lookAt(playerRef.current.position);
    }
  });

  // 스켈르톤유틸로 복제하는 이유는 ?
  // 다른유저가 똑같은 모델링으로 캐릭터를 만들게 되면 캐싱이 되기 때문에 뭔가 원하지 않는 동작이 될수 있기 때문에 깊은 복사를 해서. 아예 분리시키게 하는 과정이다.

  const clone = useMemo(() => SkeletonUtils.clone(scene), []);
  // 동일한 과정이다.
  const objectMap = useGraph(clone);
  const nodes = objectMap.nodes;

  const [animation, setAnimation] = useState(
    'CharacterArmature|CharacterArmature|CharacterArmature|Idle'
  );

  const { actions } = useAnimations(animations, playerRef);

  useEffect(() => {
    actions[animation]?.reset()?.fadeIn(0.5).play();
    return () => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [actions, animation]);

  return { playerRef, memoziedPosition, playerId, nodes, materials };
};
