const moment = require('moment');
const { sendMessage } = require('../models');

let users = [];

const webChat = (io) => {
  io.on('connection', (socket) => {
    socket.on('login', (nickname) => {
      users.push({ nickname, socketId: socket.id }); io.emit('users', users);
    });

    socket.on('message', async ({ chatMessage, nickname }) => {
      const data = moment().format('DD-MM-YYYY HH:mm:ss');
      await sendMessage({ nickname, message: chatMessage, timestamp: data });
      io.emit('message', `${data} - ${nickname}: ${chatMessage}`);
    });

    socket.on('disconnect', () => {
      users = users.filter((user) => user.socketId !== socket.id); io.emit('users', users);
    });

    socket.on('update', (nickname) => {
      users[users.findIndex((user) => user.socketId === socket.id)].nickname = nickname;
      io.emit('users', users);
    });
  });
};

module.exports = webChat;