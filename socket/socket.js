const messagesModel = require('../models/messages');

module.exports = (io) => io.on('connection', (socket) => {
socket.on('message', async (message) => {
  await messagesModel
  .createMessageModel(message.message, message.nickname, message.timestamp);
  const data = ` ${message.timestamp}-${message.nickname}: ${message.message}`;
  
  socket.emit('refreshMessages', data);
});

socket.on('start', async () => {
  const data = await messagesModel.getAllModel();
  socket.emit('startMessages', data);
});

socket.on('nick', async (user) => {
  const users = await messagesModel.getAllUsers();
  if (user.oldNick) { 
    return messagesModel.updateUserNick(user.newNick, user.oldNick); 
  }
   await messagesModel.createUser(user.newNick);
  
  socket.emit('refreshNick', users);
});
});