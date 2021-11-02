const moment = require('moment');
const Model = require('../models/chatModel');

let nickFaker = Math.random().toString(16).substr(2, 8) + Math.random().toString(16).substr(2, 8);

let history = [];

const getAllMessage = async () => {
  history = await Model.getMessage();
  return history;
};

const newUser = async (socket) => {
  await getAllMessage();
  socket.emit('newConnection', history);
  socket.emit('newUser', nickFaker);
};

const updateNick = async (socket) => {
  socket.on('send-nickname', async (nick) => {
    await Model.updateNickname(nickFaker, nick);
    nickFaker = nick;
  });
};

const messages = async (socket, io) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const messageToConvey = `${moment()
      .format('DD-MM-YYYY H:mm:ss')} ${nickname}: ${chatMessage}`;
    await Model.sendMessage({
      message: chatMessage,
      nickname,
      timestamp: moment().format('DD-MM-YYYY H:mm:ss'),
    });
    io.emit('sendMessage', messageToConvey);
  });
};

module.exports = (io) => {
  io.on('connection', async (socket) => {
    await newUser(socket);
    await updateNick(socket);
    await messages(socket, io);
  });
};
