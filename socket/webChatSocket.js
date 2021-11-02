const moment = require('moment'); //  https://momentjs.com/
const webChatModel = require('../models/webChatModel');

const usersOnline = [];
const timestamp = moment().format('DD-MM-yyyy HH:mm:ss');

const webChatIO = (io) => {
  io.on('connection', async (socket) => {
    const userId = socket.id.slice(0, 16);
    usersOnline.push({ userId, nickname: userId });

    io.emit('connected', { nick: socket.id.slice(0, 16), users: usersOnline });

    socket.on('updateNick', ({ newNick }) => {
      const indexUser = usersOnline.findIndex((user) => user.nickname === userId);
      usersOnline[indexUser].nickname = newNick;
      io.emit('updatedUsers', { users: usersOnline });
    });

    socket.on('message', async ({ chatMessage, nickname }) => {
      io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
      await webChatModel.addMessage({ message: chatMessage, nickname, timestamp });
    });
  });
};

module.exports = webChatIO;
