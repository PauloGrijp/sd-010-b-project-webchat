const messagesModel = require('../../models/messagesModel');

const dateNow = new Date().toLocaleString().replaceAll('/', '-');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', `${dateNow} - ${nickname}: ${chatMessage}`);
    messagesModel.CreateMessages({
      message: `${chatMessage}`,
      nickname: `${nickname}`,
      timestamp: dateNow,
    });
  });
});