const users = [];

const webChat = (io) => {
  io.on('connection', (socket) => {
    socket.on('login', (nickname) => {
      users.push({ nickname, socketId: socket.id });
      io.emit('users', users);
    });
  });
};

module.exports = webChat;