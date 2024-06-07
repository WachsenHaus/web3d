import { atom, selector } from 'recoil';

export const PlayersAtom = atom({
  key: 'PlayersAtom',
  default: [],
});

export const MeAtom = atom({
  key: 'MeAtom',
  default: undefined,
});

// 캐릭터 선택이 완료되었는지,
export const CharacterSelectFinishedAtom = atom({
  key: 'CharacterSelectFinishedAtom',
  default: false,
});

// 현재 선택된 캐릭터 종류
export const SelectedCharacterGlbNameIndexAtom = atom({
  key: 'SelectedCharacterGlbNameIndexAtom',
  default: 0,
});

// 현재 완료된 퀘스트 목록
export const PlayerCompletedQuestsAtom = atom({
  key: 'PlayerCompletedQuestsAtom',
  default: [],
});

// 현재 플레이어의 인벤토리
export const PlayerInventoryAtom = atom({
  key: 'PlayerInventoryAtom',
  default: [],
});

// 운동장에 배치된 오브젝트들의 경계선 정보
export const PlayGroundStructuresBoundingBoxAtom = atom({
  key: 'PlayGroundStructuresBoundingBoxAtom',
  default: [],
});

// 지오메트리의 boundingbox 계산을 통해 모델링 오브젝트 경계선 구하기.
export const PlayerGroundStructuresFloorPlaneCornersSelector = selector({
  key: 'PlayerGroundStructuresFloorPlaneCornersSelector',
  get: ({ get }) => {
    const pb = get(PlayGroundStructuresBoundingBoxAtom);
    return pb?.map((item) => {
      return {
        name: item.name,
        corners: [
          {
            x: item.box.max.x + item.position.x,
            z: item.box.max.z + item.position.z,
          },
          {
            x: item.box.max.x + item.position.x,
            z: item.box.min.z + item.position.z,
          },
          {
            x: item.box.min.x + item.position.x,
            z: item.box.min.z + item.position.z,
          },
          {
            x: item.box.min.x + item.position.x,
            z: item.box.max.z + item.position.z,
          },
        ],
        position: item.position,
      };
    });
  },
});

// 초기 모델링 로드가 완료되었는가 여부
export const isLoadCompletedAtom = atom({
  key: 'isLoadCompletedAtom',
  default: false,
});

// 현재 있는 맵 정보
export const CurrentMapAtom = atom({
  key: 'CurrentMapAtom',
  default: 'GROUND',
});

// 현재 들어가있는 마이룸의 주인 유저 정보
export const CurrentMyRoomPlayerAtom = atom({
  key: 'CurrentMyRoomPlayerAtom',
  default: undefined,
});

export const ChatsAtom = atom({
  key: 'ChatsAtom',
  default: [],
});

// 최근 채팅 정보
export const RecentChatsAtom = atom({
  key: 'RecentChatsSelector',
  default: [],
});

// 이미 표시된 최근 채팅 정보
export const AlreadyDisplayedRecentChatsAtom = atom({
  key: 'AlreadyDisplayedRecentChatsAtom',
  default: [],
});
