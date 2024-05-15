const { Server } = require('socket.io');

const io = new Server({
  cors: {
    origin: '*',
  },
});

io.listen(4000);

const players = [];

io.on('connection', (socket) => {
  console.log('연결됨');
  io.emit('players', players);

  socket.on(
    'initialize',
    ({ tempNickName, tempJobPosition, selectedCharacterGlbNameIndex }) => {
      const newPlayer = {
        id: socket.id,
        position: [0, 0, 0],
        tempNickName,
        tempJobPosition,
        selectedCharacter,
        myRoom: {
          objects: [],
        },
      };

      players.push(newPlayer);
      console.log('players', players);

      socket.emit(
        'initialize',
        players.find((player) => player.id === socket.id)
      );

      io.emit('enter', {
        id: socket.id,
        nickName: newPlayer.tempNickName,
        jobPosition: newPlayer.tempJobPosition,
      });

      io.emit('players', players);
    }
  );
  socket.on('move', (position) => {
    console.log('players', players);
    const player = players.find((player) => player.id === socket.id);
    if (player) {
      player.position = position;
      io.emit('players', players);
    }
  });

  socket.on('newText', (text) => {
    const sender = players.find((player) => player.id === socket.id);
    if (sender) {
      const { id, nickName, jobPosition } = sender;
      if (nickName && jobPosition) {
        io.emit('newText', {
          senderId: id,
          senderNickName: nickName,
          senderJobPosition: jobPosition,
          text,
          timestamp: new Date().getTime(),
        });
      }
    }
  });

  socket.on('myRoomChange', (myRoom, otherPlayerId) => {
    console.log('방이 바뀌었나 ?');
    const id = otherPlayerId || socket.id;
    const player = players.find((player) => player.id === id);
    player.myRoom = myRoom;
    io.emit('players', players);
  });
  socket.on('disconnecting', () => {
    console.log('연결이 끊어짐.');
    const player = players.find((player) => player.id === socket.id);
    if (player) {
      io.emit('exit', {
        id: socket.id,
        nickName: player.nickName,
        jobPosition: player,
        jobPosition,
      });
    }
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
    players.splice(
      players.findIndex((player) => player.id === socket.id),
      1
    );
    io.emit('players', players);
  });
});
