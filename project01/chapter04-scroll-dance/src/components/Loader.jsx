/* eslint-disable react/prop-types */
import { Html, useProgress } from '@react-three/drei';
import React from 'react';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { IsEnnteredAtom } from '../stores';

const Loader = ({ isCompleted }) => {
  const [isEntered, setIsEntered] = useRecoilState(IsEnnteredAtom);

  const progress = useProgress();
  console.log('progress', progress);
  if (isEntered) return null;
  return (
    <Html center>
      <BlurredBackground />
      <Container>
        <ProgressBar progress={progress}>
          {isCompleted ? 100 : progress.progress}
        </ProgressBar>
        <EnterBtn
          onClick={() => {
            setIsEntered(true);
          }}
        >
          Enter
        </EnterBtn>
      </Container>
    </Html>
  );
};

const blink = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
`;

const BlurredBackground = styled.div`
  width: 400px;
  height: 400px;
  background-color: red;
  border-radius: 50%;
  filter: blur(300px);
`;
const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const ProgressBar = styled.div`
  font-size: 20px;
  color: #ccc;
`;
const EnterBtn = styled.button`
  animation: ${blink} 1.5s infinite;
  transition-duration: 0.5s;
  font-size: 16px;
  outline: none;
  border: 0.5px solid #999;
  padding: 8px 18px;
  background-color: transparent;
  color: #ccc;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
    color: #dc4f00;
  }
`;

export default Loader;
