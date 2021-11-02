const moment = require('moment');

const client = {};

module.exports = (io) => io.on('connection', async (socket) => {
  client[socket.id] = socket.id.slice(1, 17);

  socket.emit('new-user', client[socket.id]);

  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${moment().format('DD-MM-YYYY HH:mm:ss')} ${nickname}: ${chatMessage}`);
  });

  socket.on('update-nickname', (nick) => {
    client[socket.id] = nick;
  });
});
