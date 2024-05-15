import React from 'react';
import { useRecoilValue } from 'recoil';
import { CharacterSelectFinishedAtom, MeAtom } from '../../store/PlayersAtom';
import MainCanvas from './canvas/MainCanvas';
import { CanvasLayout } from './canvasLayout/Layout';

export const Content = () => {
  const characterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);
  const me = useRecoilValue(MeAtom);

  if (characterSelectFinished && me) {
    return (
      <CanvasLayout>
        <MainCanvas />
      </CanvasLayout>
    );
  }

  return null;
};
