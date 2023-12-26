import { useState } from 'react';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
import MainCanvas from './components/MainCanvas';
import { FixedDOM } from './components/dom/FixedDom';

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
        <FixedDOM />
      </Wrapper>
    </RecoilRoot>
  );
}

export default App;
