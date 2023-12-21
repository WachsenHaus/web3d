import React, { useRef } from 'react';
import { IsEnnteredAtom } from '../../stores';
import { useRecoilValue } from 'recoil';
import { Scroll } from '@react-three/drei';
import styled from 'styled-components';

const MovingDom = () => {
  const isEntered = useRecoilValue(IsEnnteredAtom);
  const article01Ref = useRef(null);
  const article02Ref = useRef(null);
  const article03Ref = useRef(null);
  const article04Ref = useRef(null);
  const article05Ref = useRef(null);
  const article06Ref = useRef(null);
  const article07Ref = useRef(null);
  const article08Ref = useRef(null);

  if (!isEntered) {
    return null;
  }

  return (
    // 스크롤먹는 돔요소가 생성된다.`
    <Scroll html>
      <ArticleWrapper ref={article01Ref}></ArticleWrapper>
      <ArticleWrapper ref={article02Ref}></ArticleWrapper>
      <ArticleWrapper ref={article03Ref}></ArticleWrapper>
      <ArticleWrapper ref={article04Ref}></ArticleWrapper>
      <ArticleWrapper ref={article05Ref}></ArticleWrapper>
      <ArticleWrapper ref={article06Ref}></ArticleWrapper>
      <ArticleWrapper ref={article07Ref}></ArticleWrapper>
      <ArticleWrapper ref={article08Ref}></ArticleWrapper>
    </Scroll>
  );
};

const ArticleWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  color: '#ffffff';
  font-size: 24px;
  padding: 40px;
`;

export default MovingDom;
