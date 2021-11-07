// Faça seu código aqui
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const http = require('http').createServer(app);

const port = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

const clientControler = require('./client/client');
const chatController = require('./controller/chatController');
const middlewares = require('./middlewares/middlewares');

io.on('connection', (socket) => {
  console.log('Connect', socket.id);
  socket.on('disconnect', () => {
    clientControler.excludeChatty(socket);
    io.emit('guests', clientControler.getChatty());
  });
  socket.on('adduser', (random) => {
    clientControler.addChatty(random, socket);
    io.emit('guests', clientControler.getChatty());
  });
  socket.on('nickname', (nickname) => {
    clientControler.editChatty(nickname, socket);
    io.emit('guests', clientControler.getChatty());
  });

  socket.on('message', (message) => {
    const { chatMessage, nickname } = message;
    const dados = middlewares.getDate(chatMessage, nickname);
        io.emit('message', dados);
  });
});

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', chatController.getAll);
http.listen(port, () => {
  console.log('message', port);
});