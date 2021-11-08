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
  console.log('io-io', io);
  socket.on('message', ({ chatMessage, nickname }) => {
    const dateTime = moment().format('DD-MM-yyyy  HH:mm:ss');
    const detailMessage = `${dateTime} - ${nickname}: ${chatMessage}`;
    modelChat.addMessage({ message: chatMessage, nickname, timestamp: dateTime });
    io.emit('message', detailMessage);
  });
};

function handleNicknameChange(io, socket) {
  socket.on('nicknameChange', (nickname) => {
    listUser = listUser.filter((user) => (user.id !== socket.id));
    listUser.push({ id: socket.id, nickname });
    io.emit('renderUserList', listUser);
  });
}

const handleMessageHistory = async (io, socket) => {
  const messages = await modelChat.getAllMessages();
  socket.emit('messageHistory', messages);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    io.emit('renderUser', listUser);
    socket.emit('rendernickname', nickName);
    handleMessageHistory(io, socket);
    renderMessage(io, socket);
    handleNicknameChange(io, socket);

    socket.on('disconnect', () => {
      listUser = listUser.filter((user) => user.id !== socket.id);
      io.emit('renderListUser', listUser);
    });
  });
};