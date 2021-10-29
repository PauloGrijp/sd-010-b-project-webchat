const express = require('express');
const path = require('path');
const moment = require('moment');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;
// const messages = [];

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  } });

const messageController = require('./controllers/messageController');
const messageModel = require('./models/messageModel');
  
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', messageController.listMessages);

const data = moment().format('DD-MM-yyyy HH:mm:ss A');
let usersOn = [];

io.on('connection', (socket) => {
  socket.on('userOn', (nickname) => {
    usersOn = usersOn.filter((id) => socket.id !== id.id);
    usersOn.push({ id: socket.id, nickname });
    io.emit('usersOn', usersOn);
  });

  socket.on('message', async (post) => {
    const { chatMessage } = post;
    let nickname = usersOn.filter((user) => socket.id === user.id).map((user) => user.nickname);
    if (nickname.length === 0) nickname = post.nickname;
    const message = `${data} - ${nickname}: ${chatMessage}`;
    await messageModel.insertMessage(chatMessage, nickname, data);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    usersOn = usersOn.filter((id) => socket.id !== id.id);
    io.emit('usersOn', usersOn);
  });
});

http.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});