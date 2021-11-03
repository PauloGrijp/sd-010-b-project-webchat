const { setMoment } = require('../scripts/date');
const Webchat = require('../controllers/Webchat');

let users = [];

const connectUser = (socket, io) => {
  socket.on('connectUser', (nickname) => {
    console.log(`Connect user with sockedt ID: ${socket.id}`);

    users.push({ id: socket.id, username: nickname });

    io.emit('onlineUsers', users);
  });
};

const sendMessage = (socket, io) => {
  socket.on('message', async ({ nickname: name, chatMessage }) => {
    console.log(`Send message with sockedt ID: ${socket.id}`);

    const message = `${setMoment()} - <strong>${name}:</strong> ${chatMessage}`;

    await Webchat.create({
      message: chatMessage,
      nickname: name,
      timestamp: setMoment(),
    });

    io.emit('message', message);
  });
};

const setNickname = (socket, io) => {
  socket.on('setNickname', (username) => {
    console.log(`Set nickname at sockedt ID: ${socket.id}`);

    const index = users.findIndex((user) => user.id === socket.id);

    users[index].username = username;

    io.emit('onlineUsers', users);
  });
};

const disconnect = (socket, io) => {
  socket.on('disconnect', () => {
    console.log(`Disconnect user with sockedt ID: ${socket.id}`);

    users = users.filter((user) => user.id !== socket.id);

    io.emit('onlineUsers', users);
  });
};

const connection = (io) => {
  io.on('connection', (socket) => {
    connectUser(socket, io);
    sendMessage(socket, io);
    setNickname(socket, io);
    disconnect(socket, io);
  });
};

module.exports = connection; 