const moment = require('moment'); //  https://momentjs.com/

const usersOnline = [];
const timestamp = moment().format('DD-MM-yyyy HH:mm:ss');

const webChatIO = (io) => {
  io.on('connection', async (socket) => {
    const userId = socket.id.slice(0, 16);
    usersOnline.push({ userId, nickname: userId });

    io.emit('connected', { nick: socket.id.slice(0, 16), users: usersOnline });

    socket.on('message', async ({ chatMessage, nickname }) => {
      io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
    });
  });
};

module.exports = webChatIO;
