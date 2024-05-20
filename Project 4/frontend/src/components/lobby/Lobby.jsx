import React, { useState } from 'react';
import { STEPS } from '../../data/constants';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { SelectedCharacterGlbNameIndexAtom } from '../../../../result/src/store/PlayersAtom';
import { CharacterSelectFinishedAtom } from '../../store/PlayersAtom';
import { socket } from '../../sockets/clientSocket';
import styled from 'styled-components';
import { isValidText } from '../../utils';
import MainCanvas from '../content/canvas/MainCanvas';

const Lobby = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.NICK_NAME);
  const [tempNickName, setTempNickName] = useState();
  const [tempJobPosition, setTempJobPosition] = useState();
  const [selectedCharacterGlbNameIndex, setSelectedCharacterGlbNameIndex] =
    useRecoilState(SelectedCharacterGlbNameIndexAtom);

  const setCharacterSelectFinished = useSetRecoilState(
    CharacterSelectFinishedAtom
  );
  if (!socket) {
    return null;
  }

  console.log(currentStep);
  return (
    <LoginContainer>
      {currentStep === STEPS.NICK_NAME && (
        <>
          <LoginTitle>패디에서 사용할 내 이름이에요.</LoginTitle>
          <Input
            autoFocus
            placeholder="별명을 입력해주세요"
            onChange={(e) => {
              setTempNickName(e.currentTarget.value);
            }}
            onKeyUp={(e) => {
              if (!isValidText(e.key)) {
                return;
              }
              if (e.key === 'Enter') {
                setCurrentStep(STEPS.JOB_POSITION);
              }
            }}
          />
          <NextBtn
            disabled={!isValidText(tempNickName)}
            className={isValidText(tempNickName) ? 'valid' : 'disabled'}
            onClick={() => {
              setCurrentStep(STEPS.JOB_POSITION);
            }}
          >
            이대로 진행할래요.
          </NextBtn>
        </>
      )}
      {currentStep === STEPS.JOB_POSITION && (
        <>
          <LoginTitle>패디에서 공유할 내 직군이에요</LoginTitle>
          <Input
            autoFocus
            placeholder="개발 직군을 입력해주세요"
            onChange={(e) => {
              setTempJobPosition(e.currentTarget.value);
            }}
            onKeyUp={(e) => {
              if (!isValidText(tempJobPosition)) {
                return;
              }
              if (e.key === 'Enter') {
                setCurrentStep((prev) => prev + 1);
              }
            }}
          />
          <PrevBtn
            onClick={() => {
              setCurrentStep((prev) => prev - 1);
            }}
          >
            이전으로
          </PrevBtn>
          <NextBtn
            disabled={!isValidText(tempJobPosition)}
            className={isValidText(tempJobPosition) ? 'valid' : 'disabled'}
            onClick={() => {
              setCurrentStep((prev) => prev + 1);
            }}
          >
            이대로 진행할래요.
          </NextBtn>
        </>
      )}
      {currentStep === STEPS.CHARACTER && (
        <>
          <LoginTitle>패디에서 사용할 내 아바타를 고를시간이에요.</LoginTitle>
          <CharacterTuningWrapper>
            <CharacterCanvasWrapper>
              <MainCanvas />
            </CharacterCanvasWrapper>
          </CharacterTuningWrapper>

          <NextBtn
            className={!tempNickName || !tempJobPosition ? 'disabled' : 'valid'}
            onKeyUp={(e) => {
              if (!tempNickName || !tempJobPosition) {
                return;
              }
              if (e.key === 'Enter') {
                // setCurrentStep(STEPS.FINISH);
                socket.emit('initialize', {
                  tempNickName,
                  tempJobPosition,
                  selectedCharacterGlbNameIndex,
                  myRoom: {
                    object: [],
                  },
                });
                setCharacterSelectFinished(true);
              }
            }}
            onClick={(e) => {
              if (!tempNickName || !tempJobPosition) {
                return;
              }
              socket.emit('initialize', {
                tempNickName,
                tempJobPosition,
                selectedCharacterGlbNameIndex,
                myRoom: {
                  object: [],
                },
              });
              setCharacterSelectFinished(true);
            }}
          >
            이 모습으로 진행 할래요
          </NextBtn>
          <PrevBtn
            onClick={() => {
              setSelectedCharacterGlbNameIndex((prev) => {
                if (prev === undefined) return 1;
                if (prev === 2) return 0;
                return prev + 1;
              });
            }}
          >
            다른 캐릭터도 볼래요
          </PrevBtn>
          <PrevBtn
            onClick={() => {
              setCurrentStep((prev) => prev - 1);
            }}
          >
            이전으로
          </PrevBtn>
        </>
      )}
      {currentStep === STEPS.FINISH && <></>}
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 100%;
  background-color: #85e6ff;
`;

const LoginTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const CharacterCanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 1200px;
  height: 80%;
`;

const CharacterTuningWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const CharacterCanvasWrapper = styled.div`
  flex: 2;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  font-size: 24px;
  border: none;
  outline: none;
  padding: 12px 10px;
  border-radius: 8px;
  width: 280px;
  font-size: 18px;
`;
const NextBtn = styled.button`
  padding: 10px;
  width: 280px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-weight: 600;
  transition-duration: 0.2s;
  &.valid {
    background-color: #6731a1;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #340070;
      color: #fff;
    }
  }

  &.disabled {
    background-color: #8aceff;
    color: #ededed;
    cursor: not-allowed;
  }
`;

const PrevBtn = styled.button`
  padding: 10px;
  width: 280px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-weight: 600;
  transition-duration: 0.2s;
  &.valid {
    background-color: #6731a1;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #340070;
      color: #fff;
    }
  }

  &.disabled {
    background-color: #8aceff;
    color: #ededed;
    cursor: not-allowed;
  }
`;

export default Lobby;
