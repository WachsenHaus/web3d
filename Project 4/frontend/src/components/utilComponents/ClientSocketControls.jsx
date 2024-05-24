import React, { useEffect } from 'react';
import { socket } from '../../sockets/clientSocket';
import { useRecoilState } from 'recoil';
import { MeAtom, PlayersAtom } from '../../store/PlayersAtom';

const ClientSocketControls = () => {
  const [me, setMe] = useRecoilState(MeAtom);
  const [players, setPlayers] = useRecoilState(PlayersAtom);

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
    setPlayers(value);
    const newMe = value.find((p) => p && me && p.id === me.id);
    if (newMe) {
      setMe(newMe);
    }
  };
  const handleNewText = () => {
    console.info('새로운 텍스트 이벤트');
  };
  useEffect(() => {
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('initialize', handleInitialize);
    socket.on('enter', handleEnter);
    socket.on('exit', handleExit);
    socket.on('players', handlePlayers);
    socket.on('nexText', handleNewText);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('initialize', handleInitialize);
      socket.off('enter', handleEnter);
      socket.off('exit', handleExit);
      socket.off('players', handlePlayers);
      socket.off('nextText', handleNewText);
    };
  }, []);
  return null;
};

export default ClientSocketControls;
