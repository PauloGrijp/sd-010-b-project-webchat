const registerMessageHandlers = require('./messageHandler');

module.exports = (io) => {
  let onlineUsers = [];
  io.on('connection', (socket) => {
    socket.on('user:connect', () => {
      const newUser = { socketId: socket.id, nickname: socket.id.slice(0, 16) };
      onlineUsers = [newUser, ...onlineUsers]; io.emit('user:connect', newUser, onlineUsers);
    });

    registerMessageHandlers(io, socket);

    socket.on('user:update', (payload) => {
      const indexFoundNickname = onlineUsers.findIndex((user) =>
         user.socketId === payload.socketId);
      onlineUsers[indexFoundNickname] = payload;
      socket.broadcast.emit('user:update', payload);
    });

    socket.on('disconnect', () => {
      onlineUsers = onlineUsers.filter((user) => !socket.id.includes(user.socketId));
      socket.broadcast.emit('user:disconnect', { socketId: socket.id });
    });
  });
};
