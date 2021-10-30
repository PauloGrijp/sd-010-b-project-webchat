const model = require('../models/messages');
const structurMessage = require('../utils/structurMessage');

const users = {};

module.exports = (io) => io.on('connection', async (socket) => {
  const historic = await model.getAll().then((e) => e.map(({ timestamp, nickname, message }) =>
  `${timestamp} ${nickname} ${message}`));

  users[socket.id] = socket.id.slice(0, 16);

  socket.emit('newConnection', { user: users[socket.id], historic });

  // socket.emit('newUser', { user:  });

  socket.on('nickname', (nickname) => {
    users[socket.id] = nickname;
    io.emit('users', Object.values(users));
  });

  socket.on('message', async (message) => {
    const response = await structurMessage(message, users[socket.id]);
    io.emit('message', response);
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('users', Object.values(users));
  });
});
