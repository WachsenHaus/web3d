import React from 'react';
import GroundElements from './structures/ground';
import { useRecoilValue } from 'recoil';
import { CharacterSelectFinishedAtom } from '../../../../store/PlayersAtom';
import CharacterInit from '../../../lobby/CharacterInit';

const RootMap = () => {
  const characeterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);

  return (
    <>{!characeterSelectFinished ? <CharacterInit /> : <GroundElements />}</>
  );
};

export default RootMap;
