import styled from 'styled-components';

export const FixedDOM = () => {
  return (
    <FiexDomWrapper id="fixed">
      <span>Threejs Interesting Threejs Inter</span>
      <img src="/threejs.png"></img>
    </FiexDomWrapper>
  );
};

const FiexDomWrapper = styled.div`
  width: 400px;
  height: 400px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  font-size: 8px;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  display: none;
  color: #fff;
  z-index: 0;
  pointer-events: none;
  img {
    width: 100%;
  }
`;
