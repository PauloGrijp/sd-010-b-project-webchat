const model = require('../models/messages');
const structurMessage = require('../utils/structurMessage');

const users = {};

module.exports = (io) => io.on('connection', async (socket) => {
  const historic = await model.getAll().then((e) => e.map(({ timestamp, nickname, message }) =>
  `${timestamp} ${nickname} ${message}`));

  users[socket.id] = socket.id.slice(0, 16);

  socket.emit('newConnection', await historic);

  io.emit('newUser', { user: users[socket.id] });

  socket.on('nickname', (nickname) => {
    users[socket.id] = nickname;
    io.emit('newUser', nickname);
  });

  socket.on('message', async (message) => {
    const response = await structurMessage(message, users[socket.id]);
    io.emit('message', response);
  });
});
