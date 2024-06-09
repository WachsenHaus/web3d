import { useRecoilValue } from 'recoil';
import {
  CurrentMapAtom,
  isLoadCompletedAtom,
} from '../../../store/PlayersAtom';
import styled from 'styled-components';

import { MiniMap } from './canvasUserInterfaces/ground/Minimap';
import { SideBar } from './canvasUserInterfaces/common/SideBar';
import { ChatArea } from './canvasUserInterfaces/common/ChatArea';
import { Notice } from './canvasUserInterfaces/common/Notice';
import { Footer } from './canvasUserInterfaces/common/Footer';

export const CanvasLayout = ({ children }) => {
  const currentMap = useRecoilValue(CurrentMapAtom);
  const isLoadCompleted = useRecoilValue(isLoadCompletedAtom);
  return (
    <Wrapper>
      {children}
      {isLoadCompleted && (
        <>
          <Notice />
          <SideBar />
          <MiniMap />
          {currentMap !== 'MINI_GAME' && <ChatArea />}
        </>
      )}
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
`;
