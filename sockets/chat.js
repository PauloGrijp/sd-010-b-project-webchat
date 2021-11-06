const Model = require('../src/models/Messages');

const usersList = [];
module.exports = (io) => io.on('connection', async (socket) => {
  const userID = `UID${Date.now()}`;
  usersList.push(userID);
  socket.emit('currentUser', userID);
  io.emit('login', usersList);
  socket.on('setUserNickname', (nickname) => {
    usersList.splice(usersList.indexOf(userID), 1, nickname);
    io.emit('login', usersList);
  });

  socket.on('message', async ({ nickname, chatMessage }) => {
    const timestamp = new Date().toLocaleString().replace(/\//g, '-');
    const formatedMessage = `${timestamp} ${nickname}: ${chatMessage}`;
    await Model.saveMessages({ nickname, chatMessage, timestamp });
    io.emit('message', formatedMessage);
  });

  socket.on('disconnect', () => {
    usersList.splice(usersList.indexOf(userID), 1);
    io.emit('login', usersList);
  });
}); 