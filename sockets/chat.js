const Model = require('../src/models/Messages');

const usersList = [];
module.exports = (io) => io.on('connection', async (socket) => {
  // console.log(`${socket.id} conectado`);
  const userIdD = `UID${Date.now()}`;
  usersList.push(userIdD);
  socket.emit('login', usersList);

  socket.on('message', async ({ nickname, chatMessage }) => {
    const timestamp = new Date().toLocaleString().replace(/\//g, '-');
    const formatedMessage = `${timestamp} ${nickname}: ${chatMessage}`;
    await Model.saveMessages({ nickname, chatMessage, timestamp });
    io.emit('message', formatedMessage);
  });

  socket.on('disconnect', () => {
    console.log('alguém saiu');
  });
}); 