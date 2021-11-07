const messagesModel = require('../models/messages');

const date = new Date();
const currentDate = ` ${date.getDate()}-${date.getMonth()}-${
  date.getFullYear()}- ${
      date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

const users = [];

const oldNickHandle = (user, io) => {
  const currentUser = users.findIndex((el) => el.user === user.oldNick);
  users[currentUser].user = user.newNick;
  return io.emit('refreshOneNick', user);
};

const disconnectUser = (socket, io) => {
  const i = users.findIndex((el) => el.id === socket.id);
  users.splice(i, 1);
 io.emit('refreshNick', users);
};

const handleNick = (user, io, socket) => {
  if (user.oldNick) { 
    return oldNickHandle(user, io);
  }
  users.push({ user: user.newNick, id: socket.id });
  io.emit('refreshNick', users);
};
module.exports = (io) => io.on('connection', (socket) => {
socket.on('message', async (message) => {
  await messagesModel
  .createMessageModel(message.chatMessage, message.nickname, message.timestamp);
  const data = ` ${currentDate}-${message.nickname}: ${message.chatMessage}`;
  console.log(data, message);
  
  // io.emit('message', data);
  io.emit('refreshMessages', data);
});

socket.on('start', async () => {
  const data = await messagesModel.getAllModel();
  socket.emit('startMessages', data);
});

socket.on('nick', async (user) => {
  handleNick(user, io, socket);
  // if (user.oldNick) { 
  //   return oldNickHandle(user, io);
  // }
  // users.push({ user: user.newNick, id: socket.id });
  // io.emit('refreshNick', users);
});

socket.on('disconnect', () => {
  //  const i = users.findIndex((el) => el.id === socket.id);
  //  users.splice(i, 1);
  // io.emit('refreshNick', users);
  disconnectUser(socket, io);
});
});

// socket.on('disconnect', () => {
//   //  const i = users.findIndex((el) => el.id === socket.id);
//   //  users.splice(i, 1);
//   // io.emit('refreshNick', users);
//   disconnectUser(socket, io);
// });