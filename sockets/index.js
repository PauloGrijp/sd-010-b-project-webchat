const users = [];

const webChat = (io) => {
  io.on('connection', (socket) => {
    socket.on('login', (nickname) => {
      console.log('New user connected');
      users.push({ nickname, socketId: socket.id });
      io.emit('users', users);
    });
  });
};

module.exports = webChat;