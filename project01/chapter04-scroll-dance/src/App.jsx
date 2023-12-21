import { useState } from 'react';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
import MainCanvas from './components/MainCanvas';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

function App() {
  return (
    <RecoilRoot>
      <Wrapper>
        <MainCanvas />
      </Wrapper>
    </RecoilRoot>
  );
}

export default App;
