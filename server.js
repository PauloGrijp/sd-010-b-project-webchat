const express = require('express');

const app = express();
const path = require('path');

const http = require('http').createServer(app);

require('dotenv').config();

const io = require('socket.io')(http, {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST'],
});

const { saveMessageModel, getAllMessages } = require('./models/chatModel');

const verifyMessage = async (chatMessage, nickname, idRandon, socketIo) => {
  const date = new Date();
  let name;
  
  if (!nickname) {
    name = idRandon;
  } else {
    name = nickname;
  }
  
  const messageUser = {
    chatMessage,
    nickname: name,
    timestamp: date.toLocaleString(),
  };

  await saveMessageModel(messageUser);
  console.log(messageUser);
  return socketIo.emit('message', messageUser);
};

const renderAllMessagesDb = async () => {
  const result = await getAllMessages();
  return result;
};

io.on('connection', async (socket) => {
  const idRandon = socket.id.slice(0, 16);
  socket.on('message', 
  ({ chatMessage, nickname }) => verifyMessage(chatMessage, nickname, idRandon, io));
  const resultMessage = await renderAllMessagesDb();
  console.log(resultMessage);
  io.emit('html', resultMessage);
});

const { chatController } = require('./controllers/chatController');

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(chatController);

http.listen(3000, () => console.log(`Servidor rodando na porta ${3000}`));