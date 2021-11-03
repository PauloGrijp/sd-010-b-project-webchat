const express = require('express');

const app = express();
const path = require('path');

const http = require('http').createServer(app);

require('dotenv').config();

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const verifyMessage = (message, nickName, idRandon, socketIo) => {
  const date = new Date();
  let name = '';
  
  if (!nickName) {
    name = idRandon;
  } else {
    name = nickName;
  }

  const messageFormated = `${date.toLocaleString()} - ${name}: ${message}`;
  return socketIo.emit('message', messageFormated);
};

io.on('connection', (socket) => {
  const idRandon = socket.id.slice(0, 16);
  socket.on('message', ({ message, nickName }) => verifyMessage(message, nickName, idRandon, io));
});

const { chatController } = require('./controllers/chatController');

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(chatController);

http.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));