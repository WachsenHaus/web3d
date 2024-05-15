import React, { useEffect } from 'react';
import { socket } from '../../sockets/clientSocket';

const ClientSocketControls = () => {
  const handleConnect = () => {
    console.info('연결됨');
  };
  const handleDisconnect = () => {
    console.info('연결이 끊김');
  };
  const handleInitialize = () => {
    console.info('초기화됨');
  };
  const handleEnter = () => {
    console.info('입장함');
  };
  const handleExit = () => {
    console.info('퇴장함');
  };
  const handlePlayers = (e) => {
    console.info('플레이어 관련이벤트');
    console.log(e);
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
