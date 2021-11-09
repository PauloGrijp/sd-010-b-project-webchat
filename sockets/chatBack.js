const moment = require('moment');
const modelChat = require('../models/modelChat');

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
const nickName = nickGenerate();
let listUser = [];

const renderMessage = (io, socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    console.log(chatMessage);
    const dateTime = moment().format('DD-MM-yyyy  HH:mm:ss');
    const detailMessage = `${dateTime} - ${nickname}: ${chatMessage}`;
    modelChat.addMessage({ message: chatMessage, nickname, timestamp: dateTime });
    io.emit('message', detailMessage);
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    renderMessage(io, socket);

    socket.emit('rendernickname', nickName);

    socket.on('disconnect', () => {
      listUser = listUser.filter((user) => user.id !== socket.id);
      io.emit('renderListUser', listUser);
    });
  });
};