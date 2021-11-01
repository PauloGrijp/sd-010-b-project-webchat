const socketIo = require('socket.io');
const generateName = require('nicknames');
const chatModel = require('../models/chatModel');

const actualDate = new Date().toLocaleString().replace(/\//g, '-');

const users = [];
let actualUser;

const setUserName = (io, socket, nickname) => {
  if (!users.includes(nickname)) {
    users.push({ nickname, id: socket.id });
  }
  io.emit('connected', { users, actualUser: nickname });
};

const setMessage = async (io, socket) => {
  const { sendMessage, nickname } = socket;
  const message = await chatModel.createMessage(sendMessage, nickname, actualDate);
  io.emit('message', JSON.stringify(message));
};
