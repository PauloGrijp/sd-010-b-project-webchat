const moment = require('moment');
const Model = require('../models/chatModel');

const client = {};

module.exports = (io) => io.on('connection', async (socket) => {
  client[socket.id] = socket.id.slice(1, 17);

  socket.emit('new-user', client[socket.id]);

  socket.on('message', ({ chatMessage, nickname }) => {
    const msg = {
      message: `${moment().format('DD-MM-YYYY HH:mm:ss')} ${nickname}: ${chatMessage}`,
      nickname,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    io.emit('message', msg.message);
    Model.sendMessage(msg);
  });

  socket.on('update-nickname', (nick) => {
    client[socket.id] = nick;
  });
});
