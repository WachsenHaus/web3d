/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { socket } from '../../sockets/clientSocket';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  AlreadyDisplayedRecentChatsAtom,
  ChatsAtom,
  MeAtom,
  PlayersAtom,
  RecentChatsAtom,
} from '../../store/PlayersAtom';
import _ from 'lodash';

const ClientSocketControls = () => {
  const setPlayers = useSetRecoilState(PlayersAtom);
  const [me, setMe] = useRecoilState(MeAtom);
  const [chats, setChats] = useRecoilState(ChatsAtom);
  const setRecentChats = useSetRecoilState(RecentChatsAtom);
  const alreadyDisplayedRecentChats = useRecoilValue(
    AlreadyDisplayedRecentChatsAtom
  );

  useEffect(() => {
    const handleConnect = () => {
      console.info('연결됨');
    };
    const handleDisconnect = () => {
      console.info('연결이 끊김');
    };
    const handleInitialize = (value) => {
      console.log('value', value);
      setMe(value);
      console.info('초기화됨');
    };
    const handleEnter = () => {
      console.info('입장함');
    };
    const handleExit = () => {
      console.info('퇴장함');
    };
    const handlePlayers = (value) => {
      console.log('✨입장');
      setPlayers(value);
      const newMe = value.find((p) => p && me && p.id === me.id);
      if (newMe) {
        setMe(newMe);
      }
    };
    const handleNewText = ({
      senderId,
      senderNickname,
      senderJobPosition,
      text,
      timestamp,
    }) => {
      console.log('😊');
      console.log(chats);
      setChats((prev) => [
        ...prev,
        { senderId, senderNickname, senderJobPosition, text, timestamp },
      ]);

      const uniqRecentChats = _.uniqBy(
        [
          ...chats,
          { senderId, senderNickname, senderJobPosition, text, timestamp },
        ].reverse(),
        'senderId'
      );

      setRecentChats(
        uniqRecentChats.filter(
          (chat) =>
            !alreadyDisplayedRecentChats.some(
              (alreadyChats) =>
                alreadyChats.senderId === chat.senderId &&
                alreadyChats.timestamp === chat.timestamp
            )
        )
      );
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('initialize', handleInitialize);
    socket.on('enter', handleEnter);
    socket.on('exit', handleExit);
    socket.on('players', handlePlayers);
    socket.on('newText', handleNewText);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('initialize', handleInitialize);
      socket.off('enter', handleEnter);
      socket.off('exit', handleExit);
      socket.off('players', handlePlayers);
      socket.off('newText', handleNewText);
    };
  }, [
    alreadyDisplayedRecentChats,
    chats,
    me,
    me?.id,
    setChats,
    setMe,
    setPlayers,
  ]);
  return null;
};

export default ClientSocketControls;
