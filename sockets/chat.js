const date = require('../useful/date');
const { addingMessage } = require('../models/messageModel');
const getAllDB = require('../models/messageModel');

const currentDate = date();

const userArray = [];

const getAllMessages = async (io) => {
  const allMessageFromDB = await getAllDB.getAll();
  console.log(allMessageFromDB);
  allMessageFromDB.map((message) => io
    .emit('message', `${currentDate} - ${message.nickname}: ${message.message}`));
};

module.exports = (io) => io.on('connection', async (socket) => {
  await getAllMessages(io);
  socket.on('message', async ({ chatMessage, nickname }) => {
    userArray.push({ chatMessage, nickname, currentDate });
    io.emit('online', userArray);
    await addingMessage(chatMessage, nickname, currentDate);
    io.emit('message', `${currentDate} - ${nickname}: ${chatMessage}`);
  });
  
   socket.on('online', (userId) => {
    socket.emit('Olá, seja bem vindo ao nosso chat público!');
    socket.emit('online', userId);
   });
 });