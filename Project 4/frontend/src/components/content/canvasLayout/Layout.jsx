import { useRecoilValue } from 'recoil';
import { isLoadCompletedAtom } from '../../../store/PlayersAtom';
import styled from 'styled-components';
import { SideBar } from '../canvas/UserInterfaces/common/SideBar';

export const CanvasLayout = ({ children }) => {
  const isLoadCompleted = useRecoilValue(isLoadCompletedAtom);
  return (
    <Wrapper>
      {children}
      {isLoadCompleted && <SideBar />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
`;
