const date = require('../useful/date');
const { addingMessage } = require('../models/messageModel');
const { getAll } = require('../models/messageModel');

const currentDate = date();

module.exports = (io) => io.on('connection', async (socket) => {
  const allMessagesFromBd = await getAll();
  const messages = allMessagesFromBd
    .map((message) => `${currentDate} - ${message.nickname}: ${message.message}`);
  socket.emit('messageList', messages);

  socket.on('message', async ({ chatMessage, nickname }) => {
    await addingMessage(chatMessage, nickname, currentDate);
    io.emit('message', `${currentDate} - ${nickname}: ${chatMessage}`);
  });
  
  socket.on('online', (userId) => {
    socket.emit('Olá, seja bem vindo ao nosso chat público!');
    socket.emit('online', userId);
  });
});