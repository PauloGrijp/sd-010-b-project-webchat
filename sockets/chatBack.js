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
nickGenerate();
let listUserOnLine = [];

const renderMessage = (io, socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const dateTime = moment().format('DD-MM-yyyy h:mm:ss A');
    const detailMessage = `${dateTime} - ${nickname}: ${chatMessage}`;
    await modelChat.addMessage(chatMessage, nickname, dateTime);
    io.emit('message', detailMessage);
    // socket.emit('nickName', nickname);
  });
};

const historyMessage = async (io, socket) => {
  const messages = await modelChat.getAllMessages();
  socket.emit('historyMessage', messages);
};

const nickNameOnLineList = async (io, socket, nickname) => {
  listUserOnLine = listUserOnLine.filter((user) => user.id !== socket.id);
  const { id } = socket;
  listUserOnLine.push({ id, nickname });
  io.emit('rendernickname', listUserOnLine);
};

module.exports = (io) => {
  io.on('connection', async (socket) => {
    await renderMessage(io, socket);
    socket.on('geraNick', async (geraNick) => {
      // io.emit('nickName', geraNick);
     await nickNameOnLineList(io, socket, geraNick);
    });

    // const nickname = `Fla${Date.now()}`;
    historyMessage(io, socket);
    console.log('back', listUserOnLine);

    socket.on('newNickname', (nickname) => {
      const newUser = listUserOnLine.findIndex((user) => user.id === socket.id);
      listUserOnLine[newUser].nickname = nickname;
      io.emit('rendernickname', listUserOnLine);
    });

    socket.on('disconnect', () => {
      listUserOnLine = listUserOnLine.filter((user) => user.id !== socket.id);
      io.emit('rendernickname', listUserOnLine);
    });
  });
};