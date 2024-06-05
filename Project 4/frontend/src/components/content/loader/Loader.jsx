import { Html, useProgress } from '@react-three/drei';
import { useSetRecoilState } from 'recoil';
import { isLoadCompletedAtom } from '../../../store/PlayersAtom';
import { useEffect } from 'react';

export const Loader = () => {
  const { progress } = useProgress();

  const setIsLoadCompleted = useSetRecoilState(isLoadCompletedAtom);

  useEffect(() => {
    setIsLoadCompleted(progress === 100);
  }, [progress, setIsLoadCompleted]);

  return (
    <Html center>
      <progress value={progress} />
    </Html>
  );
};
