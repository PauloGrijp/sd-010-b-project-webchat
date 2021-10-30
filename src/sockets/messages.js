const messagesModel = require('../../models/messagesModel');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ nickname, chatMessage }) => {
    const dateNow = new Date().toLocaleString().replaceAll('/', '-');
    messagesModel.CreateMessages({
      message: `${chatMessage}`,
      nickname: `${nickname}`,
      timestamp: dateNow,
    });
    io.emit('message', `${dateNow} - ${nickname}: ${chatMessage}`);
  });
});