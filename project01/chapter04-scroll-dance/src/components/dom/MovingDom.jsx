/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from 'react';
import { IsEnnteredAtom } from '../../stores';
import { useRecoilValue } from 'recoil';
import { Scroll, useScroll } from '@react-three/drei';
import styled from 'styled-components';
import { useFrame } from '@react-three/fiber';

const MovingDom = () => {
  const isEntered = useRecoilValue(IsEnnteredAtom);
  const fixed = document.getElementById('fixed');
  const scroll = useScroll();
  const article01Ref = useRef(null);
  const article02Ref = useRef(null);
  const article03Ref = useRef(null);
  const article04Ref = useRef(null);
  // const article05Ref = useRef(null);
  // const article06Ref = useRef(null);
  // const article07Ref = useRef(null);
  const article08Ref = useRef(null);

  useFrame(() => {
    if (
      !isEntered ||
      !article01Ref.current ||
      !article02Ref.current ||
      !article03Ref.current ||
      !article04Ref.current ||
      !article08Ref.current ||
      !scroll
    ) {
      return;
    } else {
      article01Ref.current.style.opacity = `${1 - scroll.range(0, 1 / 8)}`;
      article02Ref.current.style.opacity = `${1 - scroll.range(1 / 8, 1 / 8)}`;
      article03Ref.current.style.opacity = `${scroll.curve(2 / 8, 1 / 8)}`;
      article04Ref.current.style.opacity = `${scroll.curve(3 / 8, 1 / 8)}`;
      if(scroll.visible(4/8,3/8)){
        fixed.style.display = 'flex';
        fixed.style.opacity = `${scroll.curve(4 / 8, 3 / 8)}`;
      }else{
        fixed.style.display = "none"
      }
      article08Ref.current.style.opacity = `${scroll.range(7 / 8, 1 / 8)}`;
    }
  });
  if (!isEntered) {
    return null;
  }

  return (
    // 스크롤먹는 돔요소가 생성된다.`
    <Scroll html>
      <ArticleWrapper ref={article01Ref}>
        <LeftBox>
          <span>최영훈이 노래한다 홍</span>
          <span>최영훈이 노래한다 홍홍</span>
          <span>최영훈이 노래한다 홍홍홍</span>
          <span>최영훈이 노래한다 홍홍홍홍</span>
        </LeftBox>
      </ArticleWrapper>
      <ArticleWrapper ref={article02Ref}>
        <RightBox>
          <span>윤수희가 노래한다 홍</span>
          <span>윤수희가 노래한다 홍홍</span>
          <span>윤수희가 노래한다 홍홍홍</span>
          <span>윤수희가 노래한다 홍홍홍홍</span>
        </RightBox>
      </ArticleWrapper>
      <ArticleWrapper ref={article03Ref}>
        Three JS r3F Drei Cannon
      </ArticleWrapper>
      <ArticleWrapper ref={article04Ref} className="height-4">
        <RightBox>
          <span>으아아아아!!!!</span>
          <span>으아아아아!!!!</span>
          <span>으아아아아!!!!</span> <span>으아아아아!!!!</span>
        </RightBox>
      </ArticleWrapper>

      <ArticleWrapper ref={article08Ref}>
        <Footer>
          <span>푸터터터터!!!!!!!!!!!!!!!!!!!!!</span>
        </Footer>
      </ArticleWrapper>
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
  &.height-4 {
    height: 400vh;
  }
  background-color: transparent;
  color: white;
  font-size: 24px;
  padding: 40px;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  min-width: fit-content;
  height: 400px;
  & > span:nth-of-type(1) {
    font-size: 32px;
  }
  & > span:nth-of-type(2) {
    font-size: 32px;
  }
  & > span:nth-of-type(3) {
    font-size: 32px;
  }
  & > span:nth-of-type(4) {
    font-size: 32px;
  }
  & > span:nth-of-type(5) {
    font-size: 32px;
  }
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  min-width: fit-content;
  height: 400px;
  & > span:nth-of-type(1) {
    font-size: 32px;
    font-weight: 400;
  }
  & > span:nth-of-type(2) {
    font-size: 32px;
    font-weight: 500;
  }
  & > span:nth-of-type(3) {
    font-size: 32px;
    font-weight: 600;
  }
  & > span:nth-of-type(4) {
    font-size: 32px;
    font-weight: 700;
  }
  & > span:nth-of-type(5) {
    font-size: 32px;
    font-weight: 800;
  }
`;

const Footer = styled.div`
  position: absolute;
  bottom: 8px;
  font-size: 8px;
`;

export default MovingDom;
