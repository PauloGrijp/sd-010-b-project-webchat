const moment = require('moment');
// const modelChat = require('../models/modelChat');

const nickGenerate = () => {
  let id = '';
  const string = 'abcdefghijklmnopqrstuvwyxz';
  string.split('').forEach(() => {
    if (id.length !== 16) {
      id += string[Math.floor(Math.random() * (string.length - 1))];
    }
  });
  return id;
};
nickGenerate();
let listUser = [];

const renderMessage = (io, socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const dateTime = moment().format('DD-MM-yyyy h:mm:ss A');
    const detailMessage = `${dateTime} - ${nickname}: ${chatMessage}`;
    // modelChat.addMessage({ message: chatMessage, nickname, timestamp: dateTime });
    io.emit('message', detailMessage);
    // socket.emit('nickName', nickname);
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    renderMessage(io, socket);
    const nickname = `Fla${Date.now()}`;
    socket.emit('rendernickname');
    socket.emit('nickName', nickname);

    socket.on('disconnect', () => {
      listUser = listUser.filter((user) => user.id !== socket.id);
    });
  });
};