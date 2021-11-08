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

const userDisconnect = async (io, socket) => {
  const userIndex = users.findIndex((user) => user.id === socket.id);
  users.splice(userIndex, 1);
  io.emit('listAllUsers', users);
};

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log('User connected');

    actualUser = generateName.all();
    setUserName(io, socket, actualUser);

    socket.emit('listAllMessages', await chatModel.getAllMessages());
    socket.emit('listAllUsers', users);
    socket.on('disconnect', () => userDisconnect(io, socket));
    socket.on('message', (objectMessage) => setMessage(io, objectMessage));
  });
};