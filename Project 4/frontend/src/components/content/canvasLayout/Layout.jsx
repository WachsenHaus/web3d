import { useRecoilValue } from 'recoil';
import {
  CurrentMapAtom,
  isLoadCompletedAtom,
} from '../../../store/PlayersAtom';
import styled from 'styled-components';

import { MiniMap } from './canvasUserInterfaces/ground/Minimap';
import { SideBar } from './canvasUserInterfaces/common/SideBar';
import { ChatArea } from './canvasUserInterfaces/common/ChatArea';

export const CanvasLayout = ({ children }) => {
  const currentMap = useRecoilValue(CurrentMapAtom);
  const isLoadCompleted = useRecoilValue(isLoadCompletedAtom);
  return (
    <Wrapper>
      {children}
      {isLoadCompleted && (
        <>
          <SideBar />
          <MiniMap />
          {currentMap !== 'MINI_GAME' && <ChatArea />}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
`;
