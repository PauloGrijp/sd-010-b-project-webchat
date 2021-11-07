const messagesModel = require('../models/messages');

const date = new Date();
const currentDate = ` ${date.getDate()}-${date.getMonth()}-${
  date.getFullYear()}- ${
      date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

const users = [];

const oldNickHandle = (user, io) => {
  users.splice(users.indexOf(user.oldNick), 1);
  users.push(user.newNick);
  return io.emit('refreshOneNick', user);
};
module.exports = (io) => io.on('connection', (socket) => {
socket.on('message', async (message) => {
  await messagesModel
  .createMessageModel(message.chatMessage, message.nickname, message.timestamp);
  const data = ` ${currentDate}-${message.nickname}: ${message.chatMessage}`;
  
  io.emit('refreshMessages', data);
});

socket.on('start', async () => {
  const data = await messagesModel.getAllModel();
  socket.emit('startMessages', data);
  console.log(users);
});

socket.on('nick', async (user) => {
  if (user.oldNick) { 
    return oldNickHandle(user, io);
  }
  users.push(user.newNick);
  io.emit('refreshNick', users);
});

socket.on('disconecting', async (user) => {
  console.log('Got disconnect!', user);

  const i = users.indexOf(user);
  users.splice(i, 1);
  io.emit('refreshNick', users);
});
});

// socket.on('nick', async (user) => {
//   const users = await messagesModel.getAllUsers();
//   if (user.oldNick) { 
//     return messagesModel.updateUserNick(user.newNick, user.oldNick); 
//   }
//    await messagesModel.createUser(user.newNick);
  
//   io.emit('refreshNick', users);
// });