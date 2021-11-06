const moment = require('moment');
const { sendMessage } = require('../models');

let users = [];

const updateName = (socket, io) => {
  socket.on('update', (nickname) => {
    // AJUDA DO ZÓZIMO
    const userIndex = users.findIndex((user) => user.socketId === socket.id);
    users[userIndex].nickname = nickname;
    io.emit('users', users);
  });
};

const webChat = (io) => {
  io.on('connection', (socket) => {
    socket.on('login', (nickname) => {
      console.log('New user connected');
      users.push({ nickname, socketId: socket.id });
      io.emit('users', users);
    });

    socket.on('message', async ({ chatMessage, nickname }) => {
      const data = moment().format('DD-MM-YYYY HH:mm:ss');
      await sendMessage({ nickname, message: chatMessage, timestamp: data });
      io.emit('message', `${data} - ${nickname}: ${chatMessage}`);
    });

    socket.on('disconnect', () => {
      users = users.filter((user) => user.socketId !== socket.id);
      io.emit('users', users);
    });

    updateName(socket, io);
  });
};

module.exports = webChat;